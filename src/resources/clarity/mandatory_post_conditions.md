# Mandatory Post-Conditions Framework

## Overview

Post-conditions are **MANDATORY** for SIP-009 and SIP-010 compliance on Stacks - not optional! They are security guarantees that ensure transactions behave exactly as expected, preventing unexpected token transfers.

**Critical Understanding:**
- Post-conditions are **required by the SIP standards**
- They prevent transaction malleability attacks
- They provide explicit guarantees about what will happen in a transaction
- **Transactions MUST fail** if post-conditions are not met

## Why Post-Conditions Are Mandatory

### Security Without Post-Conditions ❌

```typescript
// DANGEROUS: No post-conditions
await openContractCall({
  contractAddress: 'SP123...ABC',
  contractName: 'my-token',
  functionName: 'transfer',
  functionArgs: [uintCV(1000), principalCV(sender), principalCV(recipient)],
  // ❌ NO POST-CONDITIONS - VULNERABLE TO MANIPULATION
});
```

**Potential attacks:**
- Contract could transfer more tokens than intended
- Contract could transfer different tokens
- Contract could make additional transfers
- Malicious contracts could drain wallets

### Security With Post-Conditions ✅

```typescript
// SECURE: With mandatory post-conditions
const postConditions = [
  makeStandardFungiblePostCondition(
    senderAddress,
    FungibleConditionCode.Equal,
    1000, // EXACT amount
    createAssetInfo(contractAddress, contractName, assetName)
  ),
];

await openContractCall({
  contractAddress,
  contractName,
  functionName: 'transfer',
  functionArgs: [uintCV(1000), principalCV(sender), principalCV(recipient)],
  postConditions, // ✅ GUARANTEES EXACT BEHAVIOR
  postConditionMode: PostConditionMode.Deny, // ✅ FAIL IF CONDITIONS NOT MET
});
```

## Post-Condition Types

### 1. Fungible Token Post-Conditions (SIP-010)

```typescript
import {
  makeStandardFungiblePostCondition,
  makeContractFungiblePostCondition,
  FungibleConditionCode,
  createAssetInfo
} from '@stacks/transactions';

// Standard fungible post-condition (most common)
const standardFTCondition = makeStandardFungiblePostCondition(
  'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', // principal
  FungibleConditionCode.Equal,                    // condition
  1000000,                                        // amount (base units)
  createAssetInfo(                                // asset info
    'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9',
    'my-token',
    'my-token'
  )
);

// Contract fungible post-condition
const contractFTCondition = makeContractFungiblePostCondition(
  'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', // contract address
  'my-contract',                                 // contract name
  FungibleConditionCode.LessEqual,              // condition
  5000000,                                       // max amount
  createAssetInfo(
    'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9',
    'reward-token',
    'reward-token'
  )
);
```

### 2. Non-Fungible Token Post-Conditions (SIP-009)

```typescript
import {
  makeStandardNonFungiblePostCondition,
  makeContractNonFungiblePostCondition,
  NonFungibleConditionCode,
  createAssetInfo
} from '@stacks/transactions';

// Standard NFT post-condition
const standardNFTCondition = makeStandardNonFungiblePostCondition(
  'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', // principal
  NonFungibleConditionCode.DoesNotOwn,          // condition
  createAssetInfo(                               // asset info
    'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9',
    'my-nft',
    'my-nft'
  ),
  uintCV(42)                                     // token ID
);

// Contract NFT post-condition
const contractNFTCondition = makeContractNonFungiblePostCondition(
  'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', // contract address
  'marketplace',                                 // contract name
  NonFungibleConditionCode.Owns,                // condition
  createAssetInfo(
    'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9',
    'collectible',
    'collectible'
  ),
  uintCV(123)
);
```

### 3. STX Post-Conditions

```typescript
import {
  makeStandardSTXPostCondition,
  makeContractSTXPostCondition,
  FungibleConditionCode
} from '@stacks/transactions';

// Standard STX post-condition
const stxCondition = makeStandardSTXPostCondition(
  'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', // principal
  FungibleConditionCode.Equal,                   // condition
  1000000                                         // amount in microSTX
);

// Contract STX post-condition
const contractSTXCondition = makeContractSTXPostCondition(
  'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', // contract address
  'payment-contract',                             // contract name
  FungibleConditionCode.LessEqual,               // condition
  5000000                                         // max amount
);
```

## Condition Codes Explained

### Fungible Condition Codes

```typescript
enum FungibleConditionCode {
  SentEqual = 'sent_equal',           // Exactly this amount sent
  SentGreater = 'sent_greater',       // More than this amount sent
  SentGreaterEqual = 'sent_greater_equal', // At least this amount sent
  SentLess = 'sent_less',             // Less than this amount sent
  SentLessEqual = 'sent_less_equal'   // At most this amount sent
}

// Most common usage patterns:
FungibleConditionCode.Equal        // For exact transfers: "I will send exactly 1000 tokens"
FungibleConditionCode.LessEqual    // For max limits: "I will send at most 5000 tokens"
FungibleConditionCode.GreaterEqual // For min requirements: "I will send at least 100 tokens"
```

### Non-Fungible Condition Codes

```typescript
enum NonFungibleConditionCode {
  Sent = 'sent',                      // NFT was sent
  NotSent = 'not_sent'                // NFT was not sent
}

// Ownership-based conditions (more common):
NonFungibleConditionCode.DoesNotOwn  // "I will not own this NFT after transaction"
NonFungibleConditionCode.Owns        // "I will own this NFT after transaction"
```

## Post-Condition Modes

```typescript
enum PostConditionMode {
  Allow = 0x01,  // Allow additional asset transfers beyond post-conditions
  Deny = 0x02    // ✅ RECOMMENDED: Deny any transfers not explicitly allowed
}

// ALWAYS use Deny mode for maximum security
postConditionMode: PostConditionMode.Deny
```

## Complete Implementation Examples

### 1. SIP-010 Token Transfer with Post-Conditions

```typescript
import { 
  openContractCall,
  PostConditionMode,
  FungibleConditionCode,
  createAssetInfo,
  makeStandardFungiblePostCondition,
  uintCV,
  principalCV,
  noneCV
} from '@stacks/connect';

async function transferSIP010WithPostConditions(
  contractAddress: string,
  contractName: string,
  amount: number,
  sender: string,
  recipient: string,
  memo?: string
) {
  const functionArgs = [
    uintCV(amount),
    principalCV(sender),
    principalCV(recipient),
    memo ? someCV(bufferCV(Buffer.from(memo, 'utf8'))) : noneCV()
  ];

  // MANDATORY: Post-condition for exact transfer amount
  const postConditions = [
    makeStandardFungiblePostCondition(
      sender,
      FungibleConditionCode.Equal, // Exactly this amount
      amount,
      createAssetInfo(contractAddress, contractName, contractName)
    ),
  ];

  try {
    const result = await openContractCall({
      contractAddress,
      contractName,
      functionName: 'transfer',
      functionArgs,
      postConditions,
      postConditionMode: PostConditionMode.Deny, // CRITICAL: Deny unexpected transfers
      onFinish: (data) => {
        console.log('Transfer completed:', data.txId);
      },
      onCancel: () => {
        console.log('Transfer cancelled by user');
      },
    });
    
    return result;
  } catch (error) {
    if (error.message.includes('post-condition')) {
      throw new Error('Post-condition failed: Transaction would not behave as expected');
    }
    throw error;
  }
}
```

### 2. SIP-009 NFT Transfer with Post-Conditions

```typescript
async function transferSIP009WithPostConditions(
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

  // MANDATORY: Post-condition ensuring sender loses ownership
  const postConditions = [
    makeStandardNonFungiblePostCondition(
      sender,
      NonFungibleConditionCode.DoesNotOwn, // Sender will not own after transfer
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
    onFinish: (data) => {
      console.log('NFT transfer completed:', data.txId);
    },
  });
}
```

### 3. Multi-Asset Transaction with Post-Conditions

```typescript
async function multiAssetSwap(
  tokenAContract: string,
  tokenBContract: string,
  amountA: number,
  amountB: number,
  userAddress: string
) {
  const functionArgs = [
    uintCV(amountA),
    uintCV(amountB)
  ];

  // COMPREHENSIVE post-conditions for both tokens
  const postConditions = [
    // User sends exactly amountA of token A
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      amountA,
      createAssetInfo(tokenAContract, 'token-a', 'token-a')
    ),
    // User receives exactly amountB of token B  
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      amountB,
      createAssetInfo(tokenBContract, 'token-b', 'token-b')
    ),
  ];

  return await openContractCall({
    contractAddress: 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9',
    contractName: 'dex-contract',
    functionName: 'swap',
    functionArgs,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
```

### 4. Complex DeFi Transaction with Post-Conditions

```typescript
async function addLiquidityWithPostConditions(
  poolContract: string,
  tokenAContract: string,
  tokenBContract: string,
  amountA: number,
  amountB: number,
  expectedLP: number,
  userAddress: string
) {
  const functionArgs = [
    uintCV(amountA),
    uintCV(amountB),
    uintCV(expectedLP * 0.95) // 5% slippage tolerance
  ];

  const postConditions = [
    // Send token A to pool
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      amountA,
      createAssetInfo(tokenAContract, 'token-a', 'token-a')
    ),
    // Send token B to pool
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      amountB,
      createAssetInfo(tokenBContract, 'token-b', 'token-b')
    ),
    // Receive at least 95% of expected LP tokens
    makeStandardFungiblePostCondition(
      userAddress,
      FungibleConditionCode.GreaterEqual,
      Math.floor(expectedLP * 0.95),
      createAssetInfo(poolContract, 'lp-token', 'lp-token')
    ),
  ];

  return await openContractCall({
    contractAddress: poolContract,
    contractName: 'amm-pool',
    functionName: 'add-liquidity',
    functionArgs,
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
```

## Smart Wallet Security Patterns

### 1. Multi-Signature with Post-Conditions

```typescript
async function multiSigTransferWithPostConditions(
  multiSigContract: string,
  targetContract: string,
  amount: number,
  recipient: string,
  signers: string[]
) {
  // Post-conditions for multi-sig contract
  const postConditions = [
    // Multi-sig contract sends the tokens
    makeContractFungiblePostCondition(
      multiSigContract,
      'multi-sig-wallet',
      FungibleConditionCode.Equal,
      amount,
      createAssetInfo(targetContract, 'token', 'token')
    ),
    // Recipient receives the tokens
    makeStandardFungiblePostCondition(
      recipient,
      FungibleConditionCode.Equal,
      amount,
      createAssetInfo(targetContract, 'token', 'token')
    ),
  ];

  return await openContractCall({
    contractAddress: multiSigContract,
    contractName: 'multi-sig-wallet',
    functionName: 'execute-transfer',
    functionArgs: [
      principalCV(targetContract),
      uintCV(amount),
      principalCV(recipient)
    ],
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
```

### 2. Atomic Transaction Compositions

```typescript
async function atomicNFTSale(
  nftContract: string,
  tokenId: number,
  price: number,
  seller: string,
  buyer: string
) {
  const postConditions = [
    // Buyer pays STX
    makeStandardSTXPostCondition(
      buyer,
      FungibleConditionCode.Equal,
      price
    ),
    // Seller receives STX
    makeStandardSTXPostCondition(
      seller,
      FungibleConditionCode.Equal,
      price
    ),
    // Buyer receives NFT
    makeStandardNonFungiblePostCondition(
      buyer,
      NonFungibleConditionCode.Owns,
      createAssetInfo(nftContract, 'nft', 'nft'),
      uintCV(tokenId)
    ),
    // Seller loses NFT
    makeStandardNonFungiblePostCondition(
      seller,
      NonFungibleConditionCode.DoesNotOwn,
      createAssetInfo(nftContract, 'nft', 'nft'),
      uintCV(tokenId)
    ),
  ];

  return await openContractCall({
    contractAddress: 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9',
    contractName: 'nft-marketplace',
    functionName: 'execute-sale',
    functionArgs: [
      principalCV(nftContract),
      uintCV(tokenId),
      uintCV(price)
    ],
    postConditions,
    postConditionMode: PostConditionMode.Deny,
  });
}
```

## Post-Condition Failure Debugging

### Common Failure Patterns

```typescript
// 1. Amount mismatch
const condition = makeStandardFungiblePostCondition(
  userAddress,
  FungibleConditionCode.Equal,
  1000, // Expected 1000
  assetInfo
);
// Transaction transfers 1001 -> POST-CONDITION FAILURE ❌

// 2. Wrong condition code
const condition = makeStandardFungiblePostCondition(
  userAddress,
  FungibleConditionCode.Greater, // Expects > 1000
  1000,
  assetInfo
);
// Transaction transfers exactly 1000 -> POST-CONDITION FAILURE ❌

// 3. Missing post-condition for actual transfer
const postConditions = [
  // Only covers token A
  makeStandardFungiblePostCondition(userAddress, FungibleConditionCode.Equal, 1000, tokenA)
  // Missing post-condition for token B transfer -> FAILURE ❌
];
```

### Debugging Tools

```typescript
// Log post-conditions before transaction
console.log('Post-conditions:', postConditions.map(pc => ({
  type: pc.type,
  principal: pc.principal,
  conditionCode: pc.conditionCode,
  amount: pc.amount,
  assetInfo: pc.assetInfo
})));

// Simulate transaction locally first (if using Clarinet)
const simulationResult = await clarinet.simulateTransaction(
  contractCall,
  postConditions
);

if (!simulationResult.success) {
  console.error('Simulation failed:', simulationResult.error);
}
```

## Integration Patterns

### React Hook for Post-Condition Management

```typescript
import { useState, useCallback } from 'react';
import { PostCondition } from '@stacks/transactions';

export const usePostConditions = () => {
  const [postConditions, setPostConditions] = useState<PostCondition[]>([]);

  const addFungibleCondition = useCallback((
    principal: string,
    amount: number,
    assetInfo: any,
    conditionCode = FungibleConditionCode.Equal
  ) => {
    const condition = makeStandardFungiblePostCondition(
      principal,
      conditionCode,
      amount,
      assetInfo
    );
    setPostConditions(prev => [...prev, condition]);
  }, []);

  const addNFTCondition = useCallback((
    principal: string,
    tokenId: number,
    assetInfo: any,
    conditionCode = NonFungibleConditionCode.DoesNotOwn
  ) => {
    const condition = makeStandardNonFungiblePostCondition(
      principal,
      conditionCode,
      assetInfo,
      uintCV(tokenId)
    );
    setPostConditions(prev => [...prev, condition]);
  }, []);

  const clearConditions = useCallback(() => {
    setPostConditions([]);
  }, []);

  return {
    postConditions,
    addFungibleCondition,
    addNFTCondition,
    clearConditions
  };
};
```

### Post-Condition Validation Component

```typescript
import React from 'react';
import { PostCondition } from '@stacks/transactions';

interface PostConditionDisplayProps {
  postConditions: PostCondition[];
  onApprove: () => void;
  onReject: () => void;
}

export const PostConditionDisplay: React.FC<PostConditionDisplayProps> = ({
  postConditions,
  onApprove,
  onReject
}) => {
  return (
    <div className="post-condition-display">
      <h3>Transaction Guarantees</h3>
      <p>This transaction will:</p>
      
      <ul>
        {postConditions.map((condition, index) => (
          <li key={index}>
            {formatPostCondition(condition)}
          </li>
        ))}
      </ul>
      
      <div className="warning">
        ⚠️ If these conditions are not met exactly, the transaction will fail.
      </div>
      
      <div className="actions">
        <button onClick={onApprove}>Approve Transaction</button>
        <button onClick={onReject}>Cancel</button>
      </div>
    </div>
  );
};

function formatPostCondition(condition: PostCondition): string {
  // Format post-condition for human reading
  // Implementation depends on condition type and values
  return `Transfer ${condition.amount} tokens`;
}
```

## Security Best Practices

### ✅ Do This

1. **Always use Deny mode**
   ```typescript
   postConditionMode: PostConditionMode.Deny
   ```

2. **Be explicit about amounts**
   ```typescript
   FungibleConditionCode.Equal // Exact amount
   ```

3. **Cover all asset movements**
   ```typescript
   // If contract moves 2 tokens, have 2 post-conditions
   ```

4. **Validate before signing**
   ```typescript
   // Show post-conditions to user for approval
   ```

5. **Test post-conditions thoroughly**
   ```typescript
   // Unit tests + integration tests
   ```

### ❌ Don't Do This

1. **Never use Allow mode for production**
   ```typescript
   postConditionMode: PostConditionMode.Allow // DANGEROUS
   ```

2. **Don't skip post-conditions**
   ```typescript
   postConditions: [] // VULNERABLE
   ```

3. **Don't use LessEqual without good reason**
   ```typescript
   FungibleConditionCode.LessEqual // Usually unnecessary
   ```

4. **Don't trust user input for amounts**
   ```typescript
   // Validate amounts match expected values
   ```

## Conclusion

Post-conditions are **mandatory security features** for all SIP-009 and SIP-010 token operations. They:

- **Prevent unexpected behavior** by explicitly defining what will happen
- **Protect users** from malicious or buggy contracts  
- **Enable atomic transactions** with multiple asset movements
- **Provide transparency** about transaction effects
- **Are required by SIP standards** for compliance

**Remember:** Every token transfer, whether fungible or non-fungible, MUST include appropriate post-conditions in deny mode. This is not optional - it's a security requirement.