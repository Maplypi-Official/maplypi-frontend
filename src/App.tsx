import React, { useState } from 'react';
// استدعاء المكونات الحقيقية
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage'; // تفعيل الماركت
import Navbar from './components/Navigation/Navbar';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  /**
   * دالة الرندر (Render Logic)
   * تشغيل Dashboard و Market وعزل Network
   */
  const renderPage = () => {
    const isolatedStyle: React.CSSProperties = {
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
          // محاولة تشغيل الماركت الحقيقي
          return <MarketPage />;
        case 'NETWORK': 
          // بقاء النيتورك معزولة لاختبارها لاحقاً
          return (
            <div style={isolatedStyle}>
              <h2 style={{ textShadow: '0 0 10px #eab308' }}>NETWORK ISOLATED</h2>
              <p style={{ color: '#64748b' }}>Assets Sync Pending...</p>
            </div>
          );
        default: 
          return <Dashboard />;
      }
    } catch (error) {
      console.error("Component Render Error:", error);
      return <div style={isolatedStyle}>ERROR LOADING COMPONENT</div>;
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
