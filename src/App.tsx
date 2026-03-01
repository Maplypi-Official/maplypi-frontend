import React, { useState } from 'react';
import Dashboard from './components/Layout/Dashboard';
import Navbar from './components/Navigation/Navbar';

import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  const renderPage = () => {
    const sectionStyle: React.CSSProperties = {
      padding: '40px 20px',
      color: '#eab308',
      textAlign: 'center',
      marginTop: '100px',
      fontFamily: 'monospace'
    };

    try {
      switch (currentPage) {
        case 'DASHBOARD': 
          return <Dashboard />;
        case 'MARKET': 
          return (
            <div style={sectionStyle}>
              <h2 style={{ textShadow: '0 0 10px #eab308' }}>MARKET ISOLATED</h2>
              <p style={{ color: '#64748b' }}>Check Dashboard Status First.</p>
            </div>
          );
        case 'NETWORK': 
          return (
            <div style={sectionStyle}>
              <h2 style={{ textShadow: '0 0 10px #eab308' }}>NETWORK ISOLATED</h2>
              <p style={{ color: '#64748b' }}>Preventing Asset Conflicts.</p>
            </div>
          );
        default: 
          return <Dashboard />;
      }
    } catch (error) {
      console.error("Critical Render Error:", error);
      return <div style={sectionStyle}>SYSTEM ERROR - REBOOTING</div>;
    }
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#05050a' }}>
      {renderPage()}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
