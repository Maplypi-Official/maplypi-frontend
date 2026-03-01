import React, { useState } from 'react';
// استدعاء المكونات - تأكد من مطابقة حالة الأحرف في المجلدات
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';
import { useMarket } from './hooks/useMarket';

// التنسيقات
import './MarketPage.css';

const MarketPage: React.FC = () => {
  // الحفاظ على الـ State الأصلية لضمان توافق الـ Backend
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // استخدام الـ Hook مع معالجة حالة الـ undefined
  const marketData = useMarket() || { products: [], loading: false };
  const { products, loading } = marketData;

  // فلترة آمنة تضمن عدم انهيار التطبيق إذا كانت المصفوفة فارغة
  const filteredProducts = (products || []).filter(p => 
    activeCategory === 'All' ? true : p?.category === activeCategory
  );

  return (
    <div className="market-page-container" style={{ backgroundColor: '#05050a', minHeight: '100vh' }}>
      
      {/* Header القسم */}
      <header className="market-header" style={{ textAlign: 'center', padding: '20px' }}>
        <h1 className="market-title" style={{ color: '#eab308' }}>Maplypi Market</h1>
        <p className="market-subtitle" style={{ color: '#64748b' }}>Trade Resources via Pi Mainnet</p>
      </header>

      {/* شريط الفلترة */}
      <FilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={(cat: string) => setActiveCategory(cat)} 
      />

      {/* منطقة المحتوى الأساسي مع معالجة الحالات المختلفة */}
      <main className="market-content-zone" style={{ paddingBottom: '100px' }}>
        {loading ? (
          <div className="market-sync-indicator" style={{ textAlign: 'center', color: '#eab308', marginTop: '50px' }}>
            <div className="spinner"></div>
            <p>● SYNCING MARKET GRID...</p>
          </div>
        ) : (
          <div className="market-products-grid" style={{ display: 'grid', gap: '15px', padding: '15px' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(p => (
                <ProductCard key={p?.id || Math.random()} product={p} />
              ))
            ) : (
              <div className="empty-market-state" style={{ textAlign: 'center', color: '#64748b', marginTop: '40px' }}>
                <p>No products available in this sector.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* المكون السفلي للسلة - ثابت دائماً لسهولة الوصول */}
      <Cart totalAmount={0.00} itemCount={0} />
    </div>
  );
};

export default MarketPage;
