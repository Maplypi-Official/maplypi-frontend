import React from 'react';
import './FilterBar.css';

// تعريف الـ Props لضمان استقبال الوظائف من الـ MarketPage
interface FilterBarProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeCategory = 'All', onCategoryChange }) => {
  // التصنيفات متوافقة مع أنواع المنتجات التي حددناها في الـ Backend
  const categories = ['All', 'Food', 'Tech', 'Craft', 'Nearby'];

  return (
    <div className="filter-scroll">
      {categories.map(cat => (
        <button 
          key={cat} 
          className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onCategoryChange && onCategoryChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
