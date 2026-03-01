import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-overlay">
      <div className="splash-content">
        {/* الحاوية المضيئة للشعار */}
        <div className="logo-container">
          <img 
            src="/Resources/Logo/maplypi_logo.png" 
            alt="MaplyPi Logo" 
            className="main-logo pulse-heart" 
          />
          <div className="glow-ring"></div>
        </div>
        
        {/* نص التحميل بنظام الماتريكس */}
        <div className="loading-text-wrapper">
          <h2 className="matrix-text">INITIALIZING MATRIX...</h2>
          <div className="loading-bar">
            <div className="bar-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
