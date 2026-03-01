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
  
  /** * استدعاء الهوك مع دعم التمرير اللانهائي
   * نمرر التصنيف الحالي للهوك ليقوم بجلب البيانات المناسبة تلقائياً
   */
  const { 
    products = [], 
    loading = false, 
    error = null, 
    loadMore, 
    hasMore 
  } = useMarket(activeCategory) || {};

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
      <div className="market-products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : !loading && (
          <div className="empty-market-state">No sectors found in this quadrant.</div>
        )}

        {/* مستشعر التمرير اللانهائي (تحميل المزيد) */}
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

      {/* عرض رسالة الخطأ إن وجدت بشكل غير معيق */}
      {error && (
        <div style={{ color: '#ef4444', textAlign: 'center', padding: '10px', fontSize: '12px' }}>
          {error}
        </div>
      )}

      {/* مكون السلة - القيم ممررة لضمان عدم الكسر */}
      <Cart totalAmount={0.00} itemCount={0} />
    </div>
  );
};

export default MarketPage;
