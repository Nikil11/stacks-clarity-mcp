# How to Configure a Stacks Admin Account

The admin account for a Stacks dApp is used to deploy Clarity contracts and manage administrative functions. This guide covers secure setup and management of admin accounts for Stacks development.

## Overview

Admin accounts in Stacks development typically handle:
- **Contract Deployment**: Publishing Clarity smart contracts
- **Administrative Functions**: Managing contract settings and permissions
- **Asset Management**: Controlling token minting, burning, and transfers
- **Governance Operations**: Managing DAO and protocol upgrades

## Security Best Practices

### 🔐 Critical Security Rules
1. **Never commit private keys** to version control
2. **Use hardware wallets** for mainnet admin accounts
3. **Implement multi-signature** for high-value operations
4. **Rotate keys regularly** and use time-locked operations
5. **Test thoroughly** on devnet/testnet before mainnet

## Method 1: Generate New Admin Account

### Using Stacks CLI

```bash
# Install Stacks CLI if not already installed
npm install -g @stacks/cli

# Generate new account
stx make_keychain

# Output will include:
# {
#   "mnemonic": "word1 word2 ... word24",
#   "keyInfo": {
#     "privateKey": "64-character-hex-string",
#     "address": "SP...", // mainnet address
#     "btcAddress": "bitcoin-address",
#     "wif": "wallet-import-format",
#     "index": 0
#   }
# }
```

### Using Clarinet

```bash
# Initialize new Clarinet project with fresh accounts
clarinet new my-project
cd my-project

# Check generated accounts in settings/Devnet.toml
cat settings/Devnet.toml

# Accounts are automatically configured with:
# - Deployer account (for contract deployment)
# - Multiple wallet accounts (for testing)
```

### Using JavaScript/TypeScript

```typescript
import { generateWallet } from '@stacks/wallet-sdk';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

// Generate new wallet
const wallet = await generateWallet({
  secretKey: 'your-secret-key-here', // Optional, auto-generated if not provided
  password: 'secure-password'
});

const account = wallet.accounts[0];
console.log('Address:', account.stxAddress);
console.log('Private Key:', account.stxPrivateKey);
```

## Method 2: Import Existing Account

### From Mnemonic Phrase

```typescript
import { Wallet } from '@stacks/wallet-sdk';

const wallet = new Wallet({
  secretKey: 'abandon abandon abandon ... abandon abandon about', // 24-word mnemonic
  password: 'secure-password'
});

const account = wallet.accounts[0];
```

### From Private Key

```typescript
import { createStacksPrivateKey, getAddressFromPrivateKey } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

const privateKey = 'your-64-character-hex-private-key';
const stacksPrivateKey = createStacksPrivateKey(privateKey);
const address = getAddressFromPrivateKey(stacksPrivateKey.data, new StacksMainnet());
```

## Environment Configuration

### .env File Setup

Create a `.env` file in your project root:

```env
# Stacks Admin Account Configuration
STACKS_NETWORK=mainnet
STACKS_ADMIN_PRIVATE_KEY=64-character-hex-string
STACKS_ADMIN_ADDRESS=SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R

# API Configuration
STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co
STACKS_EXPLORER_URL=https://explorer.stacks.co

# Development Settings
DEBUG=true
LOG_LEVEL=info

# Security Settings (optional)
ADMIN_MULTISIG_THRESHOLD=2
ADMIN_BACKUP_ADDRESSES=SP2...,SP3...
```

### Clarinet Configuration

Update your `Clarinet.toml`:

```toml
[project]
name = "my-stacks-project"
authors = ["admin@example.com"]

# Admin contract configuration
[contracts.admin-contract]
path = "contracts/admin.clar"
clarity_version = 2
epoch = "2.4"

# Admin account settings
[accounts.admin]
mnemonic = "env:ADMIN_MNEMONIC" # Reference environment variable
balance = 100000000000000

[repl.analysis]
passes = ["check_checker"]
```

## Account Security Configuration

### Multi-Signature Setup

```clarity
;; admin.clar - Multi-signature admin contract
(define-constant ERR-UNAUTHORIZED (err u401))
(define-constant ERR-INSUFFICIENT-SIGNATURES (err u402))

(define-data-var admin-threshold uint u2)
(define-data-var admin-count uint u3)

(define-map admin-addresses principal bool)
(define-map pending-operations 
  { operation-id: uint } 
  { 
    operation: (buff 1024),
    signatures: (list 10 principal),
    executed: bool 
  }
)

(define-public (execute-admin-operation (operation-id uint))
  (let (
    (operation-data (unwrap! (map-get? pending-operations { operation-id: operation-id }) (err u404)))
    (signature-count (len (get signatures operation-data)))
  )
    (asserts! (>= signature-count (var-get admin-threshold)) ERR-INSUFFICIENT-SIGNATURES)
    (asserts! (not (get executed operation-data)) (err u403))
    
    ;; Execute operation logic here
    (map-set pending-operations 
      { operation-id: operation-id }
      (merge operation-data { executed: true })
    )
    (ok true)
  )
)
```

### Time-Locked Operations

```clarity
;; Time-locked admin functions
(define-map time-locked-operations
  { operation-id: uint }
  {
    operation: (buff 1024),
    proposed-at: uint,
    delay-blocks: uint,
    executed: bool
  }
)

(define-constant ADMIN-TIMELOCK-BLOCKS u144) ;; ~24 hours

(define-public (propose-admin-operation (operation (buff 1024)))
  (let ((operation-id (+ (var-get last-operation-id) u1)))
    (asserts! (is-admin tx-sender) ERR-UNAUTHORIZED)
    
    (map-set time-locked-operations
      { operation-id: operation-id }
      {
        operation: operation,
        proposed-at: block-height,
        delay-blocks: ADMIN-TIMELOCK-BLOCKS,
        executed: false
      }
    )
    
    (var-set last-operation-id operation-id)
    (ok operation-id)
  )
)
```

## Network-Specific Setup

### Devnet Configuration

```typescript
// Development admin account (safe to commit)
const devnetConfig = {
  network: 'devnet',
  adminAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  adminPrivateKey: 'edf9aee84d9b7abc145504dde6726c64f369d37be9ffc9488888007bc2b1b1ff35'
};
```

### Testnet Configuration

```typescript
// Testnet admin account
const testnetConfig = {
  network: 'testnet',
  adminAddress: process.env.TESTNET_ADMIN_ADDRESS,
  adminPrivateKey: process.env.TESTNET_ADMIN_PRIVATE_KEY,
  apiUrl: 'https://stacks-node-api.testnet.stacks.co'
};
```

### Mainnet Configuration

```typescript
// Production admin account (highest security)
const mainnetConfig = {
  network: 'mainnet',
  adminAddress: process.env.MAINNET_ADMIN_ADDRESS,
  adminPrivateKey: process.env.MAINNET_ADMIN_PRIVATE_KEY,
  apiUrl: 'https://stacks-node-api.mainnet.stacks.co',
  requiresMultiSig: true,
  timeLockEnabled: true
};
```

## Account Funding

### Using MCP Tools

```typescript
// Check admin account status
use tool: get_stacks_account_info
params: {
  address: "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  includeTokens: true,
  includeTransactions: true
}

// Validate admin address format
use tool: validate_stacks_address
params: {
  address: "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  network: "mainnet"
}
```

### Fund Admin Account

See [How to Fund a Stacks Account](./how_to_fund_stacks_account.md) for detailed funding instructions.

## Admin Contract Deployment

### Using Clarinet

```bash
# Deploy admin contract
clarinet deployments generate --devnet
clarinet deployments apply --devnet

# Verify deployment
clarinet console
> (contract-call? .admin-contract get-admin-count)
```

### Using Stacks.js

```typescript
import { 
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode
} from '@stacks/transactions';

async function deployAdminContract() {
  const txOptions = {
    contractName: 'admin-contract',
    codeBody: fs.readFileSync('contracts/admin.clar', 'utf8'),
    senderKey: process.env.STACKS_ADMIN_PRIVATE_KEY,
    network: new StacksMainnet(),
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny
  };

  const transaction = await makeContractDeploy(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);
  
  return broadcastResponse;
}
```

## Access Control Implementation

### Role-Based Access Control

```clarity
;; Role-based admin system
(define-constant ROLE-SUPER-ADMIN u1)
(define-constant ROLE-CONTRACT-ADMIN u2)
(define-constant ROLE-TOKEN-ADMIN u3)

(define-map user-roles principal uint)

(define-public (assign-role (user principal) (role uint))
  (begin
    (asserts! (is-eq tx-sender (var-get super-admin)) ERR-UNAUTHORIZED)
    (asserts! (<= role ROLE-TOKEN-ADMIN) (err u400))
    (ok (map-set user-roles user role))
  )
)

(define-read-only (has-role (user principal) (required-role uint))
  (let ((user-role (default-to u0 (map-get? user-roles user))))
    (or 
      (is-eq user-role ROLE-SUPER-ADMIN)
      (is-eq user-role required-role)
    )
  )
)
```

## Monitoring and Alerts

### Transaction Monitoring

```typescript
// Monitor admin account transactions
async function monitorAdminTransactions() {
  const transactions = await apiService.getAccountTransactions(adminAddress);
  
  for (const tx of transactions) {
    if (tx.tx_type === 'contract_call' && 
        tx.contract_call?.function_name.includes('admin')) {
      // Alert on admin function calls
      console.log(`Admin operation: ${tx.tx_id}`);
    }
  }
}
```

### Balance Monitoring

```typescript
// Check admin account balance regularly
async function checkAdminBalance() {
  const balance = await apiService.getAccountBalance(adminAddress);
  const stxBalance = parseInt(balance.stx.balance) / 1000000;
  
  if (stxBalance < 10) { // Alert if below 10 STX
    console.warn('Admin account balance low:', stxBalance);
  }
}
```

## Emergency Procedures

### Account Recovery

1. **Access Backup**: Use backup mnemonic/private key
2. **Multi-Sig Recovery**: Use other signers to regain control
3. **Emergency Pause**: Activate emergency pause functions
4. **Asset Recovery**: Transfer assets to new admin account

### Security Incident Response

1. **Immediate Actions**:
   - Pause all admin functions
   - Freeze token transfers if possible
   - Alert team members

2. **Investigation**:
   - Review transaction history
   - Check for unauthorized operations
   - Identify compromise vector

3. **Recovery**:
   - Deploy new admin contract if needed
   - Transfer control to new account
   - Update all references

## Testing Admin Functions

### Unit Testing

```typescript
// Test admin functions
describe('Admin Functions', () => {
  it('should allow admin to mint tokens', () => {
    const mintTx = simnet.callPublicFn(
      'token-contract',
      'mint',
      [Cl.uint(1000), Cl.principal(userAddress)],
      adminAddress
    );
    
    expect(mintTx.result).toBeOk();
  });
  
  it('should reject non-admin mint attempts', () => {
    const mintTx = simnet.callPublicFn(
      'token-contract', 
      'mint',
      [Cl.uint(1000), Cl.principal(userAddress)],
      userAddress // Non-admin caller
    );
    
    expect(mintTx.result).toBeErr(Cl.uint(401));
  });
});
```

## Summary Checklist

- [ ] Generate secure admin keypair
- [ ] Store private key securely (never commit to git)
- [ ] Fund admin account appropriately for network
- [ ] Configure environment variables
- [ ] Implement access controls in contracts
- [ ] Set up monitoring and alerts
- [ ] Test admin functions thoroughly
- [ ] Document emergency procedures
- [ ] Set up backup/recovery systems
- [ ] Configure multi-signature if needed

Your admin account is now configured securely for Stacks development!
