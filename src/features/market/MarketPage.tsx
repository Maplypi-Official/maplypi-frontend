import React, { useState } from 'react';
// Cleaned imports: Removing extensions for Vite compatibility
import ProductCard from './components/ProductCard/ProductCard';
import FilterBar from './components/FilterBar/FilterBar';
import Cart from './components/Cart/Cart';
import { useMarket } from './hooks/useMarket';

// Integrated Styles
import './MarketPage.css';

const MarketPage: React.FC = () => {
  // State for active category filtering
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Real-time data fetching from the Market Hook
  const { products, loading } = useMarket();

  // Filter products based on category selection with null-safety
  const filteredProducts = activeCategory === 'All' 
    ? (products || []) 
    : (products || []).filter(p => p.category === activeCategory);

  return (
    <div className="market-page-container">
      
      {/* Market Header - Aligned with Maplypi Matrix Identity */}
      <header className="market-header">
        <h1 className="market-title">Maplypi Market</h1>
        <p className="market-subtitle">Trade Resources via Pi Mainnet</p>
      </header>

      {/* Filter System - Dynamic State Linkage */}
      <FilterBar 
        activeCategory={activeCategory} 
        onCategoryChange={(cat) => setActiveCategory(cat)} 
      />

      {/* Professional Sync Indicator */}
      {loading ? (
        <div className="market-sync-indicator">
          ● SYNCING MARKET GRID...
        </div>
      ) : (
        /* Responsive Product Grid */
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

      {/* Bottom Cart Overlay */}
      <Cart totalAmount={0.00} itemCount={0} />
    </div>
  );
};

export default MarketPage;
