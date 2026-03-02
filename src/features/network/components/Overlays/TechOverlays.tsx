import React from 'react';
import './TechOverlays.css';

/**
 * مكون الطبقات التقنية: يجمع بين الكربون فايبر، الـ HUD الثابت، وتأثيرات الـ Scanning.
 * يتم وضعه خلف الخريطة مباشرة لإعطاء عمق للمشروع.
 */
const TechOverlays: React.FC = () => {
  return (
    <div className="tech-overlays-layer">
      {/* 1. طبقة الكربون فايبر الأساسية */}
      <div className="carbon-fiber-base"></div>

      {/* 2. طبقة الـ HUD التقني (الصور اللي معاك) */}
      <div className="tech-hud-frame"></div>

      {/* 3. تأثير خط المسح الضوئي المتحرك */}
      <div className="scanning-line"></div>

      {/* 4. تأثير خطوط الشاشة (CRT Lines) */}
      <div className="crt-grid-effect"></div>
    </div>
  );
};

export default TechOverlays;

