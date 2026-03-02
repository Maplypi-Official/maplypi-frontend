import React, { useEffect, useRef } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Pane, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { NetworkNode, UserLocation } from '../../types/network';
import './MapCanvas.css';

// استيراد الأيقونات (محافظين على المسارات الأصلية لضمان عدم كسر التطبيق)
import piLogo from '../../../../assets/logo3.png';
import userLocImg from '../../../../assets/user-location1.png';

/**
 * 🛠️ تهيئة الأيقونات المخصصة - دالة اليونيفرسال لمنع التمطيط وضمان الفخامة
 */
const createIcon = (url: string, size: number, className: string) => L.divIcon({
  className: `pi-icon-div ${className}`,
  html: `<div class="pi-marker-content pulse-marker"><img src="${url}" style="width:100%; height:100%; object-fit:contain;" alt="marker" /></div>`,
  iconSize: [size, size],
  iconAnchor: [size / 2, size / 2]
});

const standardPiIcon = createIcon(piLogo, 50, 'marker-standard-pi glow-blue');
const premiumPiIcon = createIcon(piLogo, 80, 'marker-premium-pi glow-gold');
const userLocationIcon = createIcon(userLocImg, 45, 'marker-user-location');

/**
 * 🛰️ مكون داخلي لتحديث مركز الخريطة تلقائياً عند تغير موقع المستخدم (GPS)
 */
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
  
  // توزيع الدبابيس (Pins) - المخطط الستة (Original 6-Point Layout)
  const pinOrdering = [
    { type: standardPiIcon, label: 'UrbanMart Pi', subLabel: 'Checking-in... [50m]', offset: [0.002, -0.004] },
    { type: standardPiIcon, label: '', subLabel: '', offset: [0.004, -0.001] },
    { type: premiumPiIcon, label: 'PREMIUM NODE', subLabel: 'Active', offset: [0.0005, 0.0005] },
    { type: standardPiIcon, label: 'Checking-in', offset: [-0.003, 0.003] },
    { type: standardPiIcon, label: '', offset: [-0.001, 0.005] },
    { type: premiumPiIcon, label: 'TechZone 314', subLabel: 'PREMIUM', offset: [0.002, 0.004] },
  ];

  return (
    <div className="map-canvas-wrapper pixelated-map">
      <LeafletMap 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={15} 
        zoomControl={false}
        dragging={true} // مسموح بالسحب للتصفح
        scrollWheelZoom={false} // منع الزوم بالماوس لعدم تشتيت الـ HUD
        doubleClickZoom={false}
        attributionControl={false}
        className="leaflet-canvas-container"
        style={{ height: '100%', width: '100%', background: 'transparent' }}
      >
        {/* تحديث المركز بناءً على الـ GPS الحقيقي */}
        <MapCenterUpdater center={[userLocation.lat, userLocation.lng]} />

        {/* الطبقة الداكنة الفخمة للخريطة */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="dark-tile-layer"
        />

        {/* رسم الـ Pins بناءً على التوزيعة الأسطورية المعتمدة */}
        {pinOrdering.map((pin, index) => {
          const lat = userLocation.lat + (pin.offset[0] || 0);
          const lng = userLocation.lng + (pin.offset[1] || 0);
          
          return (
            <Marker key={index} position={[lat, lng]} icon={pin.type}>
              {pin.label && (
                <Pane name={`pane-${index}`} style={{ zIndex: 1000 }}>
                    <div className="pin-label-v3">
                      <span className="pin-label-text">{pin.label}</span>
                      {pin.subLabel && <span className="pin-sublabel-text">{pin.subLabel}</span>}
                    </div>
                </Pane>
              )}
            </Marker>
          );
        })}

        {/* موقع المستخدم الحقيقي مع دائرة المدى (Search Range) */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
            <Pane name="user-pane" style={{ zIndex: 1001 }}>
              <div className="range-circle-v3 pulse-range"></div>
            </Pane>
        </Marker>
      </LeafletMap>
    </div>
  );
};

export default MapCanvas;
