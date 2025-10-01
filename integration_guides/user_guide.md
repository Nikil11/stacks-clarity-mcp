# Agent User Guide: Effective Vibe Coding

## Reality Check

- **Agents aren't magic** - They're sophisticated tools that need clear instructions
- **No mind reading** - You must be specific about what you want
- **Black box is OK** - You don't need to understand how it works, just how to use it effectively

## The Golden Rule: Be Specific

### ❌ Vague Requests = Poor Results

```
"Build me something cool with blockchain"
"Fix this error"
"Help me with Stacks"
```

### ✅ Specific Requests = Great Results

```
"Create a decentralized voting dApp on Stacks with Clarity smart contract and React frontend.
Users should create proposals, vote once per wallet, view real-time results.
Include wallet integration with Hiro Wallet for Stacks testnet with mandatory post-conditions."
```

## Stacks Development Queries - Be Precise

**Good Examples:**

- "Generate a SIP-010 fungible token contract with minting and burning capabilities"
- "Create a Clarinet project for DeFi development with comprehensive testing"
- "Analyze my contract for SIP-012 performance optimizations"

## Perfect Prompt Template

```
GOAL: [What you want to achieve]
CONTEXT: [Your experience, current setup, constraints]
DELIVERABLES: [Specific outputs you need]
ENVIRONMENT: [Network, tools, versions]
```

**Example:**

```
GOAL: Build a token staking contract on Stacks
CONTEXT: Intermediate Clarity knowledge, 2-week timeline, DeFi focus
DELIVERABLES: Complete Clarity contract, Clarinet tests, deployment guide, React integration with post-conditions
ENVIRONMENT: Stacks testnet, Clarinet CLI, @stacks/transactions, Hiro Wallet integration
```

## Quick Wins

**Always Include:**

- Target network (mainnet/testnet/devnet)
- Full error messages when debugging
- Complete code context for fixes

**Request Explanations:**

- "Explain why you chose this approach"
- "Include security considerations"
- "Add inline comments explaining each function"

## Common Mistakes to Avoid

1. **Assuming context** - Start fresh each conversation
2. **Being too broad** - Break complex requests into smaller parts
3. **Incomplete error info** - Share full error messages and relevant code

## Power User Tips

- **Iterate and refine:** Start broad, then add specific requirements
- **Reference examples:** "Like [project] but with [modifications]"
- **Specify format:** "Provide as commented code", "Include step-by-step instructions"

**Remember:** The more specific and thoughtful your request, the more valuable the response!
