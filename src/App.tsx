import React, { useState } from 'react';
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage';
import NetworkPage from './features/network/NetworkPage';
import Navbar from './components/Navigation/Navbar';

const App: React.FC = () => {
  // الحالة المسؤولة عن التنقل
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  // دالة الرندر لضمان عدم وجود أخطاء في الـ Switch
  const renderPage = () => {
    switch (currentPage) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'MARKET':
        return <MarketPage />;
      case 'NETWORK':
        return <NetworkPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App" style={{ background: '#0a0516', minHeight: '100vh' }}>
      {renderPage()}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
