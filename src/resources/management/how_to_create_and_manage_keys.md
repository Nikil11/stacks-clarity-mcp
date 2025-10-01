# How to Create and Manage Stacks Keys

This guide provides comprehensive coverage of cryptographic key management for Stacks blockchain development. Use this as your central reference for creating, storing, and managing all types of keys in Stacks applications.

## Overview of Key Types

Stacks development involves several types of cryptographic keys, each serving specific purposes:

### Private Keys (Stacks Addresses)

Used for signing transactions and proving ownership of Stacks accounts. These keys control STX tokens and interact with smart contracts.

**When to use**: For all blockchain interactions including token transfers, contract calls, and asset management.

### Bitcoin Keys (BTC Integration)

Used for Bitcoin-related operations through Stacks' unique Bitcoin integration. Essential for Proof of Transfer (PoX) and Bitcoin-secured operations.

**When to use**: For Stacking (STX staking), Bitcoin-secured applications, and cross-chain functionality.

### API Keys (Hiro/Infrastructure)

Used for accessing Stacks API services, blockchain data, and infrastructure providers.

**When to use**: For frontend applications, backend services, or enhanced API access with higher rate limits.

### Multi-Signature Keys

Used for shared control of accounts and contracts requiring multiple approvals for operations.

**When to use**: For treasury management, DAO operations, and high-security applications.

## Key Generation and Management

### 1. Stacks Private Keys

#### Using Stacks CLI
```bash
# Install Stacks CLI
npm install -g @stacks/cli

# Generate new keychain
stx make_keychain

# Output includes:
# - 24-word mnemonic phrase
# - Private key (64-character hex)
# - Stacks address (SP... for mainnet, ST... for testnet)
# - Bitcoin address
# - Wallet Import Format (WIF)
```

#### Using JavaScript/TypeScript
```typescript
import { generateWallet } from '@stacks/wallet-sdk';
import { 
  createStacksPrivateKey, 
  getAddressFromPrivateKey,
  TransactionVersion 
} from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

// Method 1: Generate new wallet with mnemonic
const wallet = await generateWallet({
  secretKey: generateSecretKey(256), // Optional: auto-generated if omitted
  password: 'secure-password'
});

const account = wallet.accounts[0];
console.log('Mnemonic:', wallet.configPrivateKey);
console.log('Address:', account.stxAddress);
console.log('Private Key:', account.stxPrivateKey);

// Method 2: Generate raw private key
const privateKey = createStacksPrivateKey(randomBytes(32).toString('hex'));
const mainnetAddress = getAddressFromPrivateKey(
  privateKey.data, 
  TransactionVersion.Mainnet
);
const testnetAddress = getAddressFromPrivateKey(
  privateKey.data,
  TransactionVersion.Testnet
);
```

#### Using Clarinet (Development)
```bash
# Initialize project with pre-configured keys
clarinet new my-project
cd my-project

# Check generated development keys
cat settings/Devnet.toml

# Development keys are safe to commit (devnet only)
# Example output:
# [accounts.deployer]
# mnemonic = "twice kind fence tip hidden tilt action fragile..."
# balance = 100000000000000
```

### 2. Bitcoin Key Integration

#### For Stacking (STX Staking)
```typescript
import { StackingClient } from '@stacks/stacking';
import { StacksMainnet } from '@stacks/network';

// Generate Bitcoin reward address for Stacking
const btcAddress = getBitcoinAddressFromKey(privateKey);

const stackingClient = new StackingClient(
  stacksAddress,
  new StacksMainnet()
);

// Use in Stacking operations
const stackingTx = await stackingClient.stack({
  amountMicroStx: 100000000, // 100 STX
  poxAddress: btcAddress,
  cycles: 12
});
```

#### Bitcoin-Secured Operations
```clarity
;; Example: Bitcoin-secured contract
(define-read-only (get-bitcoin-block-hash (height uint))
  (get-burn-block-info? header-hash height)
)

(define-read-only (verify-bitcoin-tx (tx (buff 1024)) (block-height uint))
  ;; Verify Bitcoin transaction inclusion
  (let ((block-hash (unwrap! (get-bitcoin-block-hash block-height) (err u404))))
    ;; Verification logic here
    (ok true)
  )
)
```

### 3. API Key Management

#### Hiro API Keys
```bash
# Sign up at https://platform.hiro.so
# Create API key in dashboard
# Use in your applications:

# Environment configuration
HIRO_API_KEY=your-api-key-here
HIRO_API_URL=https://api.hiro.so
```

```typescript
// Usage in applications
import { Configuration, AccountsApi } from '@stacks/blockchain-api-client';

const config = new Configuration({
  basePath: 'https://api.hiro.so',
  headers: {
    'X-API-Key': process.env.HIRO_API_KEY
  }
});

const accountsApi = new AccountsApi(config);
```

#### QuickNode/Alchemy Keys
```typescript
// Alternative API providers
const config = {
  stacks: {
    // QuickNode
    apiUrl: 'https://your-endpoint.stacks.quiknode.pro/your-api-key',
    
    // Or Alchemy
    apiUrl: 'https://stacks-mainnet.g.alchemy.com/v1/your-api-key'
  }
};
```

### 4. Multi-Signature Key Setup

#### 2-of-3 Multi-Sig Example
```clarity
;; multi-sig.clar
(define-constant ERR-UNAUTHORIZED (err u401))
(define-constant ERR-INSUFFICIENT-SIGS (err u402))

(define-data-var required-sigs uint u2)
(define-data-var total-signers uint u3)

(define-map authorized-signers principal bool)
(define-map pending-transactions
  { tx-id: uint }
  {
    transaction-data: (buff 1024),
    signatures: (list 10 principal),
    executed: bool
  }
)

;; Initialize signers
(map-set authorized-signers 'SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R true)
(map-set authorized-signers 'SP2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG true)  
(map-set authorized-signers 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE true)

(define-public (sign-transaction (tx-id uint))
  (let (
    (tx-data (unwrap! (map-get? pending-transactions { tx-id: tx-id }) (err u404)))
    (current-sigs (get signatures tx-data))
  )
    (asserts! (default-to false (map-get? authorized-signers tx-sender)) ERR-UNAUTHORIZED)
    (asserts! (is-none (index-of current-sigs tx-sender)) (err u403)) ;; Already signed
    
    (let ((new-sigs (unwrap! (as-max-len? (append current-sigs tx-sender) u10) (err u500))))
      (map-set pending-transactions
        { tx-id: tx-id }
        (merge tx-data { signatures: new-sigs })
      )
      
      ;; Execute if enough signatures
      (if (>= (len new-sigs) (var-get required-sigs))
        (execute-transaction tx-id)
        (ok true)
      )
    )
  )
)
```

## Secure Key Storage

### Development Environment
```env
# .env.development (safe for local dev)
STACKS_NETWORK=devnet
DEPLOYER_PRIVATE_KEY=edf9aee84d9b7abc145504dde6726c64f369d37be9ffc9488888007bc2b1b1ff35
DEPLOYER_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

# .env.local (never commit)
TESTNET_PRIVATE_KEY=your-testnet-private-key
MAINNET_PRIVATE_KEY=your-mainnet-private-key
```

### Production Environment
```bash
# Use secure environment variables
export STACKS_PRIVATE_KEY="your-private-key"
export HIRO_API_KEY="your-api-key"

# Or use secret management services
# - AWS Secrets Manager
# - HashiCorp Vault  
# - Azure Key Vault
# - Google Secret Manager
```

### Hardware Wallet Integration
```typescript
// Ledger integration example
import { LedgerStacksApp } from '@zondax/ledger-stacks';

const transport = await TransportWebUSB.create();
const app = new LedgerStacksApp(transport);

// Get address from Ledger
const response = await app.getAddress("m/44'/5757'/0'/0/0");
console.log('Ledger Address:', response.address);

// Sign transaction with Ledger
const signedTx = await app.sign(transaction);
```

## Key Rotation and Security

### Regular Key Rotation
```typescript
// Key rotation strategy
class KeyManager {
  private currentKey: string;
  private backupKeys: string[];
  
  async rotateKey() {
    // Generate new key
    const newKey = generatePrivateKey();
    
    // Update backup
    this.backupKeys.push(this.currentKey);
    
    // Set new current key  
    this.currentKey = newKey;
    
    // Update all services
    await this.updateServices(newKey);
  }
  
  async emergencyRotation() {
    // Immediate key rotation for security incidents
    const emergencyKey = generatePrivateKey();
    await this.immediateKeyUpdate(emergencyKey);
  }
}
```

### Access Control
```clarity
;; Access control with key rotation
(define-map active-keys principal { 
  key-hash: (buff 32),
  expires-at: uint,
  permissions: uint
})

(define-public (rotate-key (new-key-hash (buff 32)) (expires-at uint))
  (begin
    (asserts! (is-authorized tx-sender) ERR-UNAUTHORIZED)
    (map-set active-keys tx-sender {
      key-hash: new-key-hash,
      expires-at: expires-at,
      permissions: (get-permissions tx-sender)
    })
    (ok true)
  )
)
```

## Key Validation and Testing

### Address Validation
```typescript
// Using MCP tools for validation
use tool: validate_stacks_address
params: {
  address: "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  network: "mainnet"
}

// Programmatic validation
import { validateStacksAddress } from '@stacks/transactions';

const isValid = validateStacksAddress('SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R');
console.log('Valid address:', isValid);
```

### Key Testing
```typescript
// Test key functionality
describe('Key Management', () => {
  it('should generate valid keypairs', () => {
    const privateKey = createStacksPrivateKey();
    const address = getAddressFromPrivateKey(privateKey.data);
    
    expect(address).toMatch(/^SP[A-Z0-9]{38,41}$/);
  });
  
  it('should sign transactions correctly', () => {
    const transaction = makeSTXTokenTransfer({
      recipient: 'SP2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
      amount: 1000000,
      senderKey: privateKey,
      network: new StacksMainnet()
    });
    
    expect(transaction.auth.spendingCondition).toBeDefined();
  });
});
```

## Backup and Recovery

### Mnemonic Backup
```typescript
// Secure mnemonic storage
const mnemonic = generateMnemonic();

// Method 1: Split mnemonic (Shamir's Secret Sharing)
const shares = splitMnemonic(mnemonic, 3, 2); // 2-of-3 shares needed

// Method 2: Encrypted storage
const encrypted = encryptMnemonic(mnemonic, password);
```

### Multi-Location Backup
```bash
# Backup strategy checklist:
# □ Primary mnemonic in secure physical location
# □ Encrypted digital backup in cloud storage
# □ Shamir shares distributed to trusted parties
# □ Hardware wallet backup
# □ Time-locked recovery mechanism
```

### Recovery Testing
```typescript
// Regular recovery tests
async function testRecovery() {
  // Test mnemonic recovery
  const recoveredWallet = await restoreWallet(backupMnemonic, password);
  
  // Verify addresses match
  const originalAddress = getAddressFromPrivateKey(originalKey);
  const recoveredAddress = getAddressFromPrivateKey(recoveredWallet.privateKey);
  
  assert(originalAddress === recoveredAddress, 'Recovery failed');
}
```

## Monitoring and Alerting

### Key Usage Monitoring
```typescript
// Monitor key usage patterns
class KeyMonitor {
  async monitorTransactions(address: string) {
    const transactions = await this.getAccountTransactions(address);
    
    for (const tx of transactions) {
      // Alert on unusual patterns
      if (this.isUnusualTransaction(tx)) {
        await this.sendAlert(`Unusual transaction: ${tx.tx_id}`);
      }
    }
  }
  
  async checkKeyCompromise(address: string) {
    // Check for signs of compromise
    const recentTxs = await this.getRecentTransactions(address);
    const unauthorizedTxs = recentTxs.filter(tx => 
      !this.isAuthorizedTransaction(tx)
    );
    
    if (unauthorizedTxs.length > 0) {
      await this.triggerEmergencyResponse();
    }
  }
}
```

### Account Balance Alerts
```typescript
// Using MCP tools for monitoring
use tool: get_stacks_account_info
params: {
  address: "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  includeTokens: true,
  includeTransactions: true
}

// Set up balance alerts
async function monitorBalance(address: string, threshold: number) {
  const balance = await getSTXBalance(address);
  
  if (balance < threshold) {
    await sendAlert(`Low balance: ${balance} STX`);
  }
}
```

## Security Best Practices

### Development Keys
- ✅ Use separate keys for each environment
- ✅ Never commit private keys to version control
- ✅ Use environment variables for sensitive data
- ✅ Implement proper access controls

### Production Keys
- ✅ Use hardware wallets for mainnet
- ✅ Implement multi-signature for high-value operations
- ✅ Regular key rotation schedule
- ✅ Comprehensive backup strategy

### API Keys
- ✅ Rotate API keys regularly
- ✅ Use minimum required permissions
- ✅ Monitor API key usage
- ✅ Implement rate limiting

## Emergency Procedures

### Compromised Key Response
1. **Immediate Actions**:
   - Transfer assets to secure account
   - Revoke compromised key access
   - Update all applications

2. **Investigation**:
   - Review transaction history
   - Identify compromise vector
   - Assess damage

3. **Recovery**:
   - Generate new secure keys
   - Update all references
   - Implement additional security measures

## Summary Checklist

### Key Generation
- [ ] Generated using secure randomness
- [ ] Validated for network compatibility
- [ ] Tested with small transactions
- [ ] Backed up securely

### Storage
- [ ] Never committed to version control
- [ ] Encrypted if stored digitally
- [ ] Multiple backup locations
- [ ] Access controls implemented

### Usage
- [ ] Proper access controls
- [ ] Transaction monitoring
- [ ] Regular security audits
- [ ] Emergency procedures documented

Your Stacks key management system is now comprehensive and secure!
