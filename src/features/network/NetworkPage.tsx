import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import { useGPS } from './hooks/useGPS'; 
import MapCanvas from './components/MapCanvas/MapCanvas';
import TechOverlays from './components/Overlays/TechOverlays';
import BalancePanel from './components/HUD/BalancePanel';
import SectorInfo from './components/HUD/SectorInfo';
import StatusIndicators from './components/HUD/StatusIndicators'; 
import ActivityLog from './components/ActivityLog/ActivityLog';
import './styles/NetworkMaster.css';

/**
 * 🛰️ NetworkPage - النسخة الأسطورية الكاملة (Final Zero-Scroll Edition)
 * تجمع بين الخريطة والـ HUD الموزع في الأركان الأربعة.
 * تم ضبط الهيكل ليكون ثابت (Fixed Viewport) لضمان عدم وجود سكرول نهائياً.
 */
const NetworkPage: React.FC = () => {
  // 1. جلب بيانات الشبكة والعقد من الباك أند (محافظين على نفس المسميات والـ Hooks)
  const { nodes, loading, userStats } = useNetworkSync();
  
  // 2. جلب الموقع الحقيقي من GPS الجهاز
  const { location: realLocation, error: gpsError } = useGPS();

  // تحديد الموقع النهائي (الأولوية للـ GPS الحقيقي لضمان الدقة)
  const currentUserLocation = realLocation || { 
    lat: userStats?.lat || 30.010, 
    lng: userStats?.lng || 31.230 
  };

  return (
    <div className="network-master-container">
      
      {/* 🏗️ الطبقة 1: الخلفية التقنية (Carbon Fiber & Scanlines) */}
      <TechOverlays />

      {/* 🗺️ الطبقة 2: الخريطة (Map Layer) - تمتد لكامل الشاشة خلف الـ HUD */}
      <main className="map-layer-container">
         {(userStats || realLocation) && !loading ? (
           <MapCanvas 
             sectorName="MAIN_OPERATIONS_SECTOR" 
             userLocation={{
               ...currentUserLocation,
               balance: userStats?.balance || 0,
               level: userStats?.level || 14,
               searchRange: userStats?.searchRange || 1
             }} 
             nodes={nodes} 
           />
         ) : (
           <div className="sync-loading-state">
              <div className="sync-loader"></div>
              <h2 className="sync-text pulse-text">
                {loading ? "ESTABLISHING NEURAL LINK..." : "WAITING FOR GPS SIGNAL..."}
              </h2>
              {gpsError && <p className="error-subtext">GPS_LINK_ERROR: {gpsError}</p>}
           </div>
         )}
      </main>

      {/* 🛡️ الطبقة 3: واجهة الـ HUD المتكاملة (أركان الشاشة الأربعة) */}
      {/* هذه الطبقة تعمل كـ Overlay ثابت لا يسمح بالتمرير */}
      <div className="hud-interface-layer">
        
        {/* أعلى اليسار (Top-Left): مؤشرات الحالة */}
        <StatusIndicators />

        {/* أعلى اليمين (Top-Right): الرصيد الذهبي */}
        <BalancePanel 
          balance={userStats?.balance} 
          status={loading ? "SYNCING_NODE..." : "SECURE_SYNC_ACTIVE"} 
        />

        {/* أسفل اليسار (Bottom-Left): معلومات القطاع (طائرة فوق الـ Navbar) */}
        <SectorInfo 
          sectorName="MAIN_OPERATIONS_SECTOR"
          lat={currentUserLocation.lat}
          lng={currentUserLocation.lng}
        />

        {/* أسفل اليمين (Bottom-Right): سجل النشاط (طائرة فوق الـ Navbar) */}
        <ActivityLog />

        {/* 📟 الهيدر التقني (HUD Title) - متمركز علوياً بدقة */}
        <header className="network-header-hud">
          <h1 className="network-title">MAPLY//SYSTEM_ACTIVE</h1>
          <div className="network-subtitle">GLOBAL NODE MATRIX v3.0</div>
        </header>
        
        {/* 📊 فوتر بيانات التصحيح (Debug Info) - مدمج مع حواف الشاشة السفلية */}
        <footer className="network-debug-footer-hud">
          <div className="debug-group">
            <span className="debug-label">NODES_ONLINE:</span> 
            <span className="debug-value">{nodes?.length || 0}</span>
          </div>
          <div className="debug-group" style={{ marginLeft: '12px' }}>
            <span className="debug-label">GPS_SIGNAL:</span> 
            <span className={`debug-value ${realLocation ? 'status-online' : 'status-offline'}`}>
              {realLocation ? 'LOCKED' : 'SEARCHING...'}
            </span>
          </div>
        </footer>
      </div>

    </div>
  );
};

export default NetworkPage;
