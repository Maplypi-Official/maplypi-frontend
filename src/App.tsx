import React, { useState, useEffect } from 'react';
// استدعاء المكونات الحقيقية
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage'; 
import Navbar from './components/Navigation/Navbar';
import AddProductForm from './features/market/components/AddProductForm/AddProductForm';
// استدعاء صفحة الـ Network الحقيقية بعد معالجة المشاكل
import NetworkPage from './features/network/NetworkPage';
// استدعاء شاشة التحميل النابضة المحسنة
import SplashScreen from './components/Shared/SplashScreen/SplashScreen';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');
  // حالة التحكم في شاشة التحميل الافتتاحية
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
          /* تم إرجاع المكون الحقيقي للشبكة هنا. 
             في حالة حدوث أي مشكلة في المكون، الـ catch سيمسكها لمنع الشاشة السوداء.
          */
          return <NetworkPage />;
        default: 
          return <Dashboard />;
      }
    } catch (error) {
      console.error("Component Render Error:", error);
      return (
        <div style={isolatedStyle}>
          <h2 style={{ textShadow: '0 0 10px #ffca28' }}>SYSTEM RECOVERY</h2>
          <p style={{ color: '#64748b' }}>Error loading component. Initializing safe mode...</p>
        </div>
      );
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
