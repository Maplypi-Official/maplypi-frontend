
import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import MapCanvas from './components/MapCanvas/MapCanvas';
import TechOverlays from './components/Overlays/TechOverlays';
import BalancePanel from './components/HUD/BalancePanel';
import SectorInfo from './components/HUD/SectorInfo';
import ActivityLog from './components/ActivityLog/ActivityLog'; // إضافة سجل النشاط
import './styles/NetworkMaster.css';

/**
 * 🛰️ NetworkPage - النسخة النهائية المستقرة (Production Ready)
 * الهيكل الطبقي (Layered Architecture) لضمان الفخامة وعدم التداخل
 * تم الحفاظ على كافة الدوال والمسميات لضمان التوافق مع الـ Backend
 */
const NetworkPage: React.FC = () => {
  // استدعاء البيانات الحية من الـ Hook الأصلي
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
        
        {/* اللوحات الأساسية (أعلى اليمين وأسفل اليسار) */}
        <BalancePanel />
        <SectorInfo />

        {/* سجل النشاط الحي (أسفل اليمين - الزاوية الجديدة) */}
        <ActivityLog />

        {/* الهيدر التقني (HUD Title) */}
        <header className="network-header-hud">
          <h1 className="network-title">SYSTEM ACTIVE: NETWORK</h1>
          <div className="network-subtitle">Real-time Node Connectivity & Matrix</div>
        </header>
        
        {/* فوتر بيانات التصحيح (Debug Info) */}
        <footer className="network-debug-footer-hud">
          <span className="debug-label">ACTIVE_NODES_IN_RANGE:</span> {nodes?.length || 0}
          <span style={{ marginLeft: '15px' }} className="debug-label">LINK_STATUS:</span> 
          <span style={{ color: '#22c55e' }}> ENCRYPTED</span>
        </footer>
      </div>

    </div>
  );
};

export default NetworkPage;
