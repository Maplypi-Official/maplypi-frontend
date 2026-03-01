// src/components/MarketLoader/MarketLoader.tsx

import React, { useState, useEffect } from 'react';
import './MarketLoader.css';

const loadingTexts = [
  "Global Commerce, Connected and Redefined.",
  "The Birth of a Decentralized Market.",
  "Explore Endless Commerce Opportunities.",
  "Empowering Local and Global Trade with Every Pi.",
  "Browse and Trade across the New Digital Silk Road."
];

const MarketLoader: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    // تغيير النص كل 3.5 ثانية (مدة مناسبة لقراءة الجملة)
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 3500);

    // تنظيف الـ Interval عند إغلاق المكون
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="maply-loader-overlay">
      <div className="loader-content-glass">
        {/* مؤشر التحميل المركزي (النبض الكوني) */}
        <div className="cosmic-pulsar">
          <div className="pulsar-core"></div>
        </div>

        {/* حاوية النصوص المتغيرة */}
        <div className="loading-text-container">
          {/* الـ key يضمن إعادة تشغيل الأنيميشن عند كل تغيير للنص */}
          <p className="dynamic-loading-text" key={currentTextIndex}>
            {loadingTexts[currentTextIndex]}
          </p>
        </div>

        {/* نص الحالة الثابت */}
        <p className="status-footer">Initializing Trade Modules...</p>
      </div>
    </div>
  );
};

export default MarketLoader;

