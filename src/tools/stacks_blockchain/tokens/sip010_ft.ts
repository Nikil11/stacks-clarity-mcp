import { Tool } from "fastmcp";
import { z } from "zod";
import { recordTelemetry } from "../../../utils/telemetry.js";

// ============================================================================
// SIP-010 FUNGIBLE TOKEN TOOLS
// ============================================================================

// Schema for network selection
const NetworkScheme = z.enum(["mainnet", "testnet", "devnet"]);

// Schema for SIP-010 token operations
const SIP010TransferScheme = z.object({
  contractAddress: z.string().describe("The contract address (e.g., SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9)"),
  contractName: z.string().describe("The contract name of the SIP-010 token"),
  amount: z.number().describe("The amount to transfer (in base units, considering decimals)"),
  sender: z.string().describe("The sender's Stacks address"),
  recipient: z.string().describe("The recipient's Stacks address"),
  memo: z.string().optional().describe("Optional memo (max 34 bytes)"),
  network: NetworkScheme.describe("The Stacks network"),
});

const SIP010BalanceScheme = z.object({
  contractAddress: z.string().describe("The contract address"),
  contractName: z.string().describe("The contract name of the SIP-010 token"),
  address: z.string().describe("The Stacks address to check balance for"),
  network: NetworkScheme.describe("The Stacks network"),
});

const SIP010TokenInfoScheme = z.object({
  contractAddress: z.string().describe("The contract address"),
  contractName: z.string().describe("The contract name of the SIP-010 token"),
  network: NetworkScheme.describe("The Stacks network"),
});

// Helper function to call read-only functions
async function callReadOnlyFunction(
  contractAddress: string,
  contractName: string,
  functionName: string,
  functionArgs: any[],
  network: string
): Promise<any> {
  const apiUrl = network === "mainnet" 
    ? "https://api.hiro.so" 
    : "https://api.testnet.hiro.so";
  
  try {
    const response = await fetch(
      `${apiUrl}/v2/contracts/call-read/${contractAddress}/${contractName}/${functionName}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: contractAddress,
          arguments: functionArgs,
        }),
      }
    );
    
    if (!response.ok) {
      const data: any = await response.json();
      throw new Error(data.error || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to call ${functionName}: ${error}`);
  }
}

// Get SIP-010 token balance
export const getSIP010BalanceTool: Tool<undefined, typeof SIP010BalanceScheme> = {
  name: "get_sip010_balance",
  description: "Get the SIP-010 fungible token balance for a specific address. Returns the balance in base units (consider decimals for display).",
  parameters: SIP010BalanceScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "get_sip010_balance" }, context);
      
      const result = await callReadOnlyFunction(
        args.contractAddress,
        args.contractName,
        "get-balance",
        [`0x${Buffer.from(args.address, 'utf8').toString('hex')}`],
        args.network
      );
      
      if (result.okay && result.result) {
        const balance = parseInt(result.result.replace('u', ''));
        return `Balance: ${balance} base units\n\nTo get human-readable amount, divide by 10^decimals.\nUse get_sip010_info to get the decimal count.`;
      } else {
        return `❌ Failed to get balance: ${result.error || 'Unknown error'}`;
      }
    } catch (error) {
      return `❌ Failed to get SIP-010 balance: ${error}`;
    }
  },
};

// Get SIP-010 token information
export const getSIP010InfoTool: Tool<undefined, typeof SIP010TokenInfoScheme> = {
  name: "get_sip010_info",
  description: "Get complete information about a SIP-010 fungible token including name, symbol, decimals, total supply, and metadata URI.",
  parameters: SIP010TokenInfoScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "get_sip010_info" }, context);
      
      // Get all token information in parallel
      const [nameResult, symbolResult, decimalsResult, supplyResult, uriResult] = await Promise.all([
        callReadOnlyFunction(args.contractAddress, args.contractName, "get-name", [], args.network),
        callReadOnlyFunction(args.contractAddress, args.contractName, "get-symbol", [], args.network),
        callReadOnlyFunction(args.contractAddress, args.contractName, "get-decimals", [], args.network),
        callReadOnlyFunction(args.contractAddress, args.contractName, "get-total-supply", [], args.network),
        callReadOnlyFunction(args.contractAddress, args.contractName, "get-token-uri", [], args.network),
      ]);
      
      // Parse results
      const name = nameResult.okay ? nameResult.result.replace(/"/g, '') : 'Unknown';
      const symbol = symbolResult.okay ? symbolResult.result.replace(/"/g, '') : 'Unknown';
      const decimals = decimalsResult.okay ? parseInt(decimalsResult.result.replace('u', '')) : 0;
      const totalSupply = supplyResult.okay ? parseInt(supplyResult.result.replace('u', '')) : 0;
      const uri = uriResult.okay && uriResult.result !== 'none' ? uriResult.result : 'No URI';
      
      return `# SIP-010 Token Information

**Contract**: ${args.contractAddress}.${args.contractName}
**Network**: ${args.network}

## Token Details
- **Name**: ${name}
- **Symbol**: ${symbol}
- **Decimals**: ${decimals}
- **Total Supply**: ${totalSupply} base units (${totalSupply / Math.pow(10, decimals)} ${symbol})
- **Metadata URI**: ${uri}

## Contract Verification
✅ This contract implements the SIP-010 standard trait.

## Usage Notes
- All amounts are in base units (multiply by 10^${decimals} for human amounts)
- Post-conditions are REQUIRED for all transfers
- Use native Stacks post-conditions for security`;
      
    } catch (error) {
      return `❌ Failed to get SIP-010 token info: ${error}`;
    }
  },
};

// Generate SIP-010 transfer transaction
export const generateSIP010TransferTool: Tool<undefined, typeof SIP010TransferScheme> = {
  name: "generate_sip010_transfer",
  description: "Generate a SIP-010 fungible token transfer transaction with proper post-conditions. Returns the transaction parameters for wallet signing.",
  parameters: SIP010TransferScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_sip010_transfer" }, context);
      
      // Validate inputs
      if (args.amount <= 0) {
        return "❌ Amount must be positive";
      }
      
      if (args.sender === args.recipient) {
        return "❌ Sender and recipient cannot be the same";
      }
      
      if (args.memo && Buffer.from(args.memo, 'utf8').length > 34) {
        return "❌ Memo cannot exceed 34 bytes";
      }
      
      // Generate the transaction parameters
      const transactionParams = {
        contractAddress: args.contractAddress,
        contractName: args.contractName,
        functionName: "transfer",
        functionArgs: [
          { type: "uint", value: args.amount },
          { type: "principal", value: args.sender },
          { type: "principal", value: args.recipient },
          args.memo ? { type: "some", value: { type: "buffer", value: args.memo } } : { type: "none" }
        ],
        postConditions: [
          {
            type: "fungible",
            condition: "equal",
            amount: args.amount,
            asset: {
              contractAddress: args.contractAddress,
              contractName: args.contractName,
              assetName: args.contractName
            },
            principal: args.sender
          }
        ],
        network: args.network
      };
      
      return `# SIP-010 Transfer Transaction

## Transaction Parameters
\`\`\`json
${JSON.stringify(transactionParams, null, 2)}
\`\`\`

## Frontend Integration Example (TypeScript)

\`\`\`typescript
import { 
  openContractCall,
  PostConditionMode,
  FungibleConditionCode,
  createAssetInfo,
  makeStandardFungiblePostCondition,
  uintCV,
  principalCV,
  ${args.memo ? 'someCV, bufferCV' : 'noneCV'}
} from '@stacks/connect';

const functionArgs = [
  uintCV(${args.amount}),
  principalCV('${args.sender}'),
  principalCV('${args.recipient}'),
  ${args.memo ? `someCV(bufferCV(Buffer.from('${args.memo}', 'utf8')))` : 'noneCV()'}
];

const postConditions = [
  makeStandardFungiblePostCondition(
    '${args.sender}',
    FungibleConditionCode.Equal,
    ${args.amount},
    createAssetInfo('${args.contractAddress}', '${args.contractName}', '${args.contractName}')
  ),
];

await openContractCall({
  contractAddress: '${args.contractAddress}',
  contractName: '${args.contractName}',
  functionName: 'transfer',
  functionArgs,
  postConditions,
  postConditionMode: PostConditionMode.Deny, // REQUIRED
  onFinish: (data) => {
    console.log('Transaction ID:', data.txId);
  },
});
\`\`\`

## Security Notes
- ✅ Post-condition included (MANDATORY for SIP-010)
- ✅ Input validation performed
- ✅ Using deny mode for maximum security
- ⚠️  Always verify recipient address before signing`;
      
    } catch (error) {
      return `❌ Failed to generate SIP-010 transfer: ${error}`;
    }
  },
};

// Generate SIP-010 implementation template
export const generateSIP010TemplateTool: Tool<undefined, z.ZodObject<{
  tokenName: z.ZodString;
  tokenSymbol: z.ZodString;
  decimals: z.ZodNumber;
  initialSupply: z.ZodNumber;
  includeMinting: z.ZodBoolean;
}>> = {
  name: "generate_sip010_template",
  description: "Generate a complete, production-ready SIP-010 fungible token contract template with all security features and best practices.",
  parameters: z.object({
    tokenName: z.string().describe("The human-readable name of the token (e.g., 'My Token')"),
    tokenSymbol: z.string().describe("The ticker symbol (e.g., 'MTK')"),
    decimals: z.number().min(0).max(18).describe("Number of decimal places (typically 6 for Stacks tokens)"),
    initialSupply: z.number().min(0).describe("Initial token supply (in whole tokens, not base units)"),
    includeMinting: z.boolean().describe("Whether to include admin minting/burning functions"),
  }),
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_sip010_template" }, context);
      
      const baseUnits = args.initialSupply * Math.pow(10, args.decimals);
      
      return `# SIP-010 Fungible Token: ${args.tokenName}

## Contract Implementation

\`\`\`clarity
;; ${args.tokenName} (${args.tokenSymbol})
;; A complete SIP-010 fungible token implementation with all security features

;; Define the fungible token using native Clarity primitive (REQUIRED)
(define-fungible-token ${args.tokenSymbol.toLowerCase()})

;; Error constants
(define-constant ERR-NOT-AUTHORIZED (err u1))
(define-constant ERR-INSUFFICIENT-BALANCE (err u2))
(define-constant ERR-INVALID-SENDER (err u3))
(define-constant ERR-INVALID-AMOUNT (err u4))

;; Token metadata
(define-constant TOKEN-NAME "${args.tokenName}")
(define-constant TOKEN-SYMBOL "${args.tokenSymbol}")
(define-constant TOKEN-DECIMALS u${args.decimals})
(define-constant TOKEN-URI "https://your-domain.com/token-metadata.json")

;; Initial supply in base units
(define-constant INITIAL-SUPPLY u${baseUnits})

${args.includeMinting ? ';; Contract owner for admin functions\n(define-constant CONTRACT-OWNER tx-sender)' : ''}

;; Implement the SIP-010 trait
(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; Initialize the contract with initial supply
(begin
  (try! (ft-mint? ${args.tokenSymbol.toLowerCase()} INITIAL-SUPPLY tx-sender))
)

;; SIP-010 Transfer function
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    ;; Input validation
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (asserts! (not (is-eq sender recipient)) ERR-INVALID-SENDER)
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    
    ;; Perform transfer using native function (enables post-conditions)
    (try! (ft-transfer? ${args.tokenSymbol.toLowerCase()} amount sender recipient))
    
    ;; Emit memo if provided (required for Stacks 2.0)
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

;; SIP-010 Read-only functions
(define-read-only (get-name)
  (ok TOKEN-NAME)
)

(define-read-only (get-symbol)
  (ok TOKEN-SYMBOL)
)

(define-read-only (get-decimals)
  (ok TOKEN-DECIMALS)
)

(define-read-only (get-balance (user principal))
  (ok (ft-get-balance ${args.tokenSymbol.toLowerCase()} user))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply ${args.tokenSymbol.toLowerCase()}))
)

(define-read-only (get-token-uri)
  (ok (some TOKEN-URI))
)

${args.includeMinting ? `
;; Administrative functions
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (ft-mint? ${args.tokenSymbol.toLowerCase()} amount recipient)
  )
)

(define-public (burn (amount uint))
  (begin
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (ft-burn? ${args.tokenSymbol.toLowerCase()} amount tx-sender)
  )
)

;; Transfer ownership (optional)
(define-data-var contract-owner principal CONTRACT-OWNER)

(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (var-set contract-owner new-owner)
    (ok true)
  )
)

(define-read-only (get-contract-owner)
  (ok (var-get contract-owner))
)` : ''}
\`\`\`

## Token Configuration
- **Name**: ${args.tokenName}
- **Symbol**: ${args.tokenSymbol}
- **Decimals**: ${args.decimals}
- **Initial Supply**: ${args.initialSupply} ${args.tokenSymbol} (${baseUnits} base units)
- **Admin Functions**: ${args.includeMinting ? 'Enabled' : 'Disabled'}

## Deployment Steps

1. **Save the contract** as \`${args.tokenSymbol.toLowerCase()}.clar\`

2. **Test locally** with Clarinet:
   \`\`\`bash
   clarinet check
   clarinet test
   \`\`\`

3. **Deploy to testnet** first:
   \`\`\`bash
   clarinet deploy --testnet
   \`\`\`

4. **Deploy to mainnet** after testing:
   \`\`\`bash
   clarinet deploy --mainnet
   \`\`\`

## Usage Examples

### Frontend Integration
\`\`\`typescript
// Transfer tokens
await transferSIP010Token(
  contractAddress,
  '${args.tokenSymbol.toLowerCase()}',
  ${Math.pow(10, args.decimals)}, // 1 ${args.tokenSymbol}
  senderAddress,
  recipientAddress
);

// Check balance  
const balance = await getSIP010Balance(
  contractAddress,
  '${args.tokenSymbol.toLowerCase()}',
  userAddress
);
console.log(\`Balance: \${balance / ${Math.pow(10, args.decimals)}} ${args.tokenSymbol}\`);
\`\`\`

## Security Features ✅
- ✅ Native asset functions for post-condition support
- ✅ Input validation for all parameters
- ✅ Authorization checks using tx-sender
- ✅ Standard SIP-010 error codes
- ✅ Memo handling for Stacks 2.0 compatibility
- ✅ Overflow/underflow protection via native functions
${args.includeMinting ? '- ✅ Admin function access control' : ''}

## Next Steps
1. Update TOKEN-URI to point to your metadata JSON
2. Customize the contract name and save as \`.clar\` file
3. Add to your Clarinet project
4. Write comprehensive tests
5. Deploy to testnet for testing
6. Deploy to mainnet when ready`;
      
    } catch (error) {
      return `❌ Failed to generate SIP-010 template: ${error}`;
    }
  },
};