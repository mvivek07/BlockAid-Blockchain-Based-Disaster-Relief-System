import React, { useState, useEffect } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';

// Environment variables (should be in .env file)
const ENV = {
  WEB3AUTH_CLIENT_ID: process.env.REACT_APP_WEB3AUTH_CLIENT_ID || 
    "BOUaYmPb1UiA-geIIgpXo8GoaCUw5pk_jsrvZKaZErY19UOgiDCQlPQ_zzl2mwfIyKJ3N1zYmhtcNpE1AoJ9B2w",
  TRANSAK_API_KEY: process.env.REACT_APP_TRANSAK_API_KEY || 
    "80ad9668-04a9-4ae2-b369-4d7f2af00629",
  TRANSAK_ENV: process.env.REACT_APP_TRANSAK_ENV || "STAGING",
  WEB3AUTH_NETWORK: process.env.REACT_APP_WEB3AUTH_NETWORK || WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  ETH_RPC_URL: process.env.REACT_APP_ETH_RPC_URL || 
    "https://rpc.ankr.com/eth/8dd098608a51285acad48f401b74c1c1c2bceaa6ff09c5ef47cc3ce02c59ef7d"
};

// Chain configuration in one place for easy updates
const CHAIN_CONFIG = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Ethereum mainnet
  rpcTarget: ENV.ETH_RPC_URL,
  displayName: "Ethereum Mainnet",
  blockExplorer: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
};

// Reusable UI components
const Button = ({ onClick, color = 'primary', children, ...props }) => {
  const colors = {
    primary: { bg: '#1a365d', hover: '#2c5282' },
    danger: { bg: '#e53e3e', hover: '#c53030' },
    secondary: { bg: '#4a5568', hover: '#2d3748' }
  };
  
  const [isHover, setIsHover] = useState(false);
  
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: isHover ? colors[color].hover : colors[color].bg,
        color: 'white',
        padding: color === 'primary' ? '12px 24px' : '8px 16px',
        border: 'none',
        borderRadius: '4px',
        fontSize: color === 'primary' ? '16px' : '14px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      {children}
    </button>
  );
};

const ErrorMessage = ({ message }) => (
  <div style={{
    padding: '15px',
    backgroundColor: '#fed7d7',
    color: '#c53030',
    borderRadius: '4px',
    marginBottom: '20px'
  }}>
    <strong>Error:</strong> {message}
    <br />
    <small>Please ensure you've selected a blockchain chain in your Web3Auth dashboard.</small>
  </div>
);

const ServiceCard = ({ title, description, buttonText, onClick }) => {
  const [isHover, setIsHover] = useState(false);
  
  return (
    <div 
      style={{ 
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transform: isHover ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.3s',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{title}</h3>
      <p style={{ marginBottom: '15px' }}>{description}</p>
      <Button color="secondary" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};

// Modal component for the dashboard
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px'
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

/**
 * Main BlockAid application component
 * Provides Web3 authentication and financial services
 */
function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);

  // For viewing dashboard in a modal
  const openDashboardModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Initialize Web3Auth on component mount
    initWeb3Auth();
  }, []);

  /**
   * Initialize Web3Auth instance and check for existing sessions
   */
  const initWeb3Auth = async () => {
    try {
      console.log("Initializing Web3Auth...");
      setIsLoading(true);
      setError(null);
      
      // Create privateKeyProvider with chain configuration
      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig: CHAIN_CONFIG }
      });
      
      console.log("Creating Web3Auth instance with network:", ENV.WEB3AUTH_NETWORK);
      
      // Initialize Web3Auth with configuration
      const web3authInstance = new Web3Auth({
        clientId: ENV.WEB3AUTH_CLIENT_ID,
        web3AuthNetwork: ENV.WEB3AUTH_NETWORK,
        privateKeyProvider,
        chainConfig: CHAIN_CONFIG,
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["google", "facebook"],
          appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
        }
      });

      try {
        // Initialize the modal
        await web3authInstance.initModal();
        console.log("Web3Auth modal initialized successfully");
        
        setWeb3auth(web3authInstance);
        
        // Check if user is already logged in
        if (web3authInstance.connected) {
          await handleSuccessfulLogin(web3authInstance);
        }
      } catch (modalError) {
        console.error("Error initializing modal:", modalError);
        setError(`Modal initialization error: ${modalError.message}`);
      }
    } catch (error) {
      console.error("Error initializing Web3Auth:", error);
      setError(`Initialization error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle successful login by fetching user info and wallet address
   */
  const handleSuccessfulLogin = async (web3authInstance) => {
    try {
      setLoggedIn(true);
      const web3authProvider = web3authInstance.provider;
      setProvider(web3authProvider);

      // Get user info
      const user = await web3authInstance.getUserInfo();
      setUserInfo(user);
      console.log("User info:", user);
      
      // Get wallet address
      await fetchWalletAddress(web3authProvider);
    } catch (error) {
      console.error("Error handling login:", error);
      setError(`Login processing error: ${error.message}`);
    }
  };

  /**
   * Fetch the user's wallet address
   */
  const fetchWalletAddress = async (provider) => {
    try {
      const accounts = await provider.request({ method: "eth_accounts" });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        console.log("User wallet address:", accounts[0]);
      } else {
        console.warn("No accounts found");
      }
    } catch (error) {
      console.error("Error getting wallet address:", error);
      setError(`Unable to fetch wallet address: ${error.message}`);
    }
  };

  /**
   * Handle user login with Web3Auth
   */
  const login = async () => {
    if (!web3auth) {
      setError("Web3Auth not initialized yet. Please try again later.");
      return;
    }
    
    try {
      console.log("Attempting to login...");
      setIsLoading(true);
      setError(null);
      
      const web3authProvider = await web3auth.connect();
      console.log("Login successful");
      
      await handleSuccessfulLogin(web3auth);
    } catch (error) {
      console.error("Error during login:", error);
      setError(`Login error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle user logout from Web3Auth
   */
  const logout = async () => {
    if (!web3auth) {
      console.log("Web3Auth not initialized yet");
      return;
    }
    
    try {
      await web3auth.logout();
      // Reset user state
      setProvider(null);
      setLoggedIn(false);
      setUserInfo(null);
      setWalletAddress("");
    } catch (error) {
      console.error("Error during logout:", error);
      setError(`Logout error: ${error.message}`);
    }
  };

  /**
   * Open Transak widget for cryptocurrency purchases
   */
  const openTransak = () => {
    if (!userInfo) {
      setError("Please log in before accessing this feature");
      return;
    }

    if (!walletAddress) {
      setError("Wallet address not available. Please try logging in again.");
      return;
    }

    try {
      // Instead of using Transak directly, we'll redirect to their hosted service
      const transakURL = `https://global-stg.transak.com/?apiKey=${ENV.TRANSAK_API_KEY}` +
        `&defaultCryptoCurrency=ETH` + 
        `&walletAddress=${walletAddress}` +
        `&themeColor=000000` +
        `&email=${encodeURIComponent(userInfo.email || '')}` +
        `&redirectURL=${encodeURIComponent(window.location.origin)}`;
      
      // Open in a new window/tab
      window.open(transakURL, '_blank');
      
      // Add a mock transaction for demonstration
      const newTransaction = {
        id: Date.now(),
        type: 'Purchase',
        amount: '0.5 ETH',
        date: new Date().toLocaleString(),
        status: 'Completed'
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      
    } catch (error) {
      console.error("Error opening Transak:", error);
      setError(`Transak error: ${error.message}`);
    }
  };

  /**
   * Handle Donor-Recipient transfers (placeholder for now)
   */
  const handleDonorRecipient = () => {
    if (!userInfo) {
      setError("Please log in before accessing this feature");
      return;
    }

    // Add a mock transaction for demonstration
    const newTransaction = {
      id: Date.now(),
      type: 'Transfer',
      amount: '0.2 ETH',
      date: new Date().toLocaleString(),
      status: 'Pending'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // This would be implemented with real functionality in the future
    alert("Donor-Recipient transfer initiated! Check your transaction history.");
  };

  // Toggle transaction history visibility
  const toggleTransactions = () => {
    setShowTransactions(prev => !prev);
  };

  // Transaction history component
  const TransactionHistory = () => {
    if (transactions.length === 0) {
      return (
        <div style={{
          padding: '15px',
          backgroundColor: '#EDF2F7',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          No transactions yet.
        </div>
      );
    }
    
    return (
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '20px'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#EDF2F7' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #CBD5E0' }}>Type</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #CBD5E0' }}>Amount</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #CBD5E0' }}>Date</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #CBD5E0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '10px' }}>{tx.type}</td>
                <td style={{ padding: '10px' }}>{tx.amount}</td>
                <td style={{ padding: '10px' }}>{tx.date}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    backgroundColor: tx.status === 'Completed' ? '#C6F6D5' : '#FEEBC8',
                    color: tx.status === 'Completed' ? '#2F855A' : '#C05621'
                  }}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render login screen
  const renderLoginScreen = () => (
    <div style={{ marginBottom: '30px' }}>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Please login to access the financial aid services
      </p>
      <Button onClick={login}>Login with Web3Auth</Button>
    </div>
  );

  // Render dashboard after login
  const renderDashboard = () => (
    <div>
      {/* Removed the duplicate heading from here */}
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <p style={{ fontSize: '18px', margin: 0 }}>
          Welcome, {userInfo?.name || 'User'}!
        </p>
        
        <Button 
          color="secondary" 
          onClick={toggleTransactions}
        >
          {showTransactions ? 'Hide Transactions' : 'Transaction History'}
        </Button>
      </div>
      
      {walletAddress && (
        <div style={{
          backgroundColor: '#EDF2F7',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          <strong>Your Wallet:</strong> {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
        </div>
      )}
      
      {showTransactions && <TransactionHistory />}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <ServiceCard 
          title="Buy Crypto" 
          description="Purchase cryptocurrency with your local currency"
          buttonText="Open Transak"
          onClick={openTransak}
        />
        
        <ServiceCard 
          title="Donor & Recipient" 
          description="Receive funds from donors or send to recipients"
          buttonText="Coming Soon"
          onClick={handleDonorRecipient}
        />
      </div>
      
      <Button color="danger" onClick={logout}>Logout</Button>
    </div>
  );

  return (
    <div className="container" style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#1a365d', 
        fontSize: '36px', 
        marginBottom: '30px' 
      }}>BlockAid: Web3 Financial Aid</h1>
      
      {error && <ErrorMessage message={error} />}
      
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <p>Loading...</p>
        </div>
      ) : !loggedIn ? (
        renderLoginScreen()
      ) : (
        <>
          {renderDashboard()}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {renderDashboard()}
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;