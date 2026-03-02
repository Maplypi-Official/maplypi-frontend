import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapCanvas.css';

interface MapCanvasProps {
  sectorName: string;
  userLocation: { lat: number; lng: number };
  nodes: any[];
}

/**
 * مكون الخريطة الأساسي: يعرض البيانات الجغرافية بأسلوب رقمي (Matrix/Blueprint).
 * تم ضبطه ليكون شفافاً تماماً ليمرر خلفية الكربون فايبر.
 */
const MapCanvas: React.FC<MapCanvasProps> = ({ userLocation, nodes }) => {
  const position: [number, number] = [userLocation.lat, userLocation.lng];

  return (
    <div className="map-canvas-wrapper pixelated-map">
      <MapContainer 
        center={position} 
        zoom={13} 
        zoomControl={false} 
        className="leaflet-master-container"
      >
        {/* 🗺️ طبقة الخريطة - تم اختيار استايل داكن بسيط ليسهل دمج الفلاتر عليه */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap'
        />

        {/* 📍 هنا سيتم إضافة الـ Markers الذهبية والزرقاء لاحقاً */}
        <Marker position={position}>
          <Popup>YOUR_CURRENT_STATION</Popup>
        </Marker>

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default MapCanvas;

