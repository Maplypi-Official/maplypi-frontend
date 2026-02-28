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

        <main className="ts-main-grid">
          {/* الصف الأول: المتجر والمنتجات */}
          <div className="grid-col-1">
            <MyStore location={userData?.location || 'Cairo Citadel District'} />
          </div>
          <div className="grid-col-2">
            <ProductsSupply products={products} />
          </div>

          {/* الصف الثاني: المكافآت، المبيعات، والنمو */}
          <section className="ts-panel daily-reward-panel">
             <h3>DAILY REWARDS</h3>
             <div className="reward-bars">
                <div className="progress-wrapper">
                   <div className="p-label">Check-ins: <span>15/20</span></div>
                   <div className="p-bar"><div className="p-fill" style={{width: '75%'}}></div></div>
                </div>
                <div className="progress-wrapper">
                   <div className="p-label">Reviews: <span>3/5</span></div>
                   <div className="p-bar"><div className="p-fill" style={{width: '60%'}}></div></div>
                </div>
                <div className="chest-row">🎁</div>
             </div>
          </section>

          <section className="ts-panel recent-sales">
            <h3>RECENT SALES</h3>
            {[1, 2, 3].map((item) => (
              <div key={item} className="mini-sale-row">
                 <span className="sale-icon">⚖️ 0.5π</span>
                 <div className="sale-data">
                    <span className="s-price">0.5π</span>
                    <span className="s-buyer">Buyer 47</span>
                 </div>
              </div>
            ))}
          </section>

          <BusinessGrowth />
        </main>
      </div>

      <Navbar />
      {error && <div className="error-toast">{error}</div>}
    </div>
  );
};

export default Dashboard;
