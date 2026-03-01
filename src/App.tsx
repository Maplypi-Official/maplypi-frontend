import React, { useState } from 'react';
// استدعاء المكونات الحقيقية
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage'; 
import Navbar from './components/Navigation/Navbar';
// استدعاء مكون إضافة المنتجات الجديد
import AddProductForm from './features/market/components/AddProductForm/AddProductForm';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  // الحالة الابتدائية هي DASHBOARD
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  /**
   * دالة الرندر (Render Logic)
   * تشغيل المكونات مع الحفاظ على استقرار التسميات
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
          return <MarketPage />;
        case 'ADD_PRODUCT': 
          // عرض لوحة إضافة المنتجات الجديدة
          return <AddProductForm />;
        case 'NETWORK': 
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
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#05050a', paddingBottom: '80px' }}>
      {renderPage()}
      {/* تمرير الحالة والدالة للـ Navbar المعدل */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
