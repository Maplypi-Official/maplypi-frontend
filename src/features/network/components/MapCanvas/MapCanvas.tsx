import React, { useState } from 'react';
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
 * 🛰️ OriginNavigator - المحرك المسؤول عن العودة للمركز
 * تم فصل الواجهة عن المنطق لضمان ظهور الزر فوق الخريطة
 */
const OriginNavigatorLogic: React.FC<{ userCoords: [number, number] }> = ({ userCoords }) => {
  const map = useMap();
  
  // تعريف الدالة على نافذة المتصفح مؤقتاً لربطها بالزر الخارجي دون كسر الـ Scope
  (window as any).flyToOrigin = () => {
    map.flyTo(userCoords, 17, { animate: true, duration: 2.5 });
  };
  
  return null; 
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
  const [selectedDeal, setSelectedDeal] = useState<any>(null);

  const pinOrdering = [
    { type: standardPiIcon, label: 'UrbanMart Pi', price: 'π 12.50', deal: 'SALE', offset: [0.002, -0.004] },
    { type: premiumPiIcon, label: 'PREMIUM STORE', price: 'π 450.00', deal: 'HOT', offset: [0.0005, 0.0005] },
    { type: standardPiIcon, label: 'TechZone 314', price: 'π 89.99', deal: null, offset: [0.002, 0.004] },
  ];

  const userCoords: [number, number] = [userLocation.lat, userLocation.lng];

  return (
    <div className="map-canvas-wrapper pixelated-map">
      {/* حاوية الخريطة الأساسية */}
      <LeafletMap 
        center={userCoords} 
        zoom={15} 
        zoomControl={false}
        dragging={true}
        scrollWheelZoom={false}
        attributionControl={false}
        className="leaflet-canvas-container"
      >
        <OriginNavigatorLogic userCoords={userCoords} />

        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {/* رسم الـ Pins */}
        {pinOrdering.map((pin, index) => (
          <Marker 
            key={index} 
            position={[userCoords[0] + pin.offset[0], userCoords[1] + pin.offset[1]]} 
            icon={pin.type}
            eventHandlers={{ click: () => setSelectedDeal(pin) }}
          >
            {pin.label && (
              <Pane name={`pane-${index}`} style={{ zIndex: 1000 }}>
                  <div className={`pin-label-v3 ${pin.deal ? 'active-deal' : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <span className="pin-label-text">{pin.label}</span>
                      {pin.deal && <span className="flash-deal-badge">{pin.deal}</span>}
                    </div>
                    <div className="pin-deal-tag"><span>{pin.price}</span></div>
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

      {/* 🚀 الطبقة العلوية الثابتة (Fixed Overlay) - تظهر فوق كل شيء */}
      <div className="map-ui-fixed-layer">
        
        {/* زر العودة للمركز - تم إخراجه لضمان الظهور */}
        <div className="origin-locator-btn gold-glow-border" onClick={() => (window as any).flyToOrigin()}>
          <div className="origin-pulse"></div>
          <i className="fas fa-crosshairs"></i>
          <span className="origin-tooltip">MY ORIGIN</span>
        </div>

        {/* الـ Mini-Popup الفخمة */}
        {selectedDeal && (
          <div className="deal-popup-overlay" onClick={() => setSelectedDeal(null)}>
            <div className="deal-popup-card glass-panel-v3 gold-glow-border" onClick={(e) => e.stopPropagation()}>
              <div className="deal-image-container">
                <img src={nodePremiumImg} alt="Product" />
                <div className="deal-timer">04:59:59</div>
              </div>
              <div className="deal-details">
                <h3>{selectedDeal.label}</h3>
                <div className="deal-footer">
                  <div className="price-box">
                    <span className="new-price">{selectedDeal.price}</span>
                  </div>
                  <button className="buy-btn-v3">ACQUIRE</button>
                </div>
              </div>
              <button className="close-deal-btn" onClick={() => setSelectedDeal(null)}>×</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapCanvas;
