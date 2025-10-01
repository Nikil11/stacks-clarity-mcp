# Sign and Submit Transaction Guide

## Overview

This comprehensive guide covers transaction signing and submission in Stacks applications using `@stacks/connect`. It includes contract calls, STX transfers, and advanced transaction patterns with mandatory post-conditions.

**Transaction Types Covered:**
- **Contract Calls** - Calling public functions on deployed contracts
- **STX Transfers** - Native STX token transfers
- **Token Transfers** - SIP-010 fungible token transfers (with post-conditions)
- **NFT Transfers** - SIP-009 non-fungible token transfers (with post-conditions)
- **Multi-signature** - Complex transaction patterns

## Basic Contract Call

### 1. Simple Contract Call (React)

```tsx
// src/components/ContractCall.tsx
import React, { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import {
  PostConditionMode,
  uintCV,
  principalCV,
  stringAsciiCV,
} from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const ContractCall: React.FC = () => {
  const { doContractCall } = useConnect();
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  const handleContractCall = async () => {
    setIsLoading(true);
    
    try {
      const result = await doContractCall({
        network: new StacksTestnet(), // or StacksMainnet() for production
        contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        contractName: 'my-contract',
        functionName: 'my-function',
        functionArgs: [
          uintCV(100),
          principalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'),
          stringAsciiCV('hello world'),
        ],
        postConditionMode: PostConditionMode.Deny, // ALWAYS use Deny mode
        onFinish: (data) => {
          console.log('Transaction submitted:', data.txId);
          setTxId(data.txId);
          setIsLoading(false);
        },
        onCancel: () => {
          console.log('Transaction cancelled');
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('Transaction failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="contract-call">
      <h3>Contract Call Example</h3>
      
      <button 
        onClick={handleContractCall} 
        disabled={isLoading}
        className="call-btn"
      >
        {isLoading ? 'Submitting...' : 'Call Contract'}
      </button>

      {txId && (
        <div className="transaction-result">
          <p>Transaction submitted!</p>
          <a 
            href={`https://explorer.stacks.co/txid/${txId}?chain=testnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Explorer
          </a>
        </div>
      )}
    </div>
  );
};
```

### 2. STX Transfer

```tsx
// src/components/STXTransfer.tsx
import React, { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import {
  PostConditionMode,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  uintCV,
  principalCV,
  someCV,
  bufferCV,
} from '@stacks/transactions';

interface STXTransferProps {
  defaultRecipient?: string;
}

export const STXTransfer: React.FC<STXTransferProps> = ({ defaultRecipient = '' }) => {
  const { doSTXTransfer } = useConnect();
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  const handleSTXTransfer = async () => {
    if (!recipient || !amount) {
      alert('Please enter recipient and amount');
      return;
    }

    setIsLoading(true);

    const amountInMicroSTX = parseInt(amount) * 1000000; // Convert STX to microSTX

    try {
      // Create post-condition for exact STX amount
      const postConditions = [
        makeStandardSTXPostCondition(
          recipient,
          FungibleConditionCode.Equal,
          amountInMicroSTX
        ),
      ];

      await doSTXTransfer({
        recipient,
        amount: amountInMicroSTX,
        memo: memo || undefined,
        postConditions,
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          console.log('STX transfer submitted:', data.txId);
          setTxId(data.txId);
          setIsLoading(false);
          // Clear form
          setRecipient('');
          setAmount('');
          setMemo('');
        },
        onCancel: () => {
          console.log('STX transfer cancelled');
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('STX transfer failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="stx-transfer">
      <h3>Send STX</h3>
      
      <div className="form-group">
        <label htmlFor="recipient">Recipient Address:</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
          className="address-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount (STX):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1.5"
          step="0.000001"
          min="0"
          className="amount-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="memo">Memo (optional):</label>
        <input
          type="text"
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Payment for services"
          maxLength={34}
          className="memo-input"
        />
      </div>

      <button 
        onClick={handleSTXTransfer} 
        disabled={isLoading || !recipient || !amount}
        className="transfer-btn"
      >
        {isLoading ? 'Sending...' : 'Send STX'}
      </button>

      {txId && (
        <div className="transaction-result">
          <p>STX transfer submitted!</p>
          <a 
            href={`https://explorer.stacks.co/txid/${txId}?chain=testnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Explorer
          </a>
        </div>
      )}
    </div>
  );
};
```

## Token Transfers with Post-Conditions

### 1. SIP-010 Fungible Token Transfer

```tsx
// src/components/TokenTransfer.tsx
import React, { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import {
  PostConditionMode,
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
  createAssetInfo,
  uintCV,
  principalCV,
  noneCV,
  someCV,
  bufferCV,
} from '@stacks/transactions';
import { StacksApiService } from '../services/StacksApiService';

interface TokenTransferProps {
  contractAddress: string;
  contractName: string;
  network: 'mainnet' | 'testnet';
}

export const TokenTransfer: React.FC<TokenTransferProps> = ({
  contractAddress,
  contractName,
  network,
}) => {
  const { doContractCall, userSession } = useConnect();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [balance, setBalance] = useState<string>('0');
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  const apiService = new StacksApiService();

  useEffect(() => {
    loadTokenInfo();
    loadBalance();
  }, [contractAddress, contractName, network]);

  const loadTokenInfo = async () => {
    try {
      const contractId = `${contractAddress}.${contractName}`;
      const info = await apiService.getFungibleTokenInfo(contractId, network);
      setTokenInfo(info);
    } catch (error) {
      console.error('Failed to load token info:', error);
    }
  };

  const loadBalance = async () => {
    if (!userSession?.isUserSignedIn()) return;

    try {
      const userData = userSession.loadUserData();
      const userAddress = userData.profile.stxAddress[network];
      const contractId = `${contractAddress}.${contractName}`;
      
      const tokenBalance = await apiService.getFungibleTokenBalance(
        contractId,
        userAddress,
        network
      );
      
      if (tokenInfo) {
        const humanBalance = parseInt(tokenBalance) / Math.pow(10, tokenInfo.decimals);
        setBalance(humanBalance.toString());
      } else {
        setBalance(tokenBalance);
      }
    } catch (error) {
      console.error('Failed to load balance:', error);
    }
  };

  const handleTokenTransfer = async () => {
    if (!recipient || !amount || !userSession?.isUserSignedIn()) {
      alert('Please enter recipient and amount');
      return;
    }

    setIsLoading(true);

    try {
      const userData = userSession.loadUserData();
      const senderAddress = userData.profile.stxAddress[network];
      
      // Convert amount to base units
      const decimals = tokenInfo?.decimals || 0;
      const amountInBaseUnits = Math.floor(parseFloat(amount) * Math.pow(10, decimals));

      // MANDATORY: Create post-condition for exact token transfer
      const postConditions = [
        makeStandardFungiblePostCondition(
          senderAddress,
          FungibleConditionCode.Equal, // Exact amount
          amountInBaseUnits,
          createAssetInfo(contractAddress, contractName, contractName)
        ),
      ];

      const functionArgs = [
        uintCV(amountInBaseUnits),
        principalCV(senderAddress),
        principalCV(recipient),
        memo ? someCV(bufferCV(Buffer.from(memo, 'utf8'))) : noneCV(),
      ];

      await doContractCall({
        contractAddress,
        contractName,
        functionName: 'transfer',
        functionArgs,
        postConditions,
        postConditionMode: PostConditionMode.Deny, // REQUIRED for security
        onFinish: (data) => {
          console.log('Token transfer submitted:', data.txId);
          setTxId(data.txId);
          setIsLoading(false);
          // Refresh balance
          setTimeout(loadBalance, 2000);
          // Clear form
          setRecipient('');
          setAmount('');
          setMemo('');
        },
        onCancel: () => {
          console.log('Token transfer cancelled');
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('Token transfer failed:', error);
      setIsLoading(false);
    }
  };

  if (!tokenInfo) {
    return <div>Loading token information...</div>;
  }

  return (
    <div className="token-transfer">
      <h3>Send {tokenInfo.symbol} Tokens</h3>
      
      <div className="token-info">
        <p><strong>Token:</strong> {tokenInfo.name} ({tokenInfo.symbol})</p>
        <p><strong>Your Balance:</strong> {parseFloat(balance).toLocaleString()} {tokenInfo.symbol}</p>
      </div>

      <div className="form-group">
        <label htmlFor="recipient">Recipient Address:</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
          className="address-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount ({tokenInfo.symbol}):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10.5"
          step={`${1 / Math.pow(10, tokenInfo.decimals)}`}
          min="0"
          max={balance}
          className="amount-input"
        />
        <small>Available: {parseFloat(balance).toLocaleString()} {tokenInfo.symbol}</small>
      </div>

      <div className="form-group">
        <label htmlFor="memo">Memo (optional):</label>
        <input
          type="text"
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Token transfer"
          maxLength={34}
          className="memo-input"
        />
      </div>

      <button 
        onClick={handleTokenTransfer} 
        disabled={isLoading || !recipient || !amount || parseFloat(amount) > parseFloat(balance)}
        className="transfer-btn"
      >
        {isLoading ? 'Sending...' : `Send ${tokenInfo.symbol}`}
      </button>

      {txId && (
        <div className="transaction-result">
          <p>Token transfer submitted!</p>
          <a 
            href={`https://explorer.stacks.co/txid/${txId}?chain=${network}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Explorer
          </a>
        </div>
      )}
    </div>
  );
};
```

### 2. SIP-009 NFT Transfer

```tsx
// src/components/NFTTransfer.tsx
import React, { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import {
  PostConditionMode,
  makeStandardNonFungiblePostCondition,
  NonFungibleConditionCode,
  createAssetInfo,
  uintCV,
  principalCV,
} from '@stacks/transactions';
import { StacksApiService } from '../services/StacksApiService';

interface NFTTransferProps {
  contractAddress: string;
  contractName: string;
  network: 'mainnet' | 'testnet';
}

export const NFTTransfer: React.FC<NFTTransferProps> = ({
  contractAddress,
  contractName,
  network,
}) => {
  const { doContractCall, userSession } = useConnect();
  const [recipient, setRecipient] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [nftInfo, setNftInfo] = useState<any>(null);
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  const apiService = new StacksApiService();

  useEffect(() => {
    if (tokenId) {
      loadNFTInfo();
    }
  }, [tokenId, contractAddress, contractName, network]);

  const loadNFTInfo = async () => {
    if (!tokenId) return;

    try {
      const contractId = `${contractAddress}.${contractName}`;
      const tokenIdNum = parseInt(tokenId);
      
      // Get NFT owner
      const owner = await apiService.getNFTOwner(contractId, tokenIdNum, network);
      setOwnerAddress(owner);

      // Get NFT metadata URI
      const uri = await apiService.getNFTTokenUri(contractId, tokenIdNum, network);
      
      if (uri) {
        // Fetch metadata if URI exists
        try {
          const response = await fetch(uri.startsWith('ipfs://') 
            ? uri.replace('ipfs://', 'https://ipfs.io/ipfs/') 
            : uri
          );
          const metadata = await response.json();
          setNftInfo(metadata);
        } catch (error) {
          console.warn('Failed to fetch NFT metadata:', error);
          setNftInfo({ name: `NFT #${tokenId}`, description: 'Metadata not available' });
        }
      } else {
        setNftInfo({ name: `NFT #${tokenId}`, description: 'No metadata URI' });
      }
    } catch (error) {
      console.error('Failed to load NFT info:', error);
      setNftInfo(null);
      setOwnerAddress(null);
    }
  };

  const handleNFTTransfer = async () => {
    if (!recipient || !tokenId || !userSession?.isUserSignedIn()) {
      alert('Please enter recipient and token ID');
      return;
    }

    const userData = userSession.loadUserData();
    const senderAddress = userData.profile.stxAddress[network];

    // Verify ownership
    if (ownerAddress !== senderAddress) {
      alert('You do not own this NFT');
      return;
    }

    setIsLoading(true);

    try {
      const tokenIdNum = parseInt(tokenId);

      // MANDATORY: Create post-condition for NFT transfer
      const postConditions = [
        makeStandardNonFungiblePostCondition(
          senderAddress,
          NonFungibleConditionCode.DoesNotOwn, // Sender will not own after transfer
          createAssetInfo(contractAddress, contractName, contractName),
          uintCV(tokenIdNum)
        ),
      ];

      const functionArgs = [
        uintCV(tokenIdNum),
        principalCV(senderAddress),
        principalCV(recipient),
      ];

      await doContractCall({
        contractAddress,
        contractName,
        functionName: 'transfer',
        functionArgs,
        postConditions,
        postConditionMode: PostConditionMode.Deny, // REQUIRED for security
        onFinish: (data) => {
          console.log('NFT transfer submitted:', data.txId);
          setTxId(data.txId);
          setIsLoading(false);
          // Refresh NFT info
          setTimeout(loadNFTInfo, 2000);
          // Clear form
          setRecipient('');
          setTokenId('');
        },
        onCancel: () => {
          console.log('NFT transfer cancelled');
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('NFT transfer failed:', error);
      setIsLoading(false);
    }
  };

  const canTransfer = ownerAddress && userSession?.isUserSignedIn() && 
    ownerAddress === userSession.loadUserData().profile.stxAddress[network];

  return (
    <div className="nft-transfer">
      <h3>Transfer NFT</h3>
      
      <div className="form-group">
        <label htmlFor="tokenId">Token ID:</label>
        <input
          type="number"
          id="tokenId"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="1"
          min="1"
          className="token-id-input"
        />
      </div>

      {tokenId && nftInfo && (
        <div className="nft-info">
          <h4>{nftInfo.name}</h4>
          {nftInfo.image && (
            <img 
              src={nftInfo.image.startsWith('ipfs://') 
                ? nftInfo.image.replace('ipfs://', 'https://ipfs.io/ipfs/') 
                : nftInfo.image
              } 
              alt={nftInfo.name}
              className="nft-image"
            />
          )}
          <p>{nftInfo.description}</p>
          <p><strong>Owner:</strong> {ownerAddress || 'Unknown'}</p>
          
          {!canTransfer && ownerAddress && (
            <div className="warning">
              ⚠️ You do not own this NFT. Only the owner can transfer it.
            </div>
          )}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="recipient">Recipient Address:</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
          className="address-input"
        />
      </div>

      <button 
        onClick={handleNFTTransfer} 
        disabled={isLoading || !recipient || !tokenId || !canTransfer}
        className="transfer-btn"
      >
        {isLoading ? 'Transferring...' : 'Transfer NFT'}
      </button>

      {txId && (
        <div className="transaction-result">
          <p>NFT transfer submitted!</p>
          <a 
            href={`https://explorer.stacks.co/txid/${txId}?chain=${network}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Explorer
          </a>
        </div>
      )}
    </div>
  );
};
```

## Advanced Transaction Patterns

### 1. Multi-Asset Atomic Swap

```tsx
// src/components/AtomicSwap.tsx
import React, { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import {
  PostConditionMode,
  makeStandardFungiblePostCondition,
  makeStandardSTXPostCondition,
  FungibleConditionCode,
  createAssetInfo,
  uintCV,
  principalCV,
} from '@stacks/transactions';

export const AtomicSwap: React.FC = () => {
  const { doContractCall, userSession } = useConnect();
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAtomicSwap = async () => {
    if (!userSession?.isUserSignedIn()) return;

    setIsLoading(true);

    try {
      const userData = userSession.loadUserData();
      const userAddress = userData.profile.stxAddress.mainnet;

      const tokenAAmountInBaseUnits = parseInt(tokenAAmount) * 1000000; // Assuming 6 decimals
      const tokenBAmountInBaseUnits = parseInt(tokenBAmount) * 1000000;

      // COMPREHENSIVE post-conditions for both sides of the swap
      const postConditions = [
        // User sends Token A
        makeStandardFungiblePostCondition(
          userAddress,
          FungibleConditionCode.Equal,
          tokenAAmountInBaseUnits,
          createAssetInfo('SP123...ABC', 'token-a', 'token-a')
        ),
        // User receives Token B
        makeStandardFungiblePostCondition(
          userAddress,
          FungibleConditionCode.Equal,
          tokenBAmountInBaseUnits,
          createAssetInfo('SP456...DEF', 'token-b', 'token-b')
        ),
      ];

      await doContractCall({
        contractAddress: 'SP789...GHI',
        contractName: 'atomic-swap-contract',
        functionName: 'execute-swap',
        functionArgs: [
          uintCV(tokenAAmountInBaseUnits),
          uintCV(tokenBAmountInBaseUnits),
        ],
        postConditions,
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          console.log('Atomic swap submitted:', data.txId);
          setIsLoading(false);
        },
        onCancel: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('Atomic swap failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="atomic-swap">
      <h3>Atomic Token Swap</h3>
      
      <div className="swap-inputs">
        <div className="form-group">
          <label>Send Token A:</label>
          <input
            type="number"
            value={tokenAAmount}
            onChange={(e) => setTokenAAmount(e.target.value)}
            placeholder="100"
          />
        </div>

        <div className="swap-arrow">⇄</div>

        <div className="form-group">
          <label>Receive Token B:</label>
          <input
            type="number"
            value={tokenBAmount}
            onChange={(e) => setTokenBAmount(e.target.value)}
            placeholder="95"
          />
        </div>
      </div>

      <button 
        onClick={handleAtomicSwap}
        disabled={isLoading || !tokenAAmount || !tokenBAmount}
        className="swap-btn"
      >
        {isLoading ? 'Swapping...' : 'Execute Swap'}
      </button>
    </div>
  );
};
```

### 2. Batch Operations

```tsx
// src/components/BatchOperations.tsx
import React, { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import {
  PostConditionMode,
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
  createAssetInfo,
  uintCV,
  listCV,
  principalCV,
} from '@stacks/transactions';

interface BatchTransfer {
  recipient: string;
  amount: string;
}

export const BatchOperations: React.FC = () => {
  const { doContractCall, userSession } = useConnect();
  const [transfers, setTransfers] = useState<BatchTransfer[]>([
    { recipient: '', amount: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addTransfer = () => {
    setTransfers([...transfers, { recipient: '', amount: '' }]);
  };

  const removeTransfer = (index: number) => {
    setTransfers(transfers.filter((_, i) => i !== index));
  };

  const updateTransfer = (index: number, field: keyof BatchTransfer, value: string) => {
    const newTransfers = [...transfers];
    newTransfers[index][field] = value;
    setTransfers(newTransfers);
  };

  const handleBatchTransfer = async () => {
    if (!userSession?.isUserSignedIn()) return;

    const validTransfers = transfers.filter(t => t.recipient && t.amount);
    if (validTransfers.length === 0) return;

    setIsLoading(true);

    try {
      const userData = userSession.loadUserData();
      const userAddress = userData.profile.stxAddress.mainnet;

      // Calculate total amount for post-condition
      const totalAmount = validTransfers.reduce(
        (sum, transfer) => sum + (parseInt(transfer.amount) * 1000000),
        0
      );

      // Create post-condition for total amount being sent
      const postConditions = [
        makeStandardFungiblePostCondition(
          userAddress,
          FungibleConditionCode.Equal,
          totalAmount,
          createAssetInfo('SP123...ABC', 'my-token', 'my-token')
        ),
      ];

      // Prepare batch transfer arguments
      const recipients = validTransfers.map(t => principalCV(t.recipient));
      const amounts = validTransfers.map(t => uintCV(parseInt(t.amount) * 1000000));

      await doContractCall({
        contractAddress: 'SP123...ABC',
        contractName: 'batch-operations',
        functionName: 'batch-transfer',
        functionArgs: [
          listCV(recipients),
          listCV(amounts),
        ],
        postConditions,
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
          console.log('Batch transfer submitted:', data.txId);
          setIsLoading(false);
          // Reset form
          setTransfers([{ recipient: '', amount: '' }]);
        },
        onCancel: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('Batch transfer failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="batch-operations">
      <h3>Batch Token Transfer</h3>
      
      {transfers.map((transfer, index) => (
        <div key={index} className="transfer-row">
          <input
            type="text"
            placeholder="Recipient address"
            value={transfer.recipient}
            onChange={(e) => updateTransfer(index, 'recipient', e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transfer.amount}
            onChange={(e) => updateTransfer(index, 'amount', e.target.value)}
          />
          {transfers.length > 1 && (
            <button onClick={() => removeTransfer(index)}>Remove</button>
          )}
        </div>
      ))}

      <div className="batch-controls">
        <button onClick={addTransfer}>Add Transfer</button>
        <button 
          onClick={handleBatchTransfer}
          disabled={isLoading || transfers.every(t => !t.recipient || !t.amount)}
        >
          {isLoading ? 'Processing...' : 'Execute Batch Transfer'}
        </button>
      </div>
    </div>
  );
};
```

## Transaction Status Monitoring

### 1. Transaction Status Hook

```tsx
// src/hooks/useTransactionStatus.ts
import { useState, useEffect } from 'react';
import { StacksApiService } from '../services/StacksApiService';

interface TransactionStatus {
  tx_id: string;
  tx_status: string;
  tx_result?: any;
  block_height?: number;
  burn_block_time_iso?: string;
}

export const useTransactionStatus = (txId: string | null, network: 'mainnet' | 'testnet') => {
  const [status, setStatus] = useState<TransactionStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiService = new StacksApiService();

  useEffect(() => {
    if (!txId) return;

    const checkStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const txStatus = await apiService.getTransactionStatus(txId, network);
        setStatus(txStatus);

        // Continue polling if transaction is pending
        if (txStatus.tx_status === 'pending') {
          setTimeout(checkStatus, 5000); // Check again in 5 seconds
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to check transaction status');
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [txId, network]);

  return { status, loading, error };
};
```

### 2. Transaction Status Component

```tsx
// src/components/TransactionStatus.tsx
import React from 'react';
import { useTransactionStatus } from '../hooks/useTransactionStatus';

interface TransactionStatusProps {
  txId: string | null;
  network: 'mainnet' | 'testnet';
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({ txId, network }) => {
  const { status, loading, error } = useTransactionStatus(txId, network);

  if (!txId) return null;

  if (loading) {
    return (
      <div className="transaction-status loading">
        <div className="spinner"></div>
        <span>Checking transaction status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction-status error">
        <span>❌ Error: {error}</span>
      </div>
    );
  }

  if (!status) return null;

  const getStatusIcon = (txStatus: string) => {
    switch (txStatus) {
      case 'success': return '✅';
      case 'abort_by_response': return '❌';
      case 'abort_by_post_condition': return '⚠️';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  const getStatusMessage = (txStatus: string) => {
    switch (txStatus) {
      case 'success': return 'Transaction confirmed';
      case 'abort_by_response': return 'Transaction failed';
      case 'abort_by_post_condition': return 'Post-condition failed';
      case 'pending': return 'Transaction pending...';
      default: return `Status: ${txStatus}`;
    }
  };

  return (
    <div className={`transaction-status ${status.tx_status}`}>
      <div className="status-header">
        <span className="status-icon">{getStatusIcon(status.tx_status)}</span>
        <span className="status-message">{getStatusMessage(status.tx_status)}</span>
      </div>
      
      <div className="transaction-details">
        <p><strong>Transaction ID:</strong> {status.tx_id}</p>
        {status.block_height && (
          <p><strong>Block Height:</strong> {status.block_height}</p>
        )}
        {status.burn_block_time_iso && (
          <p><strong>Confirmed:</strong> {new Date(status.burn_block_time_iso).toLocaleString()}</p>
        )}
      </div>

      <a 
        href={`https://explorer.stacks.co/txid/${status.tx_id}?chain=${network}`}
        target="_blank"
        rel="noopener noreferrer"
        className="explorer-link"
      >
        View in Explorer
      </a>
    </div>
  );
};
```

## Error Handling & Best Practices

### 1. Comprehensive Error Handling

```tsx
// src/utils/transactionErrors.ts
export const getTransactionErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  
  if (error?.message) {
    const message = error.message.toLowerCase();
    
    if (message.includes('post-condition')) {
      return 'Transaction failed: Post-condition not met. The transaction would not behave as expected.';
    }
    
    if (message.includes('insufficient funds')) {
      return 'Transaction failed: Insufficient funds to complete the transaction.';
    }
    
    if (message.includes('nonce')) {
      return 'Transaction failed: Invalid nonce. Please try again.';
    }
    
    if (message.includes('fee')) {
      return 'Transaction failed: Transaction fee too low.';
    }
    
    if (message.includes('unauthorized')) {
      return 'Transaction failed: You are not authorized to perform this action.';
    }
    
    return `Transaction failed: ${error.message}`;
  }
  
  return 'Transaction failed: Unknown error occurred.';
};
```

### 2. Pre-Transaction Validation

```tsx
// src/utils/transactionValidation.ts
import { StacksApiService } from '../services/StacksApiService';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateTransaction = async (
  userAddress: string,
  recipientAddress: string,
  amount: number,
  tokenContract?: string,
  network: 'mainnet' | 'testnet' = 'testnet'
): Promise<ValidationResult> => {
  const errors: string[] = [];
  const apiService = new StacksApiService();

  // Validate addresses
  if (!apiService.isValidStacksAddress(userAddress)) {
    errors.push('Invalid sender address');
  }

  if (!apiService.isValidStacksAddress(recipientAddress)) {
    errors.push('Invalid recipient address');
  }

  if (userAddress === recipientAddress) {
    errors.push('Cannot send to the same address');
  }

  // Validate amount
  if (amount <= 0) {
    errors.push('Amount must be greater than zero');
  }

  // Check balance
  try {
    if (tokenContract) {
      // Token balance check
      const balance = await apiService.getFungibleTokenBalance(tokenContract, userAddress, network);
      const tokenInfo = await apiService.getFungibleTokenInfo(tokenContract, network);
      const amountInBaseUnits = amount * Math.pow(10, tokenInfo.decimals);
      
      if (parseInt(balance) < amountInBaseUnits) {
        errors.push('Insufficient token balance');
      }
    } else {
      // STX balance check
      const accountInfo = await apiService.getAccountInfo(userAddress, network);
      const amountInMicroSTX = amount * 1000000;
      
      if (parseInt(accountInfo.balance) < amountInMicroSTX) {
        errors.push('Insufficient STX balance');
      }
    }
  } catch (error) {
    errors.push('Failed to check balance');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
```

### 3. Security Best Practices

```tsx
// Always use these security patterns:

// 1. ALWAYS use PostConditionMode.Deny
postConditionMode: PostConditionMode.Deny

// 2. ALWAYS include post-conditions for asset transfers
const postConditions = [
  makeStandardFungiblePostCondition(
    senderAddress,
    FungibleConditionCode.Equal, // Use Equal for exact amounts
    amount,
    assetInfo
  ),
];

// 3. Validate all inputs before transaction
const validation = await validateTransaction(sender, recipient, amount);
if (!validation.isValid) {
  alert(`Invalid transaction: ${validation.errors.join(', ')}`);
  return;
}

// 4. Handle all error cases
try {
  await doContractCall({...});
} catch (error) {
  const errorMessage = getTransactionErrorMessage(error);
  console.error('Transaction failed:', errorMessage);
  // Show user-friendly error message
}

// 5. Monitor transaction status
const { status } = useTransactionStatus(txId, network);
```

This comprehensive guide provides everything needed to implement secure transaction signing and submission in Stacks applications with proper post-condition handling and error management.