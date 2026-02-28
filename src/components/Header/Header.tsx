import React from 'react';
import './Header.css';

interface Props { userName: string; level: number; merchant: string; balance: string | number; }

const Header: React.FC<Props> = ({ userName, level, merchant, balance }) => (
  <header className="ts-header">
    <div className="user-meta">
      <div className="status-badge">ONLINE</div>
      <h2>{userName} <span className="lvl-tag">Lvl {level}</span></h2>
      <div className="balance-container-header">
        <span className="pi-icon-gold">π</span>
        <span className="balance-amount">{balance}</span>
      </div>
    </div>
    <div className="header-title">
      <h3>Store Management Dashboard</h3>
      <p className="merchant-name">Merchant: {merchant}</p>
    </div>
  </header>
);
export default Header;
