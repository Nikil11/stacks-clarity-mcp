# SIP-010 Fungible Token Integration Guide

## Overview

SIP-010 defines the standard trait for Fungible Tokens (FT) on Stacks. This is the **most critical standard** for DeFi applications and the foundation for all token-based dApps.

**Key Information:**
- **Status**: Ratified ✅
- **Mainnet Trait**: `SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait`
- **Testnet Trait**: `ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard.sip-010-trait`

## The SIP-010 Trait

All SIP-010 compliant contracts must implement this complete trait:

```clarity
(define-trait sip-010-trait
  (
    ;; Transfer from the caller to a new principal
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))

    ;; the human readable name of the token
    (get-name () (response (string-ascii 32) uint))

    ;; the ticker symbol, or empty if none
    (get-symbol () (response (string-ascii 32) uint))

    ;; the number of decimals used, e.g. 6 would mean 1_000_000 represents 1 token
    (get-decimals () (response uint uint))

    ;; the balance of the passed principal
    (get-balance (principal) (response uint uint))

    ;; the current total supply (which does not need to be a constant)
    (get-total-supply () (response uint uint))

    ;; an optional URI that represents metadata of this token
    (get-token-uri () (response (optional (string-utf8 256)) uint))
  )
)
```

## Complete Implementation Example

Here's a production-ready SIP-010 fungible token implementation:

```clarity
;; SIP-010 Fungible Token Implementation
;; This contract implements the complete SIP-010 standard with all security features

;; Define the fungible token using native Clarity primitive (REQUIRED for SIP compliance)
(define-fungible-token my-token)

;; Error constants - use descriptive error codes
(define-constant ERR-NOT-AUTHORIZED (err u1))
(define-constant ERR-INSUFFICIENT-BALANCE (err u2))
(define-constant ERR-INVALID-SENDER (err u3))
(define-constant ERR-INVALID-AMOUNT (err u4))

;; Token metadata constants
(define-constant TOKEN-NAME "My Token")
(define-constant TOKEN-SYMBOL "MTK")
(define-constant TOKEN-DECIMALS u6)
(define-constant TOKEN-URI "https://mytoken.com/metadata.json")

;; Contract owner (for minting/burning if needed)
(define-constant CONTRACT-OWNER tx-sender)

;; Implement the SIP-010 trait
(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; Transfer function with complete security checks
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    ;; Validate inputs
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (asserts! (not (is-eq sender recipient)) ERR-INVALID-SENDER)
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    
    ;; Perform the transfer using native function (REQUIRED for post-conditions)
    (try! (ft-transfer? my-token amount sender recipient))
    
    ;; Emit memo if provided (REQUIRED for Stacks 2.0 compatibility)
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

;; Read-only functions (should never fail)
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
  (ok (ft-get-balance my-token user))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply my-token))
)

(define-read-only (get-token-uri)
  (ok (some TOKEN-URI))
)

;; Administrative functions (optional)
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (ft-mint? my-token amount recipient)
  )
)

(define-public (burn (amount uint))
  (begin
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (ft-burn? my-token amount tx-sender)
  )
)
```

## CRITICAL: Post-Condition Requirements

**Post-conditions are MANDATORY for SIP-010 compliance** - not optional! Every transfer must specify exact amounts.

### Frontend Post-Condition Integration

```typescript
import { 
  openContractCall,
  PostConditionMode,
  FungibleConditionCode,
  createAssetInfo,
  makeStandardFungiblePostCondition
} from '@stacks/connect';

// Example: Transfer 1000000 micro-tokens (1 token with 6 decimals)
const amount = 1000000; // 1.000000 tokens
const contractAddress = 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9';
const contractName = 'my-token';
const assetName = 'my-token';

const functionArgs = [
  uintCV(amount),
  principalCV(senderAddress),
  principalCV(recipientAddress),
  noneCV() // memo
];

// MANDATORY: Post-condition for exact transfer amount
const postConditions = [
  makeStandardFungiblePostCondition(
    senderAddress,
    FungibleConditionCode.Equal,
    amount,
    createAssetInfo(contractAddress, contractName, assetName)
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

**REQUIRED**: All SIP-010 tokens MUST use native Clarity asset functions:

1. **`define-fungible-token`** - Creates the native asset
2. **`ft-transfer?`** - Handles transfers with post-condition support
3. **`ft-mint?`** - Mints new tokens
4. **`ft-burn?`** - Burns tokens
5. **`ft-get-balance`** - Gets balance
6. **`ft-get-supply`** - Gets total supply

### Why Native Functions Are Required

- **Post-condition support**: Only native functions work with Stacks post-conditions
- **API compatibility**: `stacks-blockchain-api` only tracks native assets
- **Wallet integration**: Wallets can display balances automatically
- **Security**: Built-in overflow/underflow protection

## Error Handling Patterns

Follow SIP-010 standard error codes:

| Error Code | Reason |
|------------|--------|
| u1 | `sender` does not have enough balance |
| u2 | `sender` and `recipient` are the same principal |
| u3 | `amount` is non-positive |
| u4 | `sender` is not the same as `tx-sender` |

```clarity
;; Standard error handling pattern
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (> amount u0) (err u3))                    ;; Non-positive amount
    (asserts! (not (is-eq sender recipient)) (err u2))   ;; Same sender/recipient  
    (asserts! (is-eq tx-sender sender) (err u4))         ;; Unauthorized sender
    
    ;; Check balance before transfer
    (asserts! (>= (ft-get-balance my-token sender) amount) (err u1))
    
    (try! (ft-transfer? my-token amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)
```

## Metadata Management

### JSON Metadata Schema

```json
{
  "name": "My Token",
  "description": "A comprehensive SIP-010 fungible token",
  "image": "https://mytoken.com/logo.png",
  "external_url": "https://mytoken.com",
  "properties": {
    "total_supply": "1000000000000",
    "decimals": 6,
    "symbol": "MTK"
  }
}
```

### Dynamic URI Updates

```clarity
;; Variable URI for updatable metadata
(define-data-var token-uri (optional (string-utf8 256)) (some u"https://api.mytoken.com/metadata"))

(define-public (set-token-uri (new-uri (string-utf8 256)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set token-uri (some new-uri))
    (ok true)
  )
)

(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)
```

## DeFi Integration Patterns

### AMM Pool Integration

```clarity
;; Example: Add liquidity to an AMM pool
(define-public (add-liquidity (token-a-amount uint) (token-b-amount uint))
  (let (
    (pool-contract 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.amm-pool)
  )
    ;; Transfer tokens to pool with post-conditions
    (try! (ft-transfer? my-token token-a-amount tx-sender pool-contract))
    (try! (contract-call? pool-contract add-liquidity token-a-amount token-b-amount))
    (ok true)
  )
)
```

### Staking Integration

```clarity
;; Example: Stake tokens for rewards
(define-public (stake (amount uint))
  (let (
    (staking-contract 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.staking)
  )
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (try! (ft-transfer? my-token amount tx-sender staking-contract))
    (try! (contract-call? staking-contract stake-tokens amount))
    (ok true)
  )
)
```

## Testing with Clarinet

### Unit Tests

```typescript
// tests/my-token-test.ts
import { describe, it, beforeEach } from 'vitest';
import { Cl } from '@stacks/transactions';

describe('my-token', () => {
  it('should transfer tokens correctly', () => {
    const amount = 1000000; // 1 token
    const sender = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
    const recipient = 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5';
    
    // Test transfer
    const transferResult = simnet.callPublicFn(
      'my-token',
      'transfer',
      [
        Cl.uint(amount),
        Cl.principal(sender),
        Cl.principal(recipient),
        Cl.none()
      ],
      sender
    );
    
    expect(transferResult.result).toBeOk(Cl.bool(true));
    
    // Verify balances
    const senderBalance = simnet.callReadOnlyFn(
      'my-token',
      'get-balance',
      [Cl.principal(sender)],
      sender
    );
    
    const recipientBalance = simnet.callReadOnlyFn(
      'my-token',
      'get-balance',
      [Cl.principal(recipient)],
      recipient
    );
    
    expect(senderBalance.result).toBeOk(Cl.uint(9000000)); // 9 tokens left
    expect(recipientBalance.result).toBeOk(Cl.uint(1000000)); // 1 token received
  });
  
  it('should enforce post-conditions', () => {
    // Test that transfers fail without proper post-conditions
    // This requires integration testing with actual transactions
  });
});
```

## Security Checklist

### ✅ Required Security Features

- [ ] **Native asset functions**: Uses `define-fungible-token` and `ft-transfer?`
- [ ] **Post-condition compatibility**: All transfers work with post-conditions
- [ ] **Input validation**: Checks for positive amounts, different sender/recipient
- [ ] **Authorization checks**: Validates `tx-sender` matches `sender`
- [ ] **Error handling**: Uses standard SIP-010 error codes
- [ ] **Memo handling**: Properly emits memo for Stacks 2.0 compatibility
- [ ] **Overflow protection**: Uses native functions with built-in protection

### ⚠️ Common Vulnerabilities to Avoid

```clarity
;; ❌ DON'T: Custom balance tracking (bypasses post-conditions)
(define-map balances principal uint)

;; ❌ DON'T: Skip authorization checks
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (ft-transfer? my-token amount sender recipient)) ;; Missing tx-sender check!

;; ❌ DON'T: Ignore memo emission
(define-public (transfer ...)
  (ft-transfer? my-token amount sender recipient)) ;; Missing memo handling!

;; ✅ DO: Use proper implementation (see complete example above)
```

## Deployment Checklist

### Mainnet Deployment

1. **Pre-deployment Testing**
   ```bash
   clarinet test
   clarinet check
   clarinet console
   ```

2. **Trait Implementation Verification**
   ```clarity
   ;; Verify trait implementation
   (impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)
   ```

3. **Post-condition Testing**
   - Test transfers with post-conditions in deny mode
   - Verify post-condition failures work correctly
   - Test with different wallet integrations

4. **API Integration Testing**
   ```bash
   # Verify API recognition after deployment
   curl "https://api.hiro.so/extended/v1/address/{contract-address}/balances"
   ```

## Integration Examples

### React Hook for SIP-010 Tokens

```typescript
import { useCallback } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksMainnet } from '@stacks/network';

export const useSIP010Token = (contractAddress: string, contractName: string) => {
  const { doContractCall } = useConnect();
  
  const transfer = useCallback(async (
    amount: number,
    recipient: string,
    memo?: string
  ) => {
    const functionArgs = [
      uintCV(amount),
      principalCV(userSession.loadUserData().profile.stxAddress.mainnet),
      principalCV(recipient),
      memo ? someCV(bufferCV(Buffer.from(memo, 'utf8'))) : noneCV()
    ];
    
    const postConditions = [
      makeStandardFungiblePostCondition(
        userSession.loadUserData().profile.stxAddress.mainnet,
        FungibleConditionCode.Equal,
        amount,
        createAssetInfo(contractAddress, contractName, contractName)
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
  
  return { transfer };
};
```

## Best Practices Summary

1. **Always use native asset functions** - Required for SIP compliance
2. **Implement mandatory post-conditions** - Security and UX requirement
3. **Follow standard error codes** - Ensures compatibility
4. **Handle memos properly** - Required for Stacks 2.0
5. **Validate all inputs** - Prevent common vulnerabilities
6. **Test extensively** - Unit tests + integration tests + post-condition tests
7. **Use descriptive error messages** - Better developer experience
8. **Document your implementation** - Include usage examples

## Common Integration Patterns

### Multi-token Operations
```clarity
;; Example: Swap two SIP-010 tokens
(define-public (swap-tokens (token-a <sip-010-trait>) (token-b <sip-010-trait>) (amount-a uint) (amount-b uint))
  (begin
    (try! (contract-call? token-a transfer amount-a tx-sender (as-contract tx-sender) none))
    (try! (contract-call? token-b transfer amount-b (as-contract tx-sender) tx-sender none))
    (ok true)
  )
)
```

This guide provides everything needed to implement, deploy, and integrate SIP-010 fungible tokens securely and efficiently on Stacks.