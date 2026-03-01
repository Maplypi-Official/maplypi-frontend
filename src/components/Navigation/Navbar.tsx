import React from 'react';
import './Navbar.css';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    // تم تغيير الأيقونة إلى رمز المعمار/اللوحة الفاخرة لتناسب هوية التطبيق
    { id: 'DASHBOARD', icon: '🏛️', label: 'DASHBOARD' },
    { id: 'MARKET', icon: '🛒', label: 'MARKET' },
    { id: 'NETWORK', icon: '🌐', label: 'NETWORK' },
    { id: 'ADD_PRODUCT', icon: '✨', label: 'SELL ITEM' } 
  ];

  return (
    <nav className="maply-bottom-nav">
      <div className="nav-content-wrapper">
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.id === 'ADD_PRODUCT' ? 'special-add' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <div className="icon-container">
              <span className="nav-icon">{item.icon}</span>
              {/* إضافة تأثير النبض (Pulse) فقط للعنصر النشط */}
              {activeTab === item.id && <div className="pulse-ring"></div>}
            </div>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
