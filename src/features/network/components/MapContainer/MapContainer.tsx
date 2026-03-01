import React from 'react';
import './MapContainer.css';

const MapContainer: React.FC<{ sectorName?: string }> = ({ sectorName }) => {
  const displaySector = sectorName || "Cairo Citadel Sector";

  return (
    <div className="map-wrapper main-matrix-v2">
      {/* 1. شبكة الهيكساجون والخطوط الخلفية */}
      <div className="hex-bg"></div>
      <div className="map-grid-lines"></div>
      
      {/* 2. واجهة الرصيد والمستوى - الزاوية العلوية اليمنى */}
      <div className="map-ui-overlay top-right-panel">
        <p className="ui-bal-label">MY PI BALANCE:</p>
        <p className="ui-bal-value">125.75 π</p>
        <p className="ui-lvl-label">LEVEL: 14</p>
      </div>

      {/* 3. طبقة الأيقونات - توزيع طبق الأصل من الصورة */}
      <div className="markers-layer">
        
        {/* العقدة الذهبية الرئيسية (المركزية) */}
        <div className="marker-node pos-center">
          <img src="/src/assets/pin-premium1.png" className="map-pin glow-gold main-pi" alt="Main" />
        </div>

        {/* TechZone 314 (Premium) - أعلى اليمين */}
        <div className="marker-node pos-techzone">
          <img src="/src/assets/pin-premium1.png" className="map-pin glow-gold" alt="Premium" />
          <span className="pin-label">TechZone 314</span>
        </div>

        {/* UrbanMart Pi (Standard) - منتصف اليسار */}
        <div className="marker-node pos-urbanmart">
          <img src="/src/assets/pin-standard1.png" className="map-pin glow-blue" alt="Standard" />
          <span className="pin-label">UrbanMart Pi</span>
          <span className="status-sub-label">Checking-in... [50m]</span>
        </div>

        {/* عقد إضافية صغيرة لتعبئة الخريطة كما في الصورة */}
        <div className="marker-node pos-extra-1"><img src="/src/assets/pin-standard1.png" className="pin-sm glow-blue" /></div>
        <div className="marker-node pos-extra-2"><img src="/src/assets/pin-standard1.png" className="pin-sm glow-blue" /></div>
        <div className="marker-node pos-extra-3">
            <img src="/src/assets/pin-standard1.png" className="pin-sm glow-blue" />
            <span className="pin-label-sm">Checking-in</span>
        </div>

        {/* موقع المستخدم - أسفل اليمين */}
        <div className="marker-node pos-user">
          <div className="range-circle-v2"></div>
          <img src="/src/assets/user-location1.png" className="user-icon-v2" alt="Me" />
          <div className="search-range-tag">Search Range: 1km</div>
        </div>
      </div>

      {/* 4. خط المسح الراداري */}
      <div className="scan-line-v2"></div>
      
      {/* 5. لوحة المعلومات السفلية */}
      <div className="node-label-v2">
        <span className="sync-text">SCANNING:</span> {displaySector}
      </div>
    </div>
  );
};

export default MapContainer;
