import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import MapCanvas from './components/MapCanvas/MapCanvas';
import TechOverlays from './components/Overlays/TechOverlays';
import BalancePanel from './components/HUD/BalancePanel';
import SectorInfo from './components/HUD/SectorInfo';
// استدعاء الملف الموحد الجديد
import './styles/NetworkMaster.css';

/**
 * النسخة الاحترافية النهائية - الهيكل الطبقي (Layered Architecture)
 * محافظين على نفس الـ Props والدوال لضمان عدم كسر الربط مع الـ API
 */
const NetworkPage: React.FC = () => {
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-master-container">
      
      {/* 🏗️ الطبقة 1: الخلفية التقنية (Carbon + Scanlines) */}
      <TechOverlays />

      {/* 🗺️ الطبقة 2: الخريطة (Blueprint Style) */}
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

      {/* 🛡️ الطبقة 3: واجهة الـ HUD (تظهر فوق كل شيء) */}
      <div className="hud-interface-layer">
        <BalancePanel />
        <SectorInfo />

        <header className="network-header-hud">
          <h1 className="network-title">SYSTEM ACTIVE: NETWORK</h1>
          <div className="network-subtitle">Real-time Node Connectivity</div>
        </header>
        
        <footer className="network-debug-footer-hud">
          <span className="debug-label">ACTIVE_NODES_IN_RANGE:</span> {nodes?.length || 0}
        </footer>
      </div>

    </div>
  );
};

export default NetworkPage;
