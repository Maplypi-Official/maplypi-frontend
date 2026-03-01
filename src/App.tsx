import React, { useState } from 'react';
// Cleaned imports: Removing .tsx extensions to ensure Vite compatibility
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage';
import NetworkPage from './features/network/NetworkPage';
import Navbar from './components/Navigation/Navbar';

// Core central styles
import './App.css';

const App: React.FC = () => {
  // State for page navigation management
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  /**
   * Safety Render Logic
   * Handles dynamic component switching based on the active state
   */
  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'DASHBOARD': 
          return <Dashboard />;
        case 'MARKET': 
          return <MarketPage />;
        case 'NETWORK': 
          return <NetworkPage />;
        case 'SETTINGS':
          return (
            <div style={{ padding: '40px', color: '#eab308', textAlign: 'center' }}>
              <h2 style={{ textShadow: '0 0 10px #eab308' }}>Security Protocol</h2>
              <p style={{ color: '#64748b' }}>Terminal Access Restricted.</p>
            </div>
          );
        default: 
          return <Dashboard />;
      }
    } catch (error) {
      console.error("Matrix Render Error:", error);
      return (
        <div style={{ color: '#ff4444', padding: '20px', textAlign: 'center', background: '#000' }}>
          <h3>CRITICAL SYSTEM ERROR</h3>
          <p>Rebooting Interface...</p>
        </div>
      );
    }
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#05050a' }}>
      {/* Dynamic Viewport */}
      {renderPage()}
      
      {/* Global Navigation System */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
