import React, { useState, useEffect } from 'react';
// استيراد المكونات
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage'; 
import Navbar from './components/Navigation/Navbar';
import AddProductForm from './features/market/components/AddProductForm/AddProductForm';
// استيراد شاشة التحميل الجديدة
import SplashScreen from './components/Shared/SplashScreen/SplashScreen';

import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');
  // حالة التحكم في شاشة التحميل
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // تحديد مدة ظهور الشعار (3500 مللي ثانية = 3.5 ثانية) ليعطي شعور بالفخامة
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer); // تنظيف الذاكرة عند إغلاق المكون
  }, []);

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

  // إذا كان التطبيق في حالة تحميل، اعرض الشاشة النابضة فقط
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#05050a', paddingBottom: '80px' }}>
      {renderPage()}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
