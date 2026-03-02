import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import MapContainer from './components/MapContainer/MapContainer';
import './NetworkPage.css';

/**
 * النسخة النهائية لصفحة الشبكة (MaplyPi Network Page)
 * تم توحيد المسميات مع الـ CSS لضمان عدم ظهور شاشة سوداء
 */
const NetworkPage: React.FC = () => {
  // استخدام نفس الـ Hook لضمان التوافق مع الـ Backend
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-page-container">
      
      {/* 🗺️ منطقة الخريطة: تشغل كامل الشاشة خلف العناصر */}
      <main className="map-wrapper">
         {userStats ? (
           <MapContainer 
             sectorName="Testing Sector" 
             userLocation={userStats} 
             nodes={nodes} 
           />
         ) : (
           <div className="sync-loading-state">
              <div className="sync-loader"></div>
              <h2 className="sync-text">
                {loading ? "ESTABLISHING NEURAL LINK..." : "WAITING FOR GPS..."}
              </h2>
           </div>
         )}
      </main>

      {/* 🛡️ واجهة المستخدم الشفافة (HUD) فوق الخريطة */}
      <header className="network-header">
        <h1 className="network-title">SYSTEM ACTIVE: NETWORK</h1>
        <div className="network-subtitle">Real-time Node Connectivity</div>
      </header>
      
      {/* عداد الـ Nodes الصغير أسفل الصفحة */}
      <footer className="network-debug-footer">
        <span className="debug-label">ACTIVE_NODES_IN_RANGE:</span> {nodes?.length || 0}
      </footer>

    </div>
  );
};

export default NetworkPage;
