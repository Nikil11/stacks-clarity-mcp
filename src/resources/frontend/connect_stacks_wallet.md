# Connect Stacks Wallet Integration Guide

## Overview

This guide provides comprehensive integration with Stacks wallets using `@stacks/connect` and `@stacks/connect-react`. It covers wallet connection, network switching, and user session management for React and vanilla JavaScript applications.

**Supported Wallets:**
- **Leather** (formerly Hiro Wallet) - Most popular Stacks wallet
- **Xverse** - Multi-chain wallet with Stacks support
- **Asigna** - Enterprise-focused Stacks wallet
- **Boom** - Simple Stacks wallet

## React Integration with @stacks/connect-react

### 1. Installation & Setup

```bash
# Install required packages
npm install @stacks/connect @stacks/connect-react @stacks/network @stacks/transactions

# Optional: For advanced features
npm install @stacks/stacks-blockchain-api-types
```

### 2. Provider Setup

```tsx
// src/providers/StacksWalletProvider.tsx
import React from 'react';
import { Connect } from '@stacks/connect-react';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

// App configuration
const appConfig = {
  name: 'My Stacks DApp',
  icon: '/logo.png', // Path to your app icon
};

// Network configuration
const network = process.env.NODE_ENV === 'production' 
  ? new StacksMainnet()
  : new StacksTestnet();

interface StacksWalletProviderProps {
  children: React.ReactNode;
}

export const StacksWalletProvider: React.FC<StacksWalletProviderProps> = ({ children }) => {
  return (
    <Connect
      authOptions={{
        appDetails: appConfig,
        redirectTo: '/', // Redirect after authentication
        onFinish: () => {
          console.log('Authentication completed');
          // Handle successful authentication
        },
        userSession: undefined, // Will be created automatically
      }}
      network={network}
    >
      {children}
    </Connect>
  );
};
```

### 3. App Root Setup

```tsx
// src/App.tsx
import React from 'react';
import { StacksWalletProvider } from './providers/StacksWalletProvider';
import { WalletConnection } from './components/WalletConnection';
import { TokenTransfer } from './components/TokenTransfer';

function App() {
  return (
    <StacksWalletProvider>
      <div className="App">
        <header>
          <h1>My Stacks DApp</h1>
          <WalletConnection />
        </header>
        
        <main>
          <TokenTransfer />
        </main>
      </div>
    </StacksWalletProvider>
  );
}

export default App;
```

### 4. Wallet Connection Component

```tsx
// src/components/WalletConnection.tsx
import React from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const WalletConnection: React.FC = () => {
  const { authenticate, signOut, isSignedIn, userSession } = useConnect();

  // Get user data if signed in
  const userData = isSignedIn ? userSession?.loadUserData() : null;
  const userAddress = userData?.profile?.stxAddress;

  const handleConnect = () => {
    authenticate({
      appDetails: {
        name: 'My Stacks DApp',
        icon: '/logo.png',
      },
      onFinish: (authData) => {
        console.log('Connected:', authData);
        // Handle successful connection
      },
      onCancel: () => {
        console.log('Connection cancelled');
      },
    });
  };

  const handleDisconnect = () => {
    signOut();
    console.log('Disconnected');
  };

  const getDisplayAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isSignedIn && userAddress) {
    return (
      <div className="wallet-connected">
        <div className="user-info">
          <span className="address">
            Connected: {getDisplayAddress(userAddress.mainnet)}
          </span>
          {userData?.profile?.name && (
            <span className="name">{userData.profile.name}</span>
          )}
        </div>
        <button onClick={handleDisconnect} className="disconnect-btn">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-disconnected">
      <button onClick={handleConnect} className="connect-btn">
        Connect Wallet
      </button>
    </div>
  );
};
```

### 5. Network Management Hook

```tsx
// src/hooks/useStacksNetwork.ts
import { useState, useEffect } from 'react';
import { StacksMainnet, StacksTestnet, StacksNetwork } from '@stacks/network';

export type NetworkType = 'mainnet' | 'testnet';

interface UseStacksNetworkReturn {
  network: StacksNetwork;
  networkType: NetworkType;
  switchNetwork: (type: NetworkType) => void;
  isMainnet: boolean;
  isTestnet: boolean;
}

export const useStacksNetwork = (defaultNetwork: NetworkType = 'testnet'): UseStacksNetworkReturn => {
  const [networkType, setNetworkType] = useState<NetworkType>(defaultNetwork);

  const network = networkType === 'mainnet' ? new StacksMainnet() : new StacksTestnet();

  const switchNetwork = (type: NetworkType) => {
    setNetworkType(type);
    // Store preference in localStorage
    localStorage.setItem('stacks-network', type);
  };

  // Load network preference from localStorage
  useEffect(() => {
    const savedNetwork = localStorage.getItem('stacks-network') as NetworkType;
    if (savedNetwork && (savedNetwork === 'mainnet' || savedNetwork === 'testnet')) {
      setNetworkType(savedNetwork);
    }
  }, []);

  return {
    network,
    networkType,
    switchNetwork,
    isMainnet: networkType === 'mainnet',
    isTestnet: networkType === 'testnet',
  };
};
```

### 6. Network Switcher Component

```tsx
// src/components/NetworkSwitcher.tsx
import React from 'react';
import { useStacksNetwork } from '../hooks/useStacksNetwork';

export const NetworkSwitcher: React.FC = () => {
  const { networkType, switchNetwork, isMainnet } = useStacksNetwork();

  return (
    <div className="network-switcher">
      <label htmlFor="network-select">Network:</label>
      <select
        id="network-select"
        value={networkType}
        onChange={(e) => switchNetwork(e.target.value as 'mainnet' | 'testnet')}
        className={`network-select ${isMainnet ? 'mainnet' : 'testnet'}`}
      >
        <option value="testnet">Testnet</option>
        <option value="mainnet">Mainnet</option>
      </select>
      
      <div className="network-status">
        <span className={`status-indicator ${isMainnet ? 'mainnet' : 'testnet'}`}>
          {isMainnet ? '🟢 Mainnet' : '🟡 Testnet'}
        </span>
      </div>
    </div>
  );
};
```

## Vanilla JavaScript Integration

### 1. Basic Setup

```html
<!-- Include Stacks Connect via CDN or npm -->
<script src="https://unpkg.com/@stacks/connect@latest/dist/connect.js"></script>
<script src="https://unpkg.com/@stacks/network@latest/dist/network.js"></script>
```

```javascript
// src/wallet-connection.js
import { 
  showConnect, 
  UserSession, 
  AppConfig 
} from '@stacks/connect';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

class StacksWalletManager {
  constructor() {
    this.appConfig = new AppConfig(['store_write', 'publish_data']);
    this.userSession = new UserSession({ appConfig: this.appConfig });
    this.network = new StacksTestnet(); // Change to StacksMainnet() for production
    
    this.init();
  }

  init() {
    // Check if user is already signed in
    if (this.userSession.isUserSignedIn()) {
      this.handleSignedIn();
    } else if (this.userSession.isSignInPending()) {
      this.userSession.handlePendingSignIn().then(() => {
        this.handleSignedIn();
      });
    }
  }

  async connect() {
    showConnect({
      appDetails: {
        name: 'My Stacks DApp',
        icon: '/logo.png',
      },
      redirectTo: '/',
      onFinish: (authData) => {
        console.log('Connected:', authData);
        this.handleSignedIn();
      },
      onCancel: () => {
        console.log('Connection cancelled');
      },
      userSession: this.userSession,
    });
  }

  disconnect() {
    this.userSession.signUserOut('/');
    this.handleSignedOut();
  }

  handleSignedIn() {
    const userData = this.userSession.loadUserData();
    const address = userData.profile.stxAddress;
    
    console.log('User signed in:', userData);
    
    // Update UI
    this.updateConnectionUI(true, address);
    
    // Emit custom event
    document.dispatchEvent(new CustomEvent('walletConnected', {
      detail: { userData, address }
    }));
  }

  handleSignedOut() {
    console.log('User signed out');
    
    // Update UI
    this.updateConnectionUI(false);
    
    // Emit custom event
    document.dispatchEvent(new CustomEvent('walletDisconnected'));
  }

  updateConnectionUI(isConnected, address = null) {
    const connectBtn = document.getElementById('connect-wallet');
    const disconnectBtn = document.getElementById('disconnect-wallet');
    const addressDisplay = document.getElementById('wallet-address');

    if (isConnected && address) {
      connectBtn.style.display = 'none';
      disconnectBtn.style.display = 'block';
      if (addressDisplay) {
        addressDisplay.textContent = `${address.mainnet.slice(0, 6)}...${address.mainnet.slice(-4)}`;
        addressDisplay.style.display = 'block';
      }
    } else {
      connectBtn.style.display = 'block';
      disconnectBtn.style.display = 'none';
      if (addressDisplay) {
        addressDisplay.style.display = 'none';
      }
    }
  }

  isSignedIn() {
    return this.userSession.isUserSignedIn();
  }

  getUserData() {
    return this.isSignedIn() ? this.userSession.loadUserData() : null;
  }

  getUserAddress() {
    const userData = this.getUserData();
    return userData?.profile?.stxAddress || null;
  }
}

// Initialize wallet manager
const walletManager = new StacksWalletManager();

// Export for global use
window.StacksWallet = walletManager;
```

### 2. HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Stacks DApp</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>My Stacks DApp</h1>
        
        <div class="wallet-connection">
            <button id="connect-wallet">Connect Wallet</button>
            <div class="connected-wallet" style="display: none;">
                <span id="wallet-address"></span>
                <button id="disconnect-wallet">Disconnect</button>
            </div>
        </div>
    </header>

    <main>
        <div id="app-content">
            <!-- Your dApp content here -->
        </div>
    </main>

    <script type="module" src="wallet-connection.js"></script>
    <script>
        // Event listeners
        document.getElementById('connect-wallet').addEventListener('click', () => {
            window.StacksWallet.connect();
        });

        document.getElementById('disconnect-wallet').addEventListener('click', () => {
            window.StacksWallet.disconnect();
        });

        // Listen for wallet events
        document.addEventListener('walletConnected', (event) => {
            console.log('Wallet connected:', event.detail);
            // Enable dApp functionality
        });

        document.addEventListener('walletDisconnected', () => {
            console.log('Wallet disconnected');
            // Disable dApp functionality
        });
    </script>
</body>
</html>
```

## Advanced Features

### 1. Wallet Detection & Multiple Wallet Support

```tsx
// src/hooks/useWalletDetection.ts
import { useState, useEffect } from 'react';

interface WalletInfo {
  name: string;
  installed: boolean;
  icon?: string;
}

export const useWalletDetection = () => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  useEffect(() => {
    const detectWallets = () => {
      const detectedWallets: WalletInfo[] = [];

      // Check for Leather (Hiro Wallet)
      if (window.StacksProvider || window.btc) {
        detectedWallets.push({
          name: 'Leather',
          installed: true,
          icon: '/wallets/leather.png'
        });
      }

      // Check for Xverse
      if (window.XverseProviders?.StacksProvider) {
        detectedWallets.push({
          name: 'Xverse',
          installed: true,
          icon: '/wallets/xverse.png'
        });
      }

      // Add more wallet detections as needed
      
      setWallets(detectedWallets);
    };

    detectWallets();
  }, []);

  return { wallets, hasWallets: wallets.length > 0 };
};
```

### 2. Connection State Management

```tsx
// src/context/WalletContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { UserSession } from '@stacks/connect';

interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  userAddress: string | null;
  userData: any | null;
  error: string | null;
}

type WalletAction = 
  | { type: 'CONNECTING' }
  | { type: 'CONNECTED'; payload: { address: string; userData: any } }
  | { type: 'DISCONNECTED' }
  | { type: 'ERROR'; payload: string };

const initialState: WalletState = {
  isConnected: false,
  isConnecting: false,
  userAddress: null,
  userData: null,
  error: null,
};

const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'CONNECTING':
      return { ...state, isConnecting: true, error: null };
    case 'CONNECTED':
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        userAddress: action.payload.address,
        userData: action.payload.userData,
        error: null,
      };
    case 'DISCONNECTED':
      return { ...initialState };
    case 'ERROR':
      return { ...state, isConnecting: false, error: action.payload };
    default:
      return state;
  }
};

const WalletContext = createContext<{
  state: WalletState;
  dispatch: React.Dispatch<WalletAction>;
} | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  return (
    <WalletContext.Provider value={{ state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
```

### 3. Account Balance Display

```tsx
// src/components/AccountBalance.tsx
import React, { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksApiService } from '../services/StacksApiService';

interface TokenBalance {
  symbol: string;
  balance: string;
  decimals: number;
}

export const AccountBalance: React.FC = () => {
  const { isSignedIn, userSession } = useConnect();
  const [stxBalance, setStxBalance] = useState<string>('0');
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);

  const apiService = new StacksApiService();

  useEffect(() => {
    if (isSignedIn && userSession) {
      fetchBalances();
    }
  }, [isSignedIn, userSession]);

  const fetchBalances = async () => {
    if (!userSession?.isUserSignedIn()) return;

    setLoading(true);
    try {
      const userData = userSession.loadUserData();
      const address = userData.profile.stxAddress.mainnet;

      // Fetch STX balance
      const accountInfo = await apiService.getAccountInfo(address, 'mainnet');
      setStxBalance(apiService.microStxToStx(accountInfo.balance).toString());

      // Fetch token balances
      const balances = await apiService.getAccountBalance(address, 'mainnet');
      
      const tokens: TokenBalance[] = [];
      for (const [contractId, tokenData] of Object.entries(balances.fungible_tokens || {})) {
        try {
          const tokenInfo = await apiService.getFungibleTokenInfo(contractId, 'mainnet');
          tokens.push({
            symbol: tokenInfo.symbol,
            balance: (parseInt(tokenData.balance) / Math.pow(10, tokenInfo.decimals)).toString(),
            decimals: tokenInfo.decimals,
          });
        } catch (error) {
          console.error(`Failed to fetch token info for ${contractId}:`, error);
        }
      }
      
      setTokenBalances(tokens);
    } catch (error) {
      console.error('Failed to fetch balances:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="account-balance">
      <h3>Account Balance</h3>
      
      {loading ? (
        <div className="loading">Loading balances...</div>
      ) : (
        <div className="balances">
          <div className="stx-balance">
            <span className="amount">{parseFloat(stxBalance).toLocaleString()}</span>
            <span className="currency">STX</span>
          </div>
          
          {tokenBalances.length > 0 && (
            <div className="token-balances">
              <h4>Token Balances</h4>
              {tokenBalances.map((token, index) => (
                <div key={index} className="token-balance">
                  <span className="amount">{parseFloat(token.balance).toLocaleString()}</span>
                  <span className="currency">{token.symbol}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <button onClick={fetchBalances} disabled={loading} className="refresh-btn">
        Refresh
      </button>
    </div>
  );
};
```

### 4. Transaction History Component

```tsx
// src/components/TransactionHistory.tsx
import React, { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { StacksApiService } from '../services/StacksApiService';

interface Transaction {
  tx_id: string;
  tx_type: string;
  tx_status: string;
  burn_block_time_iso: string;
  fee_rate: string;
}

export const TransactionHistory: React.FC = () => {
  const { isSignedIn, userSession } = useConnect();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const apiService = new StacksApiService();

  useEffect(() => {
    if (isSignedIn && userSession) {
      fetchTransactions();
    }
  }, [isSignedIn, userSession]);

  const fetchTransactions = async () => {
    if (!userSession?.isUserSignedIn()) return;

    setLoading(true);
    try {
      const userData = userSession.loadUserData();
      const address = userData.profile.stxAddress.mainnet;

      const txHistory = await apiService.getAccountTransactions(address, 'mainnet', 10);
      setTransactions(txHistory.results || []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString();
  };

  const getExplorerUrl = (txId: string) => {
    return `https://explorer.stacks.co/txid/${txId}`;
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="transaction-history">
      <h3>Recent Transactions</h3>
      
      {loading ? (
        <div className="loading">Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="no-transactions">No transactions found</div>
      ) : (
        <div className="transactions">
          {transactions.map((tx) => (
            <div key={tx.tx_id} className={`transaction ${tx.tx_status}`}>
              <div className="tx-info">
                <span className="tx-type">{tx.tx_type}</span>
                <span className="tx-status">{tx.tx_status}</span>
              </div>
              
              <div className="tx-details">
                <span className="tx-date">{formatDate(tx.burn_block_time_iso)}</span>
                <a 
                  href={getExplorerUrl(tx.tx_id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tx-link"
                >
                  View in Explorer
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={fetchTransactions} disabled={loading} className="refresh-btn">
        Refresh
      </button>
    </div>
  );
};
```

## Styling Examples

### CSS for Wallet Components

```css
/* src/styles/wallet.css */

.wallet-connected {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f9ff;
  border: 1px solid #0284c7;
  border-radius: 0.5rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.address {
  font-family: monospace;
  font-size: 0.875rem;
  color: #1e40af;
}

.name {
  font-size: 0.75rem;
  color: #64748b;
}

.disconnect-btn {
  padding: 0.25rem 0.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.disconnect-btn:hover {
  background: #dc2626;
}

.connect-btn {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
}

.connect-btn:hover {
  background: #2563eb;
}

.network-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.network-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background: white;
}

.network-select.mainnet {
  border-color: #10b981;
}

.network-select.testnet {
  border-color: #f59e0b;
}

.status-indicator {
  font-size: 0.875rem;
  font-weight: 500;
}

.account-balance {
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stx-balance {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stx-balance .amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

.stx-balance .currency {
  font-size: 1rem;
  color: #6b7280;
}

.token-balances {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.token-balance {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.refresh-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.refresh-btn:hover {
  background: #4b5563;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.transaction-history {
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.transaction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.transaction.success {
  background: #f0fdf4;
  border-color: #22c55e;
}

.transaction.pending {
  background: #fffbeb;
  border-color: #f59e0b;
}

.transaction.abort_by_response {
  background: #fef2f2;
  border-color: #ef4444;
}

.tx-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tx-type {
  font-weight: 500;
  text-transform: capitalize;
}

.tx-status {
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: capitalize;
}

.tx-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.tx-date {
  font-size: 0.875rem;
  color: #6b7280;
}

.tx-link {
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
}

.tx-link:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.no-transactions {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
}
```

## Error Handling & Best Practices

### 1. Connection Error Handling

```tsx
// src/hooks/useWalletConnection.ts
import { useState, useCallback } from 'react';
import { useConnect } from '@stacks/connect-react';

export const useWalletConnection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authenticate, signOut } = useConnect();

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      await authenticate({
        appDetails: {
          name: 'My Stacks DApp',
          icon: '/logo.png',
        },
        onFinish: () => {
          setIsConnecting(false);
          setError(null);
        },
        onCancel: () => {
          setIsConnecting(false);
          setError('Connection cancelled by user');
        },
      });
    } catch (err) {
      setIsConnecting(false);
      setError(err instanceof Error ? err.message : 'Connection failed');
    }
  }, [authenticate]);

  const disconnect = useCallback(() => {
    try {
      signOut();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Disconnection failed');
    }
  }, [signOut]);

  return {
    connect,
    disconnect,
    isConnecting,
    error,
    clearError: () => setError(null),
  };
};
```

### 2. Network Validation

```tsx
// src/utils/networkValidation.ts
import { StacksNetwork } from '@stacks/network';

export const validateNetwork = (address: string, network: StacksNetwork): boolean => {
  const isMainnetAddress = address.startsWith('SP');
  const isTestnetAddress = address.startsWith('ST');
  const isMainnetNetwork = network.coreApiUrl.includes('mainnet');

  if (isMainnetNetwork && !isMainnetAddress) {
    throw new Error('Mainnet selected but wallet is on testnet');
  }

  if (!isMainnetNetwork && !isTestnetAddress) {
    throw new Error('Testnet selected but wallet is on mainnet');
  }

  return true;
};
```

### 3. Session Persistence

```tsx
// src/utils/sessionPersistence.ts
export const saveWalletSession = (userData: any) => {
  try {
    localStorage.setItem('stacks-wallet-session', JSON.stringify(userData));
  } catch (error) {
    console.warn('Failed to save wallet session:', error);
  }
};

export const loadWalletSession = () => {
  try {
    const saved = localStorage.getItem('stacks-wallet-session');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load wallet session:', error);
    return null;
  }
};

export const clearWalletSession = () => {
  try {
    localStorage.removeItem('stacks-wallet-session');
  } catch (error) {
    console.warn('Failed to clear wallet session:', error);
  }
};
```

## Security Considerations

### 1. Address Validation

```tsx
const validateStacksAddress = (address: string): boolean => {
  const addressRegex = /^S[PT][A-Z0-9]{39}$/;
  return addressRegex.test(address);
};
```

### 2. Secure Session Handling

```tsx
// Always verify user session before sensitive operations
const verifyUserSession = (userSession: UserSession): boolean => {
  return userSession.isUserSignedIn() && !userSession.isSignInPending();
};
```

### 3. Network Mismatch Detection

```tsx
const detectNetworkMismatch = (address: string, expectedNetwork: 'mainnet' | 'testnet'): boolean => {
  const isMainnetAddress = address.startsWith('SP');
  const isTestnetAddress = address.startsWith('ST');
  
  if (expectedNetwork === 'mainnet' && !isMainnetAddress) return true;
  if (expectedNetwork === 'testnet' && !isTestnetAddress) return true;
  
  return false;
};
```

This comprehensive guide provides everything needed to integrate Stacks wallets securely and effectively in both React and vanilla JavaScript applications.