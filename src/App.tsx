import React, { useEffect, useState } from 'react';
import './components/Layout/Dashboard.css';
import { maplypiService } from './services/api';
import maplypiLogo from './assets/logo3.png';

// Components
import Crown from './components/Crown/Crown';
import Header from './components/Header/Header';
import MyStore from './components/Stats/MyStore';
import ProductsSupply from './components/Stats/ProductsSupply';
import BusinessGrowth from './components/Stats/BusinessGrowth';

// استيراد الأنواع من ملف منفصل (سننشئه لاحقاً) أو إبقاؤها هنا مؤقتاً
interface UserData {
  username: string;
  piBalance: number | string;
  level: number;
  location: string;
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // البيانات الثابتة (يفضل نقلها لملف constants لاحقاً)
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
        setError("Offline Mode Active.");
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) return <div className="loading-screen">INITIALIZING... 🌍</div>;

  return (
    <div className="ts-dashboard-container">
      {/* منطقة التاج - منفصلة تماماً لضمان الظهور فوق الكارت */}
      <Crown logoUrl={maplypiLogo} />
      
      {/* الكارت الكبير الموحد */}
      <div className="maply-main-card">
        <Header 
          userName={userData?.username || 'EkoPi'} 
          level={userData?.level || 14} 
          merchant={userData?.username || 'EkoPi'}
          balance={userData?.piBalance || '125.75'}
        />

        <main className="ts-main-grid">
          <MyStore location={userData?.location || 'Cairo Citadel District'} />
          
          <section className="ts-panel recent-sales">
            <h3>RECENT SALES</h3>
            <div className="revenue-stat">+2.4π</div>
            <p className="sub-text">Last transaction 2m ago</p>
          </section>

          <ProductsSupply products={products} />
          <BusinessGrowth />
        </main>
      </div>
      
      {error && <div className="error-toast">{error}</div>}
    </div>
  );
}

export default App;
