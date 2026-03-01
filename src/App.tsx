import React, { useState, useEffect } from 'react';
// استدعاء المكونات الحقيقية
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage'; 
import Navbar from './components/Navigation/Navbar';
import AddProductForm from './features/market/components/AddProductForm/AddProductForm';
// استدعاء شاشة التحميل النابضة المحسنة
import SplashScreen from './components/Shared/SplashScreen/SplashScreen';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');
  // حالة التحكم في شاشة التحميل
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // إبقاء الشاشة الافتتاحية للمدة المحددة لضمان تحميل الأصول
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  /**
   * دالة الرندر الأساسية
   * الحفاظ على استقرار التسميات لضمان توافق الـ Backend
   */
  const renderPage = () => {
    const isolatedStyle: React.CSSProperties = {
      padding: '40px 20px',
      color: '#ffca28',
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
              <h2 style={{ textShadow: '0 0 10px #ffca28' }}>NETWORK SECURED</h2>
              <p style={{ color: '#64748b' }}>Nodes Syncing...</p>
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

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      {/* حاوية المحتوى الرئيسية التي تملأ الشاشة */}
      <main className="page-container">
        {/* الـ key يضمن تشغيل الأنيميشن عند كل تنقل */}
        <div key={currentPage} className="page-transition-wrapper">
          {renderPage()}
        </div>
      </main>
      
      {/* الـ Navbar الثابت والظاهر دائماً فوق كل شيء */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
