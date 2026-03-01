import React, { useState } from 'react';
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';
import { useMarket } from './hooks/useMarket';

// استيراد التنسيقات المنفصلة
import './MarketPage.css';

const MarketPage: React.FC = () => {
  // حالة الفلتر النشط لربطه بفلترة المنتجات
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // جلب البيانات الحقيقية من الـ Hook المرتبط بالباك أند
  const { products, loading } = useMarket();

  // فلترة المنتجات بناءً على الفئة المختارة (مع حماية ضد null)
  const filteredProducts = activeCategory === 'All' 
    ? (products || []) 
    : (products || []).filter(p => p.category === activeCategory);

  return (
    <div className="market-page-container">
      
      {/* هيدر الماركت بنفس روح النيتورك والمصفوفة */}
      <header className="market-header">
        <h1 className="market-title">Maplypi Market</h1>
        <p className="market-subtitle">Trade Resources via Pi Mainnet</p>
      </header>

      {/* شريط الفلاتر - مربوط بالحالة الفعلية */}
      <FilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={(cat) => setActiveCategory(cat)} 
      />

      {/* حالة التحميل الاحترافية */}
      {loading ? (
        <div className="market-sync-indicator">
          ● SYNCING MARKET GRID...
        </div>
      ) : (
        /* شبكة المنتجات - Grid احترافي يستجيب لحجم الشاشة */
        <div className="market-products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <div className="empty-market-state">No products found in this sector.</div>
          )}
        </div>
      )}

      {/* الكارت (Cart) - يظهر في الأسفل عند تفاعل المستخدم */}
      <Cart totalAmount={0.00} itemCount={0} />
    </div>
  );
};

export default MarketPage;
