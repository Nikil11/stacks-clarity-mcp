import { FastMCP } from "fastmcp";

// New Stacks Blockchain Tools
import { 
  getSIP010BalanceTool,
  getSIP010InfoTool,
  generateSIP010TransferTool,
  generateSIP010TemplateTool
} from "./stacks_blockchain/tokens/sip010_ft.js";

import {
  getSIP009TokenInfoTool,
  getSIP009CollectionInfoTool,
  generateSIP009TransferTool,
  generateSIP009TemplateTool
} from "./stacks_blockchain/tokens/sip009_nft.js";

import {
  generateFungiblePostConditionTool,
  generateNonFungiblePostConditionTool,
  generateSTXPostConditionTool,
  analyzeTransactionPostConditionsTool,
  generatePostConditionTemplateTool
} from "./stacks_blockchain/security/post_conditions.js";

import {
  analyzeContractPerformanceTool,
  estimateOperationCostTool,
  generateOptimizationRecommendationsTool
} from "./stacks_blockchain/performance/sip012_cost_analysis.js";

import {
  getStacksAccountInfoTool,
  checkSTXBalanceTool,
  getTransactionHistoryTool,
  validateStacksAddressTool
} from "./stacks_blockchain/accounts/stacks_account.js";

import {
  generateClarinetsProjectTool,
  generateClarityContractTool,
  generateContractTestsTool,
  configureClarinetsProjectTool
} from "./stacks_blockchain/development/clarinet_project.js";

export function registerTools(server: FastMCP): void {
  // SIP-010 Fungible Token Tools
  server.addTool(getSIP010BalanceTool);
  server.addTool(getSIP010InfoTool);
  server.addTool(generateSIP010TransferTool);
  server.addTool(generateSIP010TemplateTool);
  
  // SIP-009 NFT Tools
  server.addTool(getSIP009TokenInfoTool);
  server.addTool(getSIP009CollectionInfoTool);
  server.addTool(generateSIP009TransferTool);
  server.addTool(generateSIP009TemplateTool);
  
  // Post-Condition Security Tools
  server.addTool(generateFungiblePostConditionTool);
  server.addTool(generateNonFungiblePostConditionTool);
  server.addTool(generateSTXPostConditionTool);
  server.addTool(analyzeTransactionPostConditionsTool);
  server.addTool(generatePostConditionTemplateTool);
  
  // SIP-012 Performance Tools
  server.addTool(analyzeContractPerformanceTool);
  server.addTool(estimateOperationCostTool);
  server.addTool(generateOptimizationRecommendationsTool);
  
  // Stacks Account & Balance Tools
  server.addTool(getStacksAccountInfoTool);
  server.addTool(checkSTXBalanceTool);
  server.addTool(getTransactionHistoryTool);
  server.addTool(validateStacksAddressTool);
  
  // Clarinet Development Tools
  server.addTool(generateClarinetsProjectTool);
  server.addTool(generateClarityContractTool);
  server.addTool(generateContractTestsTool);
  server.addTool(configureClarinetsProjectTool);
}
