import * as fs from "fs";
import { readFile } from "fs/promises";
import { basename, dirname, extname, join as pathJoin } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resourcesDir = pathJoin(__dirname, "..", "resources");
const stacksClarityStandardsDir = pathJoin(__dirname, "..", "..", "stacks-clarity-standards");

// Dynamic discovery of Stacks development resources
export const getAvailableStacksResources = () => {
  try {
    // Get all available resource directories for Stacks development
    const resourceDirs = ["clarity", "tokens", "frontend", "management", "integration"];
    const allResources: string[] = [];
    
    for (const dir of resourceDirs) {
      const dirPath = pathJoin(resourcesDir, dir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        const mdFiles = files
          .filter((file) => extname(file).toLowerCase() === ".md")
          .map((file) => `${dir}/${basename(file, extname(file))}`);
        allResources.push(...mdFiles);
      }
    }
    
    return allResources;
  } catch (err) {
    console.error(`Error reading Stacks resource directories: ${err}`);
    return [];
  }
};

/**
 * Helper function to read all markdown files from multiple directories
 */
export async function readAllMarkdownFromDirectories(
  dirNames: string[]
): Promise<string> {
  let combinedContent = "";

  for (const dirName of dirNames) {
    const dirPath = pathJoin(resourcesDir, dirName);
    const dirContent = await readAllMarkdownFromDirectory(dirPath);
    if (dirContent.trim()) {
      combinedContent += `# ${dirName.toUpperCase()} RESOURCES\n\n`;
      combinedContent += dirContent;
    }
  }

  return combinedContent;
}

/**
 * Helper function to read all markdown files from a directory
 */
export async function readAllMarkdownFromDirectory(
  dirPath: string
): Promise<string> {
  let content = "";

  try {
    if (!fs.existsSync(dirPath)) {
      return `Directory not found: ${dirPath}`;
    }

    const files = fs.readdirSync(dirPath);
    const markdownFiles = files.filter(
      (file: string) => extname(file).toLowerCase() === ".md"
    );

    for (const file of markdownFiles) {
      const filePath = pathJoin(dirPath, file);
      try {
        const fileContent = await readFile(filePath, "utf-8");
        content += fileContent + "\n\n---\n\n";
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        content += `Error reading file: ${file}\n\n---\n\n`;
      }
    }

    return content;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return `Error reading directory: ${dirPath}`;
  }
}

/**
 * Helper function to read a specific markdown file from a directory
 */
export async function readMarkdownFromDirectory(
  dirName: string,
  fileName: string
): Promise<string> {
  try {
    const dirPath = pathJoin(resourcesDir, dirName);
    if (!fs.existsSync(dirPath)) {
      return `Directory not found: ${dirPath}`;
    }

    // Ensure the fileName has .md extension
    const markdownFileName = fileName.endsWith(".md")
      ? fileName
      : `${fileName}.md`;
    const filePath = pathJoin(dirPath, markdownFileName);

    if (!fs.existsSync(filePath)) {
      return `File not found: ${markdownFileName} in ${dirPath}`;
    }

    // Check if it's actually a markdown file
    if (extname(markdownFileName).toLowerCase() !== ".md") {
      return `File is not a markdown file: ${markdownFileName}`;
    }

    const fileContent = await readFile(filePath, "utf-8");
    return fileContent;
  } catch (error) {
    console.error(`Error reading file ${fileName} from ${dirName}:`, error);
    return `Error reading file: ${fileName}`;
  }
}

// ============================================================================
// STACKS CLARITY STANDARDS ACCESS FUNCTIONS
// ============================================================================

/**
 * Get list of all available SIPs in the stacks-clarity-standards directory
 */
export const getAvailableSIPs = (): string[] => {
  try {
    const dirs = fs.readdirSync(stacksClarityStandardsDir);
    return dirs
      .filter((dir) => dir.startsWith("sip-"))
      .map((dir) => dir.replace("sip-", ""))
      .sort((a, b) => parseInt(a) - parseInt(b));
  } catch (err) {
    console.error(`Error reading SIPs directory: ${err}`);
    return [];
  }
};

/**
 * Get complete content of a specific SIP by number
 */
export const getSIPContent = async (sipNumber: string): Promise<string> => {
  try {
    const sipDir = pathJoin(stacksClarityStandardsDir, `sip-${sipNumber.padStart(3, "0")}`);
    
    if (!fs.existsSync(sipDir)) {
      return `SIP-${sipNumber} directory not found`;
    }
    
    const files = fs.readdirSync(sipDir);
    const mdFiles = files.filter((file) => file.endsWith(".md"));
    const clarFiles = files.filter((file) => file.endsWith(".clar"));
    
    if (mdFiles.length === 0 && clarFiles.length === 0) {
      return `No documentation or Clarity files found for SIP-${sipNumber}`;
    }
    
    let content = `# SIP-${sipNumber.padStart(3, "0")}\n\n`;
    
    // Read markdown documentation first
    for (const file of mdFiles) {
      const filePath = pathJoin(sipDir, file);
      const fileContent = await readFile(filePath, "utf-8");
      content += `## ${file}\n\n${fileContent}\n\n---\n\n`;
    }
    
    // Read Clarity contract files
    for (const file of clarFiles) {
      const filePath = pathJoin(sipDir, file);
      const fileContent = await readFile(filePath, "utf-8");
      content += `## Clarity Contract: ${file}\n\n\`\`\`clarity\n${fileContent}\n\`\`\`\n\n---\n\n`;
    }
    
    return content;
  } catch (error) {
    return `Error reading SIP-${sipNumber}: ${error}`;
  }
};

/**
 * Search SIPs for content matching a query
 */
export const searchSIPs = async (query: string): Promise<string[]> => {
  const sips = getAvailableSIPs();
  const results: string[] = [];
  
  for (const sipNum of sips) {
    const content = await getSIPContent(sipNum);
    if (content.toLowerCase().includes(query.toLowerCase())) {
      results.push(sipNum);
    }
  }
  
  return results;
};

/**
 * Get the complete Clarity Book content
 */
export const getClarityBook = async (): Promise<string> => {
  try {
    const bookPath = pathJoin(stacksClarityStandardsDir, "clarity_book.txt");
    if (!fs.existsSync(bookPath)) {
      return "Clarity Book not found at clarity_book.txt";
    }
    return await readFile(bookPath, "utf-8");
  } catch (error) {
    return `Error reading Clarity Book: ${error}`;
  }
};

/**
 * Get specific SIP implementations that contain Clarity code
 */
export const getSIPsWithClarityCode = (): string[] => {
  const allSIPs = getAvailableSIPs();
  const sipsWithCode: string[] = [];
  
  for (const sipNum of allSIPs) {
    try {
      const sipDir = pathJoin(stacksClarityStandardsDir, `sip-${sipNum.padStart(3, "0")}`);
      if (fs.existsSync(sipDir)) {
        const files = fs.readdirSync(sipDir);
        const clarFiles = files.filter((file) => file.endsWith(".clar"));
        if (clarFiles.length > 0) {
          sipsWithCode.push(sipNum);
        }
      }
    } catch (error) {
      console.error(`Error checking SIP-${sipNum} for Clarity code:`, error);
    }
  }
  
  return sipsWithCode;
};

/**
 * Get essential token standard SIPs (SIP-009 NFT, SIP-010 FT)
 */
export const getTokenStandardSIPs = async (): Promise<string> => {
  const nftStandard = await getSIPContent("009");
  const ftStandard = await getSIPContent("010");
  
  return `# TOKEN STANDARDS\n\n${nftStandard}\n\n${ftStandard}`;
};
