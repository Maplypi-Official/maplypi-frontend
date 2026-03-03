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

const NetworkPage: React.FC = () => {
  const { nodes, loading, userStats } = useNetworkSync();
  const { location: realLocation, error: gpsError } = useGPS();

  useEffect(() => {
    document.body.classList.add('network-scroll-lock');
    return () => {
      document.body.classList.remove('network-scroll-lock');
    };
  }, []);

  const currentUserLocation = realLocation || { 
    lat: userStats?.lat || 30.010, 
    lng: userStats?.lng || 31.230 
  };

  return (
    <div className="network-master-container network-scroll-lock">
      
      {/* 🏗️ الطبقة 1: الخلفية */}
      <TechOverlays />

      {/* 🗺️ الطبقة 2: الخريطة (خلفية تفاعلية) */}
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
           </div>
         )}
      </main>

      {/* 🛡️ الطبقة 3: واجهة الـ HUD + العناصر الجديدة (السيادة المطلقة) */}
      <div className="hud-interface-layer">
        
        {/* العناصر القديمة الموزعة */}
        <StatusIndicators />
        
        <BalancePanel 
          balance={userStats?.balance} 
          status={loading ? "SYNCING..." : "SECURE_SYNC_ACTIVE"} 
        />

        <SectorInfo 
          sectorName="MAIN_OPERATIONS_SECTOR"
          lat={currentUserLocation.lat}
          lng={currentUserLocation.lng}
        />

        <ActivityLog />

        {/* 📊 فوتر التصحيح - تم خفض الـ z-index ليسمح بظهور أزرار الخريطة */}
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
