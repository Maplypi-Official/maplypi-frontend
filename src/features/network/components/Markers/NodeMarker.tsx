import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import './Markers.css';

/**
 * أيقونة العقدة: توهج ذهبي فخم يمثل النقاط النشطة في الشبكة.
 */
const NodeMarker: React.FC<{ position: [number, number], id: string }> = ({ position, id }) => {
  const nodeIcon = L.divIcon({
    className: 'custom-node-icon',
    html: `<div class="glow-gold-node"></div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7],
  });

  return (
    <Marker position={position} icon={nodeIcon}>
      <Popup className="tech-popup">NODE_ID: {id}</Popup>
    </Marker>
  );
};

export default NodeMarker;

