import React from 'react';
import './HUD.css';

/**
 * 🛰️ SectorInfo - النسخة الأسطورية المحدثة (No-Scroll Edition)
 * تم حذف الـ Underscores تماماً واستبدالها بمساحات وأسماء جذابة.
 * تم ضبط الارتفاع لضمان الظهور الكامل على شاشة الموبايل.
 */
interface SectorInfoProps {
  sectorName?: string;
  lat?: number;
  lng?: number;
  status?: string;
}

const SectorInfo: React.FC<SectorInfoProps> = ({ 
  sectorName = "CENTRAL HUB", // اسم جديد جذاب بدل المسمى القديم البايخ
  lat = 30.10, 
  lng = 31.31,
  status = "STABLE LINK" // حذف الـ Underscore
}) => {
  
  const coordinates = `${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E`;

  return (
    <div className="sector-info-v3 glass-panel-v3 target-loc-fixed">
      {/* 🎯 العنوان الجديد المبتكر */}
      <div className="target-tag-wrapper">
        <span className="target-dot-pulse"></span>
        <span className="target-label-nano">TARGET LOC</span>
      </div>
      
      {/* اسم المنطقة - خط نظيف وعصري وبدون Underscore */}
      <h3 className="target-title-nano">{sectorName.replace(/_/g, ' ')}</h3>
      
      {/* شبكة البيانات - تم ضغطها لتوفير مساحة عمودية */}
      <div className="target-data-compact">
        <div className="t-row">
          <span className="t-label">GPS:</span>
          <span className="t-value">{coordinates}</span>
        </div>
        <div className="t-row">
          <span className="t-label">STATUS:</span>
          <span className="t-value status-flicker-blue">{status.replace(/_/g, ' ')}</span>
        </div>
      </div>

      {/* الموجة الترددية - نحيفة جداً لعدم زيادة طول المكون */}
      <div className="wave-mini">
        <div className="w-bar bar-1"></div>
        <div className="w-bar bar-2"></div>
        <div className="w-bar bar-3"></div>
      </div>
    </div>
  );
};

export default SectorInfo;
