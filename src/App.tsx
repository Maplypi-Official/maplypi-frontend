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
      <Crown logoUrl={maplypiLogo} />
      
      <Header 
        userName={userData?.username || 'EkoPi'} 
        level={userData?.level || 14} 
        merchant={userData?.username || 'EkoPi'}
        balance={userData?.piBalance || '125.75'}
      />

      <main className="ts-main-grid">
        <MyStore location={userData?.location || 'Cairo Citadel District'} />
        
        {/* Recent Sales - Placeholder for now to keep grid balance */}
        <section className="ts-panel">
          <h3>RECENT SALES</h3>
          <div className="revenue-stat">+2.4π</div>
          <p style={{fontSize: '0.7rem', color: '#888'}}>Last transaction 2m ago</p>
        </section>

        <ProductsSupply products={products} />
        <BusinessGrowth />
      </main>
      
      {error && <div className="error-toast" style={{position:'fixed', bottom:20, color:'red'}}>{error}</div>}
    </div>
  );
}

export default App;
