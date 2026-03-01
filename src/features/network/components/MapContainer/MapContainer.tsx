import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NetworkNode, UserLocation } from '../../types/network';
import './MapContainer.css';

// تأكد من وضع التوكن الخاص بك هنا
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

interface MapContainerProps {
  sectorName?: string;
  userLocation: UserLocation;
  nodes: NetworkNode[];
}

const MapContainer: React.FC<MapContainerProps> = ({ sectorName, userLocation, nodes }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const displaySector = sectorName || "Cairo Citadel Sector";

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // تهيئة خريطة Mapbox في الخلفية
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1', 
      center: [userLocation.lng, userLocation.lat],
      zoom: 14,
      pitch: 45,
      interactive: true // السماح للمستخدم بالتحريك
    });

    // إضافة ماركرات العقد ديناميكياً بناءً على البيانات
    mapRef.current.on('load', () => {
      nodes.forEach(node => {
        const el = document.createElement('div');
        el.className = `map-pin ${node.tier === 'Premium' ? 'glow-gold' : 'glow-blue'}`;
        // استخدام الأيقونات الأصلية من مشروعك
        const iconPath = node.tier === 'Premium' ? '/src/assets/pin-premium1.png' : '/src/assets/pin-standard1.png';
        el.style.backgroundImage = `url(${iconPath})`;
        el.style.width = node.tier === 'Premium' ? '50px' : '25px';
        el.style.height = '50px';
        el.style.backgroundSize = 'contain';
        el.style.backgroundRepeat = 'no-repeat';

        new mapboxgl.Marker(el)
          .setLngLat([node.lng, node.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<b>${node.name}</b>`))
          .addTo(mapRef.current!);
      });
    });

    return () => mapRef.current?.remove();
  }, [userLocation, nodes]);

  return (
    <div className="map-wrapper main-matrix-v2">
      {/* حاوية Mapbox الفعلية */}
      <div ref={mapContainerRef} className="mapbox-canvas-container" />

      {/* 1. طبقات التصميم الجمالية فوق الخريطة */}
      <div className="hex-bg"></div>
      <div className="map-grid-lines"></div>
      
      {/* 2. واجهة الرصيد والمستوى - ثابتة فوق الخريطة */}
      <div className="map-ui-overlay top-right-panel">
        <p className="ui-bal-label">MY PI BALANCE:</p>
        <p className="ui-bal-value">{userLocation.balance} π</p>
        <p className="ui-lvl-label">LEVEL: {userLocation.level}</p>
      </div>

      {/* 3. موقع المستخدم - Marker ثابت في المنتصف أو يتحرك مع الخريطة */}
      <div className="marker-node pos-user-fixed">
        <div className="range-circle-v2"></div>
        <img src="/src/assets/user-location1.png" className="user-icon-v2" alt="Me" />
        <div className="search-range-tag">Search Range: {userLocation.searchRange}km</div>
      </div>

      {/* 4. خط المسح الراداري الأسطوري */}
      <div className="scan-line-v2"></div>
      
      {/* 5. لوحة المعلومات السفلية */}
      <div className="node-label-v2">
        <span className="sync-text">SCANNING:</span> {displaySector}
      </div>
    </div>
  );
};

export default MapContainer;
