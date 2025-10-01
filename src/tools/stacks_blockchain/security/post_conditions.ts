import { Tool } from "fastmcp";
import { z } from "zod";
import { recordTelemetry } from "../../../utils/telemetry.js";

// ============================================================================
// POST-CONDITION VALIDATION AND GENERATION TOOLS
// ============================================================================

// Schemas for post-condition generation
const PostConditionTypeScheme = z.enum(["fungible", "non-fungible", "stx"]);
const FungibleConditionCodeScheme = z.enum(["equal", "greater", "greater_equal", "less", "less_equal"]);
const NonFungibleConditionCodeScheme = z.enum(["owns", "does_not_own"]);

const FungiblePostConditionScheme = z.object({
  principal: z.string().describe("The Stacks address for the post-condition"),
  conditionCode: FungibleConditionCodeScheme.describe("The condition type (usually 'equal' for exact transfers)"),
  amount: z.number().describe("The token amount in base units"),
  contractAddress: z.string().describe("The token contract address"),
  contractName: z.string().describe("The token contract name"),
  assetName: z.string().describe("The token asset name (usually same as contract name)"),
});

const NonFungiblePostConditionScheme = z.object({
  principal: z.string().describe("The Stacks address for the post-condition"),
  conditionCode: NonFungibleConditionCodeScheme.describe("The condition type ('owns' or 'does_not_own')"),
  tokenId: z.number().describe("The NFT token ID"),
  contractAddress: z.string().describe("The NFT contract address"),
  contractName: z.string().describe("The NFT contract name"),
  assetName: z.string().describe("The NFT asset name (usually same as contract name)"),
});

const STXPostConditionScheme = z.object({
  principal: z.string().describe("The Stacks address for the post-condition"),
  conditionCode: FungibleConditionCodeScheme.describe("The condition type (usually 'equal' for exact transfers)"),
  amount: z.number().describe("The STX amount in microSTX (1 STX = 1,000,000 microSTX)"),
});

const TransactionAnalysisScheme = z.object({
  contractAddress: z.string().describe("The contract address being called"),
  contractName: z.string().describe("The contract name being called"),
  functionName: z.string().describe("The function being called"),
  expectedTransfers: z.array(z.object({
    type: PostConditionTypeScheme,
    from: z.string().optional(),
    to: z.string().optional(),
    amount: z.number().optional(),
    tokenId: z.number().optional(),
    asset: z.string().optional(),
  })).describe("Expected asset transfers in the transaction"),
});

// Generate fungible token post-condition
export const generateFungiblePostConditionTool: Tool<undefined, typeof FungiblePostConditionScheme> = {
  name: "generate_fungible_post_condition",
  description: "Generate a fungible token post-condition for SIP-010 tokens. Post-conditions are MANDATORY for all token transfers.",
  parameters: FungiblePostConditionScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_fungible_post_condition" }, context);
      
      return `# Fungible Token Post-Condition

## Configuration
- **Principal**: ${args.principal}
- **Condition**: ${args.conditionCode}
- **Amount**: ${args.amount} base units
- **Asset**: ${args.contractAddress}.${args.contractName}.${args.assetName}

## TypeScript Implementation

\`\`\`typescript
import {
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
  createAssetInfo
} from '@stacks/transactions';

const postCondition = makeStandardFungiblePostCondition(
  '${args.principal}',
  FungibleConditionCode.${args.conditionCode.charAt(0).toUpperCase() + args.conditionCode.slice(1).replace('_', '')},
  ${args.amount},
  createAssetInfo(
    '${args.contractAddress}',
    '${args.contractName}',
    '${args.assetName}'
  )
);

// Use in transaction
const postConditions = [postCondition];

await openContractCall({
  // ... other parameters
  postConditions,
  postConditionMode: PostConditionMode.Deny, // REQUIRED for security
});
\`\`\`

## Clarity Contract Requirements

For this post-condition to work, the contract must use native asset functions:

\`\`\`clarity
;; REQUIRED: Native fungible token definition
(define-fungible-token ${args.assetName})

;; REQUIRED: Use ft-transfer? for transfers
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    ;; ... validation logic ...
    (try! (ft-transfer? ${args.assetName} amount sender recipient))
    ;; ... rest of function ...
  )
)
\`\`\`

## Security Notes
- ✅ This post-condition guarantees ${args.conditionCode === 'equal' ? 'exactly' : args.conditionCode} ${args.amount} tokens will be involved
- ✅ Transaction will fail if condition is not met
- ✅ Protects against unexpected token movements
- ⚠️  Always use PostConditionMode.Deny for maximum security`;
      
    } catch (error) {
      return `❌ Failed to generate fungible post-condition: ${error}`;
    }
  },
};

// Generate non-fungible token post-condition
export const generateNonFungiblePostConditionTool: Tool<undefined, typeof NonFungiblePostConditionScheme> = {
  name: "generate_non_fungible_post_condition",
  description: "Generate a non-fungible token post-condition for SIP-009 NFTs. Post-conditions are MANDATORY for all NFT transfers.",
  parameters: NonFungiblePostConditionScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_non_fungible_post_condition" }, context);
      
      return `# Non-Fungible Token Post-Condition

## Configuration
- **Principal**: ${args.principal}
- **Condition**: ${args.conditionCode}
- **Token ID**: ${args.tokenId}
- **Asset**: ${args.contractAddress}.${args.contractName}.${args.assetName}

## TypeScript Implementation

\`\`\`typescript
import {
  makeStandardNonFungiblePostCondition,
  NonFungibleConditionCode,
  createAssetInfo,
  uintCV
} from '@stacks/transactions';

const postCondition = makeStandardNonFungiblePostCondition(
  '${args.principal}',
  NonFungibleConditionCode.${args.conditionCode === 'owns' ? 'Owns' : 'DoesNotOwn'},
  createAssetInfo(
    '${args.contractAddress}',
    '${args.contractName}',
    '${args.assetName}'
  ),
  uintCV(${args.tokenId})
);

// Use in transaction
const postConditions = [postCondition];

await openContractCall({
  // ... other parameters
  postConditions,
  postConditionMode: PostConditionMode.Deny, // REQUIRED for security
});
\`\`\`

## Clarity Contract Requirements

For this post-condition to work, the contract must use native asset functions:

\`\`\`clarity
;; REQUIRED: Native non-fungible token definition
(define-non-fungible-token ${args.assetName} uint)

;; REQUIRED: Use nft-transfer? for transfers
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; ... validation logic ...
    (try! (nft-transfer? ${args.assetName} token-id sender recipient))
    ;; ... rest of function ...
  )
)
\`\`\`

## Usage Patterns
- **${args.conditionCode === 'owns' ? 'Owns' : 'DoesNotOwn'}**: ${args.conditionCode === 'owns' 
    ? `${args.principal} will own NFT #${args.tokenId} after transaction` 
    : `${args.principal} will NOT own NFT #${args.tokenId} after transaction`}

## Security Notes
- ✅ This post-condition guarantees ownership state for NFT #${args.tokenId}
- ✅ Transaction will fail if ownership doesn't match expectation
- ✅ Protects against unauthorized NFT movements
- ⚠️  Always verify current ownership before creating conditions`;
      
    } catch (error) {
      return `❌ Failed to generate non-fungible post-condition: ${error}`;
    }
  },
};

// Generate STX post-condition
export const generateSTXPostConditionTool: Tool<undefined, typeof STXPostConditionScheme> = {
  name: "generate_stx_post_condition",
  description: "Generate an STX post-condition for STX transfers. Essential for payment and fee transactions.",
  parameters: STXPostConditionScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_stx_post_condition" }, context);
      
      const stxAmount = args.amount / 1000000; // Convert to STX from microSTX
      
      return `# STX Post-Condition

## Configuration
- **Principal**: ${args.principal}
- **Condition**: ${args.conditionCode}
- **Amount**: ${args.amount} microSTX (${stxAmount} STX)

## TypeScript Implementation

\`\`\`typescript
import {
  makeStandardSTXPostCondition,
  FungibleConditionCode
} from '@stacks/transactions';

const postCondition = makeStandardSTXPostCondition(
  '${args.principal}',
  FungibleConditionCode.${args.conditionCode.charAt(0).toUpperCase() + args.conditionCode.slice(1).replace('_', '')},
  ${args.amount} // Amount in microSTX
);

// Use in transaction
const postConditions = [postCondition];

await openContractCall({
  // ... other parameters
  postConditions,
  postConditionMode: PostConditionMode.Deny, // REQUIRED for security
});
\`\`\`

## Common Usage Patterns

### Payment Transaction
\`\`\`typescript
// User pays for an NFT
const paymentCondition = makeStandardSTXPostCondition(
  buyerAddress,
  FungibleConditionCode.Equal,
  ${args.amount} // Exact payment amount
);
\`\`\`

### Contract Fee Collection
\`\`\`typescript
// Contract collects transaction fee
const feeCondition = makeContractSTXPostCondition(
  contractAddress,
  contractName,
  FungibleConditionCode.Equal,
  ${Math.floor(args.amount * 0.05)} // 5% fee
);
\`\`\`

## Security Notes
- ✅ This post-condition guarantees ${args.conditionCode === 'equal' ? 'exactly' : args.conditionCode} ${stxAmount} STX will be involved
- ✅ Protects against unexpected STX movements
- ✅ Essential for marketplace and payment contracts
- 💡 Remember: 1 STX = 1,000,000 microSTX`;
      
    } catch (error) {
      return `❌ Failed to generate STX post-condition: ${error}`;
    }
  },
};

// Analyze transaction for required post-conditions
export const analyzeTransactionPostConditionsTool: Tool<undefined, typeof TransactionAnalysisScheme> = {
  name: "analyze_transaction_post_conditions",
  description: "Analyze a contract call to determine what post-conditions are required for security. Essential for complex transactions.",
  parameters: TransactionAnalysisScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "analyze_transaction_post_conditions" }, context);
      
      let analysis = `# Post-Condition Analysis

## Transaction Details
- **Contract**: ${args.contractAddress}.${args.contractName}
- **Function**: ${args.functionName}

## Required Post-Conditions

`;

      let postConditionCount = 0;
      let tsCode = `// Complete TypeScript implementation
import {
  openContractCall,
  PostConditionMode,
  makeStandardFungiblePostCondition,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  NonFungibleConditionCode,
  createAssetInfo,
  uintCV
} from '@stacks/connect';

const postConditions = [
`;

      for (const transfer of args.expectedTransfers) {
        postConditionCount++;
        
        if (transfer.type === "fungible") {
          analysis += `### ${postConditionCount}. Fungible Token Transfer
- **From**: ${transfer.from || 'Unknown'}
- **To**: ${transfer.to || 'Unknown'}  
- **Amount**: ${transfer.amount || 'Unknown'} base units
- **Asset**: ${transfer.asset || 'Unknown'}

`;
          
          if (transfer.from && transfer.amount && transfer.asset) {
            const [contractAddr, contractName, assetName] = transfer.asset.includes('.') 
              ? transfer.asset.split('.') 
              : ['CONTRACT_ADDRESS', 'CONTRACT_NAME', transfer.asset];
            
            tsCode += `  makeStandardFungiblePostCondition(
    '${transfer.from}',
    FungibleConditionCode.Equal,
    ${transfer.amount},
    createAssetInfo('${contractAddr}', '${contractName}', '${assetName}')
  ),
`;
          }
        } else if (transfer.type === "non-fungible") {
          analysis += `### ${postConditionCount}. NFT Transfer
- **From**: ${transfer.from || 'Unknown'}
- **To**: ${transfer.to || 'Unknown'}
- **Token ID**: ${transfer.tokenId || 'Unknown'}
- **Asset**: ${transfer.asset || 'Unknown'}

`;
          
          if (transfer.from && transfer.tokenId && transfer.asset) {
            const [contractAddr, contractName, assetName] = transfer.asset.includes('.') 
              ? transfer.asset.split('.') 
              : ['CONTRACT_ADDRESS', 'CONTRACT_NAME', transfer.asset];
            
            tsCode += `  makeStandardNonFungiblePostCondition(
    '${transfer.from}',
    NonFungibleConditionCode.DoesNotOwn,
    createAssetInfo('${contractAddr}', '${contractName}', '${assetName}'),
    uintCV(${transfer.tokenId})
  ),
`;
          }
        } else if (transfer.type === "stx") {
          analysis += `### ${postConditionCount}. STX Transfer
- **From**: ${transfer.from || 'Unknown'}
- **To**: ${transfer.to || 'Unknown'}
- **Amount**: ${transfer.amount || 'Unknown'} microSTX

`;
          
          if (transfer.from && transfer.amount) {
            tsCode += `  makeStandardSTXPostCondition(
    '${transfer.from}',
    FungibleConditionCode.Equal,
    ${transfer.amount}
  ),
`;
          }
        }
      }

      tsCode += `];

await openContractCall({
  contractAddress: '${args.contractAddress}',
  contractName: '${args.contractName}',
  functionName: '${args.functionName}',
  functionArgs: [
    // Add your function arguments here
  ],
  postConditions,
  postConditionMode: PostConditionMode.Deny, // CRITICAL for security
  onFinish: (data) => {
    console.log('Transaction completed:', data.txId);
  },
});`;

      analysis += `
## Security Assessment
- **Total Post-Conditions Required**: ${postConditionCount}
- **Risk Level**: ${postConditionCount === 0 ? '🔴 HIGH - No post-conditions!' : postConditionCount < 3 ? '🟡 MEDIUM' : '🟢 LOW'}
- **Compliance**: ${postConditionCount > 0 ? '✅ SIP compliant' : '❌ Missing required post-conditions'}

## Implementation

\`\`\`typescript
${tsCode}
\`\`\`

## Critical Security Notes
${postConditionCount === 0 ? `
⚠️  **WARNING**: This transaction has no post-conditions, which is DANGEROUS!
- Users are vulnerable to unexpected token movements
- Transaction may not behave as expected
- VIOLATES SIP-009 and SIP-010 requirements
` : `
✅ **SECURE**: This transaction includes proper post-conditions
- Users are protected from unexpected behavior
- Transaction guarantees are explicit
- Compliant with SIP standards
`}

## Best Practices
1. Always use PostConditionMode.Deny
2. Include post-conditions for ALL asset movements
3. Test post-conditions thoroughly
4. Show post-conditions to users before signing
5. Use exact amounts (FungibleConditionCode.Equal) when possible`;

      return analysis;
      
    } catch (error) {
      return `❌ Failed to analyze transaction post-conditions: ${error}`;
    }
  },
};

// Generate complete post-condition template
export const generatePostConditionTemplateTool: Tool<undefined, z.ZodObject<{
  transactionType: z.ZodEnum<["token_transfer", "nft_transfer", "marketplace_sale", "defi_swap", "staking", "custom"]>;
  assets: z.ZodArray<z.ZodObject<{
    type: z.ZodEnum<["fungible", "non-fungible", "stx"]>;
    contractAddress: z.ZodOptional<z.ZodString>;
    contractName: z.ZodOptional<z.ZodString>;
    assetName: z.ZodOptional<z.ZodString>;
  }>>;
}>> = {
  name: "generate_post_condition_template",
  description: "Generate a complete post-condition template for common transaction patterns with security best practices.",
  parameters: z.object({
    transactionType: z.enum(["token_transfer", "nft_transfer", "marketplace_sale", "defi_swap", "staking", "custom"]).describe("The type of transaction pattern"),
    assets: z.array(z.object({
      type: z.enum(["fungible", "non-fungible", "stx"]).describe("The asset type"),
      contractAddress: z.string().optional().describe("Contract address for tokens/NFTs"),
      contractName: z.string().optional().describe("Contract name for tokens/NFTs"),
      assetName: z.string().optional().describe("Asset name for tokens/NFTs"),
    })).describe("The assets involved in the transaction"),
  }),
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_post_condition_template" }, context);
      
      const templates: Record<string, string> = {
        token_transfer: `# SIP-010 Token Transfer Template

## Use Case
Transfer fungible tokens between users with mandatory post-conditions.

## Implementation
\`\`\`typescript
import {
  openContractCall,
  PostConditionMode,
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
  createAssetInfo,
  uintCV,
  principalCV,
  noneCV
} from '@stacks/connect';

async function transferTokensWithPostConditions(
  contractAddress: string,
  contractName: string,
  amount: number,
  sender: string,
  recipient: string
) {
  const functionArgs = [
    uintCV(amount),
    principalCV(sender),
    principalCV(recipient),
    noneCV() // memo
  ];

  const postConditions = [
    makeStandardFungiblePostCondition(
      sender,
      FungibleConditionCode.Equal,
      amount,
      createAssetInfo(contractAddress, contractName, contractName)
    ),
  ];

  return await openContractCall({
    contractAddress,
    contractName,
    functionName: 'transfer',
    functionArgs,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
\`\`\``,

        nft_transfer: `# SIP-009 NFT Transfer Template

## Use Case
Transfer NFTs between users with mandatory post-conditions.

## Implementation
\`\`\`typescript
async function transferNFTWithPostConditions(
  contractAddress: string,
  contractName: string,
  tokenId: number,
  sender: string,
  recipient: string
) {
  const functionArgs = [
    uintCV(tokenId),
    principalCV(sender),
    principalCV(recipient)
  ];

  const postConditions = [
    makeStandardNonFungiblePostCondition(
      sender,
      NonFungibleConditionCode.DoesNotOwn,
      createAssetInfo(contractAddress, contractName, contractName),
      uintCV(tokenId)
    ),
  ];

  return await openContractCall({
    contractAddress,
    contractName,
    functionName: 'transfer',
    functionArgs,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
\`\`\``,

        marketplace_sale: `# NFT Marketplace Sale Template

## Use Case
Atomic NFT sale with STX payment and proper post-conditions.

## Implementation
\`\`\`typescript
async function executeNFTSaleWithPostConditions(
  nftContract: string,
  tokenId: number,
  price: number,
  seller: string,
  buyer: string
) {
  const functionArgs = [
    principalCV(nftContract),
    uintCV(tokenId),
    uintCV(price)
  ];

  const postConditions = [
    // Buyer pays STX
    makeStandardSTXPostCondition(
      buyer,
      FungibleConditionCode.Equal,
      price
    ),
    // Seller receives STX (minus fees)
    makeStandardSTXPostCondition(
      seller,
      FungibleConditionCode.Equal,
      Math.floor(price * 0.95) // 5% marketplace fee
    ),
    // Buyer receives NFT
    makeStandardNonFungiblePostCondition(
      buyer,
      NonFungibleConditionCode.Owns,
      createAssetInfo(nftContract, nftContract, nftContract),
      uintCV(tokenId)
    ),
    // Seller loses NFT
    makeStandardNonFungiblePostCondition(
      seller,
      NonFungibleConditionCode.DoesNotOwn,
      createAssetInfo(nftContract, nftContract, nftContract),
      uintCV(tokenId)
    ),
  ];

  return await openContractCall({
    contractAddress: 'MARKETPLACE_CONTRACT',
    contractName: 'marketplace',
    functionName: 'execute-sale',
    functionArgs,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
\`\`\``,

        defi_swap: `# DeFi Token Swap Template

## Use Case
Atomic token swap with post-conditions for both tokens.

## Implementation
\`\`\`typescript
async function swapTokensWithPostConditions(
  tokenAContract: string,
  tokenBContract: string,
  amountA: number,
  expectedAmountB: number,
  slippageTolerance: number,
  userAddress: string
) {
  const minAmountB = Math.floor(expectedAmountB * (1 - slippageTolerance));
  
  const functionArgs = [
    uintCV(amountA),
    uintCV(minAmountB)
  ];

  const postConditions = [
    // User sends token A
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      amountA,
      createAssetInfo(tokenAContract, 'token-a', 'token-a')
    ),
    // User receives at least minimum token B
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.GreaterEqual,
      minAmountB,
      createAssetInfo(tokenBContract, 'token-b', 'token-b')
    ),
  ];

  return await openContractCall({
    contractAddress: 'DEX_CONTRACT',
    contractName: 'dex',
    functionName: 'swap',
    functionArgs,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
\`\`\``,

        staking: `# Token Staking Template

## Use Case
Stake tokens with post-conditions for security.

## Implementation
\`\`\`typescript
async function stakeTokensWithPostConditions(
  tokenContract: string,
  stakingContract: string,
  amount: number,
  userAddress: string
) {
  const functionArgs = [
    uintCV(amount)
  ];

  const postConditions = [
    // User sends tokens to staking contract
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      amount,
      createAssetInfo(tokenContract, 'token', 'token')
    ),
    // User receives staking tokens
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      amount, // 1:1 ratio
      createAssetInfo(stakingContract, 'staking-token', 'staking-token')
    ),
  ];

  return await openContractCall({
    contractAddress: stakingContract,
    contractName: 'staking-pool',
    functionName: 'stake',
    functionArgs,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
\`\`\``,

        custom: `# Custom Transaction Template

## Use Case
Template for custom transactions with multiple assets.

## Implementation
\`\`\`typescript
async function customTransactionWithPostConditions(
  contractAddress: string,
  contractName: string,
  functionName: string,
  functionArgs: any[],
  userAddress: string
) {
  const postConditions = [
    // Add post-conditions based on your specific needs
    ${args.assets.map((asset, index) => {
      if (asset.type === "fungible") {
        return `
    // Fungible token condition ${index + 1}
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      AMOUNT, // Replace with actual amount
      createAssetInfo('${asset.contractAddress || 'CONTRACT_ADDRESS'}', '${asset.contractName || 'CONTRACT_NAME'}', '${asset.assetName || 'ASSET_NAME'}')
    ),`;
      } else if (asset.type === "non-fungible") {
        return `
    // NFT condition ${index + 1}
    makeStandardNonFungiblePostCondition(
      userAddress,
      NonFungibleConditionCode.DoesNotOwn,
      createAssetInfo('${asset.contractAddress || 'CONTRACT_ADDRESS'}', '${asset.contractName || 'CONTRACT_NAME'}', '${asset.assetName || 'ASSET_NAME'}'),
      uintCV(TOKEN_ID) // Replace with actual token ID
    ),`;
      } else if (asset.type === "stx") {
        return `
    // STX condition ${index + 1}
    makeStandardSTXPostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      AMOUNT_IN_MICROSTX // Replace with actual amount
    ),`;
      }
      return "";
    }).join("")}
  ];

  return await openContractCall({
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
\`\`\``,
      };

      return templates[args.transactionType] + `

## Security Checklist
- ✅ Uses PostConditionMode.Deny
- ✅ Includes post-conditions for all asset movements
- ✅ Uses exact amounts where possible
- ✅ Validates transaction behavior
- ✅ Protects against unexpected transfers

## Testing
\`\`\`typescript
// Test post-conditions in your unit tests
describe('Post-condition validation', () => {
  it('should fail when post-conditions are not met', async () => {
    // Simulate transaction with wrong amounts
    // Verify it fails appropriately
  });
});
\`\`\`

## Integration Notes
1. Always show post-conditions to users before signing
2. Validate post-condition parameters before creating them
3. Test edge cases where post-conditions might fail
4. Document expected behavior for each post-condition`;
      
    } catch (error) {
      return `❌ Failed to generate post-condition template: ${error}`;
    }
  },
};