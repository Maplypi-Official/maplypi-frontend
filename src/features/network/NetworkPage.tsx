import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
// استدعاء المكونات حسب التقسيم الاحترافي الجديد
import MapCanvas from './components/MapCanvas/MapCanvas';
import TechOverlays from './components/Overlays/TechOverlays';
import BalancePanel from './components/HUD/BalancePanel';
import SectorInfo from './components/HUD/SectorInfo';
// استدعاء ملف الـ CSS الموحد الذي يجمع الطبقات
import './styles/NetworkMaster.css';

/**
 * النسخة الاحترافية الأسطورية لصفحة الشبكة (MaplyPi Network Page)
 * تم الحفاظ على نفس المسميات (nodes, loading, userStats) لضمان الربط مع الـ Backend
 */
const NetworkPage: React.FC = () => {
  // جلب البيانات من الـ Hook الأصلي دون تغيير في الدوال
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-master-container">
      
      {/* 🏗️ الطبقة 1: الخلفية التقنية (Carbon Fiber + Scanlines) */}
      <TechOverlays />

      {/* 🗺️ الطبقة 2: منطقة الخريطة (Blueprint Style) */}
      <main className="map-layer-container">
         {userStats ? (
           <MapCanvas 
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

      {/* 🛡️ الطبقة 3: واجهة المستخدم (HUD) - تظهر فوق الخريطة بـ Z-index عالي */}
      <div className="hud-interface-layer">
        
        {/* لوحة الرصيد الذهبية (Top Right) */}
        <BalancePanel />

        {/* لوحة القطاع ومعلومات النظام (Bottom Left) */}
        <SectorInfo />

        {/* عنوان النظام العلوي (Header) */}
        <header className="network-header-hud">
          <h1 className="network-title">SYSTEM ACTIVE: NETWORK</h1>
          <div className="network-subtitle">Real-time Node Connectivity</div>
        </header>
        
        {/* عداد الـ Nodes التقني (Footer) */}
        <footer className="network-debug-footer-hud">
          <span className="debug-label">ACTIVE_NODES_IN_RANGE:</span> {nodes?.length || 0}
        </footer>
      </div>

    </div>
  );
};

export default NetworkPage;
