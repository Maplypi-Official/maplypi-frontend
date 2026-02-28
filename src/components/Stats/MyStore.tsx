import React from 'react';
import './MyStore.css';

interface Props { 
  location: string; 
}

const MyStore: React.FC<Props> = ({ location }) => (
  <section className="ts-panel store-summary-compact">
    <div className="panel-header-simple">
      <h3 className="store-title">MY STORE</h3>
    </div>
    
    <div className="store-visual-container-compact">
      <div className="isometric-icon-mini">🏪</div>
      <div className="pulse-ring-mini"></div>
    </div>

    <div className="location-info-compact">
      <span className="geo-pin-mini">📍</span>
      <p className="loc-text-mini">{location}</p>
    </div>
  </section>
);

export default MyStore;
