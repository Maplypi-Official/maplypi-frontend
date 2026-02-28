import React from 'react';
import './RecentSales.css';

const RecentSales: React.FC = () => {
  // بيانات تجريبية تحاكي الـ Backend (يمكن ربطها لاحقاً)
  const salesData = [
    { id: 1, amount: '0.5π', buyer: 'Buyer 47', icon: '⚖️' },
    { id: 2, amount: '1.2π', buyer: 'Buyer 12', icon: '⚖️' },
    { id: 3, amount: '0.8π', buyer: 'Buyer 89', icon: '⚖️' }
  ];

  return (
    <section className="ts-panel recent-sales-compact">
      <div className="panel-header-row">
        <h3 className="sales-title">RECENT SALES</h3>
      </div>
      
      <div className="sales-list-container">
        {salesData.map((sale) => (
          <div key={sale.id} className="s-row-mini">
            <span className="s-icon-glow">{sale.icon}</span>
            <div className="s-info-group">
              <span className="s-amount-gold">{sale.amount}</span>
              <span className="s-buyer-name">{sale.buyer}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="sales-footer-hint">
        LIVE UPDATES ACTIVE
      </div>
    </section>
  );
};

export default RecentSales;
