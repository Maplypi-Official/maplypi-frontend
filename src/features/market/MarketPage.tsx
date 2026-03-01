import React, { useState } from 'react';
import { useMarket } from './hooks/useMarket';
// قمنا بتعطيل الاستيراد للمكونات المشبوهة مؤقتاً لنضمن عمل الصفحة
// import ProductCard from './components/ProductCard/ProductCard';
// import FilterBar from './components/FilterBar/FilterBar';
// import Cart from './components/Cart/Cart';

import './MarketPage.css';

const MarketPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // استدعاء الـ Hook الخاص بك (سليم برمجياً)
  const { products = [], loading = false } = useMarket() || {};

  return (
    <div className="market-page-container" style={{ background: '#05050a', minHeight: '100vh', padding: '20px' }}>
      
      {/* هيدر يدوي بسيط لضمان عدم الاعتماد على أي ملف خارجي */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#eab308', fontSize: '24px' }}>MAPLYPI MARKET</h1>
        <p style={{ color: '#64748b' }}>DEBUG MODE: ACTIVE</p>
      </div>

      {loading ? (
        <div style={{ color: '#eab308', textAlign: 'center' }}>● LOADING DATA...</div>
      ) : (
        <div className="debug-grid" style={{ display: 'grid', gap: '10px' }}>
          {products.map((p: any) => (
            <div key={p.id} style={{ border: '1px solid #eab308', padding: '10px', borderRadius: '8px' }}>
              <strong style={{ color: '#fff' }}>{p.name}</strong>
              <span style={{ color: '#eab308', marginLeft: '10px' }}>{p.price} PI</span>
            </div>
          ))}
          
          {products.length === 0 && (
            <div style={{ color: '#64748b', textAlign: 'center' }}>No products found in memory.</div>
          )}
        </div>
      )}

      {/* زر اختبار يدوي للفلترة لضمان عمل الـ State */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => setActiveCategory('Tech')}
          style={{ background: '#eab308', border: 'none', padding: '10px', borderRadius: '5px' }}
        >
          Test Filter (Tech)
        </button>
      </div>
    </div>
  );
};

export default MarketPage;
