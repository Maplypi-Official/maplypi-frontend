import React from 'react';
import './RecentSales.css';

const RecentSales: React.FC = () => {
  // بيانات تجريبية كما كانت في الداشبورد لضمان الاستقرار
  const salesData = [
    { id: 1, amount: '0.5π', buyer: 'Buyer 47', icon: '⚖️' },
    { id: 2, amount: '0.5π', buyer: 'Buyer 47', icon: '⚖️' },
    { id: 3, amount: '0.5π', buyer: 'Buyer 47', icon: '⚖️' }
  ];

  return (
    <section className="ts-panel recent-sales-compact-mirror">
      <h3 className="sales-title-mirror">RECENT SALES</h3>
      <div className="sales-list-mirror">
        {salesData.map((sale) => (
          <div key={sale.id} className="s-row-mirror">
            <span className="s-icon-glow">{sale.icon}</span>
            <div className="s-info-mirror">
              <span className="s-amount-gold">{sale.amount}</span>
              <span className="s-buyer-name">{sale.buyer}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentSales;
