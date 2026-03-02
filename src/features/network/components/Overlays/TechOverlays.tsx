import React from 'react';
import './TechOverlays.css';

/**
 * 🛠️ TechOverlays - النسخة النهائية المستقرة
 * المكون المسؤول عن الهوية البصرية العميقة للمشروع.
 * يعمل كـ "خلفية حية" (Live Background) تدعم كافة مكونات الـ HUD والخريطة.
 */
const TechOverlays: React.FC = () => {
  return (
    <div className="tech-overlays-layer">
      
      {/* 🏗️ 1. طبقة الكربون فايبر الأساسية (النسيج التقني) */}
      <div className="carbon-fiber-base"></div>

      {/* 🖼️ 2. إطار الـ HUD التقني (الهيكل البصري) */}
      <div className="tech-hud-frame"></div>

      {/* 📡 3. تأثير خط المسح الضوئي (Scanning Line) لتعزيز الحيوية */}
      <div className="scanning-line"></div>

      {/* 📺 4. تأثير خطوط الشاشة (CRT / Scanlines) لإضافة لمسة الـ Terminal */}
      <div className="crt-grid-effect"></div>

      {/* 🛡️ 5. طبقة الظل الجانبي (Vignette) لتركيز الرؤية في المنتصف */}
      <div className="tech-vignette"></div>
      
    </div>
  );
};

export default TechOverlays;
