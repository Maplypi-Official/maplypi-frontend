import React, { useState } from 'react';
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';

const MarketPage: React.FC = () => {
  // حالة الفلتر النشط لربطه لاحقاً بفلترة الباك أند
  const [activeCategory, setActiveCategory] = useState('All');

  // بيانات المنتجات - مُحدثة لتعكس نفس الحقول التي بنيناها في MongoDB
  const mockProducts = [
    { 
      id: '1', 
      name: 'Cyber Burger', 
      price: 0.55, 
      stock: 12, 
      quality: 85, 
      category: 'Food',
      image: 'https://placehold.co/400x300/1a1433/eab308?text=Cyber+Food' 
    },
    { 
      id: '2', 
      name: 'Quantum CPU', 
      price: 1.20, 
      stock: 5, 
      quality: 98, 
      category: 'Tech',
      image: 'https://placehold.co/400x300/1a1433/eab308?text=Quantum+Tech' 
    },
    { 
      id: '3', 
      name: 'Golden π Vase', 
      price: 0.80, 
      stock: 2, 
      quality: 90, 
      category: 'Craft',
      image: 'https://placehold.co/400x300/1a1433/eab308?text=Pi+Craft' 
    },
    { 
      id: '4', 
      name: 'Neural Link', 
      price: 2.50, 
      stock: 8, 
      quality: 99, 
      category: 'Tech',
      image: 'https://placehold.co/400x300/1a1433/eab308?text=Neural+Link' 
    },
  ];

  // فلترة المنتجات بناءً على الفئة المختارة
  const filteredProducts = activeCategory === 'All' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  return (
    <div style={{ 
      padding: '20px', 
      background: '#0a0516', // لون الخلفية الليلي الموحد للتطبيق
      minHeight: '100vh', 
      paddingBottom: '160px', // مساحة لضمان عدم تغطية الكارت للمنتجات
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

      {/* شبكة المنتجات - Grid احترافي للموبايل والويب */}
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

      {/* الكارت (Cart) - يظهر في الأسفل عند اختيار منتجات */}
      {/* القيم هنا تجريبية وسيتم ربطها بـ Cart Context لاحقاً */}
      <Cart totalAmount={1.75} itemCount={2} />

    </div>
  );
};

export default MarketPage;
