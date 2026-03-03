import React from 'react';
import './HUD.css';

/**
 * 🛰️ SectorInfo - النسخة الأسطورية الطائرة (Zero-Scroll Edition)
 * تم الرفع لمستوى 115px ليكون موازياً للوحة الـ Feed فوق الـ Navbar.
 * تم الحفاظ على كافة الـ Props لضمان استقرار الربط مع الـ Backend.
 */
interface SectorInfoProps {
  sectorName?: string;
  lat?: number;
  lng?: number;
  status?: string;
}

const SectorInfo: React.FC<SectorInfoProps> = ({ 
  sectorName = "MAIN OPERATIONS", // افتراضي بدون Underscores
  lat = 30.10, 
  lng = 31.31,
  status = "STABLE LINK" 
}) => {
  
  // تنسيق الإحداثيات في سطر واحد "نانو" لضمان عدم تمدد اللوحة عمودياً
  const coordinates = `${lat.toFixed(2)}°N ${lng.toFixed(2)}°E`;

  return (
    <div className="sector-info-v3 glass-panel-v3 target-loc-fixed">
      {/* 🎯 رأس اللوحة - مؤشر استهداف نبضي */}
      <div className="target-tag-wrapper">
        <span className="target-dot-pulse"></span>
        <span className="target-label-nano">TARGET LOC</span>
      </div>
      
      {/* اسم القطاع - تنظيف فوري لأي Underscores قادمة من الـ Backend */}
      <h3 className="target-title-nano">
        {sectorName.replace(/_/g, ' ')}
      </h3>
      
      {/* شبكة البيانات - عرض أفقي مدمج يمنع السكرول تماماً */}
      <div className="target-data-compact">
        <div className="t-row">
          <span className="t-label">GPS:</span>
          <span className="t-value">{coordinates}</span>
        </div>
        <div className="t-row">
          <span className="t-label">LINK:</span>
          <span className="t-value status-flicker-blue">
            {status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* 🧬 تأثير الموجة المصغر - يضيف فخامة دون استهلاك مساحة */}
      <div className="wave-mini-nano">
        <div className="w-bar-nano"></div>
        <div className="w-bar-nano"></div>
      </div>
    </div>
  );
};

export default SectorInfo;
