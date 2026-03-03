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
 * 🛰️ NetworkPage - النسخة النهائية المفلترة
 * تم حذف الهيدر التقني المركزي لإعطاء مساحة رؤية كاملة للخريطة.
 * تم الحفاظ على منطق الـ Scroll Lock لضمان ثبات الواجهة.
 */
const NetworkPage: React.FC = () => {
  // 1. جلب بيانات الشبكة من الباك أند (محافظين على المسميات)
  const { nodes, loading, userStats } = useNetworkSync();
  
  // 2. جلب الموقع الحقيقي من GPS الجهاز
  const { location: realLocation, error: gpsError } = useGPS();

  // 3. 🔒 منطق التحكم في السكرول لمنع كسر باقي الصفحات
  useEffect(() => {
    document.body.classList.add('network-scroll-lock');
    
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

      {/* 🛡️ الطبقة 3: واجهة الـ HUD (اللوحات الموزعة في الأركان) */}
      <div className="hud-interface-layer">
        
        {/* أعلى اليسار: مؤشرات الحالة (Status) */}
        <StatusIndicators />

        {/* أعلى اليمين: الرصيد (Credits) */}
        <BalancePanel 
          balance={userStats?.balance} 
          status={loading ? "SYNCING..." : "SECURE_SYNC_ACTIVE"} 
        />

        {/* أسفل اليسار: معلومات الموقع (Target Loc) */}
        <SectorInfo 
          sectorName="MAIN_OPERATIONS_SECTOR"
          lat={currentUserLocation.lat}
          lng={currentUserLocation.lng}
        />

        {/* أسفل اليمين: سجل النشاط (Activity Feed) */}
        <ActivityLog />

        {/* ❌ تم حذف الـ Header التقني من هنا نهائياً بناءً على طلبك */}
        
        {/* 📊 فوتر بيانات التصحيح (Debug Info) مدمج في أسفل الشاشة */}
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
