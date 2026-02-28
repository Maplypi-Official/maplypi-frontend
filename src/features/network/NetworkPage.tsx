import React from 'react';
import StatsBoard from './components/StatsBoard/StatsBoard';
import MapContainer from './components/MapContainer/MapContainer';
import ActivityLog from './components/ActivityLog/ActivityLog';

const NetworkPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', background: '#0a0516', minHeight: '100vh', color: 'white' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#eab308', fontSize: '24px', fontWeight: 'bold' }}>Maplypi Matrix</h1>
        <p style={{ color: '#94a3b8', fontSize: '12px', letterSpacing: '1px' }}>Global Decentralized Grid</p>
      </header>
      
      <StatsBoard />
      <MapContainer />
      <ActivityLog />
    </div>
  );
};

export default NetworkPage;
