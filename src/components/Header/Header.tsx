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
    {/* الزاوية العلوية: أيقونة الإعدادات */}
    <div className="header-settings-gear">⚙️</div>

    <div className="header-main-layout">
      {/* الكارت العلوي الأيسر: معلومات المستخدم والصورة */}
      <div className="user-profile-card">
        <div className="avatar-wrapper">
          <div className="avatar-circle">
             {/* صورة افتراضية تطابق ستايل التصميم الأصلي */}
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=EkoPi" alt="user" />
          </div>
        </div>
        <div className="user-info-text">
          <h2 className="user-name-display">
            {userName} <span className="lvl-tag">Lvl {level}</span>
          </h2>
          <div className="status-badge-row">
            <span className="online-dot"></span>
            <span className="status-text">ONLINE</span>
          </div>
        </div>
      </div>

      {/* الكارت العلوي الأيمن: عنوان الداشبورد */}
      <div className="dashboard-info-card">
        <h3 className="dashboard-main-title">Store Management Dashboard</h3>
        <p className="merchant-name-tag">Merchant: {merchant}</p>
      </div>

      {/* كارت الرصيد المنفصل (تحت فتحة التاج مباشرة) */}
      <div className="balance-glass-card">
        <span className="balance-label">CURRENT PI BALANCE:</span>
        <div className="balance-value-row">
          <span className="balance-amount">{balance}</span>
          <span className="pi-icon-gold">π</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
