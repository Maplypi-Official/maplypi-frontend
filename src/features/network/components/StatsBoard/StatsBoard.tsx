import React from 'react';
import './StatsBoard.css';

const StatsBoard: React.FC = () => (
  <div className="stats-grid">
    <div className="stat-card border-gold">
      <p className="label">Network Reach</p>
      <p className="value gold-text">1.2k Nodes</p>
    </div>
    <div className="stat-card border-purple">
      <p className="label">Territory Control</p>
      <p className="value purple-text">14.5%</p>
    </div>
  </div>
);
export default StatsBoard;
