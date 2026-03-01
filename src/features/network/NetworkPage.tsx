import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import MapContainer from './components/MapContainer/MapContainer';
import './NetworkPage.css';

const NetworkPage: React.FC = () => {
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-page-container" style={{ background: '#1a1a2e', minHeight: '100vh', border: '5px solid red', display: 'block' }}>
      
      <header className="network-header">
        <h1 className="network-title" style={{ color: '#fff', fontSize: '20px' }}>
          SYSTEM ACTIVE: NETWORK
        </h1>
      </header>

      {/* 🛡️ منطقة العزل: لو البيانات جات، الخريطة هتظهر فوق اللون الأخضر */}
      <div className="map-wrapper" style={{ 
        height: '500px', 
        background: 'green', 
        position: 'relative', 
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'column'
      }}>
         {userStats ? (
           <>
              <p style={{ color: 'white', background: 'black', zIndex: 10 }}>DATA RECEIVED - LOADING MAP...</p>
              <MapContainer sectorName="Testing Sector" userLocation={userStats} nodes={nodes} />
           </>
         ) : (
           <h2 style={{ color: 'white' }}>WAITING FOR USER STATS (GPS)...</h2>
         )}
      </div>

      <div style={{ color: '#64748b', fontSize: '10px' }}>
        Node Count: {nodes?.length || 0}
      </div>
    </div>
  );
};

export default NetworkPage;
