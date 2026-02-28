import React from 'react';
import './MyStore.css';

interface Props { 
  location: string; 
}

const MyStore: React.FC<Props> = ({ location }) => (
  <section className="ts-panel store-summary">
    <div className="panel-header-simple">
      <h3>MY STORE</h3>
    </div>
    
    <div className="store-visual-container">
      <div className="isometric-icon">🏪</div>
      <div className="pulse-ring"></div>
    </div>

    <div className="location-info">
      <span className="geo-pin">📍</span>
      <p className="loc-text">{location}</p>
    </div>
  </section>
);

export default MyStore;
