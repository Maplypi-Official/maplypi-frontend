import React from 'react';
import './FilterBar.css';

const FilterBar: React.FC = () => (
  <div className="filter-scroll">
    {['All', 'Food', 'Tech', 'Craft', 'Nearby'].map(cat => (
      <button key={cat} className="filter-chip">{cat}</button>
    ))}
  </div>
);
export default FilterBar;
