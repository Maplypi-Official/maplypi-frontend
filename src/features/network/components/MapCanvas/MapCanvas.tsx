import React, { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Pane, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { NetworkNode, UserLocation } from '../../types/network';
import './MapCanvas.css';

// استيراد الأيقونات من المسار المخصص للـ Markers
import nodeStandardImg from '../../../../assets/images/markers/node-standard.png';
import nodePremiumImg from '../../../../assets/images/markers/node-premium.png';
import userLocationImg from '../../../../assets/images/markers/user-location.png';

/**
 * 🛠️ تهيئة الأيقونات المخصصة - ضبط الـ Anchor لمنع الطفو
 */
const createIcon = (url: string, size: number, className: string) => L.divIcon({
  className: `pi-icon-div ${className}`,
  html: `<div class="pi-marker-content"><img src="${url}" alt="marker" /></div>`,
  iconSize: [size, size],
  // [size / 2, size] تعني أن نقطة الارتكاز هي أسفل منتصف الأيقونة بالضبط
  iconAnchor: [size / 2, size] 
});

// أحجام مدروسة للأيقونات لتناسب شاشات الموبايل (أصغر قليلاً لمنع التزاحم)
const standardPiIcon = createIcon(nodeStandardImg, 38, 'marker-standard-pi glow-blue');
const premiumPiIcon = createIcon(nodePremiumImg, 58, 'marker-premium-pi glow-gold');
const userLocIcon = createIcon(userLocationImg, 32, 'marker-user-location');

const MapCenterUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
};

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

  return (
    <div className="map-canvas-wrapper pixelated-map">
      <LeafletMap 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={15} 
        zoomControl={false}
        dragging={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={true} // السماح بالزوم باللمس
        attributionControl={false}
        className="leaflet-canvas-container"
      >
        <MapCenterUpdater center={[userLocation.lat, userLocation.lng]} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="dark-tile-layer"
        />

        {pinOrdering.map((pin, index) => (
          <Marker key={index} position={[userLocation.lat + pin.offset[0], userLocation.lng + pin.offset[1]]} icon={pin.type}>
            {pin.label && (
              <Pane name={`pane-${index}`} style={{ zIndex: 1000 }}>
                  <div className="pin-label-v3">
                    <span className="pin-label-text">{pin.label}</span>
                  </div>
              </Pane>
            )}
          </Marker>
        ))}

        <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocIcon}>
            <Pane name="user-pane" style={{ zIndex: 1001 }}>
              <div className="range-circle-v3"></div>
            </Pane>
        </Marker>
      </LeafletMap>
    </div>
  );
};

export default MapCanvas;
