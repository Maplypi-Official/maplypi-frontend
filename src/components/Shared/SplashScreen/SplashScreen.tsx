import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
  /**
   * جملة جذابة تعكس قوة المشروع (Mapping the Future, Pi by Pi)
   * تم اختيار النصوص بعناية لإبهار المجتمع والكورتيم
   */
  const [visionText, setVisionText] = useState("DECRYPTING ECOSYSTEM...");

  useEffect(() => {
    const sequence = [
      { time: 1000, text: "CONNECTING PI MAINNET..." },
      { time: 2000, text: "MAPPING GLOBAL RESOURCES..." },
      { time: 3000, text: "MAPLYPI: YOUR SECURE GATEWAY" }
    ];
    
    sequence.forEach(step => {
      setTimeout(() => setVisionText(step.text), step.time);
    });
  }, []);

  return (
    <div className="splash-overlay">
      <div className="splash-content">
        {/* الحاوية المضيئة للشعار مع معالجة الحواف الحادة */}
        <div className="logo-container">
          {/* طبقة التوهج الكوني لدمج اللوجو مع الخلفية */}
          <div className="cosmic-glow"></div>
          
          <img 
            src="/Resources/Logo/maplypi_logo.png" 
            alt="MaplyPi Logo" 
            className="main-logo pulse-heart" 
          />
          
          {/* حلقة التوهج المحيطة (Glow Ring) */}
          <div className="glow-ring"></div>
        </div>
        
        {/* منطقة النصوص وشريط التحميل */}
        <div className="loading-text-wrapper">
          <h2 className="vision-statement">{visionText}</h2>
          
          <div className="loading-bar">
            <div className="bar-progress"></div>
          </div>
          
          {/* الشعار الفرعي لتعزيز الهوية */}
          <p className="sub-tagline">FUTURE OF COMMERCE ON PI NETWORK</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
