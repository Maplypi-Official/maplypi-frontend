import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  // حالة لمعرفة الأيقونة النشطة (Dashboard هي الافتراضية)
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  const navItems = [
    { id: 'DASHBOARD', icon: '📊', label: 'DASHBOARD' },
    { id: 'MARKET', icon: '🛒', label: 'MARKET' },
    { id: 'NETWORK', icon: '🌐', label: 'NETWORK' },
    { id: 'SETTINGS', icon: '⚙️', label: 'SETTINGS' }
  ];

  return (
    <nav className="maply-bottom-nav">
      {navItems.map((item) => (
        <div 
          key={item.id} 
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
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

