import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import MapContainer from './components/MapContainer/MapContainer';
import './NetworkPage.css';

/**
 * النسخة الاحترافية لصفحة الشبكة (MaplyPi Network Page)
 * تم الربط مع الـ CSS لضمان مظهر Full Screen ومنع السواد
 */
const NetworkPage: React.FC = () => {
  // جلب البيانات من الـ Hook بنفس المسميات الأصلية لضمان التوافق مع الـ Backend
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-page-container">
      
      {/* 🗺️ منطقة الخريطة: تشغل الخلفية بالكامل */}
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

      {/* 🛡️ واجهة المستخدم (HUD) - تظهر فوق الخريطة */}
      <header className="network-header">
        <h1 className="network-title">SYSTEM ACTIVE: NETWORK</h1>
        <div className="network-subtitle">Real-time Node Connectivity</div>
      </header>
      
      {/* عداد الـ Nodes التقني أسفل الصفحة */}
      <footer className="network-debug-footer">
        <span className="debug-label">ACTIVE_NODES_IN_RANGE:</span> {nodes?.length || 0}
      </footer>

    </div>
  );
};

export default NetworkPage;
