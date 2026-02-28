import React from 'react';
import './MapContainer.css';

const MapContainer: React.FC = () => (
  <div className="map-wrapper">
    <div className="hex-bg"></div>
    <div className="pulse-center">
      <div className="pi-node">π</div>
      <div className="ring"></div>
    </div>
    <div className="scan-line"></div>
    <div className="node-label">Scanning Cairo Citadel Sector...</div>
  </div>
);
export default MapContainer;
