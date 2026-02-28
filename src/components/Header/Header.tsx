import React from 'react';
import './Header.css';

interface Props { 
  userName: string; 
  level: number; 
  merchant: string; 
  balance: string | number; 
}

const Header: React.FC<Props> = ({ userName, level, merchant, balance }) => (
  <header className="ts-header-mirror">
    {/* الترس في مكانه الصحيح بالأعلى */}
    <div className="header-settings-gear">⚙️</div>

    <div className="header-grid-container">
      {/* كارت المستخدم */}
      <div className="glass-card user-card">
        <div className="avatar-circle">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=EkoPi" alt="avatar" />
        </div>
        <div className="user-text-info">
          <div className="name-row">
            <span className="user-name">{userName}</span>
            <span className="level-badge">[Level {level}]</span>
          </div>
        </div>
      </div>

      {/* كارت عنوان الداشبورد */}
      <div className="glass-card title-card">
        <h3 className="main-dashboard-title">Store Management Dashboard</h3>
        <p className="merchant-tag">Merchant: {merchant}</p>
      </div>

      {/* كارت الرصيد (مكانه الصحيح أسفل كارت المستخدم) */}
      <div className="glass-card balance-card">
        <span className="balance-label">CURRENT PI BALANCE:</span>
        <div className="balance-row">
          <span className="balance-value">{balance}</span>
          <span className="pi-symbol-gold">π</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
