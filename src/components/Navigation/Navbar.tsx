import React, { useState, useEffect } from 'react';
import './Navbar.css';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // منطق ذكي للتحكم في ظهور الـ Navbar عند السكرول لضمان عدم تغطية المحتوى
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // إذا كان المستخدم يصعد للأعلى أو في قمة الصفحة، يظهر الـ Navbar
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } 
      // إذا كان ينزل لأسفل وبشكل ملحوظ، يختفي ليعطي مساحة للمحتوى
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    // أيقونة Dashboard فخمة تعبر عن مركز التحكم الرئيسي
    { id: 'DASHBOARD', icon: '🏛️', label: 'DASHBOARD' },
    { id: 'MARKET', icon: '🛒', label: 'MARKET' },
    { id: 'NETWORK', icon: '🌐', label: 'NETWORK' },
    { id: 'ADD_PRODUCT', icon: '✨', label: 'SELL ITEM' } 
  ];

  return (
    <nav className={`maply-bottom-nav ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
      <div className="nav-content-wrapper">
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.id === 'ADD_PRODUCT' ? 'special-add' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <div className="icon-container">
              <span className="nav-icon">{item.icon}</span>
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
