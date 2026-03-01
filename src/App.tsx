import React, { useState } from 'react';
import Dashboard from './components/Layout/Dashboard.tsx';
import MarketPage from './features/market/MarketPage.tsx';
import NetworkPage from './features/network/NetworkPage.tsx';
import Navbar from './components/Navigation/Navbar.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  const renderPage = () => {
    switch (currentPage) {
      case 'DASHBOARD': return <Dashboard />;
      case 'MARKET': return <MarketPage />;
      case 'NETWORK': return <NetworkPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="App" style={{ background: '#0a0516', minHeight: '100vh', width: '100%' }}>
      {renderPage()}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
