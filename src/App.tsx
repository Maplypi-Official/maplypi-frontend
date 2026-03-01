import React, { useState } from 'react';
import Dashboard from './components/Layout/Dashboard.tsx';
import MarketPage from './features/market/MarketPage.tsx';
import NetworkPage from './features/network/NetworkPage.tsx';
import Navbar from './components/Navigation/Navbar.tsx';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  // الحالة المسؤولة عن التنقل بين الصفحات
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  // دالة الرندر الآمنة (Safety Render)
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
            <div style={{ padding: '40px', color: 'var(--gold)', textAlign: 'center' }}>
              <h2>Security Protocol</h2>
              <p style={{ color: '#64748b' }}>Terminal Access Restricted.</p>
            </div>
          );
        default: 
          return <Dashboard />;
      }
    } catch (error) {
      console.error("Matrix Render Error:", error);
      return (
        <div style={{ color: '#ff4444', padding: '20px', textAlign: 'center' }}>
          <h3>CRITICAL SYSTEM ERROR</h3>
          <p>Rebooting Interface...</p>
        </div>
      );
    }
  };

  return (
    <div className="App">
      {/* عرض الصفحة النشطة بناءً على اختيار المستخدم */}
      {renderPage()}
      
      {/* شريط التنقل السفلي - يمرر له الحالة الحالية ودالة التغيير */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
