# Integrate Stacks Clarity MCP with Claude Code

1. Install the Claude Code CLI by following the instructions [here](https://claude.ai/code).

2. (Optional) Obtain your `HIRO_API_KEY` by signing up at [Hiro Platform](https://platform.hiro.so) and creating an API key for enhanced features.

3. Navigate to your project:

```bash
cd your-stacks-project
```

4. Add the Stacks Clarity MCP server to your project using the Claude CLI:

```bash
claude mcp add -s local stacks-clarity-mcp npx -e HIRO_API_KEY=<your_hiro_api_key> -e STACKS_NETWORK=mainnet -- -y @stacks/stacks-clarity-mcp
```

Replace `<your_hiro_api_key>` with your Hiro API key (optional for enhanced features).

**Note:** The `-s local` flag adds the MCP server to your project's local configuration. You can also use:
- `-s user` to add it globally for all projects
- `-s project` to add it to the project's shared configuration (if you want to commit it to version control)

5. Verify the MCP server was added successfully:

```bash
claude mcp list
```

You should see `stacks-clarity-mcp` in the list of configured servers.

6. Start Claude Code:

```bash
claude
```

7. Verify the connection by prompting: `what stacks clarity mcp version are you using?`

The agent should reply with something like:

```text
I'm using Stacks Clarity MCP version 0.1.0.
```

## Alternative: Using JSON configuration

If you encounter issues with the CLI approach, you can use the JSON method:

```bash
claude mcp add-json local '{"stacks-clarity-mcp": {"command": "npx", "args": ["-y", "@stacks/stacks-clarity-mcp"], "type": "stdio", "env": {"HIRO_API_KEY": "<your_hiro_api_key>", "STACKS_NETWORK": "mainnet"}}}'
```

## Environment Variables

Configure these environment variables for your setup:

- `HIRO_API_KEY`: Your Hiro API key (optional, for enhanced features)
- `STACKS_NETWORK`: Network to use ("mainnet", "testnet", or "devnet")

## Available Tools

Once connected, you'll have access to 32+ specialized Stacks development tools:

### Standards & Documentation (5 tools)
- `list_sips` - Discover all available SIP standards
- `get_sip` - Get specific SIP content with Clarity code
- `get_clarity_book` - Complete Clarity language reference
- `get_token_standards` - Essential SIP-009/SIP-010 standards
- `search_sips` - Search SIPs by topic

### Token Development (8 tools)
- `get_sip010_info` - Fungible token information
- `get_sip010_balance` - Check FT balances
- `generate_sip010_transfer` - Create secure transfers
- `generate_sip010_template` - Generate SIP-010 contracts
- `get_sip009_token_info` - NFT information
- `generate_sip009_transfer` - Create NFT transfers
- `generate_sip009_template` - Generate SIP-009 contracts
- `get_sip009_collection_info` - Collection information

### Security & Post-Conditions (5 tools)
- `generate_fungible_post_condition` - Mandatory FT post-conditions
- `generate_nonfungible_post_condition` - Mandatory NFT post-conditions
- `generate_stx_post_condition` - STX transfer post-conditions
- `analyze_transaction_post_conditions` - Security validation
- `generate_post_condition_template` - Security templates

### Performance Optimization (3 tools)
- `analyze_contract_performance` - SIP-012 performance analysis
- `estimate_operation_cost` - Cost estimation
- `generate_optimization_recommendations` - Performance improvements

### Account Management (4 tools)
- `get_stacks_account_info` - Comprehensive account information
- `check_stx_balance` - Simple balance checks
- `get_transaction_history` - Transaction history
- `validate_stacks_address` - Address validation

### Development & Testing (4 tools)
- `generate_clarinet_project` - Complete project setup
- `generate_clarity_contract` - SIP-compliant contracts
- `generate_contract_tests` - Comprehensive test suites
- `configure_clarinet_project` - Environment configuration

### Frontend Development (3 tools)
- `build_clarity_smart_contract` - Smart contract guidance
- `build_stacks_frontend` - Frontend integration
- `build_stacks_dapp` - Full-stack development

## Example Usage

Try these prompts to get started:

### Token Development
```
"Create a SIP-010 fungible token called MyToken with minting and burning capabilities"
```

### NFT Development
```
"Generate a SIP-009 NFT collection with metadata and marketplace functionality"
```

### Security Analysis
```
"Analyze this contract for performance bottlenecks and generate optimization recommendations"
```

### Project Setup
```
"Set up a new Clarinet project for DeFi development with comprehensive testing"
```

### Account Management
```
"Check the STX balance and transaction history for this address: SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R"
```

## Troubleshooting

- If Claude doesn't recognize the Stacks MCP tools, ensure you've completely restarted Claude Code after adding the configuration
- Run `claude mcp list` to verify the server is properly configured
- Check that your `HIRO_API_KEY` is valid (if using enhanced features)
- Verify Node.js is installed and accessible
- Try running the MCP server directly to test: `npx @stacks/stacks-clarity-mcp`

## Network Configuration

Configure the appropriate network for your development needs:

- **Devnet**: `STACKS_NETWORK=devnet` - Local development with Clarinet
- **Testnet**: `STACKS_NETWORK=testnet` - Testing with real network but test tokens
- **Mainnet**: `STACKS_NETWORK=mainnet` - Production deployment with real STX

## Security Features

The Stacks Clarity MCP enforces security best practices:

- **Mandatory Post-Conditions**: All token transfers require post-conditions
- **SIP Compliance**: Automatic compliance checking for SIP-009 and SIP-010
- **PostConditionMode.Deny**: Maximum security enforcement
- **Native Functions**: Required use of ft-transfer?, nft-transfer? functions

Your Stacks Clarity MCP is now integrated with Claude Code for professional blockchain development!