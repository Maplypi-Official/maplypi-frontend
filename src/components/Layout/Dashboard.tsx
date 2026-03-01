import React, { useEffect, useState } from 'react';
import { maplypiService } from '../../services/api'; 
import maplypiLogo from '../../assets/logo3.png';

// Components Integration
import Crown from '../Crown/Crown';
import Header from '../Header/Header';
import MyStore from '../Stats/MyStore';
import ProductsSupply from '../Stats/ProductsSupply';
import BusinessGrowth from '../Stats/BusinessGrowth';
import RecentSales from '../Stats/RecentSales/RecentSales';
import DailyRewards from '../DailyRewards/DailyRewards';

import './Dashboard.css';

/**
 * User Data Interface
 * Reflects the schema provided in the API service
 */
interface UserData {
  username: string;
  piBalance: number | string;
  level: number;
  location: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Default product matrix
  const products = [
    { name: 'FOOD', stock: 10, quality: 85, price: 0.5, icon: '🍴' },
    { name: 'TECH', stock: 7, quality: 92, price: 1.2, icon: '💻' },
    { name: 'CRAFT', stock: 14, quality: 88, price: 0.8, icon: '🎨' }
  ];

  useEffect(() => {
    let isMounted = true;
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        /**
         * Fetching user profile from the centralized API service.
         * Falls back to mock data if the backend is unreachable
         */
        const data = await maplypiService.getUserProfile('EkoPi');
        if (isMounted) {
          setUserData(data);
          setError(null);
        }
      } catch (err) {
        console.error("Matrix Sync Error:", err);
        if (isMounted) setError("Offline Mode Active.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadDashboardData();
    return () => { isMounted = false; };
  }, []);

  /**
   * تم إزالة شاشة التحميل (INITIALIZING MATRIX) من هنا 
   * لضمان الاعتماد على نظام الانتقال الموحد في App.tsx
   */

  return (
    <div className="ts-dashboard-container">
      <div className="maply-main-frame">
        {/* Central Identity Crown */}
        <Crown logoUrl={maplypiLogo} />
        
        {/* User Stats & Profile Integration */}
        <div className="header-integration-zone">
          <Header 
            userName={userData?.username || 'EkoPi'} 
            level={userData?.level || 14} 
            merchant={userData?.username || 'EkoPi'}
            balance={userData?.piBalance || '125.75'}
          />
        </div>

        <main className="ts-main-content">
          <div className="flex-row-adaptive">
            <div className="flex-item-store">
              <MyStore location={userData?.location || 'Cairo Citadel District'} />
            </div>
            <div className="flex-item-products">
              <ProductsSupply products={products} />
            </div>
          </div>

          <div className="grid-bottom-adaptive">
            <div className="adaptive-col">
              <DailyRewards />
            </div>
            <div className="adaptive-col">
              <RecentSales />
            </div>
            <div className="adaptive-col">
              <BusinessGrowth />
            </div>
          </div>
        </main>
      </div>
      
      {/* Dynamic Error Feedback */}
      {error && (
        <div className="error-toast" style={{
          position: 'fixed', bottom: '85px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', padding: '6px 16px',
          borderRadius: '20px', fontSize: '11px', border: '1px solid rgba(234, 179, 8, 0.2)',
          zIndex: 3000, backdropFilter: 'blur(5px)'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
