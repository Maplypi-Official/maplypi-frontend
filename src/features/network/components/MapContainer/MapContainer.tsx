import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, Pane } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { NetworkNode, UserLocation } from '../../types/network';
import './MapContainer.css';

/**
 * 🛠️ تهيئة الأيقونات المخصصة لتطابق مظهر الـ Pins في الصورة بأسلوب أسطوري
 * تم تحويل الأيقونات إلى L.divIcon لتتمكن من إضافة الوهج (Glow) والنصوص.
 */

// أيقونة Pi Network المعيارية (زرقاء متوهجة) - كما في الصورة تماماً
const standardPiIcon = L.divIcon({
  className: 'pi-icon-div marker-standard-pi glow-blue',
  html: `<div class="pi-marker-content"><img src="/src/assets/logo3.png" alt="Pi" /></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20] // نقطة الارتكاز في المنتصف
});

// أيقونة Pi Network المميزة (ذهبية متوهجة) - للفخامة والاحترافية
const premiumPiIcon = L.divIcon({
  className: 'pi-icon-div marker-premium-pi glow-gold',
  html: `<div class="pi-marker-content"><img src="/src/assets/logo3.png" alt="Pi" /></div>`,
  iconSize: [60, 60],
  iconAnchor: [30, 30] // نقطة الارتكاز في المنتصف
});

// أيقونة موقع المستخدم
const userLocationIcon = L.divIcon({
  className: 'pi-icon-div marker-user-location',
  html: `<div class="user-location-content"><img src="/src/assets/user-location1.png" alt="Me" /></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

interface MapContainerProps {
  sectorName?: string;
  userLocation: UserLocation;
  nodes: NetworkNode[];
}

const MapContainer: React.FC<MapContainerProps> = ({ sectorName, userLocation, nodes }) => {
  const displaySector = sectorName || "Cairo Citadel Sector";

  /**
   * صمام أمان: ترتيبPins يدوياً بناءً على الصورة المرجعية.
   * في الـ MVP، سنضع هذه الإحداثيات يدوياً لضمان التطابق التام، 
   * ولكن لاحقاً ستأتي ديناميكياً من الباك أند.
   */
  const pinOrdering = [
    // UrbanMart Pi (Standard) - أعلى اليسار
    { type: standardPiIcon, label: 'UrbanMart Pi', subLabel: 'Checking-in... [50m]', offset: [0.002, -0.004] },
    // عقدة زرقاء صغيرة تملأ الخريطة
    { type: standardPiIcon, offset: [0.004, -0.001] },
    // العقدة الذهبية المركزية الرئيسية
    { type: premiumPiIcon, offset: [0, 0] },
    // عقدة زرقاء صغيرة أخرى
    { type: standardPiIcon, label: 'Checking-in', offset: [-0.003, 0.003] },
    // عقدة زرقاء صغيرة تملأ الخريطة
    { type: standardPiIcon, offset: [-0.001, 0.005] },
    // TechZone 314 (Premium) - أسفل اليمين
    { type: premiumPiIcon, label: 'TechZone 314', subLabel: 'PREMIUM', offset: [0.002, 0.004] },
  ];

  return (
    <div className="map-wrapper main-matrix-v2 pixelated-map">
      {/* حاوية الخريطة الرئيسية - تعمل فوراً بدون توكن أو فيزا */}
      <LeafletMap 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={14} 
        zoomControl={false}
        attributionControl={false}
        className="leaflet-canvas-container"
        style={{ height: '100%', width: '100%', background: '#0d081d' }}
      >
        {/* ستايل الخريطة المظلم (Dark Matter) بدون توكن - كأساس حقيقي */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="dark-tile-layer" // كلاس لتطبيق فلاتر CSS في ملف CSS
        />

        {/* رسم العقد (Nodes) بناءً على الترتيب من الصورة لضمان التطابق البصري */}
        {pinOrdering.map((pin, index) => {
          const lat = userLocation.lat + (pin.offset[0] || 0);
          const lng = userLocation.lng + (pin.offset[1] || 0);
          
          return (
            <Marker key={index} position={[lat, lng]} icon={pin.type}>
              <Pane name={`pane-${index}`}>
                  {/* حاوية النصوص الخاصة بالـ Pin لتظهر فوق الأيقونة */}
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

        {/* موقع المستخدم - يجب أن يكون له pane خاصة لتظهر الأيقونة فوق الدائرة */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userLocationIcon}>
            <Pane name="user-pane">
              {/* تصميم دائرة البحث للمستخدم */}
              <div className="range-circle-v2"></div>
              <div className="search-range-tag">Search Range: 1km</div>
            </Pane>
        </Marker>
      </LeafletMap>

      {/* 1. طبقات التصميم الجمالية فوق الخريطة - لإعطاء المظهر الشبكي */}
      <div className="hex-bg"></div>
      <div className="map-grid-lines"></div>
      
      {/* 2. واجهة الرصيد والمستوى العلوية - ثابتة فوق الخريطة */}
      <div className="map-ui-overlay top-right-panel">
        <p className="ui-bal-label">MY PI BALANCE:</p>
        <p className="ui-bal-value">{userLocation.balance.toFixed(2)} π</p>
        <p className="ui-lvl-label">LEVEL: {userLocation.level}</p>
      </div>

      {/* 3. خط المسح الراداري الأسطوري */}
      <div className="scan-line-v2"></div>
      
      {/* 4. لوحة المعلومات السفلية */}
      <div className="node-label-v2">
        <span className="sync-text">SCANNING:</span> {displaySector}
      </div>
    </div>
  );
};

export default MapContainer;
