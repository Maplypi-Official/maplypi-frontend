import './BusinessGrowth.css';
import React from 'react';

const BusinessGrowth: React.FC = () => (
  <section className="ts-panel growth-analytics full-width">
    <h3>BUSINESS GROWTH</h3>
    <div className="revenue-stat">Weekly Revenue: 25.5π</div>
    <div className="mini-chart">
       <svg viewBox="0 0 100 30" className="chart-line">
          <path d="M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" fill="none" stroke="#ffca28" strokeWidth="2" />
       </svg>
    </div>
    <button className="ts-btn outline">OPEN NEW BRANCH</button>
  </section>
);
export default BusinessGrowth;
