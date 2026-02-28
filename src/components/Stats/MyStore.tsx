import './MyStore.css';
import React from 'react';

interface Props { location: string; }
const MyStore: React.FC<Props> = ({ location }) => (
  <section className="ts-panel store-summary">
    <h3>MY STORE</h3>
    <div className="isometric-icon">🏪</div>
    <p className="loc-text">{location}</p>
  </section>
);
export default MyStore;
