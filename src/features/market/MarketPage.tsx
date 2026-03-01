import React, { useState } from 'react';
// استدعاء المكونات الفرعية - تأكد من وجود هذه الملفات في مساراتها
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';
import { useMarket } from './hooks/useMarket';

// التنسيقات
import './MarketPage.css';

const MarketPage: React.FC = () => {
  // الحفاظ على مسميات الـ State كما هي
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // استدعاء الهوك المسؤول عن الربط مع الـ Backend
  const { products, loading } = useMarket();

  // فلترة المنتجات مع إضافة حماية (Null Check) لضمان عدم الكسر
  const filteredProducts = (products || []).filter(p => 
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  return (
    <div className="market-page-container" style={{ minHeight: '100vh', backgroundColor: '#05050a' }}>
      
      {/* الهيدر الخاص بالماركت */}
      <header className="market-header">
        <h1 className="market-title">Maplypi Market</h1>
        <p className="market-subtitle">Trade Resources via Pi Mainnet</p>
      </header>

      {/* نظام الفلترة - مرتبط بالـ State الحالية */}
      <FilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={(cat: string) => setActiveCategory(cat)} 
      />

      {/* مؤشر التحميل - يظهر أثناء جلب البيانات من الـ Backend */}
      {loading ? (
        <div className="market-sync-indicator" style={{ color: '#eab308', textAlign: 'center', padding: '20px' }}>
          ● SYNCING MARKET GRID...
        </div>
      ) : (
        /* شبكة المنتجات - مع حماية ضد المصفوفات الفارغة */
        <div className="market-products-grid">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <div className="empty-market-state" style={{ color: '#64748b', textAlign: 'center' }}>
              No products found in this sector.
            </div>
          )}
        </div>
      )}

      {/* مكون السلة - القيم صفرية حالياً كما طلبت */}
      <Cart totalAmount={0.00} itemCount={0} />
    </div>
  );
};

export default MarketPage;
