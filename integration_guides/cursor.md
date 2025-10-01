# Integrate Stacks Clarity MCP with Cursor

1. Open the Cursor IDE
2. On the project root folder, create a `.cursor` folder
3. In the `.cursor` folder, create a `mcp.json` file
4. Paste this content:

    ```json
    {
      "mcpServers": {
        "stacks-clarity-mcp": {
          "command": "npx",
          "args": ["-y", "@stacks/stacks-clarity-mcp"],
          "env": {
            "HIRO_API_KEY": "<your_hiro_api_key>",
            "STACKS_NETWORK": "mainnet"
          }
        }
      }
    }
    ```

5. Update the environment variables:
   - Replace `<your_hiro_api_key>` with your Hiro API key (optional, for enhanced features)
   - Set `STACKS_NETWORK` to "mainnet", "testnet", or "devnet"

### Verify Cursor runs your MCP

1. Open Cursor Setting: `cursor -> setting -> cursor setting`
2. Head to the `MCP` or `Tools & Integrations` section
3. Make sure it is enabled and showing a green color indicator

4. Click the "refresh" icon to update the MCP.

5. Make sure the Cursor AI window dropdown is set to `Agent`

6. Prompt the agent with `what stacks clarity mcp version are you using?` to verify the connection. The agent should respond with the current version.

### Available Stacks MCP Tools

Once connected, you'll have access to 32+ specialized Stacks development tools:

- **Standards Access**: `list_sips`, `get_sip`, `get_clarity_book`
- **Token Development**: `generate_sip010_template`, `generate_sip009_template`
- **Security Tools**: `generate_fungible_post_condition`, `analyze_transaction_post_conditions`
- **Performance**: `analyze_contract_performance`, `estimate_operation_cost`
- **Account Management**: `get_stacks_account_info`, `check_stx_balance`
- **Development**: `generate_clarinet_project`, `generate_clarity_contract`

### Example Usage

Try these prompts to get started:

- "Help me create a SIP-010 fungible token with minting and burning"
- "Generate a secure NFT marketplace contract following SIP-009"
- "Set up a Clarinet project for DeFi development"
- "Analyze my contract performance for SIP-012 optimization"

### Getting Hiro API Key (Optional)

For enhanced features like higher rate limits and premium APIs:

1. Visit [Hiro Platform](https://platform.hiro.so)
2. Sign up for an account
3. Create a new API key in the dashboard
4. Add the key to your `.cursor/mcp.json` configuration

### Troubleshooting

- If the MCP doesn't load, ensure you have Node.js installed
- Check that the MCP shows as "connected" in Cursor settings
- Verify your environment variables are correctly set
- Try restarting Cursor after configuration changes

### Network Configuration

Choose the appropriate network for your development:

- **Devnet**: Local development with Clarinet
- **Testnet**: Testing with real network but test tokens
- **Mainnet**: Production deployment with real STX

Your Stacks Clarity MCP is now ready for professional blockchain development!