import React, { useEffect, useState } from 'react';
import { maplypiService } from '../../services/api'; 
import maplypiLogo from '../../assets/logo3.png';

// Components
import Crown from '../Crown/Crown';
import Header from '../Header/Header';
import MyStore from '../Stats/MyStore';
import ProductsSupply from '../Stats/ProductsSupply';
import BusinessGrowth from '../Stats/BusinessGrowth';
import Navbar from '../Navigation/Navbar'; // استيراد المكون الجديد

// استيراد التنسيق الموحد المحدث
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
      {/* 👑 التاج الذهبي */}
      <Crown logoUrl={maplypiLogo} />
      
      {/* 📦 الكارت الكبير (Mirror Design) */}
      <div className="maply-main-card">
        
        <Header 
          userName={userData?.username || 'EkoPi'} 
          level={userData?.level || 14} 
          merchant={userData?.username || 'EkoPi'}
          balance={userData?.piBalance || '125.75'}
        />

        <main className="ts-main-grid">
          {/* العمود الأيسر: معلومات المتجر والمكافآت */}
          <div className="grid-column">
            <MyStore location={userData?.location || 'Cairo Citadel District'} />
            
            <section className="ts-panel daily-reward-panel">
               <h3>DAILY REWARDS</h3>
               <div className="reward-content">
                  <span className="reward-icon">🎁</span>
                  <span className="reward-amount">+1.00π</span>
               </div>
            </section>
          </div>

          {/* العمود الأيمن: المبيعات والنمو */}
          <div className="grid-column">
            <section className="ts-panel recent-sales">
              <h3>RECENT SALES</h3>
              <div className="sale-item">
                 <span className="buyer-name">Buyer 47</span>
                 <span className="sale-val">+2.4π</span>
              </div>
              <p className="sub-text">2m ago</p>
            </section>
            
            <BusinessGrowth />
          </div>

          {/* المنتجات تأخذ العرض الكامل أسفل العمودين */}
          <div className="full-width">
            <ProductsSupply products={products} />
          </div>
        </main>
      </div>

      {/* 🧭 شريط التنقل السفلي */}
      <Navbar />
      
      {error && <div className="error-toast">{error}</div>}
    </div>
  );
};

export default Dashboard;
