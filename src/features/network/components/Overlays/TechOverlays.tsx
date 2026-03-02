import React from 'react';
import './TechOverlays.css';

/**
 * 🛠️ TechOverlays - النسخة النهائية المستقرة (الدرع البصري)
 * المكون المسؤول عن الهوية البصرية العميقة للمشروع.
 * يعمل كـ "خلفية حية" (Live Background) تدعم كافة مكونات الـ HUD والخريطة.
 * تم التصميم ليكون شفافاً تقنياً ولا يعيق تجربة المستخدم.
 */
const TechOverlays: React.FC = () => {
  return (
    <div className="tech-overlays-layer">
      
      {/* 🏗️ 1. طبقة الكربون فايبر الأساسية (النسيج التقني) - تظهر خلف الخريطة */}
      <div className="carbon-fiber-base"></div>

      {/* 🖼️ 2. إطار الـ HUD التقني (الهيكل البصري) - يحدد أطراف الشاشة بفخامة */}
      <div className="tech-hud-frame"></div>

      {/* 📡 3. تأثير خط المسح الضوئي (Scanning Line) - يتحرك رأسياً ليعطي إحساساً بالبث المباشر */}
      <div className="scanning-line"></div>

      {/* 📺 4. تأثير خطوط الشاشة (CRT / Scanlines) - لإضافة مظهر الـ Terminal الاحترافي */}
      <div className="crt-grid-effect"></div>

      {/* 🛡️ 5. طبقة الظل الجانبي (Vignette) - تركز بصر المستخدم على مركز الخريطة والأيقونات */}
      <div className="tech-vignette"></div>
      
    </div>
  );
};

export default TechOverlays;
