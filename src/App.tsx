import React, { useState } from 'react';
// استدعاء المكونات الأساسية والآمنة حالياً
import Navbar from './components/Navigation/Navbar';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  // الحالة المسؤولة عن التنقل بين الصفحات
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  /**
   * دالة الرندر المعزولة (Isolated Render)
   * تعرض محتوى نصي بسيط لكل صفحة للتأكد من سلامة النظام الأساسي
   */
  const renderPage = () => {
    const sectionStyle: React.CSSProperties = {
      padding: '40px 20px',
      color: '#eab308',
      textAlign: 'center',
      marginTop: '100px',
      fontFamily: 'monospace'
    };

    switch (currentPage) {
      case 'DASHBOARD': 
        return (
          <div style={sectionStyle}>
            <h2 style={{ textShadow: '0 0 10px #eab308' }}>DASHBOARD CORE</h2>
            <p style={{ color: '#64748b' }}>SYSTEM STATUS: ONLINE</p>
            <div style={{ marginTop: '20px', border: '1px dotted #eab308', padding: '20px' }}>
              WAITING FOR DATA SYNC...
            </div>
          </div>
        );
      case 'MARKET': 
        return (
          <div style={sectionStyle}>
            <h2 style={{ textShadow: '0 0 10px #eab308' }}>MAPLYPI MARKET</h2>
            <p style={{ color: '#64748b' }}>ISOLATED MODE ACTIVE</p>
          </div>
        );
      case 'NETWORK': 
        return (
          <div style={sectionStyle}>
            <h2 style={{ textShadow: '0 0 10px #eab308' }}>NETWORK MATRIX</h2>
            <p style={{ color: '#64748b' }}>ASSETS LOADING SUSPENDED</p>
          </div>
        );
      case 'SETTINGS':
        return (
          <div style={sectionStyle}>
            <h2 style={{ textShadow: '0 0 10px #eab308' }}>SECURITY PROTOCOL</h2>
            <p style={{ color: '#64748b' }}>TERMINAL ACCESS RESTRICTED</p>
          </div>
        );
      default: 
        return <div style={sectionStyle}>INITIALIZING...</div>;
    }
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#05050a' }}>
      {/* عرض المحتوى المعزول لضمان عدم حدوث شاشة سوداء */}
      {renderPage()}
      
      {/* شريط التنقل السفلي - يعمل بشكل مستقل وآمن */}
      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
