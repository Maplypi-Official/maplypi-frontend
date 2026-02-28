import React from 'react';
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';

const MarketPage: React.FC = () => {
  const mockProducts = [
    { id: '1', name: 'Cyber Burger', price: 0.5, stock: 12, quality: 85, image: 'https://placehold.co/200x200/1a1433/eab308?text=Food' },
    { id: '2', name: 'Quantum CPU', price: 1.2, stock: 5, quality: 98, image: 'https://placehold.co/200x200/1a1433/eab308?text=Tech' },
    { id: '3', name: 'Golden π Vase', price: 0.8, stock: 2, quality: 90, image: 'https://placehold.co/200x200/1a1433/eab308?text=Craft' },
  ];

  return (
    <div style={{ padding: '20px', background: '#0a0516', minHeight: '100vh', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#eab308', fontSize: '24px', fontWeight: 'bold' }}>Maplypi Market</h1>
        <p style={{ color: '#94a3b8', fontSize: '11px' }}>Trade Goods with Pi Currency</p>
      </header>

      <FilterBar />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        {mockProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      <Cart />
    </div>
  );
};
export default MarketPage;
