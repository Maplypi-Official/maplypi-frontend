import React from 'react';
import './Navbar.css';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'DASHBOARD', icon: '📊', label: 'DASHBOARD' },
    { id: 'MARKET', icon: '🛒', label: 'MARKET' },
    { id: 'NETWORK', icon: '🌐', label: 'NETWORK' },
    // استبدال الإعدادات بلوحة إضافة المنتجات
    { id: 'ADD_PRODUCT', icon: '➕', label: 'SELL ITEM' } 
  ];

  return (
    <nav className="maply-bottom-nav">
      {navItems.map((item) => (
        <div 
          key={item.id} 
          className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.id === 'ADD_PRODUCT' ? 'special-add' : ''}`}
          onClick={() => onTabChange(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
          {activeTab === item.id && <div className="active-dot"></div>}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
