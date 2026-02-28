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
    {/* الجهة اليسرى: معلومات المستخدم والرصيد */}
    <div className="user-meta">
      <div className="status-badge">ONLINE</div>
      <h2 className="user-name-display">
        {userName} <span className="lvl-tag">Lvl {level}</span>
      </h2>
      <div className="balance-container-header">
        <span className="pi-icon-gold">π</span>
        <span className="balance-amount">{balance}</span>
      </div>
    </div>

    {/* الجهة اليمنى: عنوان المتجر واسم التاجر */}
    <div className="header-title-container">
      <h3 className="dashboard-main-title">Store Management</h3>
      <p className="merchant-name-tag">Merchant: {merchant}</p>
    </div>
  </header>
);

export default Header;
