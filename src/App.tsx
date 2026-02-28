import React from 'react';
import './App.css';

// تعريف أنواع البيانات (Interfaces) لضمان الاحترافية
interface Product {
  name: string;
  stock: number;
  quality: number;
  price: number;
  icon: string;
}

const App: React.FC = () => {
  const products: Product[] = [
    { name: 'FOOD', stock: 10, quality: 85, price: 0.5, icon: '🍴' },
    { name: 'TECH', stock: 7, quality: 92, price: 1.2, icon: '💻' },
    { name: 'CRAFT', stock: 14, quality: 88, price: 0.8, icon: '🎨' }
  ];

  return (
    <div className="ts-dashboard">
      <header className="ts-header">
        <div className="user-profile">
          <div className="status-badge">ONLINE</div>
          <h2>EkoPi <span className="lvl">Lvl 14</span></h2>
          <div className="balance-container">
            <span className="pi-icon">π</span>
            <span className="amount">125.75</span>
          </div>
        </div>
        <div className="branding">
          <img src="/vite.svg" alt="Maplypi" className="logo-glow" />
          <h1>Maplypi Store Engine</h1>
        </div>
      </header>

      <main className="ts-grid">
        {/* قسم المتجر - Location من صورك */}
        <section className="ts-panel store-summary">
          <h3>MY STORE</h3>
          <div className="isometric-icon">🏪</div>
          <p className="loc-text">Cairo Citadel District</p>
        </section>

        {/* قسم المنتجات باستخدام الخرائط (Mapping) */}
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

        {/* قسم النمو - Business Growth */}
        <section className="ts-panel growth-analytics">
          <h3>BUSINESS GROWTH</h3>
          <div className="revenue-stat">Weekly: 25.5π</div>
          <div className="mini-chart">
             {/* هنا نضع الـ SVG الخاص بالرسم البياني */}
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
