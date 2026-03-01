import React, { useState } from 'react';
// استدعاء المكونات - التأكد من مطابقة المسارات والمسميات بدقة
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';
import { useMarket } from './hooks/useMarket';

// التنسيقات المركزية
import './MarketPage.css';

const MarketPage: React.FC = () => {
  // الحفاظ على الحالة الأصلية (State) دون تغيير
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // استدعاء الهوك مع إضافة حماية في حالة فشل الجلب أو كان undefined
  const { products = [], loading = false } = useMarket() || {};

  // فلترة آمنة تضمن عدم الانهيار حتى لو كانت البيانات ناقصة
  const filteredProducts = (products || []).filter(p => {
    if (!p) return false;
    return activeCategory === 'All' ? true : p.category === activeCategory;
  });

  return (
    <div className="market-page-container" style={{ minHeight: '100vh', backgroundColor: '#05050a' }}>
      
      {/* رأس الصفحة - الهوية البصرية لـ Maplypi */}
      <header className="market-header">
        <h1 className="market-title">Maplypi Market</h1>
        <p className="market-subtitle">Trade Resources via Pi Mainnet</p>
      </header>

      {/* شريط التصفية - يمرر الدوال والمسميات الأصلية */}
      <FilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={(cat: string) => setActiveCategory(cat)} 
      />

      {/* منطقة العرض الرئيسية مع معالجة حالة التحميل لضمان عدم ظهور سواد */}
      {loading ? (
        <div className="market-sync-indicator" style={{ color: '#eab308', textAlign: 'center', padding: '50px' }}>
          ● SYNCING WITH PI NETWORK...
        </div>
      ) : (
        <div className="market-products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(p => (
              /* استخدام Optional Chaining لحماية الـ Render */
              <ProductCard key={p?.id || Math.random()} product={p} />
            ))
          ) : (
            <div className="empty-market-state" style={{ color: '#64748b', textAlign: 'center', marginTop: '50px' }}>
              No sectors found in this quadrant.
            </div>
          )}
        </div>
      )}

      {/* مكون السلة - القيم ممررة كأرقام افتراضية للحماية */}
      <Cart totalAmount={0.00} itemCount={0} />
    </div>
  );
};

export default MarketPage;
