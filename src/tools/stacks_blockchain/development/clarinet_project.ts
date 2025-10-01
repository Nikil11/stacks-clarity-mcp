import { Tool } from "fastmcp";
import { z } from "zod";
import { recordTelemetry } from "../../../utils/telemetry.js";

// ============================================================================
// CLARINET PROJECT MANAGEMENT TOOLS
// ============================================================================

// Schema for Clarinet project initialization
const ClarinetsInitScheme = z.object({
  projectName: z.string().describe("Name of the Clarinet project to create"),
  projectPath: z.string().optional().describe("Path where to create the project (default: current directory)"),
  template: z.enum(["counter", "nft", "fungible-token", "empty"]).optional().describe("Project template to use"),
});

const ContractGenerationScheme = z.object({
  contractName: z.string().describe("Name of the contract to generate"),
  contractType: z.enum(["sip009-nft", "sip010-ft", "counter", "custom"]).describe("Type of contract to generate"),
  features: z.array(z.string()).optional().describe("Additional features to include (e.g., ['minting', 'burning', 'metadata'])"),
});

const TestGenerationScheme = z.object({
  contractName: z.string().describe("Name of the contract to generate tests for"),
  testType: z.enum(["unit", "integration", "security"]).describe("Type of tests to generate"),
  scenarios: z.array(z.string()).optional().describe("Specific test scenarios to include"),
});

const ProjectConfigScheme = z.object({
  network: z.enum(["devnet", "testnet", "mainnet"]).describe("Network configuration to set up"),
  requirements: z.array(z.string()).optional().describe("Additional requirements or dependencies"),
});

// Generate Clarinet project initialization script
export const generateClarinetsProjectTool: Tool<undefined, typeof ClarinetsInitScheme> = {
  name: "generate_clarinet_project",
  description: "Generate a complete Clarinet project setup with proper structure, configuration, and starter contracts.",
  parameters: ClarinetsInitScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_clarinet_project" }, context);
      
      const projectName = args.projectName;
      const projectPath = args.projectPath || './';
      const template = args.template || 'empty';
      
      return `# Clarinet Project Setup Guide

## Project: ${projectName}

### 1. Initialize Clarinet Project

\`\`\`bash
# Create new Clarinet project
clarinet new ${projectName}
cd ${projectName}

# Verify Clarinet installation
clarinet --version
\`\`\`

### 2. Project Structure

After initialization, your project will have this structure:

\`\`\`
${projectName}/
├── Clarinet.toml           # Main project configuration
├── settings/               # Network-specific settings
│   ├── Devnet.toml
│   ├── Testnet.toml
│   └── Mainnet.toml
├── contracts/              # Clarity contracts
├── tests/                  # TypeScript/JavaScript tests
├── deployments/            # Deployment plans
└── .gitignore
\`\`\`

### 3. Clarinet.toml Configuration

\`\`\`toml
[project]
name = "${projectName}"
authors = []
description = ""
telemetry = true
cache_dir = "./.clarinet/cache"
requirements = []

[contracts.${projectName}]
path = "contracts/${projectName}.clar"
clarity_version = 2
epoch = "2.4"

[repl]
costs_version = 2
parser_version = 2

[repl.analysis]
passes = ["check_checker"]

[repl.analysis.check_checker]
strict = false
trusted_sender = false
trusted_caller = false
callee_filter = false
\`\`\`

### 4. Network Configurations

#### Devnet Settings (\`settings/Devnet.toml\`)
\`\`\`toml
[network]
name = "devnet"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
balance = 100000000000000

[accounts.wallet_1] 
mnemonic = "sell invite acquire kitten bamboo drastic jelly vivid peace spawn twice guilt pave pen trash pretty park cube fragile unaware remain midnight betray rebuild"
balance = 100000000000000

[accounts.wallet_2]
mnemonic = "hold excess usual excess ring elephant install account glad dry fragile donkey gaze humble truck breeze nation gasp vacuum limb head keep delay hospital"
balance = 100000000000000
\`\`\`

### 5. ${template.charAt(0).toUpperCase() + template.slice(1)} Template Implementation

${getTemplateImplementation(template, projectName)}

### 6. Essential Development Commands

\`\`\`bash
# Start Clarinet console for interactive development
clarinet console

# Run tests
clarinet test

# Check contract syntax
clarinet check

# Generate deployment plan
clarinet deployments generate --devnet

# Deploy to devnet
clarinet deployments apply --devnet

# Start local devnet (if needed)
clarinet integrate

# Format contract code
clarinet fmt
\`\`\`

### 7. Test Setup

Create a basic test file: \`tests/${projectName}_test.ts\`

\`\`\`typescript
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that basic functionality works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get("deployer")!;
        const wallet1 = accounts.get("wallet_1")!;
        
        let block = chain.mineBlock([
            // Add your test transactions here
        ]);
        
        assertEquals(block.receipts.length, 0);
        assertEquals(block.height, 2);
    },
});
\`\`\`

### 8. VS Code Integration

Create \`.vscode/settings.json\` for better development experience:

\`\`\`json
{
    "clarinet.enable": true,
    "editor.formatOnSave": true,
    "[clarity]": {
        "editor.tabSize": 2,
        "editor.insertSpaces": true
    },
    "files.associations": {
        "*.clar": "clarity"
    }
}
\`\`\`

### 9. Git Setup

Add to \`.gitignore\`:

\`\`\`
# Clarinet
.clarinet/
costs-reports.json

# Logs
*.log
npm-debug.log*

# Dependencies
node_modules/

# IDE
.vscode/
.idea/
\`\`\`

### 10. Next Steps

1. **Add Contracts**: Place your Clarity contracts in \`contracts/\`
2. **Write Tests**: Create comprehensive tests in \`tests/\`
3. **Configure Networks**: Update settings for testnet/mainnet
4. **Add Dependencies**: Use \`requirements\` in Clarinet.toml for contract dependencies
5. **CI/CD**: Set up GitHub Actions for automated testing

### 11. Useful Development Tools

\`\`\`bash
# Generate contract scaffold
clarinet contract new my-contract

# Add existing contract
clarinet contract add my-contract contracts/my-contract.clar

# Interactive Clarinet console commands
clarinet console
> (contract-call? .${projectName} some-function)
> ::get_costs
> ::get_contracts_by_trait
\`\`\`

### 12. Performance Optimization

Use these Clarinet commands for performance analysis:

\`\`\`bash
# Generate cost analysis
clarinet test --costs

# Check contract coverage
clarinet test --coverage

# Analyze contract size
clarinet check --decode
\`\`\`

Your Clarinet project is now ready for development! Use the MCP tools like \`generate_clarity_contract\` and \`generate_contract_tests\` to add functionality to your project.`;
      
    } catch (error) {
      return `❌ Failed to generate Clarinet project: ${error}`;
    }
  },
};

// Generate Clarity contract scaffolds
export const generateClarityContractTool: Tool<undefined, typeof ContractGenerationScheme> = {
  name: "generate_clarity_contract",
  description: "Generate a complete Clarity contract with SIP compliance, security best practices, and comprehensive functionality.",
  parameters: ContractGenerationScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_clarity_contract" }, context);
      
      const contractName = args.contractName;
      const contractType = args.contractType;
      const features = args.features || [];
      
      return `# Clarity Contract: ${contractName}

## File: contracts/${contractName}.clar

\`\`\`clarity
${generateContractCode(contractName, contractType, features)}
\`\`\`

## Contract Registration

Add to your \`Clarinet.toml\`:

\`\`\`toml
[contracts.${contractName}]
path = "contracts/${contractName}.clar"
clarity_version = 2
epoch = "2.4"
\`\`\`

## Key Features Implemented

${getContractFeatures(contractType, features)}

## Security Considerations

✅ **Post-conditions**: ${contractType.includes('sip') ? 'Mandatory post-conditions implemented' : 'Added where applicable'}
✅ **Authorization**: All public functions check \`tx-sender\` authorization
✅ **Error Handling**: Comprehensive error codes and descriptive messages
✅ **SIP Compliance**: ${contractType.includes('sip') ? 'Fully compliant with relevant SIP standards' : 'N/A'}
✅ **Reentrancy Protection**: Clarity's design prevents reentrancy attacks
✅ **Integer Overflow**: Clarity prevents integer overflow/underflow

## Testing Requirements

Use \`generate_contract_tests\` to create comprehensive tests for:
- Basic functionality
- Edge cases
- Security scenarios
- SIP compliance (if applicable)
- Gas optimization

## Deployment Instructions

1. **Check Contract**: \`clarinet check\`
2. **Run Tests**: \`clarinet test\`
3. **Generate Deployment**: \`clarinet deployments generate --devnet\`
4. **Deploy**: \`clarinet deployments apply --devnet\`

## Integration Examples

${getIntegrationExamples(contractType, contractName)}

## Performance Notes

${getPerformanceNotes(contractType)}

Your contract is ready for testing and deployment! Remember to use mandatory post-conditions for all token transfers.`;
      
    } catch (error) {
      return `❌ Failed to generate contract: ${error}`;
    }
  },
};

// Generate comprehensive test suites
export const generateContractTestsTool: Tool<undefined, typeof TestGenerationScheme> = {
  name: "generate_contract_tests",
  description: "Generate comprehensive test suites for Clarity contracts including unit tests, integration tests, and security tests.",
  parameters: TestGenerationScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "generate_contract_tests" }, context);
      
      const contractName = args.contractName;
      const testType = args.testType;
      const scenarios = args.scenarios || [];
      
      return `# Test Suite: ${contractName}

## File: tests/${contractName}_${testType}_test.ts

\`\`\`typescript
${generateTestCode(contractName, testType, scenarios)}
\`\`\`

## Test Configuration

Add to your test setup if not already present:

### package.json (for local testing)
\`\`\`json
{
  "devDependencies": {
    "@hirosystems/clarinet-sdk": "latest",
    "@stacks/transactions": "^6.13.0"
  },
  "scripts": {
    "test": "clarinet test",
    "test:coverage": "clarinet test --coverage",
    "test:costs": "clarinet test --costs"
  }
}
\`\`\`

## Test Categories Covered

${getTestCategories(testType, scenarios)}

## Running Tests

\`\`\`bash
# Run all tests
clarinet test

# Run specific test file
clarinet test tests/${contractName}_${testType}_test.ts

# Run with coverage
clarinet test --coverage

# Run with cost analysis
clarinet test --costs

# Run in watch mode (if supported)
clarinet test --watch
\`\`\`

## Test Data Setup

Create test data file: \`tests/data/${contractName}_test_data.ts\`

\`\`\`typescript
export const testData = {
  validAddresses: [
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",
    "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
  ],
  invalidAddresses: [
    "invalid-address",
    "SP1234567890",
    ""
  ],
  testAmounts: {
    small: 100,
    medium: 10000,
    large: 1000000,
    zero: 0
  },
  errors: {
    unauthorized: 401,
    insufficientBalance: 402,
    invalidAmount: 403,
    notFound: 404
  }
};
\`\`\`

## CI/CD Integration

### GitHub Actions (.github/workflows/test.yml)
\`\`\`yaml
name: Test Clarity Contracts

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Install Clarinet
      run: |
        curl -L https://github.com/hirosystems/clarinet/releases/download/v1.5.0/clarinet-linux-x64.tar.gz | tar xz
        sudo mv clarinet /usr/local/bin
        
    - name: Run tests
      run: clarinet test
      
    - name: Generate coverage
      run: clarinet test --coverage
      
    - name: Cost analysis
      run: clarinet test --costs
\`\`\`

## Test Reports

After running tests, you'll find reports in:
- \`coverage/\` - Test coverage reports
- \`costs-reports.json\` - Gas cost analysis
- Test output in terminal

## Best Practices

### ${testType.charAt(0).toUpperCase() + testType.slice(1)} Testing
${getTestBestPractices(testType)}

## Advanced Testing Patterns

\`\`\`typescript
// Mock external contract calls
const mockResult = simnet.callReadOnlyFn(
  "external-contract",
  "get-data", 
  [],
  deployer.address
);

// Test error conditions
const errorResult = simnet.callPublicFn(
  "${contractName}",
  "function-that-should-fail",
  [Cl.uint(0)],
  deployer.address
);
expect(errorResult.result).toBeErr(Cl.uint(403));

// Test post-conditions
const transferResult = simnet.callPublicFn(
  "${contractName}",
  "transfer",
  [
    Cl.uint(1000),
    Cl.principal(wallet1.address),
    Cl.some(Cl.bufferFromUtf8("test memo"))
  ],
  deployer.address
);
\`\`\`

Your test suite is ready! Run \`clarinet test\` to execute all tests and ensure your contract works correctly.`;
      
    } catch (error) {
      return `❌ Failed to generate tests: ${error}`;
    }
  },
};

// Configure Clarinet project settings
export const configureClarinetsProjectTool: Tool<undefined, typeof ProjectConfigScheme> = {
  name: "configure_clarinet_project",
  description: "Configure Clarinet project settings for different networks, add dependencies, and set up development environment.",
  parameters: ProjectConfigScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "configure_clarinet_project" }, context);
      
      const network = args.network;
      const requirements = args.requirements || [];
      
      return `# Clarinet Project Configuration

## Network Configuration: ${network.toUpperCase()}

### settings/${network.charAt(0).toUpperCase() + network.slice(1)}.toml

\`\`\`toml
${getNetworkConfig(network)}
\`\`\`

## Updated Clarinet.toml

\`\`\`toml
[project]
name = "my-stacks-project"
authors = ["Your Name <your.email@example.com>"]
description = "A Stacks blockchain project using Clarity smart contracts"
telemetry = true
cache_dir = "./.clarinet/cache"
requirements = [${requirements.map(req => `"${req}"`).join(', ')}]

[repl]
costs_version = 3
parser_version = 2

[repl.analysis]
passes = ["check_checker"]

[repl.analysis.check_checker]
strict = true
trusted_sender = false
trusted_caller = false
callee_filter = true

# Development settings
[repl.development]
mine_empty_blocks = true
deployment_fee_rate = 10

# Contract definitions will be added here
# [contracts.my-contract]
# path = "contracts/my-contract.clar" 
# clarity_version = 2
# epoch = "2.4"
\`\`\`

${requirements.length > 0 ? generateRequirementsConfig(requirements) : ''}

## Environment Setup

### 1. Development Environment
\`\`\`bash
# Install development dependencies
npm init -y
npm install --save-dev @hirosystems/clarinet-sdk @stacks/transactions

# Set up environment variables
echo "STACKS_NETWORK=${network}" > .env
echo "CLARINET_MODE=development" >> .env
\`\`\`

### 2. Network-Specific Settings

#### API Endpoints
\`\`\`bash
# ${network.toUpperCase()} endpoints
${getNetworkEndpoints(network)}
\`\`\`

### 3. Deployment Configuration

Create \`deployments/${network}-plan.yaml\`:

\`\`\`yaml
---
id: 0
name: ${network}-deployment
network: ${network}
stacks-node: "${getStacksNodeUrl(network)}"
bitcoin-node: "${getBitcoinNodeUrl(network)}"
plan:
  batches:
    - id: 0
      transactions:
        # Your deployment transactions will be added here
        # - contract-publish:
        #     contract-name: my-contract
        #     expected-sender: ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
        #     cost: 50000
        #     path: contracts/my-contract.clar
\`\`\`

### 4. Testing Configuration

Update test configuration in \`tests/\`:

\`\`\`typescript
// Test configuration for ${network}
export const testConfig = {
  network: "${network}",
  timeout: 30000,
  accounts: {
    deployer: "${getDefaultDeployer(network)}",
    wallet1: "${getDefaultWallet1(network)}",
    wallet2: "${getDefaultWallet2(network)}"
  },
  contracts: {
    // Your contract configurations
  }
};
\`\`\`

### 5. IDE Configuration

#### VS Code Settings (\`.vscode/settings.json\`)
\`\`\`json
{
  "clarinet.enable": true,
  "clarinet.network": "${network}",
  "editor.formatOnSave": true,
  "[clarity]": {
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.rulers": [100]
  },
  "files.associations": {
    "*.clar": "clarity",
    "Clarinet.toml": "toml",
    "*.toml": "toml"
  },
  "emmet.includeLanguages": {
    "clarity": "lisp"
  }
}
\`\`\`

### 6. Development Workflow

\`\`\`bash
# 1. Start development environment
clarinet console

# 2. Interactive development commands
> (contract-call? .my-contract some-function)
> ::get_costs
> ::get_contracts_by_trait
> ::get_accounts

# 3. Run tests for specific network
clarinet test --${network}

# 4. Deploy to network
clarinet deployments generate --${network}
clarinet deployments apply --${network}

# 5. Monitor deployment
clarinet deployments check --${network}
\`\`\`

### 7. Security Configuration

#### Network Security Settings
\`\`\`toml
# Add to your ${network} settings
[security]
enable_signers = true
require_signatures = ${network === 'mainnet' ? 'true' : 'false'}
max_contract_size = 1048576  # 1MB
gas_limit = 15000000
\`\`\`

### 8. Performance Optimization

\`\`\`toml
# Performance settings for ${network}
[performance]
parallel_testing = true
cache_contracts = true
optimize_builds = true
cost_analysis = ${network === 'devnet' ? 'detailed' : 'summary'}
\`\`\`

## Next Steps

1. **Add Contracts**: Use \`generate_clarity_contract\` to add smart contracts
2. **Write Tests**: Use \`generate_contract_tests\` for comprehensive testing
3. **Configure CI/CD**: Set up automated testing and deployment
4. **Monitor Performance**: Use cost analysis tools
5. **Deploy**: Follow the deployment workflow for ${network}

Your Clarinet project is now configured for ${network} development!`;
      
    } catch (error) {
      return `❌ Failed to configure project: ${error}`;
    }
  },
};

// Helper functions for template generation

function getTemplateImplementation(template: string, projectName: string): string {
  switch (template) {
    case 'counter':
      return `\`\`\`clarity
;; Counter Template Implementation
(define-data-var counter uint u0)

(define-read-only (get-counter)
  (var-get counter)
)

(define-public (increment)
  (ok (var-set counter (+ (var-get counter) u1)))
)

(define-public (decrement)
  (ok (var-set counter (- (var-get counter) u1)))
)
\`\`\``;

    case 'nft':
      return `\`\`\`clarity
;; SIP-009 NFT Template Implementation
(use-trait sip009-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

(define-non-fungible-token ${projectName} uint)
(define-data-var last-token-id uint u0)

(define-public (mint (recipient principal))
  (let ((token-id (+ (var-get last-token-id) u1)))
    (var-set last-token-id token-id)
    (nft-mint? ${projectName} token-id recipient)
  )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (nft-transfer? ${projectName} token-id sender recipient)
  )
)
\`\`\``;

    case 'fungible-token':
      return `\`\`\`clarity
;; SIP-010 Fungible Token Template Implementation
(use-trait sip010-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

(define-fungible-token ${projectName})

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (ft-transfer? ${projectName} amount sender recipient)
  )
)

(define-public (mint (amount uint) (recipient principal))
  (ft-mint? ${projectName} amount recipient)
)
\`\`\``;

    default:
      return `\`\`\`clarity
;; Empty Template - Add your contract logic here
(define-constant contract-owner tx-sender)

(define-public (hello-world)
  (ok "Hello, Stacks!")
)
\`\`\``;
  }
}

function generateContractCode(contractName: string, contractType: string, features: string[]): string {
  // This would be a comprehensive contract generation function
  // For brevity, showing a simplified version
  switch (contractType) {
    case 'sip010-ft':
      return `;; ${contractName} - SIP-010 Fungible Token
;; Fully compliant with SIP-010 standard

(use-trait sip010-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; Token definition
(define-fungible-token ${contractName})

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-insufficient-balance (err u102))

;; Variables
(define-data-var token-name (string-ascii 32) "${contractName}")
(define-data-var token-symbol (string-ascii 10) "${contractName.toUpperCase()}")
(define-data-var token-uri (optional (string-utf8 256)) none)
(define-data-var token-decimals uint u6)

;; SIP-010 Functions
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (ft-transfer? ${contractName} amount sender recipient)
  )
)

(define-read-only (get-name)
  (ok (var-get token-name))
)

(define-read-only (get-symbol)
  (ok (var-get token-symbol))
)

(define-read-only (get-decimals)
  (ok (var-get token-decimals))
)

(define-read-only (get-balance (who principal))
  (ok (ft-get-balance ${contractName} who))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply ${contractName}))
)

(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)

;; Administrative functions
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ft-mint? ${contractName} amount recipient)
  )
)

${features.includes('burning') ? `
(define-public (burn (amount uint))
  (ft-burn? ${contractName} amount tx-sender)
)` : ''}

${features.includes('minting') ? `
(define-public (set-token-uri (value (optional (string-utf8 256))))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ok (var-set token-uri value))
  )
)` : ''}`;

    case 'sip009-nft':
      return `;; ${contractName} - SIP-009 Non-Fungible Token
;; Fully compliant with SIP-009 standard

(use-trait sip009-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)

;; Token definition
(define-non-fungible-token ${contractName} uint)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-token-exists (err u102))
(define-constant err-token-not-found (err u103))

;; Variables
(define-data-var last-token-id uint u0)
(define-data-var base-token-uri (string-ascii 80) "")

;; Token metadata map
(define-map token-metadata uint {
  name: (string-ascii 64),
  description: (string-ascii 256),
  image: (string-ascii 256)
})

;; SIP-009 Functions
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (nft-transfer? ${contractName} token-id sender recipient)
  )
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? ${contractName} token-id))
)

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (some (concat (var-get base-token-uri) (int-to-ascii token-id))))
)

;; Administrative functions
(define-public (mint (recipient principal))
  (let ((token-id (+ (var-get last-token-id) u1)))
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (try! (nft-mint? ${contractName} token-id recipient))
    (var-set last-token-id token-id)
    (ok token-id)
  )
)

${features.includes('metadata') ? `
(define-public (set-token-metadata (token-id uint) (metadata {name: (string-ascii 64), description: (string-ascii 256), image: (string-ascii 256)}))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ok (map-set token-metadata token-id metadata))
  )
)

(define-read-only (get-token-metadata (token-id uint))
  (map-get? token-metadata token-id)
)` : ''}`;

    default:
      return `;; ${contractName} - Custom Contract

(define-constant contract-owner tx-sender)

(define-public (hello-world)
  (ok "Hello from ${contractName}!")
)`;
  }
}

function generateTestCode(contractName: string, testType: string, scenarios: string[]): string {
  const baseImports = `import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';`;

  switch (testType) {
    case 'unit':
      return `${baseImports}

Clarinet.test({
    name: "${contractName} - basic functionality test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get("deployer")!;
        const wallet1 = accounts.get("wallet_1")!;
        
        // Test basic contract functionality
        let block = chain.mineBlock([
            Tx.contractCall("${contractName}", "get-balance", [types.principal(deployer.address)], deployer.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        assertEquals(block.height, 2);
        
        // Add specific unit tests here
    },
});

Clarinet.test({
    name: "${contractName} - error handling test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get("deployer")!;
        const wallet1 = accounts.get("wallet_1")!;
        
        // Test error conditions
        let block = chain.mineBlock([
            // Add error test transactions
        ]);
        
        // Verify error responses
    },
});`;

    case 'integration':
      return `${baseImports}

Clarinet.test({
    name: "${contractName} - full workflow integration test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get("deployer")!;
        const wallet1 = accounts.get("wallet_1")!;
        const wallet2 = accounts.get("wallet_2")!;
        
        // Test complete user workflow
        let block = chain.mineBlock([
            // Multi-step integration test
        ]);
        
        assertEquals(block.receipts.length, 1);
        
        // Verify end-to-end functionality
    },
});

Clarinet.test({
    name: "${contractName} - cross-contract interaction test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        // Test interactions with other contracts
    },
});`;

    case 'security':
      return `${baseImports}

Clarinet.test({
    name: "${contractName} - authorization security test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get("deployer")!;
        const attacker = accounts.get("wallet_1")!;
        
        // Test unauthorized access attempts
        let block = chain.mineBlock([
            // Unauthorized operation attempts
        ]);
        
        // Verify proper authorization checks
    },
});

Clarinet.test({
    name: "${contractName} - post-condition security test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        // Test mandatory post-conditions for token transfers
    },
});

Clarinet.test({
    name: "${contractName} - edge case security test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        // Test edge cases and boundary conditions
    },
});`;

    default:
      return `${baseImports}

Clarinet.test({
    name: "${contractName} - basic test",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        // Add your tests here
    },
});`;
  }
}

function getContractFeatures(contractType: string, features: string[]): string {
  const baseFeatures = {
    'sip010-ft': [
      '✅ SIP-010 compliant fungible token',
      '✅ Standard transfer, mint, and burn functions',
      '✅ Metadata support (name, symbol, decimals, URI)',
      '✅ Administrative controls',
      '✅ Error handling with descriptive codes'
    ],
    'sip009-nft': [
      '✅ SIP-009 compliant non-fungible token',
      '✅ Unique token minting with auto-incrementing IDs',
      '✅ Transfer and ownership functions',
      '✅ Token URI support for metadata',
      '✅ Administrative controls'
    ],
    'counter': [
      '✅ Simple counter with increment/decrement',
      '✅ Read-only getter function',
      '✅ Safe arithmetic operations'
    ],
    'custom': [
      '✅ Custom contract structure',
      '✅ Basic functionality template',
      '✅ Extensible design'
    ]
  };

  const featureDescriptions: Record<string, string> = {
    'minting': '✅ Advanced minting capabilities',
    'burning': '✅ Token burning functionality',
    'metadata': '✅ Enhanced metadata support',
    'governance': '✅ Governance and voting features',
    'staking': '✅ Token staking mechanisms'
  };

  const base = baseFeatures[contractType as keyof typeof baseFeatures] || baseFeatures['custom'];
  const additional = features.map(f => featureDescriptions[f as keyof typeof featureDescriptions]).filter(Boolean);
  
  return [...base, ...additional].join('\n');
}

function getIntegrationExamples(contractType: string, contractName: string): string {
  if (contractType === 'sip010-ft') {
    return `### Frontend Integration (using @stacks/connect)

\`\`\`typescript
import { openContractCall } from '@stacks/connect';

// Transfer tokens
const transferTokens = async () => {
  await openContractCall({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: '${contractName}',
    functionName: 'transfer',
    functionArgs: [
      uintCV(1000000), // amount (with decimals)
      principalCV('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'), // sender
      principalCV('ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'), // recipient
      someCV(bufferCV(Buffer.from('Hello'))) // memo
    ],
    postConditions: [
      makeStandardFungiblePostCondition(
        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        FungibleConditionCode.Equal,
        1000000,
        'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.${contractName}'
      )
    ]
  });
};
\`\`\``;
  }

  return `### Basic Integration Example

\`\`\`typescript
// Contract interaction example
import { callReadOnlyFunction } from '@stacks/transactions';

const result = await callReadOnlyFunction({
  contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  contractName: '${contractName}',
  functionName: 'get-info',
  functionArgs: []
});
\`\`\``;
}

function getPerformanceNotes(contractType: string): string {
  if (contractType.includes('sip')) {
    return `⚡ **SIP-012 Optimizations Applied**:
- Dynamic list storage for metadata
- Efficient map operations for balances
- Batched operations where applicable
- Optimized gas costs for common operations

💡 **Performance Tips**:
- Use batch operations for multiple transfers
- Cache frequently accessed data
- Leverage SIP-012's increased database limits`;
  }

  return `💡 **Performance Considerations**:
- Minimize database operations
- Use efficient data structures
- Implement proper caching where needed`;
}

// Additional helper functions for network configuration, test categories, etc.
function getNetworkConfig(network: string): string {
  switch (network) {
    case 'devnet':
      return `[network]
name = "devnet"
deployment_fee_rate = 10

[accounts.deployer]
mnemonic = "twice kind fence tip hidden tilt action fragile skin nothing glory cousin green tomorrow spring wrist shed math olympic multiply hip blue scout claw"
balance = 100000000000000

[accounts.wallet_1]
mnemonic = "sell invite acquire kitten bamboo drastic jelly vivid peace spawn twice guilt pave pen trash pretty park cube fragile unaware remain midnight betray rebuild"
balance = 100000000000000

[accounts.wallet_2]
mnemonic = "hold excess usual excess ring elephant install account glad dry fragile donkey gaze humble truck breeze nation gasp vacuum limb head keep delay hospital"
balance = 100000000000000`;

    case 'testnet':
      return `[network]
name = "testnet"
node_rpc_address = "https://stacks-node-api.testnet.stacks.co"
deployment_fee_rate = 1200

[accounts.deployer]
mnemonic = "YOUR_TESTNET_MNEMONIC_HERE"
balance = 100000000000000`;

    case 'mainnet':
      return `[network]
name = "mainnet"  
node_rpc_address = "https://stacks-node-api.mainnet.stacks.co"
deployment_fee_rate = 3000

[accounts.deployer]
mnemonic = "YOUR_MAINNET_MNEMONIC_HERE"
balance = 100000000000000`;

    default:
      return '';
  }
}

function getNetworkEndpoints(network: string): string {
  switch (network) {
    case 'devnet':
      return `STACKS_API_URL=http://localhost:3999
STACKS_NODE_URL=http://localhost:20443
BITCOIN_NODE_URL=http://localhost:18443`;
    case 'testnet':
      return `STACKS_API_URL=https://stacks-node-api.testnet.stacks.co
STACKS_NODE_URL=https://stacks-node-api.testnet.stacks.co
BITCOIN_NODE_URL=https://bitcoind.testnet.stacks.co`;
    case 'mainnet':
      return `STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co
STACKS_NODE_URL=https://stacks-node-api.mainnet.stacks.co
BITCOIN_NODE_URL=https://bitcoind.mainnet.stacks.co`;
    default:
      return '';
  }
}

function getStacksNodeUrl(network: string): string {
  switch (network) {
    case 'devnet': return 'http://localhost:20443';
    case 'testnet': return 'https://stacks-node-api.testnet.stacks.co';
    case 'mainnet': return 'https://stacks-node-api.mainnet.stacks.co';
    default: return '';
  }
}

function getBitcoinNodeUrl(network: string): string {
  switch (network) {
    case 'devnet': return 'http://localhost:18443';
    case 'testnet': return 'https://bitcoind.testnet.stacks.co';
    case 'mainnet': return 'https://bitcoind.mainnet.stacks.co';
    default: return '';
  }
}

function getDefaultDeployer(network: string): string {
  return network === 'devnet' 
    ? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
    : 'YOUR_DEPLOYER_ADDRESS';
}

function getDefaultWallet1(network: string): string {
  return network === 'devnet'
    ? 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5'
    : 'YOUR_WALLET1_ADDRESS';
}

function getDefaultWallet2(network: string): string {
  return network === 'devnet'
    ? 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
    : 'YOUR_WALLET2_ADDRESS';
}

function generateRequirementsConfig(requirements: string[]): string {
  return `\n## Project Requirements

The following dependencies have been added to your project:

${requirements.map(req => `### ${req}
- **Purpose**: [Describe the purpose of this requirement]
- **Version**: Latest compatible version
- **Documentation**: [Link to documentation]`).join('\n')}

To install dependencies:
\`\`\`bash
# Install Clarinet requirements
clarinet requirements add ${requirements.join(' ')}
\`\`\``;
}

function getTestCategories(testType: string, scenarios: string[]): string {
  const categories = {
    unit: [
      '✅ Individual function testing',
      '✅ Input validation',
      '✅ Return value verification',
      '✅ Error condition testing',
      '✅ Edge case handling'
    ],
    integration: [
      '✅ Multi-function workflows',
      '✅ Cross-contract interactions',
      '✅ End-to-end user scenarios',
      '✅ State consistency checks',
      '✅ Performance testing'
    ],
    security: [
      '✅ Authorization checks',
      '✅ Post-condition validation',
      '✅ Reentrancy protection (inherent in Clarity)',
      '✅ Integer overflow/underflow protection',
      '✅ Access control testing',
      '✅ Malicious input handling'
    ]
  };

  const base = categories[testType as keyof typeof categories] || [];
  const additional = scenarios.map(s => `✅ Custom: ${s}`);
  
  return [...base, ...additional].join('\n');
}

function getTestBestPractices(testType: string): string {
  switch (testType) {
    case 'unit':
      return `- Test one function at a time
- Cover all possible input combinations
- Verify both success and error paths
- Use descriptive test names
- Keep tests independent and isolated`;
    
    case 'integration':
      return `- Test complete user workflows
- Verify state changes across multiple operations
- Test contract interactions
- Use realistic data and scenarios
- Measure gas costs and performance`;
    
    case 'security':
      return `- Test unauthorized access attempts
- Verify post-conditions for all token transfers
- Test boundary conditions and edge cases
- Simulate malicious inputs
- Verify proper error handling and cleanup`;
    
    default:
      return `- Write clear, descriptive tests
- Cover both happy path and error cases
- Keep tests maintainable and readable`;
  }
}