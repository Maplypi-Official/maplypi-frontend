import React from 'react';
import './HUD.css';

/**
 * 🛰️ SectorInfo - النسخة الذرية (Targeting Mode)
 * تم تقليص الحجم بنسبة 60% مع استبدال المسميات بـ TARGET LOC.
 * مضاف إليها تأثيرات بصرية تفاعلية تجذب انتباه المستخدم.
 */
interface SectorInfoProps {
  sectorName?: string;
  lat?: number;
  lng?: number;
  status?: string;
}

const SectorInfo: React.FC<SectorInfoProps> = ({ 
  sectorName = "MAIN_OPERATIONS", 
  lat = 30.10, 
  lng = 31.31,
  status = "STABLE_LINK"
}) => {
  
  const coordinates = `${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E`;

  return (
    <div className="sector-info-v3 glass-panel-v3 target-loc-nano">
      {/* 🎯 تأثير الهدف (Targeting Crosshair) الصغير في الزاوية */}
      <div className="target-crosshair"></div>

      {/* التسمية الجديدة الفخمة والمختصرة */}
      <div className="target-tag-wrapper">
        <span className="target-dot-pulse"></span>
        <span className="target-label-nano">TARGET LOC</span>
      </div>
      
      {/* اسم المنطقة - تم تصغير الخط ليكون رشيقاً وعصرياً */}
      <h3 className="target-title-nano">{sectorName}</h3>
      
      {/* البيانات الإحداثية - عرض أفقي مدمج لتوفير المساحة */}
      <div className="target-data-grid">
        <div className="target-item">
          <span className="t-label">GPS:</span>
          <span className="t-value">{coordinates}</span>
        </div>
        <div className="target-item">
          <span className="t-label">LINK:</span>
          <span className="t-value status-flicker-blue">{status}</span>
        </div>
      </div>

      {/* 📊 الموجة الترددية (Live Frequency Wave) - بدلاً من الأعمدة التقليدية */}
      <div className="wave-container-nano">
        <div className="wave-bar animate-wave-1"></div>
        <div className="wave-bar animate-wave-2"></div>
        <div className="wave-bar animate-wave-3"></div>
        <div className="wave-bar animate-wave-4"></div>
      </div>

      {/* تأثير المسح الضوئي عند التحديث */}
      <div className="target-scan-overlay"></div>
    </div>
  );
};

export default SectorInfo;
