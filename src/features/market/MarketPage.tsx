import React, { useState } from 'react';
import { useMarket } from './hooks/useMarket';
import FilterBar from './components/FilterBar/FilterBar';
// استيراد المكونات ولكن سنستخدمها بحذر
import ProductCard from './components/ProductCard/ProductCard';
import Cart from './components/Cart/Cart';

import './MarketPage.css';

const MarketPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { products = [], loading = false, error = null } = useMarket() || {};

  // دالة أمان لمنع انهيار الصفحة بسبب المكونات الفرعية
  const renderContent = () => {
    if (loading) return <div className="market-sync-indicator">● SYSTEM INITIALIZING...</div>;
    if (error) return <div style={{color: 'red', textAlign: 'center'}}>{error}</div>;

    return (
      <div className="market-products-grid">
        {products.length > 0 ? (
          products.map(p => (
            <div key={p.id} style={{ border: '1px solid #333', padding: '10px' }}>
              {/* استبدال المنتج مؤقتاً بنص بسيط لنعرف هل المشكلة في ProductCard */}
              <h3 style={{color: '#eab308'}}>{p.name}</h3>
              <p>{p.price} PI</p>
            </div>
          ))
        ) : (
          <div className="empty-market-state">No Data Found</div>
        )}
      </div>
    );
  };

  return (
    <div className="market-page-container">
      <header className="market-header">
        <h1 className="market-title">Maplypi Market</h1>
        <p className="market-subtitle">Sector: {activeCategory}</p>
      </header>

      {/* اختبار الفلتر بار */}
      <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <main>{renderContent()}</main>

      {/* تعطيل السلة مؤقتاً للتأكد أنها ليست سبب السواد */}
      {/* <Cart totalAmount={0} itemCount={0} /> */}
    </div>
  );
};

export default MarketPage;
