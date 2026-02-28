import React from 'react';
import './BusinessGrowth.css';

const BusinessGrowth: React.FC = () => (
  <section className="ts-panel growth-analytics full-width">
    <div className="panel-header-row">
      <h3>BUSINESS GROWTH</h3>
      <span className="trend-indicator">↗ +12%</span>
    </div>
    
    <div className="revenue-stat">
      <span className="label">Weekly Revenue:</span>
      <span className="value">25.5π</span>
    </div>

    <div className="mini-chart-container">
       <svg viewBox="0 0 100 30" className="chart-line-svg" preserveAspectRatio="none">
          {/* مسار الرسم البياني المضيء */}
          <path 
            d="M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" 
            fill="none" 
            stroke="#ffca28" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
       </svg>
    </div>
    
    <button className="ts-btn-outline-gold">OPEN NEW BRANCH</button>
  </section>
);

export default BusinessGrowth;
