import React, { useState } from 'react';
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage';
import NetworkPage from './features/network/NetworkPage';
import Navbar from './components/Navigation/Navbar';

const App: React.FC = () => {
  // الحالة المسؤولة عن تحديد الصفحة الظاهرة حالياً
  const [currentPage, setCurrentPage] = useState('DASHBOARD');

  // دالة لاختيار الصفحة المناسبة بناءً على الـ State
  const renderPage = () => {
    switch (currentPage) {
      case 'DASHBOARD': return <Dashboard />;
      case 'MARKET': return <MarketPage />;
      case 'NETWORK': return <NetworkPage />;
      case 'SETTINGS': return <div style={{padding: '20px', color: '#eab308'}}>Settings Coming Soon...</div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="App" style={{ background: '#0a0516', minHeight: '100vh' }}>
      {/* عرض الصفحة المختارة */}
      {renderPage()}

      {/* النيفبار أصبح الآن يتحكم في الـ App State */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
}

export default App;
