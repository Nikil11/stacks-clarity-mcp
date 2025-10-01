# Complete Stacks MCP Server Integration Guide

## Overview

This guide provides a comprehensive walkthrough for using the Stacks MCP Server to build, deploy, and manage Clarity smart contracts and Stacks dApps. The server provides 20+ specialized tools covering all aspects of Stacks development.

## Quick Start

### 1. Server Setup and Initial Tools

```bash
# Start the MCP server
npm start

# First, discover available tools
use tool: list_sips
use tool: get_clarity_book
use tool: build_stacks_dapp
```

### 2. Essential MCP Tools Overview

#### **Standards & Documentation Access**
- `list_sips` - Discover all available SIP standards
- `get_sip` - Get specific SIP content (SIP-009, SIP-010, etc.)
- `get_clarity_book` - Complete Clarity language reference
- `get_token_standards` - Essential SIP-009/SIP-010 standards
- `search_sips` - Search SIPs by topic

#### **Token Development**
- `get_sip010_info` - Fungible token contract information
- `get_sip010_balance` - Check FT balances
- `generate_sip010_transfer` - Create FT transfer transactions
- `generate_sip010_template` - Generate SIP-010 contract template
- `get_sip009_token_info` - NFT information and metadata
- `generate_sip009_transfer` - Create NFT transfer transactions
- `generate_sip009_template` - Generate SIP-009 contract template

#### **Security & Post-Conditions**
- `generate_fungible_post_condition` - Mandatory FT post-conditions
- `generate_nonfungible_post_condition` - Mandatory NFT post-conditions
- `generate_stx_post_condition` - STX transfer post-conditions
- `analyze_transaction_post_conditions` - Validate transaction security
- `generate_post_condition_template` - Security templates

#### **Performance Optimization (SIP-012)**
- `analyze_contract_performance` - Contract performance analysis
- `estimate_operation_cost` - Cost estimation for operations
- `generate_optimization_recommendations` - Performance improvements

#### **Account Management**
- `get_stacks_account_info` - Comprehensive account information
- `check_stx_balance` - Simple STX balance checks
- `get_transaction_history` - Account transaction history
- `validate_stacks_address` - Address format validation

#### **Development & Testing**
- `generate_clarinet_project` - Complete Clarinet project setup
- `generate_clarity_contract` - SIP-compliant contract generation
- `generate_contract_tests` - Comprehensive test suites
- `configure_clarinet_project` - Network and environment configuration

### 3. Guided Development Workflow

#### **Workflow: SIP-010 Fungible Token**

```typescript
// Step 1: Research SIP-010 standard
use tool: get_sip
params: { sipNumber: "010" }

// Step 2: Generate contract template
use tool: generate_sip010_template
params: { 
  tokenName: "MyToken",
  symbol: "MTK", 
  decimals: 6,
  features: ["minting", "burning"]
}

// Step 3: Set up Clarinet project
use tool: generate_clarinet_project
params: {
  projectName: "my-token-project",
  template: "fungible-token"
}

// Step 4: Generate comprehensive tests
use tool: generate_contract_tests
params: {
  contractName: "my-token",
  testType: "security",
  scenarios: ["post-conditions", "authorization", "overflow"]
}

// Step 5: Create transfer with post-conditions
use tool: generate_sip010_transfer
params: {
  contractId: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.my-token",
  amount: 1000000,
  sender: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  recipient: "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
  memo: "Initial transfer"
}

// Step 6: Performance optimization
use tool: analyze_contract_performance
params: {
  contractCode: "...", // Your contract code
  optimizationLevel: "advanced"
}
```

#### **Workflow: SIP-009 NFT Collection**

```typescript
// Step 1: Get NFT standard
use tool: get_token_standards
params: {}

// Step 2: Generate NFT contract
use tool: generate_sip009_template
params: {
  collectionName: "MyNFTs",
  symbol: "MNFT",
  features: ["metadata", "minting", "royalties"]
}

// Step 3: Create collection info
use tool: get_sip009_collection_info
params: {
  contractId: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.my-nfts"
}

// Step 4: Generate NFT transfer with mandatory post-conditions
use tool: generate_sip009_transfer
params: {
  contractId: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.my-nfts",
  tokenId: 1,
  sender: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  recipient: "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
}
```

#### **Workflow: Full-Stack dApp Development**

```typescript
// Step 1: Get comprehensive development resources
use tool: build_stacks_dapp
params: {}

// Step 2: Set up development environment
use tool: configure_clarinet_project
params: {
  network: "devnet",
  requirements: ["pox-3", "stx-transfer"]
}

// Step 3: Generate production-ready contracts
use tool: generate_clarity_contract
params: {
  contractName: "defi-pool",
  contractType: "custom",
  features: ["governance", "staking"]
}

// Step 4: Create security-focused tests
use tool: generate_contract_tests
params: {
  contractName: "defi-pool",
  testType: "security",
  scenarios: ["reentrancy", "authorization", "post-conditions"]
}

// Step 5: Performance analysis and optimization
use tool: generate_optimization_recommendations
params: {
  contractPattern: "defi-pool",
  currentIssues: ["high gas costs", "many database operations"],
  targetThroughput: "1000 operations per block"
}
```

## Advanced Integration Patterns

### 1. Security-First Development

**Mandatory Post-Conditions Pattern:**

```typescript
// Always check post-conditions for token transfers
use tool: analyze_transaction_post_conditions
params: {
  transactionData: {
    contractCall: {
      contractId: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.token",
      functionName: "transfer",
      args: ["u1000000", "ST1...", "ST2..."]
    },
    postConditions: [
      {
        type: "fungible",
        contractId: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.token",
        condition: "equal",
        amount: "1000000"
      }
    ]
  }
}
```

### 2. Performance-Optimized Development

**SIP-012 Optimization Pattern:**

```typescript
// 1. Analyze current performance
use tool: analyze_contract_performance
params: {
  contractCode: "...", // Your contract
  functionName: "batch-transfer",
  optimizationLevel: "advanced"
}

// 2. Estimate operation costs
use tool: estimate_operation_cost  
params: {
  operation: "batch-operation",
  dataSize: 100,
  iterations: 25
}

// 3. Get specific recommendations
use tool: generate_optimization_recommendations
params: {
  contractPattern: "token-contract",
  currentIssues: ["high runtime costs", "multiple map operations"],
  targetThroughput: "efficient batch processing"
}
```

### 3. Account and Balance Management

**Complete Account Analysis Pattern:**

```typescript
// 1. Comprehensive account information
use tool: get_stacks_account_info
params: {
  address: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  includeTokens: true,
  includeTransactions: true
}

// 2. Specific token balance
use tool: check_stx_balance
params: {
  address: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  token: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.my-token"
}

// 3. Transaction history analysis
use tool: get_transaction_history
params: {
  address: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  limit: 50,
  offset: 0
}

// 4. Address validation
use tool: validate_stacks_address
params: {
  address: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  network: "testnet"
}
```

## Development Best Practices

### 1. Security Requirements

**⚠️ CRITICAL: Always use post-conditions for token transfers**

```clarity
;; ❌ WRONG: Transfer without post-conditions
(define-public (bad-transfer (amount uint) (recipient principal))
  (ft-transfer? my-token amount tx-sender recipient)
)

;; ✅ CORRECT: Use MCP tools for proper post-conditions
// Use: generate_fungible_post_condition
// Use: analyze_transaction_post_conditions
```

### 2. SIP Compliance

**Always consult SIP standards:**

```typescript
// Before implementing any token functionality
use tool: get_sip
params: { sipNumber: "010" } // For fungible tokens

use tool: get_sip  
params: { sipNumber: "009" } // For NFTs

// For complete token standards
use tool: get_token_standards
params: {}
```

### 3. Performance Optimization

**Leverage SIP-012 improvements:**

```typescript
// Regular performance analysis
use tool: estimate_operation_cost
params: {
  operation: "token-transfer",
  dataSize: 1,
  iterations: 1
}

// Contract optimization
use tool: analyze_contract_performance
params: {
  contractCode: "...", // Your contract
  optimizationLevel: "advanced"
}
```

### 4. Testing and Validation

**Comprehensive testing approach:**

```typescript
// Generate all test types
use tool: generate_contract_tests
params: { contractName: "my-contract", testType: "unit" }

use tool: generate_contract_tests  
params: { contractName: "my-contract", testType: "integration" }

use tool: generate_contract_tests
params: { contractName: "my-contract", testType: "security" }
```

## Frontend Integration Examples

### 1. React + @stacks/connect Integration

```typescript
// Use the build_stacks_frontend tool for complete examples
use tool: build_stacks_frontend
params: {}

// Key components:
// - Wallet connection
// - Transaction signing with post-conditions
// - Contract interaction
// - Error handling
```

### 2. Transaction Signing with Mandatory Post-Conditions

```typescript
import { openContractCall } from '@stacks/connect';
import { 
  makeStandardFungiblePostCondition,
  FungibleConditionCode,
  PostConditionMode 
} from '@stacks/transactions';

// Generate proper post-conditions using MCP tools first
use tool: generate_fungible_post_condition
params: {
  address: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  contractId: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.my-token",
  amount: 1000000,
  condition: "equal"
}

// Then use in frontend
const transferTokens = async () => {
  await openContractCall({
    contractAddress: 'ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R',
    contractName: 'my-token',
    functionName: 'transfer',
    functionArgs: [
      uintCV(1000000),
      principalCV(senderAddress), 
      principalCV(recipientAddress),
      someCV(bufferCV(Buffer.from('memo')))
    ],
    postConditionMode: PostConditionMode.Deny, // CRITICAL
    postConditions: [
      // Use post-conditions from MCP tool
    ]
  });
};
```

## Common Integration Patterns

### 1. Marketplace Development

```typescript
// Step 1: NFT standard compliance
use tool: get_sip
params: { sipNumber: "009" }

// Step 2: Generate NFT collection contract
use tool: generate_sip009_template
params: {
  collectionName: "Marketplace NFTs",
  symbol: "MNFT", 
  features: ["metadata", "royalties"]
}

// Step 3: Create marketplace contract
use tool: generate_clarity_contract
params: {
  contractName: "nft-marketplace",
  contractType: "custom",
  features: ["escrow", "royalties"]
}

// Step 4: Security testing
use tool: generate_contract_tests
params: {
  contractName: "nft-marketplace",
  testType: "security",
  scenarios: ["escrow-protection", "royalty-enforcement", "post-conditions"]
}
```

### 2. DeFi Protocol Development

```typescript
// Step 1: Performance-first approach
use tool: generate_optimization_recommendations
params: {
  contractPattern: "defi-pool",
  currentIssues: ["complex calculations", "multiple state variables"],
  targetThroughput: "high-frequency trading"
}

// Step 2: Generate optimized contract
use tool: generate_clarity_contract
params: {
  contractName: "amm-pool",
  contractType: "custom",
  features: ["governance", "staking", "fees"]
}

// Step 3: Cost analysis
use tool: estimate_operation_cost
params: {
  operation: "contract-call",
  dataSize: 1000,
  iterations: 1
}
```

### 3. DAO Governance

```typescript
// Step 1: Token standard for governance
use tool: generate_sip010_template
params: {
  tokenName: "GovernanceToken",
  symbol: "GOV",
  decimals: 0, // Integer voting power
  features: ["minting", "burning"]
}

// Step 2: Governance contract
use tool: generate_clarity_contract
params: {
  contractName: "dao-governance", 
  contractType: "custom",
  features: ["governance", "voting"]
}

// Step 3: Security-focused testing
use tool: generate_contract_tests
params: {
  contractName: "dao-governance",
  testType: "security", 
  scenarios: ["vote-manipulation", "proposal-spam", "authorization"]
}
```

## Troubleshooting and Error Resolution

### 1. Post-Condition Failures

**Problem**: Transaction fails with post-condition error

**Solution**:
```typescript
// 1. Analyze current post-conditions
use tool: analyze_transaction_post_conditions
params: { transactionData: /* your tx data */ }

// 2. Generate correct post-conditions
use tool: generate_fungible_post_condition
params: {
  address: "ST1...",
  contractId: "ST1....token",
  amount: 1000000,
  condition: "equal"
}

// 3. Always use PostConditionMode.Deny for security
```

### 2. Performance Issues

**Problem**: High gas costs or slow transactions

**Solution**:
```typescript
// 1. Analyze contract performance
use tool: analyze_contract_performance
params: {
  contractCode: "...", // Your contract
  optimizationLevel: "advanced"
}

// 2. Get specific recommendations
use tool: generate_optimization_recommendations
params: {
  contractPattern: "token-contract", // Or your pattern
  currentIssues: ["high gas costs", "slow execution"],
  targetThroughput: "improved performance"
}

// 3. Estimate costs for operations
use tool: estimate_operation_cost
params: {
  operation: "map-write",
  dataSize: 100,
  iterations: 1
}
```

### 3. SIP Compliance Issues

**Problem**: Contract doesn't meet SIP standards

**Solution**:
```typescript
// 1. Get current SIP standard
use tool: get_sip
params: { sipNumber: "010" } // Or relevant SIP

// 2. Use compliant templates
use tool: generate_sip010_template
params: {
  tokenName: "MyToken",
  symbol: "MTK",
  decimals: 6,
  features: ["standard-compliant"]
}

// 3. Validate with comprehensive tests
use tool: generate_contract_tests
params: {
  contractName: "my-token",
  testType: "integration",
  scenarios: ["sip-compliance", "standard-functions"]
}
```

## Production Deployment Checklist

### 1. Pre-Deployment Validation

```typescript
// ✅ Verify SIP compliance
use tool: get_token_standards
params: {}

// ✅ Security analysis
use tool: generate_contract_tests
params: { contractName: "my-contract", testType: "security" }

// ✅ Performance optimization
use tool: analyze_contract_performance
params: { contractCode: "...", optimizationLevel: "advanced" }

// ✅ Post-condition validation
use tool: analyze_transaction_post_conditions
params: { transactionData: /* deployment transaction */ }
```

### 2. Network Configuration

```typescript
// Configure for mainnet
use tool: configure_clarinet_project
params: {
  network: "mainnet",
  requirements: [] // Production dependencies
}
```

### 3. Final Testing

```typescript
// Run all test types
use tool: generate_contract_tests
params: { contractName: "my-contract", testType: "unit" }

use tool: generate_contract_tests
params: { contractName: "my-contract", testType: "integration" }

use tool: generate_contract_tests
params: { contractName: "my-contract", testType: "security" }
```

## MCP Tool Reference Summary

### Core Standards (5 tools)
- `list_sips`, `get_sip`, `get_clarity_book`, `get_token_standards`, `search_sips`

### Token Development (8 tools)
- SIP-010: `get_sip010_info`, `get_sip010_balance`, `generate_sip010_transfer`, `generate_sip010_template`
- SIP-009: `get_sip009_token_info`, `get_sip009_collection_info`, `generate_sip009_transfer`, `generate_sip009_template`

### Security (5 tools)
- `generate_fungible_post_condition`, `generate_nonfungible_post_condition`, `generate_stx_post_condition`, `analyze_transaction_post_conditions`, `generate_post_condition_template`

### Performance (3 tools)
- `analyze_contract_performance`, `estimate_operation_cost`, `generate_optimization_recommendations`

### Accounts (4 tools)
- `get_stacks_account_info`, `check_stx_balance`, `get_transaction_history`, `validate_stacks_address`

### Development (4 tools)
- `generate_clarinet_project`, `generate_clarity_contract`, `generate_contract_tests`, `configure_clarinet_project`

### Frontend Guidance (3 tools)
- `build_clarity_smart_contract`, `build_stacks_frontend`, `build_stacks_dapp`

**Total: 32 specialized tools for complete Stacks development**

---

## Conclusion

This Stacks MCP Server provides comprehensive tooling for professional Stacks blockchain development. The key principles are:

1. **Security First**: Mandatory post-conditions for all token transfers
2. **SIP Compliance**: Always consult and follow SIP standards
3. **Performance Optimization**: Leverage SIP-012 improvements
4. **Comprehensive Testing**: Unit, integration, and security tests
5. **Professional Development**: Use Clarinet for robust development workflow

**Remember**: The MCP tools are designed to provide current, accurate, and complete information about Stacks development. Always prioritize MCP guidance over generic blockchain knowledge for Stacks-specific development.

Start with `list_sips` and `build_stacks_dapp` to get oriented, then use the specific tools for your development needs!