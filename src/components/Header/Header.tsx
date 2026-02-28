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
    <div className="header-grid-container">
      
      {/* كارت المستخدم - يسار علوي */}
      <div className="glass-card user-card">
        <div className="avatar-circle">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=EkoPi" alt="avatar" />
        </div>
        <div className="user-text-info">
          <span className="user-name">{userName}</span>
          <span className="level-badge">Lvl {level}</span>
        </div>
      </div>

      {/* كارت عنوان الداشبورد - يمين (يحتوي على الترس الآن لمنع خروجه) */}
      <div className="glass-card title-card">
        <div className="title-with-gear">
          <h3 className="main-dashboard-title">Store Management Dashboard</h3>
          <span className="header-settings-gear-inner">⚙️</span>
        </div>
        <p className="merchant-tag">Merchant: {merchant}</p>
      </div>

      {/* كارت الرصيد - يسار سفلي */}
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
