/**
 * Complete Purchase Flow Component
 * 
 * This React component demonstrates the complete user experience
 * for purchasing products using TurnkeyHQ + Stacks integration
 * without requiring browser extensions.
 */

import React, { useState, useEffect } from 'react';
import { TurnkeyStacksIntegration } from './turnkey-stacks-example';

interface Product {
  id: string;
  name: string;
  price: number; // in STX
  description: string;
  image: string;
  category: string;
}

interface Wallet {
  address: string;
  subOrganizationId: string;
  privateKeyId: string;
  publicKey: string;
}

interface PurchaseResult {
  txId: string;
  explorerUrl: string;
  amount: number;
  recipient: string;
  productId: string;
}

const PurchaseFlow: React.FC = () => {
  // State management
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize integration
  const integration = new TurnkeyStacksIntegration();

  // Sample products
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium NFT Collection',
      price: 0.5,
      description: 'Exclusive digital artwork with unique properties',
      image: '/images/nft-premium.jpg',
      category: 'NFT',
    },
    {
      id: '2',
      name: 'VIP Platform Access',
      price: 1.0,
      description: 'Premium access to all platform features',
      image: '/images/vip-access.jpg',
      category: 'Membership',
    },
    {
      id: '3',
      name: 'Custom Smart Contract',
      price: 2.5,
      description: 'Deploy your own custom Clarity smart contract',
      image: '/images/smart-contract.jpg',
      category: 'Development',
    },
    {
      id: '4',
      name: 'Stacks Development Course',
      price: 0.8,
      description: 'Complete course on Stacks and Clarity development',
      image: '/images/course.jpg',
      category: 'Education',
    },
  ];

  // Load wallet from localStorage on component mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('turnkey-wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  // Create secure wallet with TurnkeyHQ
  const handleCreateWallet = async () => {
    if (!userEmail) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userId = `user-${Date.now()}`;
      
      // Create wallet with TurnkeyHQ
      const newWallet = await integration.createUserWallet(userId, userEmail);
      
      // Register user on Stacks contract
      await integration.registerUserOnContract(
        newWallet.address,
        newWallet.publicKey,
        newWallet.subOrganizationId,
        newWallet.privateKeyId
      );

      setWallet(newWallet);
      localStorage.setItem('turnkey-wallet', JSON.stringify(newWallet));
      
      console.log('Wallet created and user registered successfully');
    } catch (err) {
      setError(`Failed to create wallet: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Execute purchase transaction
  const handlePurchase = async (product: Product) => {
    if (!wallet) {
      setError('Wallet not initialized');
      return;
    }

    setPurchasing(product.id);
    setError(null);

    try {
      const amount = product.price * 1000000; // Convert to microSTX
      const userNonce = 0; // In real implementation, get from contract

      const result = await integration.executePurchase(
        wallet.address,
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, // Your contract address
        amount,
        product.id,
        wallet.subOrganizationId,
        wallet.privateKeyId,
        userNonce
      );

      setPurchaseHistory(prev => [...prev, result]);
      
      // Show success message
      alert(`Purchase successful! Transaction: ${result.txId}`);
      
    } catch (err) {
      setError(`Purchase failed: ${err.message}`);
    } finally {
      setPurchasing(null);
    }
  };

  // Transfer STX using SIP-010 function
  const handleTransferSTX = async (recipient: string, amount: number) => {
    if (!wallet) {
      setError('Wallet not initialized');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await integration.transferSTX(
        wallet.address,
        recipient,
        amount * 1000000, // Convert to microSTX
        wallet.subOrganizationId,
        wallet.privateKeyId,
        'Transfer from embedded wallet'
      );

      alert(`Transfer successful! Transaction: ${result.txId}`);
      
    } catch (err) {
      setError(`Transfer failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Wallet creation form
  if (!wallet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Secure Wallet
            </h1>
            <p className="text-gray-600">
              Create a secure wallet without browser extensions
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <button
              onClick={handleCreateWallet}
              disabled={loading || !userEmail}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Secure Wallet...
                </div>
              ) : (
                'Create Secure Wallet'
              )}
            </button>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">🔒 Security Features</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Private keys stored in secure hardware enclaves</li>
                <li>• No browser extensions required</li>
                <li>• SIP-010 compliant transactions</li>
                <li>• Built-in rate limiting and protection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main purchase interface
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Stacks Marketplace
              </h1>
              <p className="text-gray-600">
                Secure purchases powered by TurnkeyHQ + Stacks
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Wallet Address</p>
                <p className="font-mono text-sm text-gray-900">
                  {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleTransferSTX('SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9', 0.1)}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Send 0.1 STX
            </button>
            <button
              onClick={() => window.open(`https://explorer.stacks.co/address/${wallet.address}`, '_blank')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              View on Explorer
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">{product.name[0]}</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {product.category}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price} STX
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                
                <button
                  onClick={() => handlePurchase(product)}
                  disabled={purchasing === product.id}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {purchasing === product.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Purchase Now'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase History */}
        {purchaseHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Purchases</h2>
            <div className="space-y-3">
              {purchaseHistory.map((purchase, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Product {purchase.productId}</p>
                    <p className="text-sm text-gray-600">
                      {purchase.amount / 1000000} STX to {purchase.recipient.slice(0, 10)}...
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {purchase.txId.slice(0, 10)}...
                    </span>
                    <a
                      href={purchase.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseFlow;
