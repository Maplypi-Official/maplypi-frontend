import React from 'react';
import { useNetworkSync } from './hooks/useNetworkSync';
import MapContainer from './components/MapContainer/MapContainer';
import './NetworkPage.css';

/**
 * صفحة الشبكة (Network Page) - وضع الاختبار والعزل
 * تم الحفاظ على المسميات والدوال لضمان استقرار الربط مع الـ Hook والـ Backend
 */
const NetworkPage: React.FC = () => {
  // استدعاء البيانات من الـ Hook المؤمن بـ import type
  const { nodes, loading, userStats } = useNetworkSync();

  return (
    <div className="network-page-container" style={{ 
      background: '#1a1a2e', 
      minHeight: '100vh', 
      border: '5px solid red', // حدود حمراء للتأكد من رندر الصفحة
      display: 'block' 
    }}>
      
      <header className="network-header">
        <h1 className="network-title" style={{ color: '#fff', fontSize: '20px' }}>
          SYSTEM ACTIVE: NETWORK
        </h1>
      </header>

      {/* 🛡️ منطقة العزل الاختبارية: تظهر باللون الأخضر في حال وجود بيانات المستخدم */}
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
              {/* رسالة تأكيد وصول البيانات فوق طبقة الخريطة */}
              <p style={{ color: 'white', background: 'black', zIndex: 10, textAlign: 'center' }}>
                DATA RECEIVED - LOADING MAP...
              </p>
              
              <MapContainer 
                sectorName="Testing Sector" 
                userLocation={userStats} 
                nodes={nodes} 
              />
           </>
         ) : (
           <div style={{ textAlign: 'center', padding: '20px' }}>
              <h2 style={{ color: 'white' }}>
                {loading ? "SYNCING MATRIX..." : "WAITING FOR USER STATS (GPS)..."}
              </h2>
           </div>
         )}
      </div>

      <div style={{ color: '#64748b', fontSize: '10px', padding: '0 20px' }}>
        Node Count: {nodes?.length || 0}
      </div>
    </div>
  );
};

export default NetworkPage;
