import React from 'react';
import './MapContainer.css';

const MapContainer: React.FC<{ sectorName?: string }> = ({ sectorName }) => {
  const displaySector = sectorName || "Cairo Citadel Sector";

  return (
    <div className="map-wrapper">
      {/* 1. شبكة الهيكساجون */}
      <div className="hex-bg"></div>
      
      {/* 2. واجهة الرصيد والمستوى - Glassmorphism UI */}
      <div className="map-ui-overlay">
        <p className="ui-bal-label">MY PI BALANCE:</p>
        <p className="ui-bal-value">125.75 π</p>
        <p className="ui-lvl-label">LEVEL: 14</p>
      </div>

      {/* 3. طبقة الأيقونات - محاكاة لتصميم الصورة */}
      <div className="markers-layer">
        {/* أيقونة بريميوم ذهبية */}
        <div className="marker-node" style={{ top: '30%', left: '70%' }}>
          <img src="/src/assets/pin-premium1.png" className="map-pin glow-gold" alt="Premium" />
          <span className="pin-label">TechZone 314</span>
        </div>

        {/* أيقونة ستاندرد زرقاء */}
        <div className="marker-node" style={{ top: '50%', left: '30%' }}>
          <img src="/src/assets/pin-standard1.png" className="map-pin glow-blue" alt="Standard" />
          <span className="pin-label">UrbanMart Pi</span>
        </div>

        {/* أيقونة موقع المستخدم */}
        <div className="marker-node" style={{ bottom: '20%', right: '20%' }}>
          <div className="range-circle" style={{ width: '120px', height: '120px', transform: 'translate(0, -35px)' }}></div>
          <img src="/src/assets/user-location1.png" style={{ width: '35px' }} alt="Me" />
          <span className="pin-label" style={{ fontSize: '8px', color: '#94a3b8' }}>Search Range: 1km</span>
        </div>
      </div>

      {/* 4. خط المسح */}
      <div className="scan-line"></div>
      
      {/* 5. تسمية القطاع */}
      <div className="node-label">
        <span style={{ color: '#eab308', fontWeight: 'bold' }}>SCANNING:</span> {displaySector}
      </div>
    </div>
  );
};

export default MapContainer;
