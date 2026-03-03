import React, { useEffect } from 'react';
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
 * 🛰️ NetworkPage - النسخة الأسطورية (Zero-Scroll & UI Fix)
 * تم دمج منطق الـ Scroll Lock لضمان ثبات الواجهة ومنع اختفاء اللوحات السفلية.
 */
const NetworkPage: React.FC = () => {
  // 1. جلب بيانات الشبكة من الباك أند (بدون تغيير في المسميات)
  const { nodes, loading, userStats } = useNetworkSync();
  
  // 2. جلب الموقع الحقيقي
  const { location: realLocation, error: gpsError } = useGPS();

  // 3. 🔒 منطق التحكم في السكرول (برمجة ذكية لمنع كسر باقي الصفحات)
  useEffect(() => {
    // تفعيل قفل السكرول عند دخول صفحة الشبكة فقط
    document.body.classList.add('network-scroll-lock');
    
    // تنظيف (Cleanup) عند مغادرة الصفحة لفتح السكرول في Dashboard/Sell Item
    return () => {
      document.body.classList.remove('network-scroll-lock');
    };
  }, []);

  // تحديد الموقع الحالي (الأولوية للـ GPS)
  const currentUserLocation = realLocation || { 
    lat: userStats?.lat || 30.010, 
    lng: userStats?.lng || 31.230 
  };

  return (
    /* أضفنا الكلاس هنا لضمان الثبات المطلق داخل الحاوية */
    <div className="network-master-container network-scroll-lock">
      
      {/* 🏗️ الطبقة 1: الخلفية التقنية */}
      <TechOverlays />

      {/* 🗺️ الطبقة 2: الخريطة (Map Layer) */}
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

      {/* 🛡️ الطبقة 3: واجهة الـ HUD (اللوحات الموزعة) */}
      <div className="hud-interface-layer">
        
        {/* أعلى اليسار: مؤشرات الحالة */}
        <StatusIndicators />

        {/* أعلى اليمين: الرصيد */}
        <BalancePanel 
          balance={userStats?.balance} 
          status={loading ? "SYNCING..." : "SECURE_SYNC_ACTIVE"} 
        />

        {/* أسفل اليسار: معلومات القطاع (مرفوعة فوق الـ Navbar) */}
        <SectorInfo 
          sectorName="MAIN_OPERATIONS_SECTOR"
          lat={currentUserLocation.lat}
          lng={currentUserLocation.lng}
        />

        {/* أسفل اليمين: سجل النشاط (مرفوع فوق الـ Navbar) */}
        <ActivityLog />

        {/* 📟 الهيدر التقني */}
        <header className="network-header-hud">
          <h1 className="network-title">MAPLY//SYSTEM_ACTIVE</h1>
          <div className="network-subtitle">GLOBAL NODE MATRIX v3.0</div>
        </header>
        
        {/* 📊 فوتر بيانات التصحيح (Debug) */}
        <footer className="network-debug-footer-hud">
          <div className="debug-group">
            <span className="debug-label">NODES:</span> 
            <span className="debug-value">{nodes?.length || 0}</span>
          </div>
          <div className="debug-group" style={{ marginLeft: '12px' }}>
            <span className="debug-label">GPS:</span> 
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
