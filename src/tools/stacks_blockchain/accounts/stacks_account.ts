import { Tool } from "fastmcp";
import { z } from "zod";
import { recordTelemetry } from "../../../utils/telemetry.js";
import { StacksApiService } from "../../../services/StacksApiService.js";

// ============================================================================
// STACKS ACCOUNT MANAGEMENT TOOLS
// ============================================================================

// Schema for account information queries
const AccountInfoScheme = z.object({
  address: z.string().describe("Stacks address (e.g., SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R)"),
  includeTokens: z.boolean().optional().describe("Include token balances in response"),
  includeTransactions: z.boolean().optional().describe("Include recent transactions in response"),
});

const BalanceCheckScheme = z.object({
  address: z.string().describe("Stacks address to check balance for"),
  token: z.string().optional().describe("Specific token contract to check (e.g., SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.token-name)"),
});

const TransactionHistoryScheme = z.object({
  address: z.string().describe("Stacks address to get transaction history for"),
  limit: z.number().optional().describe("Number of transactions to retrieve (default: 20, max: 50)"),
  offset: z.number().optional().describe("Number of transactions to skip for pagination"),
});

const AddressValidationScheme = z.object({
  address: z.string().describe("Address to validate"),
  network: z.enum(["mainnet", "testnet"]).optional().describe("Network to validate against"),
});

// Get comprehensive account information
export const getStacksAccountInfoTool: Tool<undefined, typeof AccountInfoScheme> = {
  name: "get_stacks_account_info",
  description: "Get comprehensive information about a Stacks account including STX balance, nonce, tokens, and recent activity.",
  parameters: AccountInfoScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "get_stacks_account_info" }, context);
      
      const apiService = new StacksApiService();
      const network = (process.env.STACKS_NETWORK as "mainnet" | "testnet" | "devnet") || "mainnet";
      const accountInfo = await apiService.getAccountInfo(args.address, network);
      
      let response = `# Stacks Account Information

## Address: ${args.address}

### STX Balance
- **Total STX**: ${(parseInt(accountInfo.balance) / 1000000).toLocaleString()} STX
- **Available STX**: ${(parseInt(accountInfo.balance) / 1000000).toLocaleString()} STX
- **Locked STX**: ${(parseInt(accountInfo.locked) / 1000000).toLocaleString()} STX

### Account Details
- **Account Nonce**: ${accountInfo.nonce}
- **Account Status**: Active

### Network Information
- **Network**: ${process.env.STACKS_NETWORK || 'mainnet'}
- **API Endpoint**: ${process.env.STACKS_API_URL || 'https://api.stacks.co'}`;

      // Add token information if requested
      if (args.includeTokens) {
        try {
          const balanceData = await apiService.getAccountBalance(args.address, network);
          
          if (balanceData && balanceData.fungible_tokens) {
            response += `\n\n### Token Balances\n`;
            Object.entries(balanceData.fungible_tokens).forEach(([tokenId, tokenData]: [string, any]) => {
              response += `- **${tokenId}**: ${tokenData.balance}\n`;
            });
          } else {
            response += `\n\n### Token Balances\nNo token balances found.`;
          }
        } catch (error) {
          response += `\n\n### Token Balances\n⚠️ Could not retrieve token balances: ${error}`;
        }
      }

      // Add transaction history if requested
      if (args.includeTransactions) {
        try {
          const txData = await apiService.getAccountTransactions(args.address, network, 10);
          const transactions = txData.results || [];
          
          if (transactions && transactions.length > 0) {
            response += `\n\n### Recent Transactions (Last 10)\n`;
            transactions.forEach((tx: any, index: number) => {
              response += `${index + 1}. **${tx.tx_type}** - ${tx.tx_status} (Block: ${tx.block_height || 'Pending'})\n`;
              response += `   - TX ID: ${tx.tx_id}\n`;
              response += `   - Fee: ${(parseInt(tx.fee_rate || '0') / 1000000).toFixed(6)} STX\n\n`;
            });
          } else {
            response += `\n\n### Recent Transactions\nNo recent transactions found.`;
          }
        } catch (error) {
          response += `\n\n### Recent Transactions\n⚠️ Could not retrieve transactions: ${error}`;
        }
      }

      response += `\n\n## Useful Tools
- Use \`check_stx_balance\` for simple STX balance checks
- Use \`get_transaction_history\` for detailed transaction analysis
- Use \`validate_stacks_address\` to verify address format
- Use \`get_sip010_balance\` for specific token balance checks`;

      return response;
      
    } catch (error) {
      return `❌ Failed to get account information: ${error}`;
    }
  },
};

// Check STX balance for an address
export const checkSTXBalanceTool: Tool<undefined, typeof BalanceCheckScheme> = {
  name: "check_stx_balance",
  description: "Check the STX balance for a Stacks address. Simple and fast balance lookup.",
  parameters: BalanceCheckScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "check_stx_balance" }, context);
      
      const apiService = new StacksApiService();
      const network = (process.env.STACKS_NETWORK as "mainnet" | "testnet" | "devnet") || "mainnet";
      
      if (args.token) {
        // Check specific token balance
        const [contractAddress, contractName] = args.token.split('.');
        const balance = await apiService.getFungibleTokenBalance(args.token, args.address, network);
        
        return `# Token Balance

**Address**: ${args.address}
**Token**: ${args.token}
**Balance**: ${balance} base units

## Token Details
- **Contract**: ${args.token}

Use \`get_sip010_info\` to get more details about this token contract.`;
        
      } else {
        // Check STX balance
        const accountInfo = await apiService.getAccountInfo(args.address, network);
        const stxBalance = parseInt(accountInfo.balance) / 1000000;
        const lockedSTX = parseInt(accountInfo.locked) / 1000000;
        const totalSTX = stxBalance + lockedSTX;
        
        return `# STX Balance

**Address**: ${args.address}
**Available STX**: ${stxBalance.toLocaleString()} STX
**Locked STX**: ${lockedSTX.toLocaleString()} STX
**Total STX**: ${totalSTX.toLocaleString()} STX
**Account Nonce**: ${accountInfo.nonce}

${lockedSTX > 0 ? `\n⚠️ **Note**: ${lockedSTX.toLocaleString()} STX is locked (likely in Stacking)` : ''}

Use \`get_stacks_account_info\` with \`includeTokens: true\` to see all token balances.`;
      }
      
    } catch (error) {
      return `❌ Failed to check balance: ${error}`;
    }
  },
};

// Get transaction history for an address
export const getTransactionHistoryTool: Tool<undefined, typeof TransactionHistoryScheme> = {
  name: "get_transaction_history",
  description: "Get detailed transaction history for a Stacks address with pagination support.",
  parameters: TransactionHistoryScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "get_transaction_history" }, context);
      
      const apiService = new StacksApiService();
      const network = (process.env.STACKS_NETWORK as "mainnet" | "testnet" | "devnet") || "mainnet";
      const limit = Math.min(args.limit || 20, 50); // Cap at 50
      const offset = args.offset || 0;
      
      const txData = await apiService.getAccountTransactions(args.address, network, limit, offset);
      const transactions = txData.results || [];
      
      if (!transactions || transactions.length === 0) {
        return `# Transaction History

**Address**: ${args.address}
**Result**: No transactions found.

The address may be new or have no transaction activity yet.`;
      }

      let response = `# Transaction History

**Address**: ${args.address}
**Showing**: ${transactions.length} transactions (offset: ${offset})

`;

      transactions.forEach((tx: any, index: number) => {
        const txNumber = offset + index + 1;
        const fee = (parseInt(tx.fee_rate || '0') / 1000000).toFixed(6);
        
        response += `## ${txNumber}. ${tx.tx_type.toUpperCase()} Transaction

**Status**: ${tx.tx_status}
**TX ID**: \`${tx.tx_id}\`
**Block Height**: ${tx.block_height || 'Pending'}
**Fee**: ${fee} STX
**Nonce**: ${tx.nonce}

`;

        // Add type-specific details
        if (tx.tx_type === 'token_transfer') {
          const amount = (parseInt(tx.token_transfer?.amount || '0') / 1000000).toFixed(6);
          response += `**Amount**: ${amount} STX
**From**: ${tx.sender_address}
**To**: ${tx.token_transfer?.recipient_address}
**Memo**: ${tx.token_transfer?.memo || 'None'}

`;
        } else if (tx.tx_type === 'contract_call') {
          response += `**Contract**: ${tx.contract_call?.contract_id}
**Function**: ${tx.contract_call?.function_name}
**Sender**: ${tx.sender_address}

`;
        } else if (tx.tx_type === 'smart_contract') {
          response += `**Contract**: ${tx.smart_contract?.contract_id}
**Source Code**: ${tx.smart_contract?.source_code ? 'Available' : 'Not available'}

`;
        }
      });

      response += `\n## Pagination
- **Current Offset**: ${offset}
- **Results Per Page**: ${limit}
- **Next Page**: Use offset ${offset + limit} to get more transactions

Use \`get_stacks_account_info\` for account overview or specific transaction tools for detailed analysis.`;

      return response;
      
    } catch (error) {
      return `❌ Failed to get transaction history: ${error}`;
    }
  },
};

// Validate Stacks address format
export const validateStacksAddressTool: Tool<undefined, typeof AddressValidationScheme> = {
  name: "validate_stacks_address",
  description: "Validate a Stacks address format and check if it's correctly formatted for the specified network.",
  parameters: AddressValidationScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "validate_stacks_address" }, context);
      
      const address = args.address.trim();
      const network = args.network || 'mainnet';
      
      // Basic format validation
      const isValidFormat = /^S[TPMNX][A-Z0-9]{36,41}$/.test(address);
      
      if (!isValidFormat) {
        return `# Address Validation Result

**Address**: ${address}
**Valid Format**: ❌ No
**Network**: ${network}

## Issues Detected
- Address does not match Stacks address format
- Expected format: S[TPMNX][A-Z0-9]{36-41}

## Valid Examples
- **Mainnet**: SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R
- **Testnet**: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM

## Next Steps
- Check address spelling and format
- Ensure you're using the correct network prefix (SP for mainnet, ST for testnet)`;
      }

      // Network-specific validation
      const prefix = address.substring(0, 2);
      const expectedMainnetPrefix = 'SP';
      const expectedTestnetPrefix = 'ST';
      
      let networkMatch = true;
      let actualNetwork = 'unknown';
      
      if (prefix === expectedMainnetPrefix) {
        actualNetwork = 'mainnet';
        networkMatch = (network === 'mainnet');
      } else if (prefix === expectedTestnetPrefix) {
        actualNetwork = 'testnet';
        networkMatch = (network === 'testnet');
      } else {
        networkMatch = false;
      }

      // Try to get additional info if address is valid
      let additionalInfo = '';
      if (isValidFormat && networkMatch) {
        try {
          const apiService = new StacksApiService();
          const validNetwork = network as "mainnet" | "testnet" | "devnet";
          const accountInfo = await apiService.getAccountInfo(address, validNetwork);
          const balance = (parseInt(accountInfo.balance) / 1000000).toLocaleString();
          
          additionalInfo = `\n## Account Status
- **STX Balance**: ${balance} STX
- **Account Nonce**: ${accountInfo.nonce}
- **Status**: Account exists and is active`;
          
        } catch (error) {
          additionalInfo = `\n## Account Status
- **Status**: Valid format but account may not exist or be inactive
- **Note**: ${error}`;
        }
      }

      return `# Address Validation Result

**Address**: ${address}
**Valid Format**: ${isValidFormat ? '✅ Yes' : '❌ No'}
**Expected Network**: ${network}
**Actual Network**: ${actualNetwork}
**Network Match**: ${networkMatch ? '✅ Yes' : '❌ No'}

## Address Details
- **Prefix**: ${prefix}
- **Length**: ${address.length} characters
- **Format**: ${isValidFormat ? 'Correct Stacks address format' : 'Invalid format'}

${!networkMatch && isValidFormat ? `\n⚠️ **Network Mismatch**: Address is for ${actualNetwork} but you specified ${network}` : ''}

${additionalInfo}

## Supported Networks
- **Mainnet**: Addresses start with 'SP'
- **Testnet**: Addresses start with 'ST'`;
      
    } catch (error) {
      return `❌ Failed to validate address: ${error}`;
    }
  },
};