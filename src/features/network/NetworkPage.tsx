import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import MapCanvas from './components/MapCanvas/MapCanvas';
import TechOverlays from './components/Overlays/TechOverlays';
import BalancePanel from './components/HUD/BalancePanel';
import SectorInfo from './components/HUD/SectorInfo';
import ActivityLog from './components/ActivityLog/ActivityLog';
import './styles/NetworkMaster.css';

/**
 * 🛰️ NetworkPage - النسخة النهائية المستقرة (Production Ready)
 * الهيكل الطبقي (Layered Architecture) لضمان الفخامة وعدم التداخل.
 * تم التأكد من ربط كافة المكونات المضافة حديثاً ببيانات الـ Backend الحية.
 */
const NetworkPage: React.FC = () => {
  // استدعاء البيانات من الـ Hook (نفس المسميات لضمان عدم كسر الربط)
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-master-container">
      
      {/* 🏗️ الطبقة 1: الخلفية التقنية (Carbon Fiber & Scanlines) */}
      <TechOverlays />

      {/* 🗺️ الطبقة 2: الخريطة (Blueprint / Laser Style) */}
      <main className="map-layer-container">
         {userStats ? (
           <MapCanvas 
             sectorName="MAIN_OPERATIONS_SECTOR" 
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

      {/* 🛡️ الطبقة 3: واجهة الـ HUD (الطبقة العلوية التفاعلية) */}
      <div className="hud-interface-layer">
        
        {/* اللوحات الأساسية مع ربط البيانات الحقيقية من userStats */}
        <BalancePanel 
          balance={userStats?.balance} 
          status={loading ? "SYNCING_NODE..." : "SECURE_SYNC_ACTIVE"} 
        />

        <SectorInfo 
          sectorName="MAIN_OPERATIONS_SECTOR"
          lat={userStats?.lat}
          lng={userStats?.lng}
        />

        {/* سجل النشاط الحي (يظهر في الزاوية المخصصة له) */}
        <ActivityLog />

        {/* الهيدر التقني (HUD Title) */}
        <header className="network-header-hud">
          <div className="status-indicator"></div>
          <h1 className="network-title">SYSTEM ACTIVE: NETWORK</h1>
          <div className="network-subtitle">Real-time Node Connectivity & Matrix</div>
        </header>
        
        {/* فوتر بيانات التصحيح (Debug Info) */}
        <footer className="network-debug-footer-hud">
          <div className="debug-group">
            <span className="debug-label">ACTIVE_NODES_IN_RANGE:</span> 
            <span className="debug-value">{nodes?.length || 0}</span>
          </div>
          <div className="debug-group" style={{ marginLeft: '20px' }}>
            <span className="debug-label">LINK_STATUS:</span> 
            <span className="debug-value status-online">ENCRYPTED_LINK</span>
          </div>
        </footer>
      </div>

    </div>
  );
};

export default NetworkPage;
