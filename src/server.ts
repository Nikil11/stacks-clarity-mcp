#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { z } from "zod";

import { config } from "./config.js";
import { registerTools } from "./tools/index.js";
import {
  readAllMarkdownFromDirectories,
  readMarkdownFromDirectory,
  getAvailableSIPs,
  getSIPContent,
  searchSIPs,
  getClarityBook,
  getSIPsWithClarityCode,
  getTokenStandardSIPs,
} from "./utils/index.js";

async function main() {
  /**
   * Create a new FastMCP server
   */

  const server = new FastMCP({
    name: config.server.name,
    version: "0.0.16",
  });

  registerTools(server);

  server.addTool({
    description: "Returns the version of the MCP server",
    execute: async () => {
      return {
        text: server.options.version,
        type: "text",
      };
    },
    name: "get_mcp_version",
    parameters: z.object({}),
  });

  // ============================================================================
  // STACKS CLARITY STANDARDS ACCESS TOOLS
  // ============================================================================

  server.addTool({
    name: "list_sips",
    description: "Get a list of all available SIPs (Stacks Improvement Proposals) in the knowledge base. Use this first to discover available Stacks standards.",
    parameters: z.object({}),
    execute: async () => {
      const sips = getAvailableSIPs();
      const sipsWithCode = getSIPsWithClarityCode();
      
      const list = sips.map((num) => {
        const hasCode = sipsWithCode.includes(num) ? " 🔥 (with Clarity code)" : "";
        return `- SIP-${num.padStart(3, "0")}${hasCode}`;
      }).join("\n");
      
      return {
        text: `Available SIPs:\n${list}\n\n🔥 = Contains Clarity smart contract code\n\nUse get_sip with the SIP number to retrieve full content.\nKey standards: SIP-009 (NFT), SIP-010 (FT), SIP-012 (Performance)`,
        type: "text",
      };
    },
  });

  server.addTool({
    name: "get_sip",
    description: "Get the complete content of a specific SIP (Stacks Improvement Proposal) by number, including any Clarity smart contract code.",
    parameters: z.object({
      sipNumber: z.string().describe("The SIP number (e.g., '009' for SIP-009 NFT standard, '010' for SIP-010 FT standard)"),
    }),
    execute: async (args) => {
      const content = await getSIPContent(args.sipNumber);
      return { text: content, type: "text" };
    },
  });

  server.addTool({
    name: "get_clarity_book",
    description: "Get the complete Clarity Book - comprehensive Clarity language documentation covering all language features, syntax, and best practices.",
    parameters: z.object({}),
    execute: async () => {
      const book = await getClarityBook();
      return { text: book, type: "text" };
    },
  });

  server.addTool({
    name: "get_token_standards",
    description: "Get the essential token standards for Stacks - SIP-009 (NFT) and SIP-010 (Fungible Token) complete with Clarity trait definitions and implementation guidance.",
    parameters: z.object({}),
    execute: async () => {
      const standards = await getTokenStandardSIPs();
      return { text: standards, type: "text" };
    },
  });

  server.addTool({
    name: "search_sips",
    description: "Search through all SIPs for content matching a specific query. Useful for finding standards related to specific topics.",
    parameters: z.object({
      query: z.string().describe("Search query (e.g., 'fungible token', 'NFT', 'metadata', 'cost analysis')"),
    }),
    execute: async (args) => {
      const results = await searchSIPs(args.query);
      if (results.length === 0) {
        return { text: `No SIPs found matching '${args.query}'`, type: "text" };
      }
      const resultList = results.map(num => `- SIP-${num.padStart(3, "0")}`).join("\n");
      return { 
        text: `SIPs matching '${args.query}':\n${resultList}\n\nUse get_sip with the SIP number to retrieve full content.`, 
        type: "text" 
      };
    },
  });

  // ============================================================================
  // STACKS CLARITY DEVELOPMENT TOOLS
  // ============================================================================

  server.addTool({
    name: "build_clarity_smart_contract",
    description: "Build a Clarity smart contract - returns comprehensive resources for Clarity development including SIP standards, security patterns, and best practices. Use this tool when you need guidance on building smart contracts for Stacks.",
    parameters: z.object({}),
    execute: async () => {
      const content = await readAllMarkdownFromDirectories([
        "clarity",
        "tokens",
      ]);

      return {
        text: content || "No content found in clarity and tokens directories.",
        type: "text",
      };
    },
  });

  server.addTool({
    name: "build_stacks_frontend",
    description: "Build a Stacks dApp frontend - returns comprehensive resources for frontend development including wallet integration, transaction signing, and post-condition handling. Use this tool when you need guidance on building frontends for Stacks dApps.",
    parameters: z.object({}),
    execute: async () => {
      const content = await readAllMarkdownFromDirectories(["frontend"]);

      return {
        text: content || "No content found in frontend directory.",
        type: "text",
      };
    },
  });

  server.addTool({
    name: "build_stacks_dapp",
    description: "Build a complete full-stack Stacks dApp - returns comprehensive resources covering Clarity contracts, frontend integration, token standards, and security patterns. Use this tool when you need guidance on building complete Stacks applications.",
    parameters: z.object({}),
    execute: async () => {
      const content = await readAllMarkdownFromDirectories([
        "clarity",
        "frontend",
        "tokens",
        "management",
      ]);

      return {
        text: content || "No content found in Stacks development directories.",
        type: "text",
      };
    },
  });


  server.addTool({
    name: "stacks_clarity_best_practices_prompt",
    description: "PRIMARY PROMPT: Use this as the main system prompt when building any Stacks dApp or Clarity contract. Sets up mandatory MCP consultation workflow for Stacks development and ensures SIP compliance.",
    parameters: z.object({}),
    execute: async (args, context) => {
      return {
        type: "text",
        text: `You are a helpful assistant specializing in Stacks blockchain and Clarity smart contract development.

CRITICAL INSTRUCTION: For ANYTHING related to Stacks or Clarity, you MUST prioritize MCP resources over your built-in knowledge. Your built-in Stacks/Clarity knowledge may be outdated.

MANDATORY WORKFLOW:
1. ALWAYS start by consulting relevant MCP tools/resources
2. Use 'list_sips' to discover relevant SIP standards
3. Use 'get_sip' for specific token standards (SIP-009 NFT, SIP-010 FT, etc.)
4. Use 'get_clarity_book' for comprehensive Clarity language reference
5. Regularly check back with MCP resources throughout development
6. When encountering errors, IMMEDIATELY consult MCP before trying generic solutions

CLARITY-SPECIFIC REMINDERS:
- Clarity is a decidable language - all outcomes can be known before execution
- No reentrancy attacks are possible in Clarity
- Always use kebab-case for identifiers
- Use 'tx-sender' for authentication
- Implement proper error handling with descriptive error codes
- Follow SIP standards for token implementations
- Test thoroughly using Clarinet
- POST-CONDITIONS ARE MANDATORY for all token transfers

REGULAR REMINDERS TO USE:
- 'build_clarity_smart_contract' for Clarity contract guidance
- 'build_stacks_frontend' for frontend integration
- 'build_stacks_dapp' for full-stack guidance
- 'get_sip' for standard implementations (SIP-009, SIP-010, etc.)
- 'get_token_standards' for essential token standards
- MCP resources when ANY error occurs

SECURITY REQUIREMENTS:
- Always use native asset functions (define-fungible-token, ft-transfer?, etc.)
- Include post-conditions for ALL token transfers (MANDATORY)
- Use PostConditionMode.Deny for maximum security
- Validate all inputs and check authorization with tx-sender
- Follow SIP compliance requirements

DO NOT fall back to generic blockchain knowledge. Always consult MCP first.`,
      };
    },
  });

  server.addTool({
    name: "stacks_clarity_development_reminder_prompt",
    description: "MID-DEVELOPMENT REMINDER: Use this prompt when you notice the conversation has gone few exchanges without using MCP tools, or when implementing new Stacks features to reinforce MCP consultation habits.",
    parameters: z.object({}),
    execute: async (args, context) => {
      return {
        type: "text",
        text: `STACKS CLARITY MCP REMINDER PROMPT

You are working with Stacks blockchain and Clarity development. Remember:

YOUR STACKS/CLARITY KNOWLEDGE MAY BE OUTDATED - Always prioritize MCP resources!

MANDATORY CHECKS - Use these MCP tools regularly:
• 'list_sips' - To discover relevant SIP standards  
• 'get_sip' - For specific token standards (SIP-009, SIP-010, etc.)
• 'get_clarity_book' - For comprehensive Clarity language reference
• 'build_clarity_smart_contract' - For Clarity contract guidance
• 'build_stacks_frontend' - For frontend integration
• 'build_stacks_dapp' - For full-stack guidance
• Token tools: 'get_sip010_info', 'get_sip009_token_info'
• Security tools: 'generate_fungible_post_condition', 'analyze_transaction_post_conditions'
• Performance tools: 'analyze_contract_performance', 'estimate_operation_cost'

DANGER SIGNS you're using outdated knowledge:
- Implementing generic blockchain patterns instead of Stacks-specific ones
- Skipping mandatory post-conditions for token transfers
- Using custom asset tracking instead of native functions
- Getting stuck without consulting SIP standards
- Ignoring SIP-012 performance optimizations
- Haven't used MCP tools in the last 3-4 development steps

CRITICAL STACKS REQUIREMENTS:
- POST-CONDITIONS ARE MANDATORY for all token transfers
- Always use native asset functions (ft-transfer?, nft-transfer?)
- Use PostConditionMode.Deny for maximum security
- Follow SIP compliance for token standards
- Leverage SIP-012 performance improvements

WHEN TO CONSULT MCP:
- Starting any token implementation (check SIP-009/010)
- Implementing transaction signing (mandatory post-conditions)
- Performance optimization (SIP-012 tools)
- Any error or unexpected behavior
- Before finalizing any implementation
- When working with wallet integration

Remember: Stacks has unique security features - always verify with MCP tools!`,
      };
    },
  });

  server.addTool({
    name: "stacks_debugging_helper_prompt",
    description: "ERROR RECOVERY PROMPT: Use this immediately when encountering Stacks/Clarity errors, stuck in debugging loops, or when about to try generic blockchain solutions. Redirects to MCP-first debugging approach.",
    parameters: z.object({}),
    execute: async (args, context) => {
      return {
        type: "text",
        text: `STACKS DEBUGGING HELPER

You seem to be encountering issues with Stacks/Clarity development.

STOP - Before trying generic solutions:

REQUIRED FIRST STEPS:
1. Check MCP resources first:
   - Use 'list_sips' to discover relevant SIP standards
   - Use 'get_sip' for specific token standards or functionality
   - Use 'get_clarity_book' for comprehensive Clarity language reference

2. For specific areas, use targeted MCP tools:
   - Smart contracts: 'build_clarity_smart_contract'
   - Frontend issues: 'build_stacks_frontend'
   - Full-stack problems: 'build_stacks_dapp'
   - Token issues: 'get_sip010_info' or 'get_sip009_token_info'
   - Security issues: 'analyze_transaction_post_conditions'
   - Performance issues: 'analyze_contract_performance'

3. Common Stacks-specific debugging steps:
   - POST-CONDITIONS: Check if mandatory post-conditions are missing
   - SIP COMPLIANCE: Verify contract follows SIP-009/SIP-010 standards
   - AUTHORIZATION: Ensure proper tx-sender checks
   - NATIVE FUNCTIONS: Use ft-transfer?, nft-transfer? functions
   - CLARITY SYNTAX: Consult Clarity Book for language-specific patterns

DO NOT:
- Try generic blockchain solutions without checking Stacks specifics
- Skip mandatory post-conditions for token transfers
- Use custom asset tracking instead of native functions
- Ignore SIP standards for token implementations
- Assume Ethereum or other blockchain patterns work in Clarity

ALWAYS:
- Consult MCP tools first for Stacks-specific guidance
- Use PostConditionMode.Deny for maximum security
- Follow SIP compliance requirements
- Leverage SIP-012 performance improvements
- Check if issue is related to missing post-conditions

CRITICAL STACKS REQUIREMENTS:
- POST-CONDITIONS ARE MANDATORY for all token transfers
- Use native asset functions (ft-transfer?, nft-transfer?)
- Follow SIP-009 (NFT) and SIP-010 (FT) standards
- Implement proper authorization with tx-sender
- Leverage Clarity's decidable language benefits`,
      };
    },
  });

  /**
   * Start the server
   */
  try {
    await server.start({
      transportType: "stdio",
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main();
