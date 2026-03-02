import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Pane } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// ✅ تأمين استيراد الأنواع لضمان عدم انهيار الشاشة
import type { NetworkNode, UserLocation } from '../../types/network';
import './MapContainer.css';

// استيراد الصور كـ Modules لضمان عملها في المتصفح والـ Pi Browser
import piLogo from '../../../../assets/logo3.png';
import userLocImg from '../../../../assets/user-location1.png';

/**
 * 🛠️ تهيئة الأيقونات المخصصة - تم تكبير الأحجام لتطابق التصميم
 */

// أيقونة Pi Network المعيارية (زرقاء متوهجة)
const standardPiIcon = L.divIcon({
  className: 'pi-icon-div marker-standard-pi glow-blue',
  html: `<div class="pi-marker-content"><img src="${piLogo}" alt="Pi" /></div>`,
  iconSize: [50, 50], 
  iconAnchor: [25, 25]
});

// أيقونة Pi Network المميزة (ذهبية متوهجة ضخمة)
const premiumPiIcon = L.divIcon({
  className: 'pi-icon-div marker-premium-pi glow-gold',
  html: `<div class="pi-marker-content"><img src="${piLogo}" alt="Pi" /></div>`,
  iconSize: [80, 80], 
  iconAnchor: [40, 40]
});

// أيقونة موقع المستخدم
const userLocationIcon = L.divIcon({
  className: 'pi-icon-div marker-user-location',
  html: `<div class="user-location-content"><img src="${userLocImg}" alt="Me" /></div>`,
  iconSize: [45, 45],
  iconAnchor: [22, 22]
});

interface MapContainerProps {
  sectorName?: string;
  userLocation: UserLocation;
  nodes: NetworkNode[];
}

const MapContainer: React.FC<MapContainerProps> = ({ sectorName, userLocation, nodes }) => {
  const displaySector = sectorName || "Cairo Citadel Sector";

  // ترتيب الـ Pins حول موقع المستخدم لمحاكاة الشبكة الحية كما في الصورة Target
  const pinOrdering = [
    { type: standardPiIcon, label: 'UrbanMart Pi', subLabel: 'Checking-in... [50m]', offset: [0.002, -0.004] },
    { type: standardPiIcon, offset: [0.004, -0.001] },
    { type: premiumPiIcon, offset: [0, 0] },
    { type: standardPiIcon, label: 'Checking-in', offset: [-0.003, 0.003] },
    { type: standardPiIcon, offset: [-0.001, 0.005] },
    { type: premiumPiIcon, label: 'TechZone 314', subLabel: 'PREMIUM', offset: [0.002, 0.004] },
  ];

  return (
    <div className="map-wrapper main-matrix-v2 pixelated-map full-viewport-map">
      <LeafletMap 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={15} 
        zoomControl={false}
        attributionControl={false}
        className="leaflet-canvas-container"
        style={{ height: '100%', width: '100%', background: '#0d081d' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="dark-tile-layer"
        />

        {pinOrdering.map((pin, index) => {
          const lat = userLocation.lat + (pin.offset[0] || 0);
          const lng = userLocation.lng + (pin.offset[1] || 0);
          
          return (
            <Marker key={index} position={[lat, lng]} icon={pin.type}>
              <Pane name={`pane-${index}`} style={{ zIndex: 1000 }}>
                  {pin.label && (
                    <div className="pin-label-v2">
                      <span className="pin-label-text">{pin.label}</span>
                      {pin.subLabel && <span className="pin-sublabel-text">{pin.subLabel}</span>}
                    </div>
                  )}
              </Pane>
            </Marker>
          );
        })}

        <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
            <Pane name="user-pane" style={{ zIndex: 1001 }}>
              <div className="range-circle-v2"></div>
              <div className="search-range-tag">Search Range: 1km</div>
            </Pane>
        </Marker>
      </LeafletMap>

      {/* واجهات الـ Matrix الفخمة */}
      <div className="matrix-overlay-elements">
        <div className="hex-bg"></div>
        <div className="map-grid-lines"></div>
        <div className="scan-line-v2"></div>
        
        <div className="map-ui-overlay top-right-panel">
          <p className="ui-bal-label">MY PI BALANCE:</p>
          <p className="ui-bal-value">{userLocation.balance.toFixed(2)} π</p>
          <p className="ui-lvl-label">LEVEL: {userLocation.level}</p>
        </div>

        <div className="node-label-v2">
          <span className="sync-text">SCANNING:</span> {displaySector}
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
