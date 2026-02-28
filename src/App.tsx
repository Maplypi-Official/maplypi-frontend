import React, { useEffect, useState } from 'react';
import './App.css';
import { maplypiService } from './services/api'; 
// تم تحديث اسم الملف هنا ليتوافق مع ما رفعته على جيت هاب logo3.png
import maplypiLogo from './assets/logo3.png'; 

interface UserData {
  username: string;
  piBalance: number | string;
  level: number;
  location: string;
}

interface Product {
  name: string;
  stock: number;
  quality: number;
  price: number;
  icon: string;
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const products: Product[] = [
    { name: 'FOOD', stock: 10, quality: 85, price: 0.5, icon: '🍴' },
    { name: 'TECH', stock: 7, quality: 92, price: 1.2, icon: '💻' },
    { name: 'CRAFT', stock: 14, quality: 88, price: 0.8, icon: '🎨' }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // جلب البيانات من السيرفر باستخدام الدالة الأصلية دون تغيير
        const data = await maplypiService.getUserProfile('EkoPi');
        setUserData(data);
      } catch (err) {
        console.error("❌ API Error:", err);
        setError("Offline Mode Active.");
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) return <div className="loading-screen">INITIALIZING MAPLYPI ENGINE... 🌍</div>;

  return (
    <div className="ts-dashboard">
      {error && <div className="error-toast">{error}</div>}
      
      {/* قسم اللوجو المركزي (التاج) - تم ربطه بـ logo3.png الجديد */}
      <div className="dashboard-crown">
        <div className="logo-outer-circle">
          <div className="logo-inner-circle">
            <img 
              src={maplypiLogo} 
              alt="Maplypi Logo" 
              className="central-logo" 
            />
          </div>
        </div>
      </div>

      <header className="ts-header">
        <div className="user-profile">
          <div className="status-badge">ONLINE</div>
          <h2>{userData?.username || 'EkoPi'} <span className="lvl">Lvl {userData?.level || 14}</span></h2>
          <div className="balance-container">
            <span className="pi-icon">π</span>
            <span className="amount">{userData?.piBalance || '125.75'}</span>
          </div>
        </div>
        
        <div className="dashboard-info">
          <h3>Store Management Dashboard</h3>
          <p className="merchant-tag">Merchant: {userData?.username || 'EkoPi'}</p>
        </div>
      </header>

      <main className="ts-grid">
        <section className="ts-panel store-summary">
          <h3>MY STORE</h3>
          {/* أيقونة المتجر السداسية */}
          <div className="isometric-icon">🏪</div>
          <p className="loc-text">{userData?.location || 'Cairo Citadel District'}</p>
        </section>

        <section className="ts-panel product-matrix">
          <h3>PRODUCTS & SUPPLY</h3>
          <div className="prod-list">
            {products.map((p) => (
              <div key={p.name} className="prod-card">
                <div className="prod-head">{p.icon} {p.name}</div>
                <div className="prod-details">
                  <span>Stock: {p.stock}</span>
                  <span className="q-tag">Qual: {p.quality}%</span>
                  <span className="p-tag">{p.price}π</span>
                </div>
              </div>
            ))}
          </div>
          <div className="action-row">
            <button className="ts-btn gold">ADVERTISE STORE</button>
          </div>
        </section>

        <section className="ts-panel growth-analytics">
          <h3>BUSINESS GROWTH</h3>
          <div className="revenue-stat">Weekly Revenue: 25.5π</div>
          <div className="mini-chart">
             <svg viewBox="0 0 100 30" className="chart-line">
                <path d="M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" fill="none" stroke="#ffca28" strokeWidth="2" />
             </svg>
          </div>
          <button className="ts-btn outline">OPEN NEW BRANCH</button>
        </section>
      </main>
    </div>
  );
}

export default App;
