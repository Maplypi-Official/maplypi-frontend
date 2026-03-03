import React, { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Pane, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { NetworkNode, UserLocation } from '../../types/network';
import './MapCanvas.css';

// استيراد الأيقونات
import nodeStandardImg from '../../../../assets/images/markers/node-standard.png';
import nodePremiumImg from '../../../../assets/images/markers/node-premium.png';
import userLocationImg from '../../../../assets/images/markers/user-location.png';

/**
 * 🛰️ OriginNavigator - المحرك المسؤول عن العودة للمركز بنمط سينمائي
 */
const OriginNavigator: React.FC<{ userCoords: [number, number] }> = ({ userCoords }) => {
  const map = useMap();

  // هذه الدالة هي سر "سحق" المنافسين في تجربة المستخدم
  const handleBackToOrigin = () => {
    map.flyTo(userCoords, 17, {
      animate: true,
      duration: 2.5, // حركة بطيئة وفخمة تعطي هيبة للمكان
      easeLinearity: 0.1
    });
  };

  return (
    <div className="origin-locator-btn gold-glow-border" onClick={handleBackToOrigin}>
      <div className="origin-pulse"></div>
      <i className="fas fa-crosshairs"></i>
      <span className="origin-tooltip">MY ORIGIN</span>
    </div>
  );
};

/**
 * 🛠️ تهيئة الأيقونات المخصصة
 */
const createIcon = (url: string, size: number, className: string) => L.divIcon({
  className: `pi-icon-div ${className}`,
  html: `<div class="pi-marker-content"><img src="${url}" alt="marker" /></div>`,
  iconSize: [size, size],
  iconAnchor: [size / 2, size] 
});

const standardPiIcon = createIcon(nodeStandardImg, 38, 'marker-standard-pi glow-blue');
const premiumPiIcon = createIcon(nodePremiumImg, 58, 'marker-premium-pi glow-gold');
const userLocIcon = createIcon(userLocationImg, 32, 'marker-user-location');

interface MapCanvasProps {
  sectorName?: string;
  userLocation: UserLocation;
  nodes: NetworkNode[];
}

const MapCanvas: React.FC<MapCanvasProps> = ({ sectorName, userLocation, nodes }) => {
  
  const pinOrdering = [
    { type: standardPiIcon, label: 'UrbanMart Pi', offset: [0.002, -0.004] },
    { type: standardPiIcon, label: '', offset: [0.004, -0.001] },
    { type: premiumPiIcon, label: 'PREMIUM', offset: [0.0005, 0.0005] },
    { type: standardPiIcon, label: 'Checking-in', offset: [-0.003, 0.003] },
    { type: standardPiIcon, label: '', offset: [-0.001, 0.005] },
    { type: premiumPiIcon, label: 'TechZone 314', offset: [0.002, 0.004] },
  ];

  const userCoords: [number, number] = [userLocation.lat, userLocation.lng];

  return (
    <div className="map-canvas-wrapper pixelated-map">
      <LeafletMap 
        center={userCoords} 
        zoom={15} 
        zoomControl={false}
        dragging={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={true} 
        attributionControl={false}
        className="leaflet-canvas-container"
      >
        {/* 🚀 الزر الأسطوري للعودة للمركز (The Origin Button) */}
        <OriginNavigator userCoords={userCoords} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="dark-tile-layer"
        />

        {pinOrdering.map((pin, index) => (
          <Marker key={index} position={[userCoords[0] + pin.offset[0], userCoords[1] + pin.offset[1]]} icon={pin.type}>
            {pin.label && (
              <Pane name={`pane-${index}`} style={{ zIndex: 1000 }}>
                  <div className="pin-label-v3">
                    <span className="pin-label-text">{pin.label}</span>
                  </div>
              </Pane>
            )}
          </Marker>
        ))}

        <Marker position={userCoords} icon={userLocIcon}>
            <Pane name="user-pane" style={{ zIndex: 1001 }}>
              <div className="range-circle-v3"></div>
            </Pane>
        </Marker>
      </LeafletMap>
    </div>
  );
};

export default MapCanvas;
