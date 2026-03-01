import React, { useState, useEffect } from 'react';
import './MapContainer.css';

const MapContainer: React.FC<{ sectorName?: string }> = ({ sectorName }) => {
  // حالة افتراضية في حال لم يتم تمرير اسم القطاع من الباك أند
  const displaySector = sectorName || "Global Grid Sector";

  return (
    <div className="map-wrapper">
      {/* خلفية الشبكة السداسية - الهوية البصرية لـ Maplypi */}
      <div className="hex-bg"></div>
      
      {/* مركز النبض - يمثل نقطة تواجد المستخدم أو العقدة الرئيسية */}
      <div className="pulse-center">
        <div className="pi-node">π</div>
        <div className="ring"></div>
        <div className="ring-delayed"></div>
      </div>
      
      {/* خط المسح الراداري */}
      <div className="scan-line"></div>
      
      {/* تسمية الموقع الجغرافي - متصل بـ Geo-Location Logic */}
      <div className="node-label">
        <span style={{ color: '#eab308' }}>SYNCING:</span> {displaySector}
      </div>
    </div>
  );
};

export default MapContainer;
