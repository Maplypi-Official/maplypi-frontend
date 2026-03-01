import React from 'react';
import StatsBoard from './components/StatsBoard/StatsBoard';
import MapContainer from './components/MapContainer/MapContainer';
import ActivityLog from './components/ActivityLog/ActivityLog';
import { useNetworkSync } from './hooks/useNetworkSync';

// استيراد التنسيقات الجديدة
import './NetworkPage.css';

const NetworkPage: React.FC = () => {
  // جلب البيانات من الـ Hook المرتبط بالباك أند
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-page-container">
      
      {/* 1. Header الصفحة - الهوية البصرية لـ Maplypi */}
      <header className="network-header">
        <h1 className="network-title">Maplypi Matrix</h1>
        <p className="network-subtitle">Decentralized Supply Grid</p>

        {/* مؤشر المزامنة الحي */}
        {loading && (
          <div className="sync-indicator">
            ● SYNCING MATRIX...
          </div>
        )}
      </header>
      
      {/* 2. لوحة الإحصائيات والرصيد */}
      <StatsBoard 
        data={{ 
          activeNodes: nodes?.length || 0, 
          territoryControl: 14.5,
          balance: userStats?.balance || 125.75, 
          level: userStats?.level || 14
        }} 
        isLoading={loading} 
      />
      
      {/* 3. حاوية الخريطة */}
      <div className="map-wrapper">
        <MapContainer sectorName="Cairo Citadel Sector" />
      </div>

      {/* 4. سجل النشاط */}
      <div className="activity-wrapper">
        <ActivityLog />
      </div>
    </div>
  );
};

export default NetworkPage;
