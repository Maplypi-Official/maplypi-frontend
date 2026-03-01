import React, { useState } from 'react';
import { useMarket } from './hooks/useMarket';

// استدعاء المكونات الاحترافية
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';
import MarketLoader from '../../components/MarketLoader/MarketLoader'; // استدعاء اللودر الفخم

import './MarketPage.css';

const MarketPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const { 
    products = [], 
    loading = false, 
    error = null, 
    loadMore, 
    hasMore 
  } = useMarket(activeCategory) || {};

  return (
    <div className="market-page-container">
      {/* عرض شاشة التحميل الأسطورية عند التحميل الأولي فقط */}
      {loading && products.length === 0 && <MarketLoader />}

      <header className="market-header">
        <h1 className="market-title">Maplypi Market</h1>
        <p className="market-subtitle">Trade Resources via Pi Mainnet</p>
      </header>

      <FilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />

      <div className="market-products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : !loading && (
          /* تظهر فقط إذا انتهى التحميل ولم توجد داتا فعلياً */
          <div className="empty-market-state">No sectors found in this quadrant.</div>
        )}

        {hasMore && (
          <button 
            onClick={loadMore} 
            className="load-more-trigger"
            disabled={loading}
          >
            {loading ? "SEARCHING NEBULA..." : "LOAD MORE RESOURCES"}
          </button>
        )}
      </div>

      {error && (
        <div style={{ color: '#ef4444', textAlign: 'center', padding: '10px', fontSize: '12px' }}>
          {error}
        </div>
      )}

      <Cart totalAmount={0.00} itemCount={0} />
    </div>
  );
};

export default MarketPage;
