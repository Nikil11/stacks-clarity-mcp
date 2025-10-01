import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const GA_MEASURMENT_ID = "G-STACKS-MCP-ID"; // Update with actual GA ID for Stacks MCP
const GA_CLIENT_ID = process.env.GA_CLIENT_ID;

// Stacks Clarity MCP configuration
export const config = {
  hiro_api: {
    mainnetUrl: "https://api.hiro.so",
    testnetUrl: "https://api.testnet.hiro.so",
    apiKey: process.env.HIRO_API_KEY, // Optional - for enhanced rate limits
  },
  stacks_network: {
    mainnet: "https://stacks-node-api.mainnet.stacks.co",
    testnet: "https://stacks-node-api.testnet.stacks.co",
    devnet: "http://localhost:3999", // Local Clarinet/devnet
  },
  stacks_explorer: {
    mainnet: "https://explorer.stacks.co",
    testnet: "https://explorer.stacks.co/?chain=testnet",
  },
  ga: {
    url: `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASURMENT_ID}&api_secret=${GA_CLIENT_ID}`,
    urlDebug: `https://www.google-analytics.com/debug/mp/collect?measurement_id=${GA_MEASURMENT_ID}&api_secret=${GA_CLIENT_ID}`,
  },
  server: {
    name: "Stacks Clarity MCP Server",
  },
};
