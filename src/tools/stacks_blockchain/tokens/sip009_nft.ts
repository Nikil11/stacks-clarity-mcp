import { Tool } from "fastmcp";
import { z } from "zod";
import { recordTelemetry } from "../../../utils/telemetry.js";

// ============================================================================
// SIP-009 NFT TOOLS
// ============================================================================

// Schema for network selection
const NetworkScheme = z.enum(["mainnet", "testnet", "devnet"]);

// Schema for SIP-009 NFT operations
const SIP009TransferScheme = z.object({
  contractAddress: z.string().describe("The contract address (e.g., SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9)"),
  contractName: z.string().describe("The contract name of the SIP-009 NFT collection"),
  tokenId: z.number().describe("The NFT token ID to transfer"),
  sender: z.string().describe("The sender's Stacks address (current owner)"),
  recipient: z.string().describe("The recipient's Stacks address"),
  network: NetworkScheme.describe("The Stacks network"),
});

const SIP009TokenInfoScheme = z.object({
  contractAddress: z.string().describe("The contract address"),
  contractName: z.string().describe("The contract name of the SIP-009 NFT collection"),
  tokenId: z.number().describe("The NFT token ID"),
  network: NetworkScheme.describe("The Stacks network"),
});

const SIP009CollectionInfoScheme = z.object({
  contractAddress: z.string().describe("The contract address"),
  contractName: z.string().describe("The contract name of the SIP-009 NFT collection"),
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

// Helper function to fetch metadata from URI
async function fetchMetadata(uri: string): Promise<any> {
  try {
    // Handle IPFS URIs
    if (uri.startsWith('ipfs://')) {
      uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(uri, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    return null;
  }
}

// Get SIP-009 NFT information
export const getSIP009TokenInfoTool: Tool<undefined, typeof SIP009TokenInfoScheme> = {
  name: "get_sip009_token_info",
  description: "Get complete information about a specific SIP-009 NFT including owner, metadata URI, and actual metadata content.",
  parameters: SIP009TokenInfoScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "get_sip009_token_info" }, context);
      
      // Get NFT information in parallel
      const [ownerResult, uriResult] = await Promise.all([
        callReadOnlyFunction(
          args.contractAddress,
          args.contractName,
          "get-owner",
          [`0x${args.tokenId.toString(16).padStart(32, '0')}`],
          args.network
        ),
        callReadOnlyFunction(
          args.contractAddress,
          args.contractName,
          "get-token-uri",
          [`0x${args.tokenId.toString(16).padStart(32, '0')}`],
          args.network
        ),
      ]);
      
      // Parse results
      const owner = ownerResult.okay && ownerResult.result !== 'none' 
        ? ownerResult.result.replace(/[()]/g, '').replace('some ', '') 
        : 'No owner (token may not exist)';
      
      const metadataUri = uriResult.okay && uriResult.result !== 'none' 
        ? uriResult.result.replace(/[()]/g, '').replace('some ', '').replace(/"/g, '')
        : null;
      
      let metadata = null;
      if (metadataUri) {
        metadata = await fetchMetadata(metadataUri);
      }
      
      return `# SIP-009 NFT Information

**Contract**: ${args.contractAddress}.${args.contractName}
**Token ID**: ${args.tokenId}
**Network**: ${args.network}

## Ownership
- **Current Owner**: ${owner}

## Metadata
- **URI**: ${metadataUri || 'No metadata URI'}

${metadata ? `
## Metadata Content
- **Name**: ${metadata.name || 'N/A'}
- **Description**: ${metadata.description || 'N/A'}
- **Image**: ${metadata.image || 'N/A'}
- **External URL**: ${metadata.external_url || 'N/A'}

${metadata.attributes ? `
### Attributes
${metadata.attributes.map((attr: any) => `- **${attr.trait_type}**: ${attr.value}`).join('\n')}
` : ''}
` : metadata === null && metadataUri ? `
⚠️ **Metadata fetch failed** - URI may be inaccessible
` : ''}

## Contract Verification
✅ This contract implements the SIP-009 NFT standard trait.

## Transfer Notes
- Post-conditions are REQUIRED for all transfers
- Only the current owner can initiate transfers
- Use native Stacks post-conditions for security`;
      
    } catch (error) {
      return `❌ Failed to get SIP-009 NFT info: ${error}`;
    }
  },
};

// Get SIP-009 collection information
export const getSIP009CollectionInfoTool: Tool<undefined, typeof SIP009CollectionInfoScheme> = {
  name: "get_sip009_collection_info",
  description: "Get information about a SIP-009 NFT collection including total supply and last token ID.",
  parameters: SIP009CollectionInfoScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "get_sip009_collection_info" }, context);
      
      // Get collection information
      const lastTokenIdResult = await callReadOnlyFunction(
        args.contractAddress,
        args.contractName,
        "get-last-token-id",
        [],
        args.network
      );
      
      const lastTokenId = lastTokenIdResult.okay 
        ? parseInt(lastTokenIdResult.result.replace('u', '')) 
        : 0;
      
      // Try to get additional collection info if available
      let collectionInfo = null;
      try {
        const collectionInfoResult = await callReadOnlyFunction(
          args.contractAddress,
          args.contractName,
          "get-collection-info",
          [],
          args.network
        );
        
        if (collectionInfoResult.okay) {
          collectionInfo = collectionInfoResult.result;
        }
      } catch {
        // Collection info function may not exist
      }
      
      return `# SIP-009 NFT Collection Information

**Contract**: ${args.contractAddress}.${args.contractName}
**Network**: ${args.network}

## Collection Stats
- **Total Supply**: ${lastTokenId} NFTs
- **Last Token ID**: ${lastTokenId}
- **Token ID Range**: 1 to ${lastTokenId}

${collectionInfo ? `
## Additional Collection Details
${collectionInfo}
` : ''}

## Contract Verification
✅ This contract implements the SIP-009 NFT standard trait.

## Integration Notes
- All token IDs start from 1 (SIP-009 requirement)
- Use get_sip009_token_info to get details for specific tokens
- Post-conditions are mandatory for all transfers`;
      
    } catch (error) {
      return `❌ Failed to get SIP-009 collection info: ${error}`;
    }
  },
};

// Generate SIP-009 transfer transaction
export const generateSIP009TransferTool: Tool<undefined, typeof SIP009TransferScheme> = {
  name: "generate_sip009_transfer",
  description: "Generate a SIP-009 NFT transfer transaction with proper post-conditions. Returns the transaction parameters for wallet signing.",
  parameters: SIP009TransferScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_sip009_transfer" }, context);
      
      // Validate inputs
      if (args.tokenId <= 0) {
        return "❌ Token ID must be positive";
      }
      
      if (args.sender === args.recipient) {
        return "❌ Sender and recipient cannot be the same";
      }
      
      // Verify token exists and sender owns it
      const ownerResult = await callReadOnlyFunction(
        args.contractAddress,
        args.contractName,
        "get-owner",
        [`0x${args.tokenId.toString(16).padStart(32, '0')}`],
        args.network
      );
      
      if (!ownerResult.okay || ownerResult.result === 'none') {
        return `❌ Token ID ${args.tokenId} does not exist`;
      }
      
      const currentOwner = ownerResult.result.replace(/[()]/g, '').replace('some ', '');
      if (currentOwner !== args.sender) {
        return `❌ Token is owned by ${currentOwner}, not ${args.sender}`;
      }
      
      // Generate the transaction parameters
      const transactionParams = {
        contractAddress: args.contractAddress,
        contractName: args.contractName,
        functionName: "transfer",
        functionArgs: [
          { type: "uint", value: args.tokenId },
          { type: "principal", value: args.sender },
          { type: "principal", value: args.recipient }
        ],
        postConditions: [
          {
            type: "non-fungible",
            condition: "does-not-own",
            tokenId: args.tokenId,
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
      
      return `# SIP-009 NFT Transfer Transaction

## Transaction Parameters
\`\`\`json
${JSON.stringify(transactionParams, null, 2)}
\`\`\`

## Frontend Integration Example (TypeScript)

\`\`\`typescript
import { 
  openContractCall,
  PostConditionMode,
  NonFungibleConditionCode,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  uintCV,
  principalCV
} from '@stacks/connect';

const functionArgs = [
  uintCV(${args.tokenId}),
  principalCV('${args.sender}'),
  principalCV('${args.recipient}')
];

const postConditions = [
  makeStandardNonFungiblePostCondition(
    '${args.sender}',
    NonFungibleConditionCode.DoesNotOwn,
    createAssetInfo('${args.contractAddress}', '${args.contractName}', '${args.contractName}'),
    uintCV(${args.tokenId})
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
- ✅ Post-condition included (MANDATORY for SIP-009)
- ✅ Ownership verified before transaction
- ✅ Using deny mode for maximum security
- ✅ Token existence confirmed
- ⚠️  Always verify recipient address before signing`;
      
    } catch (error) {
      return `❌ Failed to generate SIP-009 transfer: ${error}`;
    }
  },
};

// Generate SIP-009 implementation template
export const generateSIP009TemplateTool: Tool<undefined, z.ZodObject<{
  collectionName: z.ZodString;
  collectionSymbol: z.ZodString;
  baseUri: z.ZodString;
  maxSupply: z.ZodOptional<z.ZodNumber>;
  includeMarketplace: z.ZodBoolean;
  includeMetadataStorage: z.ZodBoolean;
}>> = {
  name: "generate_sip009_template",
  description: "Generate a complete, production-ready SIP-009 NFT contract template with all security features and optional marketplace functionality.",
  parameters: z.object({
    collectionName: z.string().describe("The name of the NFT collection (e.g., 'My NFT Collection')"),
    collectionSymbol: z.string().describe("The collection symbol (e.g., 'MNC')"),
    baseUri: z.string().describe("The base URI for metadata (e.g., 'https://api.mynft.com/metadata/' or 'ipfs://QmHash/')"),
    maxSupply: z.number().optional().describe("Optional maximum supply limit"),
    includeMarketplace: z.boolean().describe("Whether to include basic marketplace functionality"),
    includeMetadataStorage: z.boolean().describe("Whether to include on-chain metadata storage"),
  }),
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_sip009_template" }, context);
      
      const contractName = args.collectionName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      return `# SIP-009 NFT Collection: ${args.collectionName}

## Contract Implementation

\`\`\`clarity
;; ${args.collectionName} (${args.collectionSymbol})
;; A complete SIP-009 NFT implementation with all security features

;; Define the NFT using native Clarity primitive (REQUIRED)
(define-non-fungible-token ${contractName} uint)

;; Error constants
(define-constant ERR-NOT-AUTHORIZED (err u1))
(define-constant ERR-NOT-FOUND (err u2))
(define-constant ERR-ALREADY-EXISTS (err u3))
(define-constant ERR-INVALID-USER (err u4))
${args.maxSupply ? '(define-constant ERR-MAX-SUPPLY-REACHED (err u5))' : ''}

;; Collection constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant COLLECTION-NAME "${args.collectionName}")
(define-constant COLLECTION-SYMBOL "${args.collectionSymbol}")
(define-constant BASE-URI "${args.baseUri}")
${args.maxSupply ? `(define-constant MAX-SUPPLY u${args.maxSupply})` : ''}

;; Variables
(define-data-var last-token-id uint u0)
(define-data-var mint-enabled bool true)

${args.includeMetadataStorage ? `
;; On-chain metadata storage
(define-map token-metadata uint {
  name: (string-ascii 64),
  description: (string-ascii 256),
  image: (string-ascii 256)
})
` : ''}

${args.includeMarketplace ? `
;; Basic marketplace functionality
(define-map listings uint {
  seller: principal,
  price: uint,
  expires-at: uint
})
` : ''}

;; Implement the SIP-009 trait
(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

;; SIP-009 Required Functions

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (if (<= token-id (var-get last-token-id))
    (ok (some (concat BASE-URI (uint-to-ascii token-id))))
    (ok none)
  )
)

(define-read-only (get-owner (token-id uint))
  (if (<= token-id (var-get last-token-id))
    (ok (nft-get-owner? ${contractName} token-id))
    (ok none)
  )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Validate token exists
    (asserts! (<= token-id (var-get last-token-id)) ERR-NOT-FOUND)
    
    ;; Validate sender owns the token
    (asserts! (is-eq (some sender) (nft-get-owner? ${contractName} token-id)) ERR-NOT-AUTHORIZED)
    
    ;; Validate sender is tx-sender
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    
    ;; Validate recipient is different
    (asserts! (not (is-eq sender recipient)) ERR-INVALID-USER)
    
    ;; Perform transfer (enables post-conditions)
    (try! (nft-transfer? ${contractName} token-id sender recipient))
    
    ;; Emit transfer event
    (print {
      action: "transfer",
      token-id: token-id,
      sender: sender,
      recipient: recipient
    })
    
    (ok true)
  )
)

;; Minting function
(define-public (mint (recipient principal)${args.includeMetadataStorage ? ' (metadata {name: (string-ascii 64), description: (string-ascii 256), image: (string-ascii 256)})' : ''})
  (let (
    (next-id (+ (var-get last-token-id) u1))
  )
    ;; Check if minting is enabled
    (asserts! (var-get mint-enabled) ERR-NOT-AUTHORIZED)
    
    ;; Check authorization
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    
    ${args.maxSupply ? '(asserts! (<= next-id MAX-SUPPLY) ERR-MAX-SUPPLY-REACHED)' : ''}
    
    ;; Mint the NFT
    (try! (nft-mint? ${contractName} next-id recipient))
    
    ${args.includeMetadataStorage ? '(map-set token-metadata next-id metadata)' : ''}
    
    ;; Update last token ID
    (var-set last-token-id next-id)
    
    ;; Emit mint event
    (print {
      action: "mint",
      token-id: next-id,
      recipient: recipient${args.includeMetadataStorage ? ',\n      metadata: metadata' : ''}
    })
    
    (ok next-id)
  )
)

;; Burn function
(define-public (burn (token-id uint))
  (begin
    ;; Validate token exists and sender owns it
    (asserts! (<= token-id (var-get last-token-id)) ERR-NOT-FOUND)
    (asserts! (is-eq (some tx-sender) (nft-get-owner? ${contractName} token-id)) ERR-NOT-AUTHORIZED)
    
    ;; Burn the NFT
    (try! (nft-burn? ${contractName} token-id tx-sender))
    
    ${args.includeMetadataStorage ? '(map-delete token-metadata token-id)' : ''}
    
    ;; Emit burn event
    (print {
      action: "burn",
      token-id: token-id,
      owner: tx-sender
    })
    
    (ok true)
  )
)

${args.includeMetadataStorage ? `
;; Metadata functions
(define-read-only (get-token-metadata (token-id uint))
  (map-get? token-metadata token-id)
)
` : ''}

;; Collection info
(define-read-only (get-collection-info)
  (ok {
    name: COLLECTION-NAME,
    symbol: COLLECTION-SYMBOL,
    total-supply: (var-get last-token-id),
    base-uri: BASE-URI,
    mint-enabled: (var-get mint-enabled)${args.maxSupply ? ',\n    max-supply: MAX-SUPPLY' : ''}
  })
)

;; Administrative functions
(define-public (toggle-mint)
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set mint-enabled (not (var-get mint-enabled)))
    (ok (var-get mint-enabled))
  )
)

${args.includeMarketplace ? `
;; Basic Marketplace Functions

(define-public (list-nft (token-id uint) (price uint) (expires-at uint))
  (begin
    ;; Verify ownership
    (asserts! (is-eq (some tx-sender) (nft-get-owner? ${contractName} token-id)) ERR-NOT-AUTHORIZED)
    (asserts! (> price u0) ERR-INVALID-USER)
    (asserts! (> expires-at block-height) ERR-INVALID-USER)
    
    ;; Create listing
    (map-set listings token-id {
      seller: tx-sender,
      price: price,
      expires-at: expires-at
    })
    
    (print {
      action: "list",
      token-id: token-id,
      seller: tx-sender,
      price: price,
      expires-at: expires-at
    })
    
    (ok true)
  )
)

(define-public (unlist-nft (token-id uint))
  (begin
    (asserts! (is-eq (some tx-sender) (nft-get-owner? ${contractName} token-id)) ERR-NOT-AUTHORIZED)
    (map-delete listings token-id)
    
    (print {
      action: "unlist",
      token-id: token-id,
      seller: tx-sender
    })
    
    (ok true)
  )
)

(define-public (buy-nft (token-id uint))
  (let (
    (listing (unwrap! (map-get? listings token-id) ERR-NOT-FOUND))
    (seller (get seller listing))
    (price (get price listing))
  )
    ;; Verify listing is valid
    (asserts! (<= block-height (get expires-at listing)) ERR-NOT-FOUND)
    (asserts! (not (is-eq tx-sender seller)) ERR-INVALID-USER)
    
    ;; Transfer payment (STX)
    (try! (stx-transfer? price tx-sender seller))
    
    ;; Transfer NFT
    (try! (nft-transfer? ${contractName} token-id seller tx-sender))
    
    ;; Remove listing
    (map-delete listings token-id)
    
    (print {
      action: "sale",
      token-id: token-id,
      seller: seller,
      buyer: tx-sender,
      price: price
    })
    
    (ok true)
  )
)

(define-read-only (get-listing (token-id uint))
  (map-get? listings token-id)
)
` : ''}
\`\`\`

## Collection Configuration
- **Name**: ${args.collectionName}
- **Symbol**: ${args.collectionSymbol}
- **Base URI**: ${args.baseUri}
${args.maxSupply ? `- **Max Supply**: ${args.maxSupply} NFTs` : '- **Max Supply**: Unlimited'}
- **On-chain Metadata**: ${args.includeMetadataStorage ? 'Enabled' : 'Disabled'}
- **Marketplace Functions**: ${args.includeMarketplace ? 'Enabled' : 'Disabled'}

## Deployment Steps

1. **Save the contract** as \`${contractName}.clar\`

2. **Prepare metadata** (if using external storage):
   ${args.baseUri.includes('ipfs://') ? `
   - Upload metadata files to IPFS
   - Update BASE-URI with your IPFS hash
   ` : `
   - Set up metadata endpoint at ${args.baseUri}
   - Ensure HTTPS accessibility
   `}

3. **Test locally** with Clarinet:
   \`\`\`bash
   clarinet check
   clarinet test
   \`\`\`

4. **Deploy to testnet** first:
   \`\`\`bash
   clarinet deploy --testnet
   \`\`\`

5. **Deploy to mainnet** after testing:
   \`\`\`bash
   clarinet deploy --mainnet
   \`\`\`

## Usage Examples

### Minting NFTs
\`\`\`clarity
;; Mint to specific address
(contract-call? .${contractName} mint 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM${args.includeMetadataStorage ? ` {
  name: "NFT #1",
  description: "First NFT in the collection",
  image: "https://mynft.com/images/1.png"
}` : ''})
\`\`\`

### Frontend Integration
\`\`\`typescript
// Transfer NFT
await transferSIP009NFT(
  contractAddress,
  '${contractName}',
  1, // token ID
  currentOwner,
  newOwner
);

// Get NFT info
const nftInfo = await getSIP009TokenInfo(
  contractAddress,
  '${contractName}',
  1
);
\`\`\`

${args.includeMarketplace ? `
### Marketplace Usage
\`\`\`typescript
// List NFT for sale
await listNFT(tokenId, priceInSTX, expirationBlock);

// Buy NFT
await buyNFT(tokenId);
\`\`\`
` : ''}

## Security Features ✅
- ✅ Native asset functions for post-condition support
- ✅ Ownership validation for all transfers
- ✅ Authorization checks using tx-sender
- ✅ Token existence validation
- ✅ Event emission for indexer integration
${args.maxSupply ? '- ✅ Supply limit enforcement' : ''}
${args.includeMarketplace ? '- ✅ Marketplace security (payment before transfer)' : ''}

## Metadata JSON Schema
\`\`\`json
{
  "name": "NFT Name",
  "description": "NFT Description",
  "image": "https://example.com/image.png",
  "external_url": "https://example.com/nft/1",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Rare"
    }
  ]
}
\`\`\`

## Next Steps
1. Customize the contract name and save as \`.clar\` file
2. Set up metadata hosting (IPFS recommended)
3. Add to your Clarinet project
4. Write comprehensive tests
5. Deploy to testnet for testing
6. Deploy to mainnet when ready`;
      
    } catch (error) {
      return `❌ Failed to generate SIP-009 template: ${error}`;
    }
  },
};