import React from 'react';
import StatsBoard from './components/StatsBoard/StatsBoard';
import ActivityLog from './components/ActivityLog/ActivityLog';
import AppLoader from '../../components/AppLoader/AppLoader';
import { useNetworkSync } from './hooks/useNetworkSync';
import './NetworkPage.css';

// استيراد الخريطة مؤقتاً لاختبار العزل
import MapContainer from './components/MapContainer/MapContainer';

const NetworkPage: React.FC = () => {
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-page-container" style={{ background: '#1a1a2e', minHeight: '100vh', border: '5px solid red' }}>
      {loading && (!nodes || nodes.length === 0) && <AppLoader type="network" />}
      
      <header className="network-header">
        <h1 className="network-title" style={{ color: '#fff' }}>TESTING MODE: NETWORK PAGE</h1>
      </header>
      
      <StatsBoard 
        data={{ 
          activeNodes: nodes?.length || 0, 
          territoryControl: 14.5,
          balance: userStats?.balance || 125.75, 
          level: userStats?.level || 14
        }} 
        isLoading={loading} 
      />
      
      {/* 🛡️ منطقة العزل الاختبارية */}
      <div className="map-wrapper" style={{ height: '500px', background: 'green', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
         {userStats ? (
           <div style={{ width: '100%', height: '100%' }}>
              {/* سنحاول رندر الخريطة هنا، إذا فشلت ستظل الشاشة خضراء (الخلفية) */}
              <p style={{ color: 'white', textAlign: 'center' }}>Map Container Should Be Below This Text</p>
              <MapContainer sectorName="Testing Sector" userLocation={userStats} nodes={nodes} />
           </div>
         ) : (
           <h2 style={{ color: 'white' }}>WAITING FOR DATA...</h2>
         )}
      </div>

      <div className="activity-wrapper">
        <ActivityLog />
      </div>
    </div>
  );
};

export default NetworkPage;
