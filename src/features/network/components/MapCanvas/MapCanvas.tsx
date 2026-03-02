import React, { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Pane, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { NetworkNode, UserLocation } from '../../types/network';
import './MapCanvas.css';

/**
 * 🖼️ استيراد الأيقونات الجديدة (Generated Assets)
 * تأكد من وضع الصور في هذا المسار بنفس الأسماء لضمان العمل الفوري
 */
import nodeStandardImg from '../../../../assets/images/markers/node-standard.png';
import nodePremiumImg from '../../../../assets/images/markers/node-premium.png';
import userLocationImg from '../../../../assets/images/markers/user-location.png';

/**
 * 🛠️ تهيئة الأيقونات المخصصة - النسخة المصغرة الاحترافية
 * تم تعديل المقاسات لتتناسب مع الـ HUD الجديد (40px للعادي، 60px للمتميز)
 */
const createIcon = (url: string, size: number, className: string) => L.divIcon({
  className: `pi-icon-div ${className}`,
  html: `<div class="pi-marker-content"><img src="${url}" alt="marker" /></div>`,
  iconSize: [size, size],
  iconAnchor: [size / 2, size] // جعل الارتكاز في القاعدة لضمان الدقة الجغرافية
});

// الأيقونات النهائية المعتمدة للتصميم الجديد
const standardPiIcon = createIcon(nodeStandardImg, 40, 'marker-standard-pi glow-blue');
const premiumPiIcon = createIcon(nodePremiumImg, 60, 'marker-premium-pi glow-gold');
const userLocIcon = createIcon(userLocationImg, 35, 'marker-user-location');

/**
 * 🛰️ مكون تحديث مركز الخريطة - يحافظ على سلاسة الحركة (Animation)
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
  
  // توزيع الدبابيس (Pins) - المخطط الستة المعتمد مع الأيقونات الجديدة
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
        dragging={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        attributionControl={false}
        className="leaflet-canvas-container"
        style={{ height: '100%', width: '100%', background: 'transparent' }}
      >
        <MapCenterUpdater center={[userLocation.lat, userLocation.lng]} />

        {/* طبقة الخريطة الداكنة (Dark Matter) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="dark-tile-layer"
        />

        {/* رسم الـ Pins - دمج الهوية البصرية مع البيانات المستلمة */}
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

        {/* موقع المستخدم الحقيقي مع دائرة المدى الأرجوانية */}
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
