import React, { useState, useEffect } from 'react';
import Dashboard from './components/Layout/Dashboard';
import MarketPage from './features/market/MarketPage'; 
import Navbar from './components/Navigation/Navbar';
import AddProductForm from './features/market/components/AddProductForm/AddProductForm';
import SplashScreen from './components/Shared/SplashScreen/SplashScreen';

import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // مدة التحميل الافتتاحية
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    const errorStyle: React.CSSProperties = {
      padding: '100px 20px',
      color: '#ffca28',
      textAlign: 'center',
      fontFamily: 'monospace'
    };

    try {
      switch (currentPage) {
        case 'DASHBOARD': return <Dashboard />;
        case 'MARKET': return <MarketPage />;
        case 'ADD_PRODUCT': return <AddProductForm />;
        case 'NETWORK': 
          return (
            <div style={errorStyle}>
              <h2>NETWORK SECURED</h2>
              <p style={{ color: '#64748b' }}>Nodes Syncing...</p>
            </div>
          );
        default: return <Dashboard />;
      }
    } catch (error) {
      console.error("Render Error:", error);
      return <div style={errorStyle}>FAILED TO LOAD MODULE</div>;
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      <main className="page-container">
        {/* الـ key هنا يضمن إعادة تشغيل الأنيميشن بسلاسة عند كل انتقال */}
        <div key={currentPage} className="page-transition-wrapper">
          {renderPage()}
        </div>
      </main>
      
      {/* الـ Navbar الثابت والظاهر دائماً */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
