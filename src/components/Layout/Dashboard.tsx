import React, { useEffect, useState } from 'react';
import { maplypiService } from '../../services/api'; 
import maplypiLogo from '../../assets/logo3.png';

// Components
import Crown from '../Crown/Crown';
import Header from '../Header/Header';
import MyStore from '../Stats/MyStore';
import ProductsSupply from '../Stats/ProductsSupply';
import BusinessGrowth from '../Stats/BusinessGrowth';
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

  if (loading) return <div className="loading-screen">INITIALIZING MAPLYPI... 🌍</div>;

  return (
    <div className="ts-dashboard-container">
      <Crown logoUrl={maplypiLogo} />
      
      <div className="maply-main-card">
        <Header 
          userName={userData?.username || 'EkoPi'} 
          level={userData?.level || 14} 
          merchant={userData?.username || 'EkoPi'}
          balance={userData?.piBalance || '125.75'}
        />

        <main className="ts-main-content">
          {/* الصف العلوي: المتجر والمنتجات */}
          <div className="top-row-layout">
            <div className="layout-col-left">
              <MyStore location={userData?.location || 'Cairo Citadel District'} />
            </div>
            <div className="layout-col-right">
              <ProductsSupply products={products} />
            </div>
          </div>

          {/* الصف السفلي: المكافآت، المبيعات، والنمو */}
          <div className="bottom-row-layout">
            <DailyRewards />
            
            <section className="ts-panel recent-sales-panel">
              <h3>RECENT SALES</h3>
              <div className="sales-list-container">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="mini-sale-item">
                     <span className="s-icon">⚖️ 0.5π</span>
                     <div className="s-info">
                        <span className="s-val">0.5π</span>
                        <span className="s-user">Buyer 47</span>
                     </div>
                  </div>
                ))}
              </div>
            </section>

            <BusinessGrowth />
          </div>
        </main>
      </div>

      <Navbar />
      {error && <div className="error-toast">{error}</div>}
    </div>
  );
};

export default Dashboard;
