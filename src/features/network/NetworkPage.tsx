import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import { useGPS } from './hooks/useGPS'; // الربط مع موقع المستخدم الحقيقي
import MapCanvas from './components/MapCanvas/MapCanvas';
import TechOverlays from './components/Overlays/TechOverlays';
import BalancePanel from './components/HUD/BalancePanel';
import SectorInfo from './components/HUD/SectorInfo';
import StatusIndicators from './components/HUD/StatusIndicators'; // إضافة المؤشرات الجديدة
import ActivityLog from './components/ActivityLog/ActivityLog';
import './styles/NetworkMaster.css';

/**
 * 🛰️ NetworkPage - النسخة الأسطورية الكاملة (Final Production)
 * تجمع بين الخريطة الحقيقية، طبقات الكربون فايبر، ولوحات الـ HUD الموزعة في الأركان.
 * الهيكل الطبقي يضمن الفخامة والوضوح كما في مراجع التصميم المعتمدة.
 */
const NetworkPage: React.FC = () => {
  // 1. جلب بيانات الشبكة والعقد من الباك أند
  const { nodes, loading, userStats } = useNetworkSync();
  
  // 2. جلب الموقع الحقيقي من GPS الجهاز (للملاحة الحية)
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

      {/* 🗺️ الطبقة 2: الخريطة بنظام الدمج (Map Layer) */}
      <main className="map-layer-container">
         {userStats || realLocation ? (
           <MapCanvas 
             sectorName="MAIN_OPERATIONS_SECTOR" 
             userLocation={{
               ...currentUserLocation,
               balance: userStats?.balance || 0,
               level: userStats?.level || 14, // الحفاظ على المستوى الحالي
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

      {/* 🛡️ الطبقة 3: واجهة الـ HUD المتكاملة (الأركان الأربعة) */}
      <div className="hud-interface-layer">
        
        {/* أعلى اليسار: مؤشرات النظام (Connectivity & Power) */}
        <StatusIndicators />

        {/* أعلى اليمين: رصيد الـ Pi الذهبي */}
        <BalancePanel 
          balance={userStats?.balance} 
          status={loading ? "SYNCING_NODE..." : "SECURE_SYNC_ACTIVE"} 
        />

        {/* أسفل اليسار: معلومات القطاع والإحداثيات الحية */}
        <SectorInfo 
          sectorName="MAIN_OPERATIONS_SECTOR"
          lat={currentUserLocation.lat}
          lng={currentUserLocation.lng}
        />

        {/* أسفل اليمين: سجل النشاط المباشر (Activity Feed) */}
        <ActivityLog />

        {/* الهيدر التقني (HUD Title) */}
        <header className="network-header-hud">
          <div className="status-indicator-dot"></div>
          <h1 className="network-title">SYSTEM ACTIVE: NETWORK</h1>
          <div className="network-subtitle">Real-time Node Connectivity & Matrix</div>
        </header>
        
        {/* فوتر بيانات التصحيح (Debug Info) */}
        <footer className="network-debug-footer-hud">
          <div className="debug-group">
            <span className="debug-label">ACTIVE_NODES:</span> 
            <span className="debug-value">{nodes?.length || 0}</span>
          </div>
          <div className="debug-group" style={{ marginLeft: '20px' }}>
            <span className="debug-label">GPS_LOCK:</span> 
            <span className={`debug-value ${realLocation ? 'status-online' : 'status-offline'}`}>
              {realLocation ? 'LOCKED_ON' : 'SEARCHING...'}
            </span>
          </div>
        </footer>
      </div>

    </div>
  );
};

export default NetworkPage;
