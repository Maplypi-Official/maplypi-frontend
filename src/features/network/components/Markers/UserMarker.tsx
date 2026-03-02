import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import './Markers.css';

/**
 * أيقونة المستخدم: نبض أزرق تقني يحدد موقع المحطة الحالية.
 */
const UserMarker: React.FC<{ position: [number, number] }> = ({ position }) => {
  const userIcon = L.divIcon({
    className: 'custom-user-icon',
    html: `<div class="pulse-blue"></div><div class="core-blue"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <Marker position={position} icon={userIcon}>
      <Popup className="tech-popup">YOUR_STATION_ACTIVE</Popup>
    </Marker>
  );
};

export default UserMarker;

