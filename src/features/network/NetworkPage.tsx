import React from 'react';
// Cleaned internal component imports
import StatsBoard from './components/StatsBoard/StatsBoard';
import MapContainer from './components/MapContainer/MapContainer';
import ActivityLog from './components/ActivityLog/ActivityLog';
import AppLoader from '../../components/AppLoader/AppLoader'; // استدعاء النظام الموحد للتحميل
import { useNetworkSync } from './hooks/useNetworkSync';

// Integrated Styles
import './NetworkPage.css';

const NetworkPage: React.FC = () => {
  // Decentralized data synchronization from Network Hook
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-page-container">
      {/* استدعاء اللودر الفخم بنوع 'network'
          يظهر فقط عند التحميل الأولي للبيانات ليقوم بإبهار المستخدم بجمل الاستكشاف
      */}
      {loading && (!nodes || nodes.length === 0) && <AppLoader type="network" />}
      
      {/* 1. Header Section - Visual Matrix Identity */}
      <header className="network-header">
        <h1 className="network-title">Maplypi Matrix</h1>
        <p className="network-subtitle">Decentralized Supply Grid</p>

        {/* Live Sync Pulse - مؤشر صغير بجانب الهيدر */}
        {loading && nodes && nodes.length > 0 && (
          <div className="sync-indicator">
            ● SYNCING MATRIX...
          </div>
        )}
      </header>
      
      {/* 2. Real-time Stats & Balance Board */}
      <StatsBoard 
        data={{ 
          activeNodes: nodes?.length || 0, 
          territoryControl: 14.5,
          balance: userStats?.balance || 125.75, 
          level: userStats?.level || 14
        }} 
        isLoading={loading} 
      />
      
      {/* 3. Geographic Grid Container (Leaflet Ready) */}
      <div className="map-wrapper">
        <MapContainer sectorName="Cairo Citadel Sector" />
      </div>

      {/* 4. Neural Activity Log */}
      <div className="activity-wrapper">
        <ActivityLog />
      </div>
    </div>
  );
};

export default NetworkPage;
