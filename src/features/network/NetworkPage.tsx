import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import MapContainer from './components/MapContainer/MapContainer';
import './NetworkPage.css';

/**
 * النسخة النهائية لصفحة الشبكة (MaplyPi Network Page)
 * تم الحفاظ على نفس أسماء الدوال والمسميات لضمان عدم كسر التطبيق
 */
const NetworkPage: React.FC = () => {
  // استخدام نفس الـ Hook بنفس المسميات لضمان التوافق مع الـ Backend
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-full-screen-container">
      
      {/* 🗺️ منطقة الخريطة: تشغل كامل الشاشة خلف العناصر العلوية */}
      <main className="map-main-viewport">
         {userStats ? (
           <MapContainer 
             sectorName="Testing Sector" 
             userLocation={userStats} 
             nodes={nodes} 
           />
         ) : (
           <div className="neural-sync-overlay">
              <div className="sync-loader"></div>
              <h2 className="sync-text">
                {loading ? "ESTABLISHING NEURAL LINK..." : "WAITING FOR GPS SATELLITE..."}
              </h2>
           </div>
         )}
      </main>

      {/* 🛡️ واجهة المستخدم الشفافة (HUD) - مطابقة للتصميم الهدف */}
      <header className="network-hud-header">
        <div className="status-indicator">
          <span className="live-pulse"></span>
          <h1 className="hud-title">SYSTEM ACTIVE: NETWORK</h1>
        </div>
      </header>

      {/* معلومات الرصيد تظهر في الـ MapContainer نفسه لضمان وضعها الصحيح */}
      
      {/* عداد الـ Nodes الصغير للـ Debugging أسفل الصفحة */}
      <footer className="network-debug-footer">
        <span className="debug-label">ACTIVE_NODES_IN_RANGE:</span> {nodes?.length || 0}
      </footer>

    </div>
  );
};

export default NetworkPage;
