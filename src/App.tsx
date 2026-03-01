import React, { useState, useEffect } from 'react';
// استدعاء المكونات الحقيقية
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage'; 
import Navbar from './components/Navigation/Navbar';
import AddProductForm from './features/market/components/AddProductForm/AddProductForm';
// استدعاء شاشة التحميل النابضة
import SplashScreen from './components/Shared/SplashScreen/SplashScreen';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');
  // حالة التحكم في شاشة التحميل (تبدأ بـ true)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // إبقاء الشعار النابض لمدة 3.5 ثانية ليشعر المستخدم بالفخامة
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  /**
   * دالة الرندر (Render Logic)
   * تشغيل المكونات مع الحفاظ على استقرار التسميات لضمان توافق Backend
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
          // عرض لوحة إضافة المنتجات الجديدة (واقعي/افتراضي)
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

  // عرض شاشة التحميل أولاً
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#05050a', paddingBottom: '80px' }}>
      {renderPage()}
      {/* Navbar بوضع الثبات لضمان تجربة موبايل احترافية */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
