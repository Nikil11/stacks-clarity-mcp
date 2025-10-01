# Native Asset Integration in Clarity

## Overview

Native asset functions are **REQUIRED** for SIP-009 and SIP-010 compliance. They provide built-in support for post-conditions, automatic API recognition, and wallet integration. This guide covers the complete integration of native asset functions in Clarity contracts.

**Critical Understanding:**
- Native functions enable post-conditions (security requirement)
- They integrate with Stacks blockchain API automatically
- Wallets can display balances without custom integration
- They provide overflow/underflow protection built-in

## Native Fungible Token Functions

### 1. `define-fungible-token`

**Purpose**: Creates a native fungible token asset class.

```clarity
;; REQUIRED: Must be called at contract initialization
(define-fungible-token my-token)

;; With optional total supply limit
(define-fungible-token limited-token u1000000)
```

**Requirements:**
- Must be called at the top level (not inside functions)
- Token name must be valid Clarity identifier (kebab-case)
- Optional total supply must be positive uint
- Only one token per contract (design pattern)

### 2. `ft-mint?`

**Purpose**: Mint new tokens to a principal.

```clarity
(define-public (mint (amount uint) (recipient principal))
  (begin
    ;; Authorization check
    (asserts! (is-eq tx-sender contract-owner) (err u1))
    
    ;; Validate amount
    (asserts! (> amount u0) (err u2))
    
    ;; Mint tokens - native function with built-in safety
    (try! (ft-mint? my-token amount recipient))
    
    ;; Emit event
    (print {
      action: "mint",
      amount: amount,
      recipient: recipient
    })
    
    (ok amount)
  )
)
```

**Security Features:**
- ✅ Automatic overflow protection
- ✅ Supply limit enforcement (if defined)
- ✅ Post-condition compatibility
- ✅ Atomic operation

### 3. `ft-transfer?`

**Purpose**: Transfer tokens between principals (REQUIRED for SIP-010).

```clarity
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    ;; Validation
    (asserts! (> amount u0) (err u3))
    (asserts! (is-eq tx-sender sender) (err u4))
    (asserts! (not (is-eq sender recipient)) (err u2))
    
    ;; Native transfer - enables post-conditions
    (try! (ft-transfer? my-token amount sender recipient))
    
    ;; Handle memo (REQUIRED for Stacks 2.0 compatibility)
    (match memo to-print (print to-print) 0x)
    
    (ok true)
  )
)
```

**Critical Features:**
- **Post-condition compatibility**: Only native functions work with post-conditions
- **API integration**: Transfers appear in blockchain API automatically
- **Wallet support**: Balance updates appear in wallets
- **Atomic safety**: Cannot partially fail

### 4. `ft-burn?`

**Purpose**: Burn (destroy) tokens permanently.

```clarity
(define-public (burn (amount uint))
  (begin
    (asserts! (> amount u0) (err u3))
    
    ;; Burn from tx-sender
    (try! (ft-burn? my-token amount tx-sender))
    
    (print {
      action: "burn",
      amount: amount,
      owner: tx-sender
    })
    
    (ok amount)
  )
)
```

### 5. `ft-get-balance`

**Purpose**: Get token balance for a principal (read-only).

```clarity
(define-read-only (get-balance (account principal))
  (ok (ft-get-balance my-token account))
)

;; Usage in other functions
(define-public (transfer-half (recipient principal))
  (let (
    (current-balance (ft-get-balance my-token tx-sender))
    (transfer-amount (/ current-balance u2))
  )
    (try! (ft-transfer? my-token transfer-amount tx-sender recipient))
    (ok transfer-amount)
  )
)
```

### 6. `ft-get-supply`

**Purpose**: Get total circulating supply (read-only).

```clarity
(define-read-only (get-total-supply)
  (ok (ft-get-supply my-token))
)

;; Usage with supply checks
(define-public (mint-with-limit (amount uint) (recipient principal))
  (let (
    (current-supply (ft-get-supply my-token))
    (max-supply u1000000)
  )
    (asserts! (<= (+ current-supply amount) max-supply) (err u5))
    (try! (ft-mint? my-token amount recipient))
    (ok amount)
  )
)
```

## Native Non-Fungible Token Functions

### 1. `define-non-fungible-token`

**Purpose**: Creates a native NFT asset class.

```clarity
;; REQUIRED: Must be called at contract initialization
(define-non-fungible-token my-nft uint)

;; For different token ID types
(define-non-fungible-token string-id-nft (string-ascii 32))
(define-non-fungible-token tuple-id-nft {series: uint, number: uint})
```

**Design Patterns:**
- `uint` IDs: Most common, sequential numbering (1, 2, 3...)
- `string-ascii` IDs: Named tokens ("genesis", "rare-001")
- Tuple IDs: Complex identification schemes

### 2. `nft-mint?`

**Purpose**: Mint a new NFT to a principal.

```clarity
(define-public (mint (token-id uint) (recipient principal))
  (begin
    ;; Authorization
    (asserts! (is-eq tx-sender contract-owner) (err u1))
    
    ;; Validate token doesn't exist
    (asserts! (is-none (nft-get-owner? my-nft token-id)) (err u3))
    
    ;; Mint NFT - native function
    (try! (nft-mint? my-nft token-id recipient))
    
    ;; Update last token ID
    (var-set last-token-id token-id)
    
    ;; Emit event
    (print {
      action: "mint",
      token-id: token-id,
      recipient: recipient
    })
    
    (ok token-id)
  )
)
```

### 3. `nft-transfer?`

**Purpose**: Transfer NFT between principals (REQUIRED for SIP-009).

```clarity
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    ;; Validate ownership
    (asserts! (is-eq (some sender) (nft-get-owner? my-nft token-id)) (err u2))
    
    ;; Validate authorization
    (asserts! (is-eq tx-sender sender) (err u4))
    
    ;; Validate different principals
    (asserts! (not (is-eq sender recipient)) (err u5))
    
    ;; Native transfer - enables post-conditions
    (try! (nft-transfer? my-nft token-id sender recipient))
    
    (print {
      action: "transfer",
      token-id: token-id,
      sender: sender,
      recipient: recipient
    })
    
    (ok true)
  )
)
```

### 4. `nft-burn?`

**Purpose**: Burn (destroy) an NFT permanently.

```clarity
(define-public (burn (token-id uint))
  (begin
    ;; Validate ownership
    (asserts! (is-eq (some tx-sender) (nft-get-owner? my-nft token-id)) (err u2))
    
    ;; Burn NFT
    (try! (nft-burn? my-nft token-id tx-sender))
    
    (print {
      action: "burn",
      token-id: token-id,
      owner: tx-sender
    })
    
    (ok token-id)
  )
)
```

### 5. `nft-get-owner?`

**Purpose**: Get the owner of an NFT (read-only).

```clarity
(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? my-nft token-id))
)

;; Usage in transfer validation
(define-public (transfer-if-owner (token-id uint) (recipient principal))
  (let (
    (current-owner (nft-get-owner? my-nft token-id))
  )
    (asserts! (is-eq (some tx-sender) current-owner) (err u2))
    (try! (nft-transfer? my-nft token-id tx-sender recipient))
    (ok true)
  )
)
```

## Integration with Stacks Blockchain API

### Automatic API Recognition

When using native asset functions, your tokens automatically appear in:

```bash
# Account balances endpoint
curl "https://api.hiro.so/extended/v1/address/SP123.../balances"

# Response includes your tokens automatically:
{
  "stx": { "balance": "1000000", ... },
  "fungible_tokens": {
    "SP123...CONTRACT.my-token": {
      "balance": "500000",
      "total_sent": "100000",
      "total_received": "600000"
    }
  },
  "non_fungible_tokens": {
    "SP123...CONTRACT.my-nft": {
      "count": "5",
      "total_sent": "2",
      "total_received": "7"
    }
  }
}
```

### Transaction Event Integration

Native functions automatically emit events that appear in transaction logs:

```bash
# Transaction details endpoint
curl "https://api.hiro.so/extended/v1/tx/0xabcd..."

# Events section automatically includes:
{
  "events": [
    {
      "event_index": 0,
      "event_type": "fungible_token_asset",
      "tx_id": "0xabcd...",
      "asset": {
        "asset_event_type": "transfer",
        "asset_id": "SP123...CONTRACT.my-token",
        "sender": "SP123...",
        "recipient": "SP456...",
        "amount": "1000000"
      }
    }
  ]
}
```

## Benefits Over Custom Asset Management

### ❌ Custom Asset Tracking (Don't Do This)

```clarity
;; BAD: Custom balance tracking
(define-map balances principal uint)
(define-map nft-owners uint principal)

(define-public (custom-transfer (amount uint) (recipient principal))
  (let (
    (sender-balance (default-to u0 (map-get? balances tx-sender)))
  )
    ;; ❌ No post-condition support
    ;; ❌ No API integration
    ;; ❌ No wallet support
    ;; ❌ Manual overflow checking required
    ;; ❌ Complex implementation
    
    (asserts! (>= sender-balance amount) (err u1))
    (map-set balances tx-sender (- sender-balance amount))
    (map-set balances recipient (+ (default-to u0 (map-get? balances recipient)) amount))
    (ok true)
  )
)
```

### ✅ Native Asset Functions (Correct Approach)

```clarity
;; GOOD: Native asset functions
(define-fungible-token my-token)

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    ;; ✅ Built-in post-condition support
    ;; ✅ Automatic API integration
    ;; ✅ Wallet compatibility
    ;; ✅ Overflow protection included
    ;; ✅ Simple, secure implementation
    
    (asserts! (is-eq tx-sender sender) (err u4))
    (try! (ft-transfer? my-token amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)
```

## Advanced Integration Patterns

### 1. Multi-Token Contracts

```clarity
;; Multiple tokens in one contract
(define-fungible-token gold-token)
(define-fungible-token silver-token)
(define-non-fungible-token item-nft uint)

(define-public (craft-item (gold-amount uint) (silver-amount uint) (item-id uint))
  (begin
    ;; Burn crafting materials
    (try! (ft-burn? gold-token gold-amount tx-sender))
    (try! (ft-burn? silver-token silver-amount tx-sender))
    
    ;; Mint crafted item
    (try! (nft-mint? item-nft item-id tx-sender))
    
    (ok item-id)
  )
)
```

### 2. Token Wrapping/Unwrapping

```clarity
;; Wrap STX into a fungible token
(define-fungible-token wrapped-stx)

(define-public (wrap-stx (amount uint))
  (begin
    ;; Transfer STX to contract
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    
    ;; Mint wrapped tokens
    (try! (ft-mint? wrapped-stx amount tx-sender))
    
    (ok amount)
  )
)

(define-public (unwrap-stx (amount uint))
  (begin
    ;; Burn wrapped tokens
    (try! (ft-burn? wrapped-stx amount tx-sender))
    
    ;; Return STX from contract
    (as-contract (stx-transfer? amount tx-sender sender))
  )
)
```

### 3. Gaming Token Economics

```clarity
;; Gaming tokens with different utilities
(define-fungible-token energy-token)
(define-fungible-token gold-token)
(define-non-fungible-token character-nft uint)

(define-public (level-up-character (character-id uint))
  (let (
    (energy-cost u100)
    (gold-cost u50)
  )
    ;; Verify ownership
    (asserts! (is-eq (some tx-sender) (nft-get-owner? character-nft character-id)) (err u2))
    
    ;; Pay costs
    (try! (ft-burn? energy-token energy-cost tx-sender))
    (try! (ft-burn? gold-token gold-cost tx-sender))
    
    ;; Update character (custom logic)
    (map-set character-levels character-id (+ (get-character-level character-id) u1))
    
    (ok true)
  )
)
```

### 4. DeFi Integration

```clarity
;; Liquidity pool with native tokens
(define-fungible-token pool-token)

(define-public (add-liquidity (token-a-amount uint) (token-b-amount uint))
  (let (
    (pool-tokens-to-mint (calculate-pool-tokens token-a-amount token-b-amount))
  )
    ;; Transfer tokens to pool
    (try! (contract-call? .token-a transfer token-a-amount tx-sender (as-contract tx-sender) none))
    (try! (contract-call? .token-b transfer token-b-amount tx-sender (as-contract tx-sender) none))
    
    ;; Mint pool tokens
    (try! (ft-mint? pool-token pool-tokens-to-mint tx-sender))
    
    (ok pool-tokens-to-mint)
  )
)
```

## Testing Native Asset Integration

### Unit Tests with Clarinet

```typescript
// Test native asset functions
describe('Native Asset Integration', () => {
  it('should mint tokens correctly', () => {
    const mintResult = simnet.callPublicFn(
      'my-contract',
      'mint',
      [Cl.uint(1000), Cl.principal(address1)],
      deployer
    );
    
    expect(mintResult.result).toBeOk(Cl.uint(1000));
    
    // Verify balance using native function
    const balanceResult = simnet.callReadOnlyFn(
      'my-contract',
      'get-balance',
      [Cl.principal(address1)],
      deployer
    );
    
    expect(balanceResult.result).toBeOk(Cl.uint(1000));
  });
  
  it('should support post-conditions', () => {
    // This requires integration testing with actual transactions
    // Native functions enable post-condition validation
  });
});
```

### Integration Testing

```bash
# Deploy contract to devnet
clarinet deploy --devnet

# Test API integration
curl "http://localhost:3999/extended/v1/address/ST123.../balances"

# Verify automatic token detection
# Should show tokens without custom integration
```

## Best Practices

### ✅ Do This

1. **Always use native functions for SIP compliance**
   ```clarity
   (define-fungible-token my-token)
   (ft-transfer? my-token amount sender recipient)
   ```

2. **Handle memo fields properly**
   ```clarity
   (match memo to-print (print to-print) 0x)
   ```

3. **Emit events for important actions**
   ```clarity
   (print { action: "mint", amount: amount, recipient: recipient })
   ```

4. **Validate inputs thoroughly**
   ```clarity
   (asserts! (> amount u0) (err u3))
   (asserts! (is-eq tx-sender sender) (err u4))
   ```

### ❌ Don't Do This

1. **Don't use custom balance tracking**
   ```clarity
   ;; ❌ BAD: Custom maps instead of native functions
   (define-map balances principal uint)
   ```

2. **Don't skip post-condition compatibility**
   ```clarity
   ;; ❌ BAD: Functions that can't work with post-conditions
   ```

3. **Don't ignore memo handling**
   ```clarity
   ;; ❌ BAD: Ignoring memo in transfer functions
   ```

## Security Considerations

### Built-in Protections

Native functions provide automatic protection against:
- ✅ **Integer overflow/underflow**
- ✅ **Double-spending**
- ✅ **Invalid token operations**
- ✅ **Unauthorized transfers**

### Post-Condition Security

```clarity
;; Native functions enable this security:
const postConditions = [
  makeStandardFungiblePostCondition(
    userAddress,
    FungibleConditionCode.Equal,
    1000000,
    createAssetInfo(contractAddress, contractName, assetName)
  ),
];

// Transaction will FAIL if exact amount isn't transferred
```

## Migration from Custom Assets

If you have existing contracts with custom asset tracking:

### 1. Assessment Phase
```clarity
;; Audit existing custom implementation
;; - Map all balance tracking
;; - Identify transfer functions
;; - List all custom logic
```

### 2. Migration Contract
```clarity
;; Create migration contract with native functions
(define-fungible-token migrated-token)

(define-public (migrate-balance (user principal))
  (let (
    (old-balance (contract-call? .old-contract get-custom-balance user))
  )
    ;; Mint equivalent native tokens
    (try! (ft-mint? migrated-token old-balance user))
    ;; Burn old custom tokens
    (try! (contract-call? .old-contract burn-custom-tokens user old-balance))
    (ok old-balance)
  )
)
```

### 3. Gradual Migration
- Deploy new contract with native functions
- Allow users to migrate voluntarily
- Provide incentives for migration
- Eventually deprecate old contract

## Conclusion

Native asset integration is **mandatory** for SIP compliance and provides:
- **Security**: Built-in protections and post-condition support
- **Compatibility**: Automatic API and wallet integration
- **Simplicity**: Less code, fewer bugs, easier maintenance
- **Standards compliance**: Required for SIP-009 and SIP-010

Always use native asset functions - they are the foundation of the Stacks token ecosystem.