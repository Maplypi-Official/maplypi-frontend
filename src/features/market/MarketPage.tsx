import React, { useState } from 'react';
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';
import { useMarket } from './hooks/useMarket';

const MarketPage: React.FC = () => {
  // حالة الفلتر النشط لربطه بفلترة المنتجات
  const [activeCategory, setActiveCategory] = useState('All');
  
  // جلب البيانات الحقيقية من الـ Hook المرتبط بالباك أند
  // المسميات (products, loading) هي نفس اللي استخدمناها لضمان عدم الكسر
  const { products, loading } = useMarket();

  // فلترة المنتجات بناءً على الفئة المختارة
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ 
      padding: '20px', 
      background: '#0a0516', 
      minHeight: '100vh', 
      paddingBottom: '160px', 
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* هيدر الماركت بنفس روح النيتورك */}
      <header style={{ marginBottom: '25px' }}>
        <h1 style={{ 
          color: '#eab308', 
          fontSize: '28px', 
          fontWeight: '900', 
          margin: 0,
          textShadow: '0 0 15px rgba(234, 179, 8, 0.3)'
        }}>
          Maplypi Market
        </h1>
        <p style={{ 
          color: '#64748b', 
          fontSize: '12px', 
          letterSpacing: '1px', 
          textTransform: 'uppercase',
          marginTop: '5px'
        }}>
          Trade Resources via Pi Mainnet
        </p>
      </header>

      {/* شريط الفلاتر - مربوط بالحالة الفعلية */}
      <FilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={(cat) => setActiveCategory(cat)} 
      />

      {/* حالة التحميل الاحترافية - تعطي إحساس بمزامنة الماتريكس */}
      {loading ? (
        <div style={{ 
          color: '#eab308', 
          textAlign: 'center', 
          marginTop: '50px', 
          fontSize: '12px',
          letterSpacing: '2px',
          animation: 'pulse 1.5s infinite'
        }}>
          ● SYNCING MARKET GRID...
        </div>
      ) : (
        /* شبكة المنتجات - Grid احترافي يستجيب لحجم الشاشة */
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
          gap: '15px', 
          marginTop: '10px' 
        }}>
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* الكارت (Cart) - يظهر في الأسفل عند تفاعل المستخدم */}
      <Cart totalAmount={0.00} itemCount={0} />

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default MarketPage;
