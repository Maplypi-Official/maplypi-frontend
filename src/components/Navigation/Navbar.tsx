import React from 'react';
import './Navbar.css';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    // أيقونة Dashboard الفخمة (المعبد/المبنى العريق)
    { id: 'DASHBOARD', icon: '🏛️', label: 'DASHBOARD' },
    { id: 'MARKET', icon: '🛒', label: 'MARKET' },
    { id: 'NETWORK', icon: '🌐', label: 'NETWORK' },
    { id: 'ADD_PRODUCT', icon: '✨', label: 'SELL ITEM' } 
  ];

  return (
    <nav className="maply-bottom-nav nav-visible">
      <div className="nav-content-wrapper">
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.id === 'ADD_PRODUCT' ? 'special-add' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <div className="icon-container">
              <span className="nav-icon">{item.icon}</span>
              {/* تأثير النبض (Pulse) للعنصر المختار فقط */}
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
