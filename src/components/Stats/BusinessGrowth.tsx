import React from 'react';
import './BusinessGrowth.css';

const BusinessGrowth: React.FC = () => (
  <section className="ts-panel growth-analytics compact-growth">
    <div className="panel-header-row">
      <h3 className="growth-title">BUSINESS GROWTH</h3>
      <span className="trend-indicator">↗ +12%</span>
    </div>
    
    <div className="revenue-stat-compact">
      <div className="rev-info">
        <span className="label">Weekly Revenue:</span>
        <span className="value">25.5π</span>
      </div>
    </div>

    <div className="mini-chart-container-compact">
       <svg viewBox="0 0 100 30" className="chart-line-svg" preserveAspectRatio="none">
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
    
    <button className="ts-btn-outline-gold-compact">OPEN NEW BRANCH</button>
  </section>
);

export default BusinessGrowth;
