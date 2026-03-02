import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import './Markers.css';

/**
 * 📡 UserMarker - النسخة النهائية الاحترافية
 * أيقونة المستخدم: نبض أزرق تقني (Cyber Pulse) يحدد موقع المحطة الحالية.
 * تم الحفاظ على المسميات والدوال لضمان التوافق التام مع الـ Backend والـ Frontend.
 */
const UserMarker: React.FC<{ position: [number, number] }> = ({ position }) => {
  
  // تهيئة الأيقونة باستخدام DivIcon لضمان سلاسة الأنيميشن (CSS Animations)
  const userIcon = L.divIcon({
    className: 'custom-user-icon-v3',
    html: `
      <div class="user-marker-container">
        <div class="pulse-ring-blue"></div>
        <div class="pulse-ring-blue-outer"></div>
        <div class="core-blue-station"></div>
        <div class="scan-beam-effect"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <Marker position={position} icon={userIcon}>
      {/* البوب آب التقني بتصميم الـ HUD الموحد */}
      <Popup className="tech-popup-v3" closeButton={false}>
        <div className="popup-content-hud">
          <span className="popup-status-text">YOUR_STATION_ACTIVE</span>
          <div className="popup-divider"></div>
          <span className="popup-coord-text">LAT: {position[0].toFixed(4)} | LNG: {position[1].toFixed(4)}</span>
        </div>
      </Popup>
    </Marker>
  );
};

export default UserMarker;
