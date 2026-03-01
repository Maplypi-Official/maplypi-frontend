import React, { useState } from 'react';
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage';
import NetworkPage from './features/network/NetworkPage';
import Navbar from './components/Navigation/Navbar';

const App: React.FC = () => {
  // الحالة المسؤولة عن تحديد الصفحة الظاهرة حالياً
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  // دالة لاختيار الصفحة المناسبة بناءً على الـ State لضمان عدم حدوث Runtime Error
  const renderPage = () => {
    switch (currentPage) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'MARKET':
        return <MarketPage />;
      case 'NETWORK':
        return <NetworkPage />;
      case 'SETTINGS':
        return (
          <div style={{ padding: '20px', color: '#eab308', textAlign: 'center', marginTop: '50px' }}>
            <h2>SETTINGS</h2>
            <p style={{ color: '#64748b' }}>Encryption Protocol Active. Settings coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App" style={{ 
      background: '#0a0516', 
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflowX: 'hidden' 
    }}>
      {/* عرض المحتوى الديناميكي */}
      {renderPage()}

      {/* شريط التنقل السفلي الثابت */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
