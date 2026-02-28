import React from 'react';
import './Header.css';

interface Props { 
  userName: string; 
  level: number; 
  merchant: string; 
  balance: string | number; 
}

const Header: React.FC<Props> = ({ userName, level, merchant, balance }) => (
  <header className="ts-header">
    {/* أيقونة الإعدادات في الزاوية العلوية اليمنى */}
    <div className="header-settings-gear">⚙️</div>

    <div className="header-top-row">
      {/* الجهة اليسرى: معلومات المستخدم */}
      <div className="user-meta">
        <div className="status-badge">ONLINE</div>
        <h2 className="user-name-display">
          {userName} <span className="lvl-tag">Lvl {level}</span>
        </h2>
      </div>

      {/* الجهة اليمنى: عنوان الداشبورد */}
      <div className="header-title-container">
        <h3 className="dashboard-main-title">Store Management Dashboard</h3>
        <p className="merchant-name-tag">Merchant: {merchant}</p>
      </div>
    </div>

    {/* منطقة الرصيد: ممركزة أسفل فتحة التاج */}
    <div className="balance-section-center">
      <span className="pi-icon-gold">π</span>
      <span className="balance-amount">{balance}</span>
    </div>
  </header>
);

export default Header;
