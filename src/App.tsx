import React, { useState } from 'react';
// استدعاء المكونات الحقيقية (بدون امتدادات لضمان عمل Vite)
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage';
import NetworkPage from './features/network/NetworkPage';
import Navbar from './components/Navigation/Navbar';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  // الحالة المسؤولة عن التنقل بين الصفحات
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  /**
   * دالة الرندر الأساسية
   * تقوم بعرض المكون الحقيقي بناءً على الصفحة المختارة
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
            <div style={{ padding: '40px', color: '#eab308', textAlign: 'center', marginTop: '100px' }}>
              <h2 style={{ textShadow: '0 0 10px #eab308' }}>SECURITY PROTOCOL</h2>
              <p style={{ color: '#64748b' }}>Terminal Access Restricted.</p>
            </div>
          );
        default: 
          return <Dashboard />;
      }
    } catch (error) {
      console.error("Matrix Render Error:", error);
      return (
        <div style={{ color: '#ff4444', padding: '20px', textAlign: 'center', background: '#05050a', height: '100vh' }}>
          <h3>CRITICAL SYSTEM ERROR</h3>
          <p>Rebooting Interface...</p>
        </div>
      );
    }
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#05050a' }}>
      {/* عرض المكون النشط (Dashboard, Market, or Network) */}
      {renderPage()}
      
      {/* شريط التنقل السفلي الثابت */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
