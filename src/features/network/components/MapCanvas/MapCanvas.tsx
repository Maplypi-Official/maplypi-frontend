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
 * 🛰️ OriginNavigator - المحرك المسؤول عن العودة للمركز بنمط سينمائي
 */
const OriginNavigator: React.FC<{ userCoords: [number, number] }> = ({ userCoords }) => {
  const map = useMap();

  const handleBackToOrigin = () => {
    map.flyTo(userCoords, 17, {
      animate: true,
      duration: 2.5, // حركة انسيابية فخمة
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
  // حالة التحكم في الـ Popup المختارة للعروض
  const [selectedDeal, setSelectedDeal] = useState<any>(null);

  // مصفوفة البيانات التجريبية (يمكنك ربطها بالـ nodes القادمة من الـ Backend لاحقاً)
  const pinOrdering = [
    { type: standardPiIcon, label: 'UrbanMart Pi', price: 'π 12.50', deal: 'SALE', offset: [0.002, -0.004] },
    { type: premiumPiIcon, label: 'PREMIUM STORE', price: 'π 450.00', deal: 'HOT', offset: [0.0005, 0.0005] },
    { type: standardPiIcon, label: 'TechZone 314', price: 'π 89.99', deal: null, offset: [0.002, 0.004] },
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
        {/* 🚀 الزر الأسطوري للعودة للمركز */}
        <OriginNavigator userCoords={userCoords} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="dark-tile-layer"
        />

        {/* 📍 رسم نقاط الشبكة (المتاجر والصفقات) */}
        {pinOrdering.map((pin, index) => (
          <Marker 
            key={index} 
            position={[userCoords[0] + pin.offset[0], userCoords[1] + pin.offset[1]]} 
            icon={pin.type}
            eventHandlers={{
              click: () => setSelectedDeal(pin), // فتح الـ Mini-Popup عند الضغط
            }}
          >
            {pin.label && (
              <Pane name={`pane-${index}`} style={{ zIndex: 1000 }}>
                  <div className={`pin-label-v3 ${pin.deal ? 'active-deal' : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <span className="pin-label-text">{pin.label}</span>
                      {pin.deal && <span className="flash-deal-badge">{pin.deal}</span>}
                    </div>
                    <div className="pin-deal-tag">
                      <i className="fas fa-tag" style={{ fontSize: '8px' }}></i>
                      <span>{pin.price}</span>
                    </div>
                  </div>
              </Pane>
            )}
          </Marker>
        ))}

        {/* 👤 علامة موقع المستخدم ودائرة النفوذ */}
        <Marker position={userCoords} icon={userLocIcon}>
            <Pane name="user-pane" style={{ zIndex: 1001 }}>
              <div className="range-circle-v3"></div>
            </Pane>
        </Marker>

        {/* 🛍️ الـ Mini-Popup الفخمة (The Smart Deal Card) */}
        {selectedDeal && (
          <div className="deal-popup-overlay" onClick={() => setSelectedDeal(null)}>
            <div className="deal-popup-card glass-panel-v3 gold-glow-border" onClick={(e) => e.stopPropagation()}>
              <div className="deal-image-container">
                {/* هنا تضع صورة المنتج، نستخدم اللوجو كبديل مؤقت */}
                <img src={nodePremiumImg} alt="Product" />
                <div className="deal-timer">EXPIRES IN 04:59</div>
              </div>
              <div className="deal-details">
                <h3>{selectedDeal.label}</h3>
                <p>Limited business opportunity in your sector.</p>
                <div className="deal-footer">
                  <div className="price-box">
                    <span className="new-price">{selectedDeal.price}</span>
                  </div>
                  <button className="buy-btn-v3" onClick={() => alert('Proceeding to Transaction...')}>
                    ACQUIRE
                  </button>
                </div>
              </div>
              <button className="close-deal-btn" onClick={() => setSelectedDeal(null)}>×</button>
            </div>
          </div>
        )}
      </LeafletMap>
    </div>
  );
};

export default MapCanvas;
