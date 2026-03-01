import React from 'react';
import StatsBoard from './components/StatsBoard/StatsBoard';
import MapContainer from './components/MapContainer/MapContainer';
import ActivityLog from './components/ActivityLog/ActivityLog';
import { useNetworkSync } from './hooks/useNetworkSync';

const NetworkPage: React.FC = () => {
  // جلب البيانات الموحدة (Nodes, Stats, Balance) من الباك أند عبر الـ Hook
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div style={{ 
      padding: '20px', 
      background: '#0a0516', 
      minHeight: '100vh', 
      color: 'white',
      paddingBottom: '100px', 
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* 1. Header الصفحة - الهوية البصرية لـ Maplypi */}
      <header style={{ marginBottom: '25px', position: 'relative' }}>
        <h1 style={{ 
          color: '#eab308', 
          fontSize: '26px', 
          fontWeight: '900', 
          margin: 0,
          textShadow: '0 0 20px rgba(234,179,8,0.3)' 
        }}>
          Maplypi Matrix
        </h1>
        <p style={{ 
          color: '#64748b', 
          fontSize: '11px', 
          letterSpacing: '2px', 
          textTransform: 'uppercase',
          marginTop: '4px' 
        }}>
          Decentralized Supply Grid
        </p>

        {/* مؤشر المزامنة الحي - Pulse Animation */}
        {loading && (
          <div style={{ 
            position: 'absolute', 
            top: '5px', 
            right: '0', 
            fontSize: '9px', 
            color: '#eab308',
            fontWeight: 'bold',
            animation: 'pulse 1.5s infinite'
          }}>
            ● SYNCING MATRIX...
          </div>
        )}
      </header>
      
      {/* 2. لوحة الإحصائيات والرصيد (StatsBoard) */}
      <StatsBoard 
        data={{ 
          activeNodes: nodes.length, 
          territoryControl: 14.5,
          balance: userStats?.balance || 125.75, // القيمة الافتراضية من التصميم
          level: userStats?.level || 14
        }} 
        isLoading={loading} 
      />
      
      {/* 3. حاوية الخريطة (MapContainer) */}
      <div style={{ 
        marginTop: '25px', 
        borderRadius: '28px', 
        overflow: 'hidden', 
        border: '1px solid rgba(139, 92, 246, 0.2)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <MapContainer sectorName="Cairo Citadel Sector" />
      </div>

      {/* 4. سجل النشاط (ActivityLog) */}
      <div style={{ marginTop: '25px' }}>
        <ActivityLog />
      </div>

      {/* تنسيق الأنيميشن للمؤشر */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default NetworkPage;
