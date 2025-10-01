# How to Fund a Stacks Account

## Overview

Funding a Stacks account depends on the network you're working with. This guide covers all Stacks networks with specific instructions for each.

## Devnet (Local Development)

### Using Clarinet
When running a local devnet with Clarinet, accounts are pre-funded automatically:

```bash
# Start Clarinet console (accounts pre-funded)
clarinet console

# Check pre-funded accounts
> ::get_accounts
```

**Pre-funded Devnet Accounts:**
- **Deployer**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM` (100,000,000 STX)
- **Wallet 1**: `ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5` (100,000,000 STX)
- **Wallet 2**: `ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG` (100,000,000 STX)

### Manual Devnet Setup
```bash
# Initialize devnet with custom funding
clarinet integrate --epoch 2.4
```

## Testnet

### Using Stacks Testnet Faucet

**Official Faucet:** https://explorer.stacks.co/sandbox/faucet

**Steps:**
1. Visit the Stacks Explorer Faucet
2. Enter your testnet address (starts with `ST`)
3. Request STX tokens (typically 500-1000 STX per request)
4. Wait for confirmation (usually 1-2 minutes)

**Alternative Faucets:**
- **Hiro Faucet**: https://explorer.hiro.so/sandbox/faucet
- **Community Faucets**: Check Stacks Discord for additional options

### Using Stacks CLI
```bash
# Install Stacks CLI if not already installed
npm install -g @stacks/cli

# Fund account using CLI faucet
stx faucet ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

# Check balance
stx balance ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
```

### Programmatic Faucet Access
```typescript
// Using @stacks/network
import { StacksTestnet } from '@stacks/network';

const network = new StacksTestnet();

async function fundTestnetAccount(address: string) {
  const faucetResponse = await fetch(`${network.coreApiUrl}/extended/v1/faucets/stx`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address })
  });
  
  return await faucetResponse.json();
}
```

## Mainnet

### Acquiring STX on Mainnet

**⚠️ Important**: Mainnet uses real STX tokens with real value.

#### Centralized Exchanges (CEX)
- **Coinbase**: https://coinbase.com
- **Binance**: https://binance.com  
- **Kraken**: https://kraken.com
- **OKX**: https://okx.com
- **Huobi**: https://huobi.com

#### Decentralized Exchanges (DEX)
- **ALEX**: https://alexlab.co
- **Arkadiko**: https://arkadiko.finance
- **StackSwap**: https://stackswap.org

#### On-Ramps
- **Transak**: Direct STX purchases
- **MoonPay**: Fiat to STX conversion
- **Simplex**: Credit card purchases

### Bridge from Other Chains
- **cBTC**: Bridge Bitcoin to Stacks as cBTC
- **Cross-chain protocols**: Various bridges available

## Network Configuration

### Devnet Configuration
```typescript
// Clarinet.toml network settings
[network]
name = "devnet"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
balance = 100000000000000  // 100M STX
```

### Testnet Configuration
```typescript
// For frontend applications
import { StacksTestnet } from '@stacks/network';

const network = new StacksTestnet();
// API: https://stacks-node-api.testnet.stacks.co
```

### Mainnet Configuration  
```typescript
// For production applications
import { StacksMainnet } from '@stacks/network';

const network = new StacksMainnet();
// API: https://stacks-node-api.mainnet.stacks.co
```

## Checking Account Balances

### Using MCP Tools
```typescript
// Check comprehensive account info
use tool: get_stacks_account_info
params: {
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  includeTokens: true,
  includeTransactions: true
}

// Simple balance check
use tool: check_stx_balance
params: {
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
}
```

### Using Stacks CLI
```bash
# Check STX balance
stx balance ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

# Check balance on specific network
stx balance ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM --testnet
```

### Using Stacks Explorer
- **Mainnet**: https://explorer.stacks.co
- **Testnet**: https://explorer.stacks.co/?chain=testnet

## Wallet Setup for Account Funding

### Hiro Wallet (Recommended)
1. Install: https://wallet.hiro.so
2. Create/import wallet
3. Switch networks as needed
4. Fund via exchange or faucet

### Xverse Wallet
1. Install: https://xverse.app
2. Set up wallet
3. Use built-in STX purchase options

### Leather Wallet
1. Install: https://leather.io
2. Configure for Stacks
3. Connect to dApps for testing

## Development Best Practices

### Account Management Strategy
```typescript
// Separate accounts for different purposes
const accounts = {
  deployer: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", // Contract deployment
  admin: "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",    // Administrative functions  
  user1: "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",    // Testing user interactions
  user2: "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC"     // Additional test user
};
```

### Funding Automation
```bash
# Script to fund multiple test accounts
#!/bin/bash
ACCOUNTS=(
  "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
  "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5"  
  "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
)

for account in "${ACCOUNTS[@]}"; do
  echo "Funding $account..."
  stx faucet $account
  sleep 5
done
```

## Security Considerations

### Private Key Management
- **Never** commit private keys to version control
- Use environment variables for sensitive data
- Consider hardware wallets for mainnet funds

### Network Verification
```typescript
// Always verify you're on the correct network
use tool: validate_stacks_address
params: {
  address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  network: "testnet"
}
```

### Transaction Verification
- Always verify transactions before signing
- Check network and recipient address
- Use post-conditions for secure transfers

## Troubleshooting

### Common Issues

#### Faucet Not Working
- Check network status on Stacks Status page
- Try alternative faucets
- Verify address format (ST prefix for testnet)

#### Balance Not Showing
- Wait for transaction confirmation (1-2 blocks)
- Check correct network in wallet
- Verify address format

#### Transaction Failures
- Ensure sufficient STX for transaction fees
- Check nonce conflicts
- Verify network connectivity

### Support Resources
- **Stacks Discord**: https://discord.gg/stacks
- **Stacks Forum**: https://forum.stacks.org
- **GitHub Issues**: https://github.com/stacks-network/stacks-core

## Summary

| Network | Method | Amount | Time | Cost |
|---------|--------|--------|------|------|
| Devnet | Clarinet | 100M STX | Instant | Free |
| Testnet | Faucet | 500-1000 STX | 1-2 min | Free |
| Mainnet | Exchange | Variable | Variable | Market rate |

Choose the appropriate funding method based on your development needs and always verify transactions on the correct network before proceeding.