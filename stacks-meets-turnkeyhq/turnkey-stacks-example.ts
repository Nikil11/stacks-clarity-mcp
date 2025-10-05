/**
 * Complete TurnkeyHQ + Stacks Integration Example
 * 
 * This file demonstrates how to integrate TurnkeyHQ's secure enclave technology
 * with your SIP-compliant Stacks smart contract to create a seamless purchase
 * experience without browser extensions.
 */

import { TurnkeySDK } from '@turnkey/sdk-server';
import { TurnkeyClient } from '@turnkey/sdk-client';
import { 
  makeContractCall,
  makeSTXTokenTransfer,
  broadcastTransaction,
  StacksNetwork,
  StacksTestnet,
  StacksMainnet,
  standardPrincipalCV,
  uintCV,
  noneCV,
  PostConditionMode,
  FungibleConditionCode,
  makeStandardFungiblePostCondition,
  createAssetInfo
} from '@stacks/transactions';

// Configuration
const CONFIG = {
  TURNKEY_API_PRIVATE_KEY: process.env.TURNKEY_PRIVATE_KEY!,
  TURNKEY_API_PUBLIC_KEY: process.env.TURNKEY_PUBLIC_KEY!,
  STACKS_CONTRACT_ADDRESS: 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE',
  STACKS_CONTRACT_NAME: 'embedded-wallet-v4',
  STACKS_NETWORK: process.env.STACKS_NETWORK === 'mainnet' ? new StacksMainnet() : new StacksTestnet(),
};

/**
 * TurnkeyHQ + Stacks Integration Class
 * 
 * This class handles the complete workflow of creating secure wallets,
 * registering users on the Stacks contract, and executing transactions
 * without requiring browser extensions.
 */
export class TurnkeyStacksIntegration {
  private sdk: TurnkeySDK;
  private client: TurnkeyClient;
  private network: StacksNetwork;

  constructor() {
    this.sdk = new TurnkeySDK({
      apiPrivateKey: CONFIG.TURNKEY_API_PRIVATE_KEY,
      apiPublicKey: CONFIG.TURNKEY_API_PUBLIC_KEY,
      baseUrl: 'https://api.turnkey.com',
    });

    this.client = new TurnkeyClient({
      apiPrivateKey: CONFIG.TURNKEY_API_PRIVATE_KEY,
      apiPublicKey: CONFIG.TURNKEY_API_PUBLIC_KEY,
      baseUrl: 'https://api.turnkey.com',
    });

    this.network = CONFIG.STACKS_NETWORK;
  }

  /**
   * Step 1: Create a secure user wallet with TurnkeyHQ
   * 
   * This creates a sub-organization for the user and generates
   * a Stacks-compatible private key in a secure enclave.
   */
  async createUserWallet(userId: string, userEmail: string) {
    console.log(`Creating secure wallet for user: ${userId}`);

    try {
      // Create sub-organization for user isolation
      const subOrg = await this.sdk.createSubOrganization({
        subOrganizationName: `user-${userId}`,
        rootQuorumThreshold: 1,
        rootUsers: [
          {
            userName: userId,
            userEmail: userEmail,
          },
        ],
      });

      console.log(`Created sub-organization: ${subOrg.subOrganizationId}`);

      // Create wallet within the sub-organization
      const wallet = await this.sdk.createWallet({
        organizationId: subOrg.subOrganizationId,
        walletName: 'stacks-main',
      });

      console.log(`Created wallet: ${wallet.walletId}`);

      // Create Stacks-compatible private key
      const privateKey = await this.sdk.createPrivateKey({
        organizationId: subOrg.subOrganizationId,
        privateKeyName: 'stacks-key',
        curve: 'CURVE_SECP256K1',
        addressFormats: ['ADDRESS_FORMAT_STACKS_P2PKH'],
        privateKeyTags: ['stacks', 'main'],
      });

      console.log(`Created private key: ${privateKey.privateKeyId}`);

      return {
        subOrganizationId: subOrg.subOrganizationId,
        walletId: wallet.walletId,
        privateKeyId: privateKey.privateKeyId,
        address: privateKey.addresses[0].address,
        publicKey: privateKey.publicKey,
      };
    } catch (error) {
      console.error('Failed to create user wallet:', error);
      throw error;
    }
  }

  /**
   * Step 2: Register user on the SIP-compliant Stacks contract
   * 
   * This calls the register-user-secure function on your contract
   * with proof-of-possession to establish the user's identity.
   */
  async registerUserOnContract(
    userAddress: string,
    publicKey: string,
    subOrganizationId: string,
    privateKeyId: string
  ) {
    console.log(`Registering user ${userAddress} on Stacks contract`);

    try {
      // Create challenge message for proof-of-possession
      const challengeMessage = Buffer.from(userAddress, 'utf8');
      
      // Sign the challenge with TurnkeyHQ to prove key possession
      const signature = await this.sdk.signRawPayload({
        organizationId: subOrganizationId,
        privateKeyId: privateKeyId,
        payload: challengeMessage.toString('hex'),
        encoding: 'PAYLOAD_ENCODING_HEXADECIMAL',
      });

      console.log('Generated proof-of-possession signature');

      // Build contract call to register-user-secure
      const contractCall = await makeContractCall({
        contractAddress: CONFIG.STACKS_CONTRACT_ADDRESS,
        contractName: CONFIG.STACKS_CONTRACT_NAME,
        functionName: 'register-user-secure',
        functionArgs: [
          standardPrincipalCV(userAddress), // user principal
          uintCV(Buffer.from(publicKey, 'hex')), // public key (33 bytes)
          uintCV(Buffer.from(signature, 'hex')), // challenge signature (65 bytes)
        ],
        network: this.network,
        senderKey: privateKeyId, // This will be resolved by TurnkeyHQ
      });

      console.log('Built contract call for user registration');

      // Sign and broadcast the transaction
      const signedTx = await this.signTransaction(contractCall, subOrganizationId, privateKeyId);
      const result = await broadcastTransaction(signedTx, this.network);

      console.log(`User registration successful: ${result.txid}`);
      return result;
    } catch (error) {
      console.error('Failed to register user on contract:', error);
      throw error;
    }
  }

  /**
   * Step 3: Execute a purchase transaction
   * 
   * This demonstrates how to execute a purchase using the embedded wallet
   * contract's execute-verified-transaction function with proper policy
   * enforcement and post-conditions.
   */
  async executePurchase(
    userAddress: string,
    recipient: string,
    amount: number, // in microSTX
    productId: string,
    subOrganizationId: string,
    privateKeyId: string,
    userNonce: number
  ) {
    console.log(`Executing purchase: ${amount} microSTX to ${recipient}`);

    try {
      // Get current user data from contract to verify nonce
      const userData = await this.getUserData(userAddress);
      if (!userData) {
        throw new Error('User not registered');
      }

      // Create transaction message to sign
      const transactionMessage = this.createTransactionMessage({
        userAddress,
        recipient,
        amount,
        productId,
        nonce: userNonce,
      });

      // Sign the transaction message with TurnkeyHQ
      const signature = await this.sdk.signRawPayload({
        organizationId: subOrganizationId,
        privateKeyId: privateKeyId,
        payload: transactionMessage,
        encoding: 'PAYLOAD_ENCODING_HEXADECIMAL',
      });

      console.log('Signed transaction message');

      // Build contract call to execute-verified-transaction
      const contractCall = await makeContractCall({
        contractAddress: CONFIG.STACKS_CONTRACT_ADDRESS,
        contractName: CONFIG.STACKS_CONTRACT_NAME,
        functionName: 'execute-verified-transaction',
        functionArgs: [
          uintCV(amount), // amount in microSTX
          standardPrincipalCV(recipient), // recipient
          uintCV(Buffer.from(transactionMessage, 'hex')), // message hash
          uintCV(Buffer.from(signature, 'hex')), // signature
          uintCV(userNonce), // expected nonce
        ],
        network: this.network,
        senderKey: privateKeyId,
        postConditions: [
          // MANDATORY: Post-condition for SIP-010 compliance
          makeStandardFungiblePostCondition(
            userAddress,
            FungibleConditionCode.Equal,
            amount,
            createAssetInfo(
              CONFIG.STACKS_CONTRACT_ADDRESS,
              CONFIG.STACKS_CONTRACT_NAME,
              'embedded-wallet-token'
            )
          ),
        ],
        postConditionMode: PostConditionMode.Deny,
      });

      console.log('Built contract call for purchase execution');

      // Sign and broadcast the transaction
      const signedTx = await this.signTransaction(contractCall, subOrganizationId, privateKeyId);
      const result = await broadcastTransaction(signedTx, this.network);

      console.log(`Purchase executed successfully: ${result.txid}`);
      return {
        txId: result.txid,
        explorerUrl: `https://explorer.stacks.co/txid/${result.txid}`,
        amount,
        recipient,
        productId,
      };
    } catch (error) {
      console.error('Failed to execute purchase:', error);
      throw error;
    }
  }

  /**
   * Step 4: Transfer STX using SIP-010 compliant transfer function
   * 
   * This demonstrates how to use the native fungible token transfer
   * function with mandatory post-conditions.
   */
  async transferSTX(
    senderAddress: string,
    recipient: string,
    amount: number, // in microSTX
    subOrganizationId: string,
    privateKeyId: string,
    memo?: string
  ) {
    console.log(`Transferring ${amount} microSTX from ${senderAddress} to ${recipient}`);

    try {
      // Build SIP-010 compliant transfer transaction
      const transferTx = await makeContractCall({
        contractAddress: CONFIG.STACKS_CONTRACT_ADDRESS,
        contractName: CONFIG.STACKS_CONTRACT_NAME,
        functionName: 'transfer',
        functionArgs: [
          uintCV(amount), // amount
          standardPrincipalCV(senderAddress), // sender
          standardPrincipalCV(recipient), // recipient
          memo ? uintCV(Buffer.from(memo, 'utf8')) : noneCV(), // memo (optional)
        ],
        network: this.network,
        senderKey: privateKeyId,
        postConditions: [
          // MANDATORY: Post-condition for SIP-010 compliance
          makeStandardFungiblePostCondition(
            senderAddress,
            FungibleConditionCode.Equal,
            amount,
            createAssetInfo(
              CONFIG.STACKS_CONTRACT_ADDRESS,
              CONFIG.STACKS_CONTRACT_NAME,
              'embedded-wallet-token'
            )
          ),
        ],
        postConditionMode: PostConditionMode.Deny,
      });

      console.log('Built SIP-010 compliant transfer transaction');

      // Sign and broadcast the transaction
      const signedTx = await this.signTransaction(transferTx, subOrganizationId, privateKeyId);
      const result = await broadcastTransaction(signedTx, this.network);

      console.log(`STX transfer successful: ${result.txid}`);
      return {
        txId: result.txid,
        explorerUrl: `https://explorer.stacks.co/txid/${result.txid}`,
        amount,
        recipient,
      };
    } catch (error) {
      console.error('Failed to transfer STX:', error);
      throw error;
    }
  }

  /**
   * Helper method to sign transactions with TurnkeyHQ
   */
  private async signTransaction(
    transaction: any,
    subOrganizationId: string,
    privateKeyId: string
  ) {
    try {
      // Serialize the transaction
      const serializedTx = transaction.serialize();
      
      // Sign with TurnkeyHQ
      const signature = await this.sdk.signRawPayload({
        organizationId: subOrganizationId,
        privateKeyId: privateKeyId,
        payload: serializedTx.toString('hex'),
        encoding: 'PAYLOAD_ENCODING_HEXADECIMAL',
      });

      // Apply signature to transaction
      transaction.setSignature(signature);
      
      return transaction;
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      throw error;
    }
  }

  /**
   * Helper method to create transaction message for signing
   */
  private createTransactionMessage(params: {
    userAddress: string;
    recipient: string;
    amount: number;
    productId: string;
    nonce: number;
  }): string {
    const message = JSON.stringify({
      userAddress: params.userAddress,
      recipient: params.recipient,
      amount: params.amount,
      productId: params.productId,
      nonce: params.nonce,
      timestamp: Date.now(),
    });

    return Buffer.from(message, 'utf8').toString('hex');
  }

  /**
   * Helper method to get user data from contract
   */
  private async getUserData(userAddress: string): Promise<any> {
    // This would typically call a read-only function on your contract
    // Implementation depends on your specific contract structure
    console.log(`Getting user data for: ${userAddress}`);
    // Return mock data for example
    return {
      nonce: 0,
      maxAmount: 1000000000, // 1 STX in microSTX
      dailyLimit: 10000000000, // 10 STX in microSTX
      isRegistered: true,
    };
  }
}

/**
 * Example usage of the TurnkeyStacksIntegration class
 */
export async function exampleUsage() {
  const integration = new TurnkeyStacksIntegration();

  try {
    // Step 1: Create user wallet
    const wallet = await integration.createUserWallet(
      'user-123',
      'user@example.com'
    );

    console.log('Wallet created:', wallet);

    // Step 2: Register user on contract
    await integration.registerUserOnContract(
      wallet.address,
      wallet.publicKey,
      wallet.subOrganizationId,
      wallet.privateKeyId
    );

    // Step 3: Execute a purchase
    const purchaseResult = await integration.executePurchase(
      wallet.address,
      'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', // recipient
      500000, // 0.5 STX in microSTX
      'premium-nft-001',
      wallet.subOrganizationId,
      wallet.privateKeyId,
      0 // user nonce
    );

    console.log('Purchase completed:', purchaseResult);

    // Step 4: Transfer STX using SIP-010 function
    const transferResult = await integration.transferSTX(
      wallet.address,
      'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9',
      250000, // 0.25 STX in microSTX
      wallet.subOrganizationId,
      wallet.privateKeyId,
      'Payment for services'
    );

    console.log('Transfer completed:', transferResult);

  } catch (error) {
    console.error('Example usage failed:', error);
  }
}

// Export the integration class for use in other modules
export default TurnkeyStacksIntegration;
