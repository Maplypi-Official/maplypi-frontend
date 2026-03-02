import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import './Markers.css';

/**
 * 🟡 NodeMarker - النسخة الاحترافية النهائية
 * أيقونة العقدة: توهج ذهبي فخم يمثل النقاط النشطة في الشبكة.
 * تم الحفاظ على المسميات (position, id) لضمان التوافق 100% مع بيانات الباك أند.
 */
interface NodeMarkerProps {
  position: [number, number];
  id: string;
}

const NodeMarker: React.FC<NodeMarkerProps> = ({ position, id }) => {
  // تهيئة الأيقونة الذهبية المتوهجة
  const nodeIcon = L.divIcon({
    className: 'custom-node-icon-v3',
    html: `
      <div class="node-marker-wrapper">
        <div class="glow-gold-node"></div>
        <div class="node-inner-core"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <Marker position={position} icon={nodeIcon}>
      {/* البوب أب التقني بتصميم الـ HUD الموحد */}
      <Popup className="tech-popup-v3" closeButton={false}>
        <div className="popup-content-hud">
          <span className="popup-status-text">NODE_STATUS: ACTIVE</span>
          <div className="popup-divider"></div>
          <span className="popup-coord-text">NODE_ID: {id}</span>
          <span className="popup-coord-text">LAT: {position[0].toFixed(4)} | LNG: {position[1].toFixed(4)}</span>
        </div>
      </Popup>
    </Marker>
  );
};

export default NodeMarker;
