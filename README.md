# Stacks Clarity MCP Server

A comprehensive MCP (Model Context Protocol) server for Stacks blockchain development, providing 30+ specialized tools for Clarity smart contracts, SIP compliance, security, and performance optimization.

> 💡 **New to MCP?** Check out our [integration guides](integration_guides/) for step-by-step setup instructions for [Cursor](integration_guides/cursor.md), [Claude Code](integration_guides/claude_code.md), or [local development](integration_guides/development_usage.md).

## 🚀 Overview

This comprehensive MCP server provides a complete Stacks development toolkit, implementing TIER 1 and TIER 2 priorities for professional Stacks dApp development with security-first patterns and SIP compliance.

### Key Features

- **🏗️ Complete SIP Standards Access** - All 30+ SIP standards with full Clarity code
- **🔐 Security-First Development** - Mandatory post-conditions for all token transfers
- **⚡ SIP-012 Performance Optimization** - 2x database capacity and dynamic storage
- **🎨 Token Standards** - Full SIP-009 (NFT) and SIP-010 (FT) implementations
- **🧪 Comprehensive Testing** - Unit, integration, and security test generation
- **🔧 Clarinet Integration** - Complete project setup and management tools
- **💰 Account Management** - STX balances, transaction history, and validation
- **📚 Complete Documentation** - Clarity Book, SIP standards, and integration guides

## 📋 Prerequisites

- [Node.js and npm](https://nodejs.org/en) (npm ≥ 5.2.0)
- [Clarinet CLI](https://github.com/hirosystems/clarinet) (for contract development)
- Stacks wallet (for frontend integration)
- Cursor IDE or Claude Code (for MCP integration)

## 🛠️ Quick Setup for Cursor/Claude Code

### Option 1: Use Published Package (When Available)

Once published to npm, create `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "stacks-clarity-mcp": {
      "command": "npx",
      "args": ["-y", "@stacks/stacks-clarity-mcp"],
      "env": {
        "HIRO_API_KEY": "",
        "STACKS_NETWORK": "testnet"
      }
    }
  }
}
```

### Option 2: Local Development Setup (Current)

1. **Clone and install**:
```bash
git clone https://github.com/YOUR_USERNAME/stacks-clarity-mcp.git
cd stacks-clarity-mcp
npm install
```

2. **Build the project**:
```bash
npm run build
```
> **Note**: This generates the `dist/` folder with compiled JavaScript. The build is required before running the server.

3. **Configure Cursor** - Create `.cursor/mcp.json` in your project root:
```json
{
  "mcpServers": {
    "stacks-clarity-mcp": {
      "command": "npx",
      "args": ["-y", "tsx", "/absolute/path/to/stacks-clarity-mcp/src/server.ts"],
      "env": {
        "HIRO_API_KEY": "",
        "STACKS_NETWORK": "testnet"
      }
    }
  }
}
```
> **Important**: Replace `/absolute/path/to/stacks-clarity-mcp` with your actual path!

4. **Restart Cursor** completely (quit and reopen)

5. **Verify Setup**:
   - Go to `Cursor → Settings → MCP`
   - Look for green indicator next to `stacks-clarity-mcp`
   - Switch to **Agent** mode in chat
   - Test with: "list available stacks tools"

### Network Options

- `mainnet` - Production Stacks network
- `testnet` - Test network with free tokens
- `devnet` - Local development with Clarinet

### Get Hiro API Key (Optional)

For enhanced features and higher rate limits:
1. Visit [platform.hiro.so](https://platform.hiro.so)
2. Create an account and generate an API key
3. Add to `HIRO_API_KEY` in your config

📚 **Detailed guides**: See [`integration_guides/`](integration_guides/) folder for [Cursor](integration_guides/cursor.md), [Claude Code](integration_guides/claude_code.md), and [Development](integration_guides/development_usage.md) setup.

## 📦 What's Included in the Repository

**Included (pushed to GitHub):**
- ✅ `src/` - TypeScript source code (452KB)
- ✅ `stacks-clarity-standards/` - All 30+ SIP standards (9.2MB)
- ✅ `integration_guides/` - Setup documentation
- ✅ `package.json`, `tsconfig.json` - Configuration files

**Excluded (not pushed):**
- ❌ `node_modules/` - Dependencies (165MB) - install with `npm install`
- ❌ `dist/` - Build output (448KB) - generate with `npm run build`
- ❌ `.cursor/` - Local MCP config
- ❌ `.env` - Environment variables

> **Setup Requirement**: After cloning, you must run `npm install` and `npm run build` before using the MCP server.

## 📖 Available Tools (32 Total)

### 🔍 Standards & Documentation (5 tools)
- `list_sips` - Discover all available SIP standards
- `get_sip` - Get specific SIP content (SIP-009, SIP-010, etc.)
- `get_clarity_book` - Complete Clarity language reference (34,000+ lines)
- `get_token_standards` - Essential SIP-009/SIP-010 standards
- `search_sips` - Search SIPs by topic

### 🪙 Token Development (8 tools)

#### SIP-010 Fungible Tokens
- `get_sip010_info` - Token contract information and metadata
- `get_sip010_balance` - Check FT balances for addresses
- `generate_sip010_transfer` - Create transfer transactions with post-conditions
- `generate_sip010_template` - Generate complete SIP-010 compliant contracts

#### SIP-009 Non-Fungible Tokens
- `get_sip009_token_info` - NFT information and metadata
- `get_sip009_collection_info` - Collection-level information
- `generate_sip009_transfer` - Create NFT transfers with post-conditions
- `generate_sip009_template` - Generate complete SIP-009 compliant contracts

### 🔐 Security & Post-Conditions (5 tools)
- `generate_fungible_post_condition` - Mandatory FT post-conditions
- `generate_nonfungible_post_condition` - Mandatory NFT post-conditions
- `generate_stx_post_condition` - STX transfer post-conditions
- `analyze_transaction_post_conditions` - Validate transaction security
- `generate_post_condition_template` - Security templates and patterns

### ⚡ Performance Optimization - SIP-012 (3 tools)
- `analyze_contract_performance` - Comprehensive performance analysis
- `estimate_operation_cost` - Cost estimation for Clarity operations
- `generate_optimization_recommendations` - SIP-012 optimization strategies

### 👤 Account Management (4 tools)
- `get_stacks_account_info` - Comprehensive account information
- `check_stx_balance` - Simple STX and token balance checks
- `get_transaction_history` - Account transaction history with pagination
- `validate_stacks_address` - Address format and network validation

### 🧪 Development & Testing (4 tools)
- `generate_clarinet_project` - Complete Clarinet project setup
- `generate_clarity_contract` - SIP-compliant contract generation
- `generate_contract_tests` - Unit, integration, and security tests
- `configure_clarinet_project` - Network and environment configuration

### 🎨 Frontend Development (3 tools)
- `build_clarity_smart_contract` - Smart contract development guidance
- `build_stacks_frontend` - Frontend integration with @stacks/connect
- `build_stacks_dapp` - Complete full-stack development guide

## 🚀 Quick Start Guide

### 1. Explore Available Standards
```typescript
// Discover all SIP standards
use tool: list_sips

// Get specific token standards
use tool: get_token_standards

// Access complete Clarity reference
use tool: get_clarity_book
```

### 2. Build a SIP-010 Token
```typescript
// Generate compliant token contract
use tool: generate_sip010_template
params: {
  tokenName: "MyToken",
  symbol: "MTK",
  decimals: 6,
  features: ["minting", "burning"]
}

// Create secure transfer
use tool: generate_sip010_transfer
params: {
  contractId: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.my-token",
  amount: 1000000,
  sender: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  recipient: "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
  memo: "Secure transfer with post-conditions"
}
```

### 3. Set Up Development Environment
```typescript
// Initialize Clarinet project
use tool: generate_clarinet_project
params: {
  projectName: "my-stacks-project",
  template: "fungible-token"
}

// Generate comprehensive tests
use tool: generate_contract_tests
params: {
  contractName: "my-token",
  testType: "security",
  scenarios: ["post-conditions", "authorization"]
}
```

## 🔒 Security Features

### Mandatory Post-Conditions
All token transfers **MUST** include post-conditions. The MCP server enforces this:

```typescript
// ✅ CORRECT: Transfer with post-conditions
use tool: generate_fungible_post_condition
params: {
  address: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
  contractId: "ST1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.token",
  amount: 1000000,
  condition: "equal"
}

// Always use PostConditionMode.Deny for maximum security
```

### SIP Compliance Enforcement
- Automatic SIP-009 and SIP-010 compliance checking
- Native asset function usage (ft-transfer?, nft-transfer?)
- Proper error handling and authorization patterns

## ⚡ Performance Optimization

### SIP-012 Benefits
- **2x Database Operations**: Increased read/write limits per block
- **Dynamic List Storage**: Pay only for actual data size
- **Optimized Cost Functions**: 100+ improved cost calculations

```typescript
// Analyze contract performance
use tool: analyze_contract_performance
params: {
  contractCode: "...", // Your Clarity contract
  optimizationLevel: "advanced"
}

// Get optimization recommendations
use tool: generate_optimization_recommendations
params: {
  contractPattern: "token-contract",
  currentIssues: ["high gas costs", "multiple map operations"]
}
```

## 📚 Comprehensive Documentation

Access to complete Stacks development resources:
- **34,000+ lines** of Clarity Book documentation
- **30+ SIP standards** with full implementations
- **Security patterns** and best practices
- **Performance optimization** guides
- **Frontend integration** examples

## 🏗️ Integration Examples

### React Frontend with @stacks/connect
```typescript
// Get complete frontend guidance
use tool: build_stacks_frontend

// Generate wallet connection code
// Transaction signing with post-conditions
// Error handling and user experience
```

### DeFi Protocol Development
```typescript
// Performance-optimized DeFi contract
use tool: generate_clarity_contract
params: {
  contractName: "amm-pool",
  contractType: "custom",
  features: ["governance", "staking"]
}

// Security testing
use tool: generate_contract_tests
params: {
  contractName: "amm-pool",
  testType: "security",
  scenarios: ["reentrancy", "authorization", "post-conditions"]
}
```

### NFT Marketplace
```typescript
// SIP-009 compliant NFT collection
use tool: generate_sip009_template
params: {
  collectionName: "Art Collection",
  symbol: "ART",
  features: ["metadata", "royalties"]
}

// Marketplace contract with escrow
use tool: generate_clarity_contract
params: {
  contractName: "nft-marketplace",
  contractType: "custom",
  features: ["escrow", "royalties"]
}
```

## 🔧 Development Workflow

1. **Research Standards**: Use `list_sips` and `get_sip` to understand requirements
2. **Generate Contracts**: Use template tools for SIP-compliant implementations
3. **Security Testing**: Generate comprehensive security test suites
4. **Performance Optimization**: Analyze and optimize using SIP-012 tools
5. **Frontend Integration**: Build user interfaces with wallet connectivity
6. **Deployment**: Use Clarinet tools for production deployment

## 📋 Production Checklist

- ✅ SIP compliance validated
- ✅ Mandatory post-conditions implemented
- ✅ Security tests passing
- ✅ Performance optimized with SIP-012
- ✅ Frontend properly integrated
- ✅ All tests (unit, integration, security) passing

## 🐛 Troubleshooting

### MCP Server Not Appearing in Cursor

1. **Check MCP Settings**:
   - Go to `Cursor → Settings → Cursor Settings → MCP`
   - Look for `stacks-clarity-mcp` entry
   - Check if indicator is green (connected) or red (error)
   - Click on the entry to see error details

2. **Verify Configuration**:
   - Ensure `.cursor/mcp.json` exists in project root
   - For local development, use **absolute path** to `server.ts`
   - Check that Node.js is installed: `node --version`

3. **Restart Cursor**:
   - Completely quit Cursor (not just close window)
   - Reopen Cursor
   - Wait 10-15 seconds for MCP to initialize

4. **Check Agent Mode**:
   - In Cursor chat, ensure dropdown is set to **Agent** (not normal chat)
   - MCP tools only work in Agent mode

5. **Test MCP Connection**:
   ```bash
   # Test the server directly
   npx tsx /path/to/server.ts
   
   # Or use MCP Inspector
   npx @modelcontextprotocol/inspector
   ```

### Common Issues

**"Command not found"**: Make sure you're using `npx tsx` not just `tsx`

**"Module not found"**: Run `npm install` in the MCP server directory

**Build errors**: For local development, use `tsx` to run from source (skips build step)

**Tools not visible**: Ensure you're in **Agent mode** and the MCP shows green indicator

### Getting Help

- Check [integration guides](integration_guides/) for detailed setup
- Review [development_usage.md](integration_guides/development_usage.md) for local development
- Use MCP Inspector to test tools: `npx @modelcontextprotocol/inspector`

## 🤝 Contributing

This MCP server implements the complete Stacks development stack. Contributions should maintain:

- Security-first principles
- SIP standard compliance
- Performance optimization focus
- Comprehensive documentation

## 📄 License

This project is licensed under the Apache-2.0 License.

## 🔗 Resources

- [Stacks Documentation](https://docs.stacks.co/)
- [Clarity Language Reference](https://docs.stacks.co/clarity/)
- [SIP Standards](https://github.com/stacksgov/sips)
- [Clarinet CLI](https://github.com/hirosystems/clarinet)
- [Stacks.js](https://github.com/hirosystems/stacks.js)

---

**Built for professional Stacks development with security, performance, and compliance as top priorities.**
