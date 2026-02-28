import React, { useEffect, useState } from 'react';
import { maplypiService } from '../../services/api'; 
import maplypiLogo from '../../assets/logo3.png';

// Components
import Crown from '../Crown/Crown';
import Header from '../Header/Header';
import MyStore from '../Stats/MyStore';
import ProductsSupply from '../Stats/ProductsSupply';
import BusinessGrowth from '../Stats/BusinessGrowth';
import RecentSales from '../Stats/RecentSales/RecentSales';
import Navbar from '../Navigation/Navbar';
import DailyRewards from '../DailyRewards/DailyRewards';

import './Dashboard.css';

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

  const products = [
    { name: 'FOOD', stock: 10, quality: 85, price: 0.5, icon: '🍴' },
    { name: 'TECH', stock: 7, quality: 92, price: 1.2, icon: '💻' },
    { name: 'CRAFT', stock: 14, quality: 88, price: 0.8, icon: '🎨' }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await maplypiService.getUserProfile('EkoPi');
        setUserData(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Offline Mode Active.");
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) return <div className="loading-screen">INITIALIZING...</div>;

  return (
    <div className="ts-dashboard-container">
      {/* الحاوية الرئيسية التي تضم كل شيء داخل الإطار الموحد */}
      <div className="maply-main-frame">
        
        {/* اللوجو (التاج) مدمج في أعلى الإطار */}
        <div className="top-crown-integration">
          <Crown logoUrl={maplypiLogo} />
        </div>
        
        {/* قسم الهيدر مقسم لترك مساحة للوجو */}
        <div className="header-section-wrapper">
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

      <Navbar />
      {error && <div className="error-toast">{error}</div>}
    </div>
  );
};

export default Dashboard;
