import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatsBoard from './components/StatsBoard/StatsBoard';
import MapContainer from './components/MapContainer/MapContainer';
import ActivityLog from './components/ActivityLog/ActivityLog';

// تعريف الـ Interface لضمان توافق TypeScript مع بيانات الباك أند
interface NetworkStats {
  activeNodes: number;
  totalTransactions: number;
  piVolume: number;
  gridHealth: string;
}

const NetworkPage: React.FC = () => {
  // الحفاظ على الحالة (State) متوافقة مع الـ StatsBoard
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب البيانات من السيرفر (الباك أند اللي عملناه)
    const fetchNetworkData = async () => {
      try {
        // تأكد من تغيير URL إذا كان مختلفاً في بيئتك
        const response = await axios.get('http://localhost:5000/api/network/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error("Error connecting to Maplypi Matrix:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      background: '#0a0516', 
      minHeight: '100vh', 
      color: 'white',
      paddingBottom: '80px' // مساحة إضافية عشان الـ Navigation
    }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#eab308', fontSize: '24px', fontWeight: 'bold' }}>Maplypi Matrix</h1>
        <p style={{ color: '#94a3b8', fontSize: '12px', letterSpacing: '1px' }}>Global Decentralized Grid</p>
      </header>
      
      {/* تمرير البيانات للمكونات مع الحفاظ على مسمياتها الأصلية */}
      <StatsBoard data={stats} isLoading={loading} />
      
      <div style={{ marginTop: '20px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
        <MapContainer />
      </div>

      <div style={{ marginTop: '20px' }}>
        <ActivityLog />
      </div>

      {/* مؤشر تحميل بسيط احترافي */}
      {loading && (
        <div style={{ position: 'fixed', top: '10px', right: '10px', fontSize: '10px', color: '#eab308' }}>
          • SYNCING MATRIX...
        </div>
      )}
    </div>
  );
};

export default NetworkPage;
