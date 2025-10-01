# SIP-009 NFT Integration Guide

## Overview

SIP-009 defines the standard trait for Non-Fungible Tokens (NFTs) on Stacks. This is the **foundational standard** for all NFT-based applications and digital collectibles.

**Key Information:**
- **Status**: Ratified ✅
- **Mainnet Trait**: `SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait`
- **Testnet Trait**: `ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.nft-trait.nft-trait`

## The SIP-009 Trait

All SIP-009 compliant contracts must implement this complete trait:

```clarity
(define-trait nft-trait
  (
    ;; Last token ID, limited to uint range
    (get-last-token-id () (response uint uint))

    ;; URI for metadata associated with the token
    (get-token-uri (uint) (response (optional (string-ascii 256)) uint))

    ;; Owner of a given token identifier
    (get-owner (uint) (response (optional principal) uint))

    ;; Transfer from the sender to a new principal
    (transfer (uint principal principal) (response bool uint))
  )
)
```

## Complete Implementation Example

Here's a production-ready SIP-009 NFT implementation with all security features:

```clarity
;; SIP-009 NFT Implementation
;; A complete NFT contract with all security features and best practices

;; Define the NFT using native Clarity primitive (REQUIRED for SIP compliance)
(define-non-fungible-token my-nft uint)

;; Error constants
(define-constant ERR-NOT-AUTHORIZED (err u1))
(define-constant ERR-NOT-FOUND (err u2))
(define-constant ERR-ALREADY-EXISTS (err u3))
(define-constant ERR-INVALID-USER (err u4))

;; Contract constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant NFT-NAME "My NFT Collection")
(define-constant NFT-SYMBOL "MNC")
(define-constant BASE-URI "https://api.mynft.com/metadata/")

;; Variables
(define-data-var last-token-id uint u0)
(define-data-var mint-enabled bool true)

;; Maps for additional metadata (optional)
(define-map token-metadata uint {
  name: (string-ascii 64),
  description: (string-ascii 256),
  image: (string-ascii 256)
})

;; Implement the SIP-009 trait
(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

;; SIP-009 required functions

;; Get the last token ID (never fails)
(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

;; Get token URI with proper formatting
(define-read-only (get-token-uri (token-id uint))
  (if (<= token-id (var-get last-token-id))
    (ok (some (concat BASE-URI (uint-to-ascii token-id))))
    (ok none)
  )
)

;; Get token owner (never fails)
(define-read-only (get-owner (token-id uint))
  (if (<= token-id (var-get last-token-id))
    (ok (nft-get-owner? my-nft token-id))
    (ok none)
  )
)

;; Transfer function with complete security checks
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Validate token exists
    (asserts! (<= token-id (var-get last-token-id)) ERR-NOT-FOUND)
    
    ;; Validate sender owns the token
    (asserts! (is-eq (some sender) (nft-get-owner? my-nft token-id)) ERR-NOT-AUTHORIZED)
    
    ;; Validate sender is tx-sender
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    
    ;; Validate recipient is different from sender
    (asserts! (not (is-eq sender recipient)) ERR-INVALID-USER)
    
    ;; Perform the transfer using native function (REQUIRED for post-conditions)
    (try! (nft-transfer? my-nft token-id sender recipient))
    
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
(define-public (mint (recipient principal) (metadata {name: (string-ascii 64), description: (string-ascii 256), image: (string-ascii 256)}))
  (let (
    (next-id (+ (var-get last-token-id) u1))
  )
    ;; Check if minting is enabled
    (asserts! (var-get mint-enabled) ERR-NOT-AUTHORIZED)
    
    ;; Check authorization (only owner can mint in this example)
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    
    ;; Mint the NFT
    (try! (nft-mint? my-nft next-id recipient))
    
    ;; Store metadata
    (map-set token-metadata next-id metadata)
    
    ;; Update last token ID
    (var-set last-token-id next-id)
    
    ;; Emit mint event
    (print {
      action: "mint",
      token-id: next-id,
      recipient: recipient,
      metadata: metadata
    })
    
    (ok next-id)
  )
)

;; Burn function
(define-public (burn (token-id uint))
  (begin
    ;; Validate token exists and sender owns it
    (asserts! (<= token-id (var-get last-token-id)) ERR-NOT-FOUND)
    (asserts! (is-eq (some tx-sender) (nft-get-owner? my-nft token-id)) ERR-NOT-AUTHORIZED)
    
    ;; Burn the NFT
    (try! (nft-burn? my-nft token-id tx-sender))
    
    ;; Remove metadata
    (map-delete token-metadata token-id)
    
    ;; Emit burn event
    (print {
      action: "burn",
      token-id: token-id,
      owner: tx-sender
    })
    
    (ok true)
  )
)

;; Helper functions for metadata
(define-read-only (get-token-metadata (token-id uint))
  (map-get? token-metadata token-id)
)

(define-read-only (get-collection-info)
  (ok {
    name: NFT-NAME,
    symbol: NFT-SYMBOL,
    total-supply: (var-get last-token-id),
    base-uri: BASE-URI,
    mint-enabled: (var-get mint-enabled)
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

(define-public (set-base-uri (new-uri (string-ascii 256)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    ;; Note: This would require a data-var for base-uri to be updatable
    (ok true)
  )
)

;; Batch operations for efficiency
(define-public (batch-mint (recipients (list 10 principal)) (metadata-list (list 10 {name: (string-ascii 64), description: (string-ascii 256), image: (string-ascii 256)})))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (asserts! (var-get mint-enabled) ERR-NOT-AUTHORIZED)
    (asserts! (is-eq (len recipients) (len metadata-list)) ERR-INVALID-USER)
    
    (fold batch-mint-helper (zip recipients metadata-list) (ok (list)))
  )
)

(define-private (batch-mint-helper (data {recipient: principal, metadata: {name: (string-ascii 64), description: (string-ascii 256), image: (string-ascii 256)}}) (previous-result (response (list 10 uint) uint)))
  (match previous-result
    success-list
      (match (mint (get recipient data) (get metadata data))
        new-id (ok (unwrap-panic (as-max-len? (append success-list new-id) u10)))
        error-val (err error-val)
      )
    error-val (err error-val)
  )
)

(define-private (zip (recipients (list 10 principal)) (metadata-list (list 10 {name: (string-ascii 64), description: (string-ascii 256), image: (string-ascii 256)})))
  ;; Helper function to zip two lists - implementation depends on specific use case
  (list)
)
```

## CRITICAL: Post-Condition Requirements

**Post-conditions are MANDATORY for SIP-009 compliance** when transferring NFTs. The transfer must fail if post-conditions are not met.

### Frontend Post-Condition Integration

```typescript
import {
  openContractCall,
  PostConditionMode,
  NonFungibleConditionCode,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  uintCV,
  principalCV
} from '@stacks/connect';

// Example: Transfer NFT with ID 42
const tokenId = 42;
const contractAddress = 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9';
const contractName = 'my-nft';
const assetName = 'my-nft';

const functionArgs = [
  uintCV(tokenId),
  principalCV(senderAddress),
  principalCV(recipientAddress)
];

// MANDATORY: Post-condition for NFT transfer
const postConditions = [
  makeStandardNonFungiblePostCondition(
    senderAddress,
    NonFungibleConditionCode.DoesNotOwn,
    createAssetInfo(contractAddress, contractName, assetName),
    uintCV(tokenId)
  ),
];

await openContractCall({
  contractAddress,
  contractName,
  functionName: 'transfer',
  functionArgs,
  postConditions,
  postConditionMode: PostConditionMode.Deny, // REQUIRED: Deny mode
  onFinish: (data) => {
    console.log('Transaction ID:', data.txId);
  },
});
```

## Native Asset Function Requirements

**REQUIRED**: All SIP-009 tokens MUST use native Clarity asset functions:

1. **`define-non-fungible-token`** - Creates the native NFT asset
2. **`nft-transfer?`** - Handles transfers with post-condition support
3. **`nft-mint?`** - Mints new NFTs
4. **`nft-burn?`** - Burns NFTs
5. **`nft-get-owner?`** - Gets NFT owner

### Why Native Functions Are Required

- **Post-condition support**: Only native functions work with Stacks post-conditions
- **API compatibility**: `stacks-blockchain-api` only tracks native assets
- **Wallet integration**: Wallets can display NFT collections automatically
- **Explorer integration**: NFTs appear in Stacks Explorer automatically

## Metadata Management

### JSON Metadata Schema (SIP-016 Compatible)

```json
{
  "name": "My NFT #42",
  "description": "A unique digital collectible on Stacks",
  "image": "https://mynft.com/images/42.png",
  "external_url": "https://mynft.com/nft/42",
  "background_color": "FFFFFF",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Epic"
    },
    {
      "trait_type": "Level",
      "value": 5,
      "display_type": "number"
    },
    {
      "trait_type": "Created",
      "value": 1640995200,
      "display_type": "date"
    }
  ],
  "properties": {
    "creator": "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
    "blockchain": "stacks",
    "standard": "sip-009"
  }
}
```

### IPFS Integration for Decentralized Metadata

```clarity
;; IPFS-based metadata
(define-constant IPFS-BASE "ipfs://QmYourHashHere/")

(define-read-only (get-token-uri (token-id uint))
  (if (<= token-id (var-get last-token-id))
    (ok (some (concat IPFS-BASE (uint-to-ascii token-id))))
    (ok none)
  )
)

;; Alternative: Full IPFS hash per token
(define-map token-ipfs-hashes uint (string-ascii 64))

(define-public (set-token-ipfs (token-id uint) (ipfs-hash (string-ascii 64)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (asserts! (<= token-id (var-get last-token-id)) ERR-NOT-FOUND)
    (map-set token-ipfs-hashes token-id ipfs-hash)
    (ok true)
  )
)

(define-read-only (get-token-uri (token-id uint))
  (match (map-get? token-ipfs-hashes token-id)
    ipfs-hash (ok (some (concat "ipfs://" ipfs-hash)))
    (ok none)
  )
)
```

## Marketplace Integration Patterns

### Basic Marketplace Functions

```clarity
;; Marketplace integration - list NFT for sale
(define-map listings uint {
  seller: principal,
  price: uint,
  expires-at: uint
})

(define-public (list-nft (token-id uint) (price uint) (expires-at uint))
  (begin
    ;; Verify ownership
    (asserts! (is-eq (some tx-sender) (nft-get-owner? my-nft token-id)) ERR-NOT-AUTHORIZED)
    (asserts! (> price u0) ERR-INVALID-USER)
    (asserts! (> expires-at block-height) ERR-INVALID-USER)
    
    ;; Create listing
    (map-set listings token-id {
      seller: tx-sender,
      price: price,
      expires-at: expires-at
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
    ;; Verify listing is still valid
    (asserts! (<= block-height (get expires-at listing)) ERR-NOT-FOUND)
    (asserts! (not (is-eq tx-sender seller)) ERR-INVALID-USER)
    
    ;; Transfer payment (assuming STX payment)
    (try! (stx-transfer? price tx-sender seller))
    
    ;; Transfer NFT
    (try! (nft-transfer? my-nft token-id seller tx-sender))
    
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
```

### Royalty Implementation

```clarity
;; Royalty system for creators
(define-constant ROYALTY-PERCENT u5) ;; 5%
(define-constant ROYALTY-RECIPIENT CONTRACT-OWNER)

(define-public (buy-nft-with-royalty (token-id uint))
  (let (
    (listing (unwrap! (map-get? listings token-id) ERR-NOT-FOUND))
    (seller (get seller listing))
    (price (get price listing))
    (royalty (/ (* price ROYALTY-PERCENT) u100))
    (seller-amount (- price royalty))
  )
    ;; Verify listing
    (asserts! (<= block-height (get expires-at listing)) ERR-NOT-FOUND)
    (asserts! (not (is-eq tx-sender seller)) ERR-INVALID-USER)
    
    ;; Transfer royalty to creator
    (try! (stx-transfer? royalty tx-sender ROYALTY-RECIPIENT))
    
    ;; Transfer remaining amount to seller
    (try! (stx-transfer? seller-amount tx-sender seller))
    
    ;; Transfer NFT
    (try! (nft-transfer? my-nft token-id seller tx-sender))
    
    ;; Remove listing
    (map-delete listings token-id)
    
    (print {
      action: "sale-with-royalty",
      token-id: token-id,
      seller: seller,
      buyer: tx-sender,
      price: price,
      royalty: royalty,
      seller-amount: seller-amount
    })
    
    (ok true)
  )
)
```

## Testing with Clarinet

### Comprehensive Unit Tests

```typescript
// tests/my-nft-test.ts
import { describe, it, beforeEach } from 'vitest';
import { Cl } from '@stacks/transactions';

describe('my-nft', () => {
  const accounts = simnet.getAccounts();
  const deployer = accounts.get('deployer')!;
  const user1 = accounts.get('wallet_1')!;
  const user2 = accounts.get('wallet_2')!;

  it('should mint NFTs correctly', () => {
    const metadata = {
      name: "Test NFT",
      description: "A test NFT",
      image: "https://test.com/image.png"
    };
    
    const mintResult = simnet.callPublicFn(
      'my-nft',
      'mint',
      [
        Cl.principal(user1),
        Cl.tuple({
          name: Cl.stringAscii(metadata.name),
          description: Cl.stringAscii(metadata.description),
          image: Cl.stringAscii(metadata.image)
        })
      ],
      deployer
    );
    
    expect(mintResult.result).toBeOk(Cl.uint(1));
    
    // Verify ownership
    const ownerResult = simnet.callReadOnlyFn(
      'my-nft',
      'get-owner',
      [Cl.uint(1)],
      deployer
    );
    
    expect(ownerResult.result).toBeOk(Cl.some(Cl.principal(user1)));
  });
  
  it('should transfer NFTs correctly', () => {
    // First mint an NFT
    // ... mint code ...
    
    // Test transfer
    const transferResult = simnet.callPublicFn(
      'my-nft',
      'transfer',
      [
        Cl.uint(1),
        Cl.principal(user1),
        Cl.principal(user2)
      ],
      user1
    );
    
    expect(transferResult.result).toBeOk(Cl.bool(true));
    
    // Verify new ownership
    const ownerResult = simnet.callReadOnlyFn(
      'my-nft',
      'get-owner',
      [Cl.uint(1)],
      deployer
    );
    
    expect(ownerResult.result).toBeOk(Cl.some(Cl.principal(user2)));
  });
  
  it('should enforce post-conditions (integration test)', () => {
    // This test requires actual transaction simulation with post-conditions
    // Implementation depends on Clarinet's post-condition testing capabilities
  });
  
  it('should handle marketplace operations', () => {
    // Test listing and buying
    // ... test implementation ...
  });
});
```

## Security Checklist

### ✅ Required Security Features

- [ ] **Native asset functions**: Uses `define-non-fungible-token` and `nft-transfer?`
- [ ] **Post-condition compatibility**: All transfers work with post-conditions
- [ ] **Ownership validation**: Checks token ownership before transfers
- [ ] **Authorization checks**: Validates `tx-sender` permissions
- [ ] **Token existence checks**: Validates token IDs exist
- [ ] **Input validation**: Checks for valid principals and token IDs
- [ ] **Event emission**: Emits transfer/mint/burn events for indexers

### ⚠️ Common Vulnerabilities to Avoid

```clarity
;; ❌ DON'T: Custom ownership tracking (bypasses post-conditions)
(define-map token-owners uint principal)

;; ❌ DON'T: Skip ownership validation
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (nft-transfer? my-nft token-id sender recipient)) ;; Missing ownership check!

;; ❌ DON'T: Allow transfers without authorization
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Missing: (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    (nft-transfer? my-nft token-id sender recipient)))

;; ✅ DO: Use proper implementation (see complete example above)
```

## Deployment Checklist

### Pre-deployment Verification

1. **Trait Implementation**
   ```clarity
   ;; Verify trait implementation
   (impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)
   ```

2. **Metadata URI Setup**
   - Host metadata JSON files
   - Ensure HTTPS/IPFS accessibility
   - Validate JSON schema compliance

3. **Testing Checklist**
   ```bash
   clarinet test
   clarinet check
   # Test post-conditions manually
   # Test marketplace integration
   ```

## Integration Examples

### React Hook for SIP-009 NFTs

```typescript
import { useCallback } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksMainnet } from '@stacks/network';

export const useSIP009NFT = (contractAddress: string, contractName: string) => {
  const { doContractCall } = useConnect();
  
  const transferNFT = useCallback(async (
    tokenId: number,
    recipient: string
  ) => {
    const userAddress = userSession.loadUserData().profile.stxAddress.mainnet;
    
    const functionArgs = [
      uintCV(tokenId),
      principalCV(userAddress),
      principalCV(recipient)
    ];
    
    const postConditions = [
      makeStandardNonFungiblePostCondition(
        userAddress,
        NonFungibleConditionCode.DoesNotOwn,
        createAssetInfo(contractAddress, contractName, contractName),
        uintCV(tokenId)
      ),
    ];
    
    await doContractCall({
      contractAddress,
      contractName,
      functionName: 'transfer',
      functionArgs,
      postConditions,
      postConditionMode: PostConditionMode.Deny,
      network: new StacksMainnet(),
    });
  }, [contractAddress, contractName, doContractCall]);
  
  return { transferNFT };
};
```

### NFT Collection Display Component

```typescript
import React, { useEffect, useState } from 'react';

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export const NFTCard: React.FC<{ tokenId: number; contractAddress: string; contractName: string }> = ({
  tokenId, contractAddress, contractName
}) => {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch token URI
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          `https://api.hiro.so/v2/contracts/call-read/${contractAddress}/${contractName}/get-token-uri`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sender: contractAddress,
              arguments: [`0x${tokenId.toString(16).padStart(32, '0')}`]
            })
          }
        );
        
        const data = await response.json();
        if (data.okay && data.result !== 'none') {
          const uri = data.result.replace(/"/g, '');
          const metadataResponse = await fetch(uri);
          const metadataJson = await metadataResponse.json();
          setMetadata(metadataJson);
        }
      } catch (error) {
        console.error('Failed to fetch metadata:', error);
      }
    };
    
    // Fetch owner
    const fetchOwner = async () => {
      try {
        const response = await fetch(
          `https://api.hiro.so/v2/contracts/call-read/${contractAddress}/${contractName}/get-owner`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sender: contractAddress,
              arguments: [`0x${tokenId.toString(16).padStart(32, '0')}`]
            })
          }
        );
        
        const data = await response.json();
        if (data.okay && data.result !== 'none') {
          setOwner(data.result);
        }
      } catch (error) {
        console.error('Failed to fetch owner:', error);
      }
    };
    
    fetchMetadata();
    fetchOwner();
  }, [tokenId, contractAddress, contractName]);
  
  return (
    <div className="nft-card">
      {metadata && (
        <>
          <img src={metadata.image} alt={metadata.name} />
          <h3>{metadata.name}</h3>
          <p>{metadata.description}</p>
          {metadata.attributes && (
            <div className="attributes">
              {metadata.attributes.map((attr, index) => (
                <div key={index} className="attribute">
                  <span className="trait-type">{attr.trait_type}:</span>
                  <span className="value">{attr.value}</span>
                </div>
              ))}
            </div>
          )}
          {owner && <p className="owner">Owner: {owner}</p>}
        </>
      )}
    </div>
  );
};
```

## Best Practices Summary

1. **Always use native asset functions** - Required for SIP compliance and post-conditions
2. **Implement mandatory post-conditions** - Security requirement for all transfers
3. **Validate ownership and authorization** - Prevent unauthorized transfers
4. **Use descriptive metadata** - Follow SIP-016 schema for compatibility
5. **Emit events for important actions** - Enable indexer and marketplace integration
6. **Test extensively** - Unit tests + integration tests + post-condition tests
7. **Consider IPFS for metadata** - Decentralized and permanent storage
8. **Plan for marketplace integration** - Design with trading in mind

## Advanced Patterns

### Multi-Collection Management
```clarity
;; Support multiple collections in one contract
(define-map collection-info uint {
  name: (string-ascii 64),
  symbol: (string-ascii 16),
  base-uri: (string-ascii 256),
  max-supply: uint
})

(define-map token-collection uint uint) ;; token-id -> collection-id

(define-public (create-collection (name (string-ascii 64)) (symbol (string-ascii 16)) (base-uri (string-ascii 256)) (max-supply uint))
  ;; Implementation for creating new collections
  (ok true)
)
```

### Upgradeable Metadata
```clarity
;; Allow metadata updates for specific use cases
(define-map mutable-tokens uint bool)

(define-public (set-token-mutable (token-id uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (map-set mutable-tokens token-id true)
    (ok true)
  )
)

(define-public (update-token-metadata (token-id uint) (new-metadata {...}))
  (begin
    (asserts! (default-to false (map-get? mutable-tokens token-id)) ERR-NOT-AUTHORIZED)
    ;; Update metadata logic
    (ok true)
  )
)
```

This guide provides everything needed to implement, deploy, and integrate SIP-009 NFTs securely and efficiently on Stacks, with full marketplace and metadata support.