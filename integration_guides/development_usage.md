# Local Development with the Stacks Clarity MCP

This guide explains how to set up and develop locally with the Stacks Clarity MCP server.

## Getting Started

To get started, clone the repository and then navigate into the folder:

```bash
git clone https://github.com/stacks-org/stacks-clarity-mcp.git
cd stacks-clarity-mcp
```

Install the dependencies:

```bash
npm install
```

## Start the Server

If you simply want to start the server, you can use the `start` script:

```bash
npm run start
```

However, you can also interact with the server using the `dev` script:

```bash
npm run dev
```

This will start the server and allow you to interact with it using CLI.

## Link Local MCP Server to Your Project

### Cursor

```json
{
  "mcpServers": {
    "stacks-clarity-mcp": {
      "command": "npx",
      "args": ["tsx", "<path-to-mcp-server>/src/server.ts"],
      "env": {
        "HIRO_API_KEY": "<your_hiro_api_key>",
        "STACKS_NETWORK": "devnet"
      }
    }
  }
}
```

### Claude Code

```json
{
  "mcpServers": {
    "stacks-clarity-mcp": {
      "command": "npx",
      "args": ["tsx", "<path-to-mcp-server>/src/server.ts"],
      "type": "stdio",
      "env": {
        "HIRO_API_KEY": "<your_hiro_api_key>",
        "STACKS_NETWORK": "devnet"
      }
    }
  }
}
```

## Environment Configuration

Create a `.env` file in the project root:

```env
# Network Configuration
STACKS_NETWORK=devnet
STACKS_API_URL=http://localhost:3999
STACKS_EXPLORER_URL=http://localhost:8000

# API Configuration (Optional)
HIRO_API_KEY=your_hiro_api_key

# Development Settings
DEBUG=true
LOG_LEVEL=debug
NODE_ENV=development

# Clarinet Integration
CLARINET_MODE=development
```

## Development Commands

```bash
# Build the project
npm run build

# Start development server with auto-reload
npm run dev

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format

# Type checking (if available)
tsc --noEmit
```

## Debugging

You can test and debug the MCP using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) tool.

Run the following command from the root path of this repo:

```bash
npx @modelcontextprotocol/inspector
```

That would open up a UI where you can run and test the MCP tools/prompts/resources.

### Debug with Environment Variables

Enable detailed logging:

```bash
DEBUG=true LOG_LEVEL=debug npm run start
```

### Testing Individual Tools

You can test individual tools by calling them directly:

```bash
# Test SIP listing
npm run dev -- --tool list_sips

# Test contract generation
npm run dev -- --tool generate_sip010_template --params '{"tokenName": "TestToken", "symbol": "TEST"}'
```

## Linting

Having a good linting setup reduces the friction for other developers to contribute to your project:

```bash
npm run lint
```

This project uses [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [TypeScript ESLint](https://typescript-eslint.io/) to lint the code.

## Formatting

Use `npm run format` to format the code:

```bash
npm run format
```

## Project Structure

```
stacks-clarity-mcp/
├── src/
│   ├── config.ts                    # Configuration management
│   ├── server.ts                    # Main MCP server
│   ├── services/
│   │   └── StacksApiService.ts      # Stacks API interactions
│   ├── tools/                       # MCP tool implementations
│   │   └── stacks_blockchain/
│   │       ├── tokens/              # Token-related tools
│   │       ├── security/            # Security and post-conditions
│   │       ├── performance/         # SIP-012 optimization
│   │       ├── accounts/            # Account management
│   │       └── development/         # Clarinet and testing
│   ├── resources/                   # Documentation and guides
│   │   ├── clarity/                 # Clarity language resources
│   │   ├── tokens/                  # Token development guides
│   │   ├── frontend/                # Frontend integration
│   │   ├── management/              # Account and key management
│   │   └── integration/             # Complete integration guides
│   └── utils/                       # Utility functions
├── integration_guides/              # Client integration guides
├── stacks-clarity-standards/        # SIP standards and Clarity Book
├── package.json
├── tsconfig.json
└── README.md
```

## Adding New Tools

To add a new MCP tool:

1. Create a new tool file in the appropriate `src/tools/stacks_blockchain/` subdirectory
2. Implement the tool following the existing patterns:

```typescript
import { Tool } from "fastmcp";
import { z } from "zod";
import { recordTelemetry } from "../../../utils/telemetry.js";

const MyToolSchema = z.object({
  parameter: z.string().describe("Description of the parameter")
});

export const myNewTool: Tool<undefined, typeof MyToolSchema> = {
  name: "my_new_tool",
  description: "Description of what this tool does",
  parameters: MyToolSchema,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "my_new_tool" }, context);
      
      // Tool implementation here
      
      return "Tool response";
    } catch (error) {
      return `❌ Error: ${error}`;
    }
  },
};
```

3. Register the tool in `src/tools/index.ts`:

```typescript
import { myNewTool } from "./stacks_blockchain/category/my_new_tool.js";

export function registerTools(server: FastMCP): void {
  // ... existing tools
  server.addTool(myNewTool);
}
```

## Testing Your Changes

1. Build the project:
```bash
npm run build
```

2. Test the MCP server directly:
```bash
npm run start
```

3. Test with Claude Code or Cursor using the development configuration

4. Use the MCP Inspector for detailed testing:
```bash
npx @modelcontextprotocol/inspector
```

## Available Development Tools

The MCP server provides 32+ tools for Stacks development:

- **Standards Access**: SIP standards and Clarity Book
- **Token Development**: SIP-010 FT and SIP-009 NFT tools
- **Security**: Mandatory post-conditions and transaction analysis
- **Performance**: SIP-012 optimization and cost analysis
- **Account Management**: STX balances and transaction history
- **Development**: Clarinet project setup and contract generation
- **Frontend**: Complete dApp development guidance

## Contributing Guidelines

1. **Code Style**: Follow the existing TypeScript patterns
2. **Security**: Always include proper error handling and input validation
3. **Documentation**: Update relevant documentation for changes
4. **Testing**: Test all changes with the MCP Inspector
5. **SIP Compliance**: Ensure all token-related features follow SIP standards

## Performance Considerations

- Use caching for expensive operations
- Implement proper error handling with descriptive messages
- Follow SIP-012 optimization patterns
- Monitor tool execution times

## Security Best Practices

- Never commit sensitive keys or credentials
- Validate all user inputs
- Use PostConditionMode.Deny for transaction security
- Follow mandatory post-condition patterns
- Implement proper authorization checks

Your local development environment is now ready for Stacks Clarity MCP development!