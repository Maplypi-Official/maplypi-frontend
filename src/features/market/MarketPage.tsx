import React, { useState } from 'react';
import { useMarket } from './hooks/useMarket';

// استدعاء المكونات الاحترافية - التأكد من مطابقة المسارات
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';

import './MarketPage.css';

const MarketPage: React.FC = () => {
  // الحفاظ على الحالة الأصلية للفلترة
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // استدعاء الهوك المستقر الآن
  const { products = [], loading = false, error = null } = useMarket() || {};

  // فلترة المنتجات بناءً على التصنيف المختار
  const filteredProducts = products.filter(p => 
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  return (
    <div className="market-page-container">
      {/* رأس الصفحة الاحترافي */}
      <header className="market-header">
        <h1 className="market-title">Maplypi Market</h1>
        <p className="market-subtitle">Trade Resources via Pi Mainnet</p>
      </header>

      {/* شريط التصفية - نستخدم المكون الأصلي */}
      <FilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      {/* منطقة العرض الرئيسية */}
      {loading ? (
        <div className="market-sync-indicator">● SYNCING WITH PI NETWORK...</div>
      ) : error ? (
        <div style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>{error}</div>
      ) : (
        <div className="market-products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="empty-market-state">No sectors found in this quadrant.</div>
          )}
        </div>
      )}

      {/* مكون السلة - القيم ممررة لضمان عدم الكسر */}
      <Cart totalAmount={0.00} itemCount={0} />
    </div>
  );
};

export default MarketPage;
