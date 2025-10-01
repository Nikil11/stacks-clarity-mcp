# How to Build a Complete Stacks Frontend

## Overview

Building a frontend for Stacks dApps involves wallet integration, transaction signing with mandatory post-conditions, contract interactions, and user experience optimization. This guide provides comprehensive coverage for professional Stacks frontend development.

## Quick Start Template

The official Stacks frontend template provides an optimized starting point:

```bash
# Clone the official Stacks frontend template
git clone https://github.com/hirosystems/stacks-nextjs-template.git
cd stacks-nextjs-template

# Install dependencies
npm install

# Start development server
npm run dev
```

**Template Features:**
- ✅ Next.js with TypeScript
- ✅ @stacks/connect wallet integration
- ✅ Pre-configured for Stacks mainnet/testnet
- ✅ Built-in transaction signing with post-conditions
- ✅ Responsive design with Tailwind CSS
- ✅ Comprehensive examples and patterns

## Core Dependencies

### Essential Stacks Packages

```json
{
  "dependencies": {
    "@stacks/connect": "^7.6.0",
    "@stacks/transactions": "^6.13.0",
    "@stacks/network": "^6.13.0",
    "@stacks/auth": "^6.5.0",
    "@stacks/profile": "^6.5.0",
    "@stacks/storage": "^6.5.0",
    "@stacks/common": "^6.13.0"
  }
}
```

### Framework-Specific Setup

#### React/Next.js (Recommended)
```bash
# Create new Next.js app
npx create-next-app@latest my-stacks-app --typescript --tailwind --app

# Add Stacks dependencies
npm install @stacks/connect @stacks/transactions @stacks/network
```

#### Vue.js
```bash
# Create Vue app
npm create vue@latest my-stacks-app

# Add Stacks dependencies
npm install @stacks/connect @stacks/transactions @stacks/network
```

#### Svelte/SvelteKit
```bash
# Create SvelteKit app
npm create svelte@latest my-stacks-app

# Add Stacks dependencies
npm install @stacks/connect @stacks/transactions @stacks/network
```

## Wallet Integration

### 1. Basic Wallet Connection

```typescript
// hooks/useConnect.ts
import { useConnect } from '@stacks/connect-react';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

export function useStacksConnect() {
  const { authenticate, signOut, authOptions } = useConnect({
    appDetails: {
      name: 'My Stacks App',
      icon: window.location.origin + '/logo.png',
    },
    redirectTo: '/',
    onFinish: () => {
      // Authentication successful
      console.log('User authenticated');
    },
    userSession: undefined // Will be created automatically
  });

  return {
    authenticate,
    signOut,
    authOptions
  };
}
```

### 2. Multi-Wallet Support

```typescript
// components/WalletConnector.tsx
import { useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/auth';
import { 
  openSignatureRequestPopup,
  openContractCall
} from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export function WalletConnector() {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'My Stacks dApp',
        icon: '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        setWalletConnected(true);
        console.log('Wallet connected successfully');
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut('/');
    setWalletConnected(false);
  };

  return (
    <div>
      {walletConnected ? (
        <div>
          <p>Connected: {userSession.loadUserData()?.profile?.stxAddress}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
```

### 3. Wallet Detection & Recommendation

```typescript
// utils/walletDetection.ts
export const SUPPORTED_WALLETS = {
  hiro: {
    name: 'Hiro Wallet',
    icon: '/wallets/hiro.png',
    downloadUrl: 'https://wallet.hiro.so/',
    isInstalled: () => typeof window !== 'undefined' && window.HiroWalletProvider
  },
  xverse: {
    name: 'Xverse',
    icon: '/wallets/xverse.png',
    downloadUrl: 'https://xverse.app/',
    isInstalled: () => typeof window !== 'undefined' && window.XverseProviders
  },
  leather: {
    name: 'Leather',
    icon: '/wallets/leather.png', 
    downloadUrl: 'https://leather.io/',
    isInstalled: () => typeof window !== 'undefined' && window.LeatherProvider
  }
};

export function getInstalledWallets() {
  return Object.entries(SUPPORTED_WALLETS)
    .filter(([_, wallet]) => wallet.isInstalled())
    .map(([key, wallet]) => ({ key, ...wallet }));
}
```

## Transaction Handling

### 1. Contract Calls with Post-Conditions

```typescript
// services/contractInteraction.ts
import {
  openContractCall,
  ContractCallOptions,
} from '@stacks/connect';
import {
  uintCV,
  principalCV,
  stringAsciiCV,
  PostConditionMode,
  makeStandardSTXPostCondition,
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
  createAssetInfo
} from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

export async function callContractFunction({
  contractAddress,
  contractName,
  functionName,
  functionArgs,
  postConditions = [],
  onSuccess,
  onCancel
}: {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  postConditions?: any[];
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
}) {
  const options: ContractCallOptions = {
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    network: new StacksMainnet(),
    postConditionMode: PostConditionMode.Deny, // CRITICAL: Always use Deny mode
    postConditions,
    onFinish: (data) => {
      console.log('Transaction submitted:', data.txId);
      onSuccess?.(data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
      onCancel?.();
    },
  };

  await openContractCall(options);
}

// Example: SIP-010 Token Transfer with Post-Conditions
export async function transferSIP010Token({
  tokenContractAddress,
  tokenContractName,
  amount,
  recipient,
  memo,
  senderAddress
}: {
  tokenContractAddress: string;
  tokenContractName: string;
  amount: number;
  recipient: string;
  memo?: string;
  senderAddress: string;
}) {
  // Create mandatory post-condition for token transfer
  const tokenAssetInfo = createAssetInfo(
    tokenContractAddress,
    tokenContractName
  );
  
  const postCondition = makeStandardFungiblePostCondition(
    senderAddress,
    FungibleConditionCode.Equal,
    amount,
    tokenAssetInfo
  );

  await callContractFunction({
    contractAddress: tokenContractAddress,
    contractName: tokenContractName,
    functionName: 'transfer',
    functionArgs: [
      uintCV(amount),
      principalCV(senderAddress),
      principalCV(recipient),
      memo ? stringAsciiCV(memo) : null
    ],
    postConditions: [postCondition], // MANDATORY for token transfers
    onSuccess: (data) => {
      console.log('Token transfer successful:', data.txId);
    }
  });
}
```

### 2. STX Transfers

```typescript
// services/stxTransfer.ts
import { openSTXTransfer } from '@stacks/connect';
import { 
  PostConditionMode,
  makeStandardSTXPostCondition,
  FungibleConditionCode
} from '@stacks/transactions';

export async function transferSTX({
  amount,
  recipient,
  memo,
  senderAddress
}: {
  amount: number;
  recipient: string;
  memo?: string;
  senderAddress: string;
}) {
  // Create post-condition for STX transfer
  const postCondition = makeStandardSTXPostCondition(
    senderAddress,
    FungibleConditionCode.Equal,
    amount
  );

  await openSTXTransfer({
    recipient,
    amount,
    memo,
    network: new StacksMainnet(),
    postConditionMode: PostConditionMode.Deny, // CRITICAL
    postConditions: [postCondition], // MANDATORY
    onFinish: (data) => {
      console.log('STX transfer successful:', data.txId);
    },
    onCancel: () => {
      console.log('STX transfer cancelled');
    }
  });
}
```

### 3. Transaction Status Monitoring

```typescript
// hooks/useTransactionStatus.ts
import { useState, useEffect } from 'react';
import { StacksApiService } from '../services/StacksApiService';

export function useTransactionStatus(txId: string | null) {
  const [status, setStatus] = useState<'pending' | 'success' | 'failed' | null>(null);
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    if (!txId) return;

    const apiService = new StacksApiService();
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const tx = await apiService.getTransaction(txId);
        setTransaction(tx);
        
        if (tx.tx_status === 'success') {
          setStatus('success');
          clearInterval(intervalId);
        } else if (tx.tx_status === 'abort_by_response' || tx.tx_status === 'abort_by_post_condition') {
          setStatus('failed');
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error checking transaction status:', error);
      }
    };

    // Check immediately
    checkStatus();
    
    // Then check every 30 seconds
    intervalId = setInterval(checkStatus, 30000);

    return () => clearInterval(intervalId);
  }, [txId]);

  return { status, transaction };
}
```

## State Management

### 1. React Context for User State

```typescript
// context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserSession, AppConfig } from '@stacks/auth';

interface UserContextType {
  userSession: UserSession;
  userData: any;
  isSignedIn: boolean;
  userAddress: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const appConfig = new AppConfig(['store_write', 'publish_data']);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userSession] = useState(() => new UserSession({ appConfig }));
  const [userData, setUserData] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setIsSignedIn(true);
        setUserAddress(userData?.profile?.stxAddress || null);
      });
    } else if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setUserData(userData);
      setIsSignedIn(true);
      setUserAddress(userData?.profile?.stxAddress || null);
    }
  }, [userSession]);

  return (
    <UserContext.Provider value={{
      userSession,
      userData,
      isSignedIn,
      userAddress
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

### 2. Contract State Management

```typescript
// hooks/useContractState.ts
import { useState, useEffect } from 'react';
import { 
  callReadOnlyFunction,
  cvToValue,
  standardPrincipalCV
} from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

export function useContractState(
  contractAddress: string,
  contractName: string,
  functionName: string,
  functionArgs: any[] = []
) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractState = async () => {
      try {
        setLoading(true);
        const result = await callReadOnlyFunction({
          contractAddress,
          contractName,
          functionName,
          functionArgs,
          network: new StacksMainnet(),
          senderAddress: contractAddress, // Use contract address as sender for read-only calls
        });

        setData(cvToValue(result));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContractState();
  }, [contractAddress, contractName, functionName, JSON.stringify(functionArgs)]);

  return { data, loading, error, refetch: () => setLoading(true) };
}

// Example usage: Get token balance
export function useTokenBalance(tokenContract: string, userAddress: string) {
  return useContractState(
    tokenContract.split('.')[0],
    tokenContract.split('.')[1],
    'get-balance',
    [standardPrincipalCV(userAddress)]
  );
}
```

## UI Components

### 1. Wallet Connection Component

```typescript
// components/WalletConnection.tsx
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { showConnect } from '@stacks/auth';

export function WalletConnection() {
  const { userSession, isSignedIn, userAddress } = useUser();
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    setConnecting(true);
    
    showConnect({
      appDetails: {
        name: 'My Stacks dApp',
        icon: '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        setConnecting(false);
        window.location.reload(); // Refresh to update context
      },
      onCancel: () => {
        setConnecting(false);
      },
      userSession,
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut('/');
  };

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <div className="font-medium">Connected</div>
          <div className="text-gray-500 font-mono text-xs">
            {userAddress?.slice(0, 8)}...{userAddress?.slice(-8)}
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={connecting}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {connecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
```

### 2. Transaction Form Component

```typescript
// components/TokenTransferForm.tsx
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { transferSIP010Token } from '../services/contractInteraction';

export function TokenTransferForm({ tokenContract }: { tokenContract: string }) {
  const { userAddress } = useUser();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAddress) return;

    setLoading(true);
    
    try {
      const [contractAddress, contractName] = tokenContract.split('.');
      
      await transferSIP010Token({
        tokenContractAddress: contractAddress,
        tokenContractName: contractName,
        amount: parseInt(amount) * 1000000, // Convert to micro-units
        recipient,
        memo: memo || undefined,
        senderAddress: userAddress
      });
      
      // Reset form
      setRecipient('');
      setAmount('');
      setMemo('');
    } catch (error) {
      console.error('Transfer failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleTransfer} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Recipient Address</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1.0"
          step="0.000001"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Memo (Optional)</label>
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Payment for services"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading || !userAddress}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Transferring...' : 'Transfer Tokens'}
      </button>
    </form>
  );
}
```

### 3. Account Balance Display

```typescript
// components/AccountBalance.tsx
import { useTokenBalance } from '../hooks/useContractState';
import { useUser } from '../context/UserContext';

export function AccountBalance({ tokenContract }: { tokenContract: string }) {
  const { userAddress } = useUser();
  const { data: balance, loading, error } = useTokenBalance(tokenContract, userAddress || '');

  if (!userAddress) {
    return <div className="text-gray-500">Connect wallet to view balance</div>;
  }

  if (loading) {
    return <div className="text-gray-500">Loading balance...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading balance: {error}</div>;
  }

  const formattedBalance = balance ? (balance / 1000000).toFixed(6) : '0';

  return (
    <div className="p-4 bg-gray-50 rounded">
      <div className="text-sm text-gray-600">Your Balance</div>
      <div className="text-2xl font-bold">{formattedBalance}</div>
      <div className="text-xs text-gray-500 font-mono">{tokenContract}</div>
    </div>
  );
}
```

## Error Handling

### 1. Transaction Error Handler

```typescript
// utils/errorHandling.ts
export interface TransactionError {
  type: 'post_condition' | 'insufficient_funds' | 'contract_error' | 'network_error' | 'user_rejected';
  message: string;
  details?: any;
}

export function parseTransactionError(error: any): TransactionError {
  const errorMessage = error?.message || error?.toString() || 'Unknown error';
  
  if (errorMessage.includes('PostCondition')) {
    return {
      type: 'post_condition',
      message: 'Transaction failed due to post-condition check. This is a security feature.',
      details: error
    };
  }
  
  if (errorMessage.includes('insufficient')) {
    return {
      type: 'insufficient_funds',
      message: 'Insufficient funds to complete the transaction.',
      details: error
    };
  }
  
  if (errorMessage.includes('rejected') || errorMessage.includes('cancelled')) {
    return {
      type: 'user_rejected',
      message: 'Transaction was cancelled by the user.',
      details: error
    };
  }
  
  if (errorMessage.includes('runtime_error')) {
    return {
      type: 'contract_error',
      message: 'Smart contract execution failed. Check function parameters.',
      details: error
    };
  }
  
  return {
    type: 'network_error',
    message: 'Network error occurred. Please try again.',
    details: error
  };
}

export function getErrorMessage(error: TransactionError): string {
  switch (error.type) {
    case 'post_condition':
      return 'Security check failed. Please verify transaction details.';
    case 'insufficient_funds':
      return 'You don\'t have enough funds for this transaction.';
    case 'user_rejected':
      return 'Transaction was cancelled.';
    case 'contract_error':
      return 'Contract execution failed. Please check your inputs.';
    case 'network_error':
      return 'Network error. Please check your connection and try again.';
    default:
      return 'An unexpected error occurred.';
  }
}
```

### 2. Error Boundary Component

```typescript
// components/ErrorBoundary.tsx
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-md mx-auto bg-red-50 border border-red-200 rounded">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Network Configuration

### 1. Network Switcher

```typescript
// components/NetworkSwitcher.tsx
import { useState } from 'react';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

type NetworkType = 'mainnet' | 'testnet';

export function NetworkSwitcher() {
  const [network, setNetwork] = useState<NetworkType>('mainnet');

  const networks = {
    mainnet: {
      name: 'Mainnet',
      network: new StacksMainnet(),
      explorer: 'https://explorer.stacks.co'
    },
    testnet: {
      name: 'Testnet',
      network: new StacksTestnet(),
      explorer: 'https://explorer.stacks.co/?chain=testnet'
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Network:</label>
      <select
        value={network}
        onChange={(e) => setNetwork(e.target.value as NetworkType)}
        className="p-1 text-sm border border-gray-300 rounded"
      >
        <option value="mainnet">Mainnet</option>
        <option value="testnet">Testnet</option>
      </select>
      <a
        href={networks[network].explorer}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 hover:underline"
      >
        Explorer ↗
      </a>
    </div>
  );
}
```

## Testing

### 1. Component Testing

```typescript
// __tests__/WalletConnection.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { WalletConnection } from '../components/WalletConnection';
import { UserProvider } from '../context/UserContext';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <UserProvider>
      {component}
    </UserProvider>
  );
};

describe('WalletConnection', () => {
  it('renders connect button when not signed in', () => {
    renderWithProviders(<WalletConnection />);
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('shows connection status when signed in', () => {
    // Mock signed in state
    const mockUserSession = {
      isUserSignedIn: () => true,
      loadUserData: () => ({
        profile: { stxAddress: 'SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R' }
      })
    };

    renderWithProviders(<WalletConnection />);
    // Add assertions for signed in state
  });
});
```

### 2. Integration Testing

```typescript
// __tests__/tokenTransfer.integration.test.ts
import { transferSIP010Token } from '../services/contractInteraction';

// Mock the Stacks Connect
jest.mock('@stacks/connect', () => ({
  openContractCall: jest.fn()
}));

describe('Token Transfer Integration', () => {
  it('should create proper post-conditions for token transfer', async () => {
    const mockOpenContractCall = require('@stacks/connect').openContractCall;
    
    await transferSIP010Token({
      tokenContractAddress: 'SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R',
      tokenContractName: 'my-token',
      amount: 1000000,
      recipient: 'SP2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
      senderAddress: 'SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R'
    });

    expect(mockOpenContractCall).toHaveBeenCalledWith(
      expect.objectContaining({
        postConditionMode: 'deny',
        postConditions: expect.arrayContaining([
          expect.objectContaining({
            conditionType: 'Fungible'
          })
        ])
      })
    );
  });
});
```

## Performance Optimization

### 1. Code Splitting

```typescript
// components/LazyComponents.tsx
import { lazy, Suspense } from 'react';

const TokenTransferForm = lazy(() => import('./TokenTransferForm'));
const AccountBalance = lazy(() => import('./AccountBalance'));

export function LazyTokenTransfer(props: any) {
  return (
    <Suspense fallback={<div>Loading transfer form...</div>}>
      <TokenTransferForm {...props} />
    </Suspense>
  );
}

export function LazyAccountBalance(props: any) {
  return (
    <Suspense fallback={<div>Loading balance...</div>}>
      <AccountBalance {...props} />
    </Suspense>
  );
}
```

### 2. Data Caching

```typescript
// hooks/useCachedContractCall.ts
import { useState, useEffect } from 'react';
import { callReadOnlyFunction } from '@stacks/transactions';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

export function useCachedContractCall(
  contractAddress: string,
  contractName: string,
  functionName: string,
  functionArgs: any[] = []
) {
  const cacheKey = `${contractAddress}.${contractName}.${functionName}.${JSON.stringify(functionArgs)}`;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        const result = await callReadOnlyFunction({
          contractAddress,
          contractName,
          functionName,
          functionArgs,
          network: new StacksMainnet(),
          senderAddress: contractAddress,
        });

        const data = cvToValue(result);
        cache.set(cacheKey, { data, timestamp: Date.now() });
        setData(data);
      } catch (error) {
        console.error('Contract call failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cacheKey]);

  return { data, loading };
}
```

## Security Best Practices

### 1. Input Validation

```typescript
// utils/validation.ts
import { validateStacksAddress } from '@stacks/transactions';

export function validateTransferAmount(amount: string): string | null {
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) {
    return 'Amount must be a positive number';
  }
  if (num > 1000000) {
    return 'Amount too large';
  }
  return null;
}

export function validateStacksAddr(address: string): string | null {
  if (!address) {
    return 'Address is required';
  }
  
  if (!validateStacksAddress(address)) {
    return 'Invalid Stacks address format';
  }
  
  return null;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
```

### 2. CSP Headers

```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.stacks.co;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              connect-src 'self' https://api.stacks.co https://stacks-node-api.mainnet.stacks.co;
              frame-src 'none';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

## Deployment

### 1. Environment Configuration

```env
# .env.production
NEXT_PUBLIC_STACKS_NETWORK=mainnet
NEXT_PUBLIC_STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co
NEXT_PUBLIC_EXPLORER_URL=https://explorer.stacks.co

# .env.development  
NEXT_PUBLIC_STACKS_NETWORK=testnet
NEXT_PUBLIC_STACKS_API_URL=https://stacks-node-api.testnet.stacks.co
NEXT_PUBLIC_EXPLORER_URL=https://explorer.stacks.co/?chain=testnet
```

### 2. Build Configuration

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "dev": "next dev",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:e2e": "playwright test"
  }
}
```

## Summary Checklist

### Essential Features
- [ ] Wallet connection with multiple wallet support
- [ ] Transaction signing with mandatory post-conditions
- [ ] Contract interaction (read/write operations)
- [ ] Transaction status monitoring
- [ ] Error handling and user feedback
- [ ] Network switching (mainnet/testnet)

### Security Requirements
- [ ] PostConditionMode.Deny for all transactions
- [ ] Input validation and sanitization
- [ ] Proper error boundaries
- [ ] CSP headers configuration
- [ ] Secure storage practices

### Performance Optimizations
- [ ] Code splitting for large components
- [ ] Data caching for contract calls
- [ ] Optimized re-renders
- [ ] Bundle size optimization

### Testing Coverage
- [ ] Unit tests for components
- [ ] Integration tests for transaction flows
- [ ] E2E tests for critical user journeys
- [ ] Error scenario testing

Your Stacks frontend is now ready for production deployment with security, performance, and user experience optimized!