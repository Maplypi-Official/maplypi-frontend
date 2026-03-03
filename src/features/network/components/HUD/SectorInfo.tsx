import React from 'react';
import './HUD.css';

/**
 * 🛰️ SectorInfo - النسخة الاحترافية النهائية (Zero-Scroll)
 * تم الحفاظ على المسميات البرمجية الأصلية لضمان توافق الـ Backend.
 * التعديل بصري فقط لحذف الـ Underscores وضبط المساحات.
 */
interface SectorInfoProps {
  sectorName?: string;
  lat?: number;
  lng?: number;
  status?: string;
}

const SectorInfo: React.FC<SectorInfoProps> = ({ 
  sectorName = "MAIN OPERATIONS", // القيمة الافتراضية بدون underscores
  lat = 30.10, 
  lng = 31.31,
  status = "STABLE LINK" 
}) => {
  
  // تنسيق الإحداثيات في سطر واحد مدمج
  const coordinates = `${lat.toFixed(2)}°N ${lng.toFixed(2)}°E`;

  return (
    <div className="sector-info-v3 glass-panel-v3 target-loc-fixed">
      {/* مؤشر الاستهداف الذكي */}
      <div className="target-tag-wrapper">
        <span className="target-dot-pulse"></span>
        <span className="target-label-nano">TARGET LOC</span>
      </div>
      
      {/* اسم القطاع - معالجة فورية لحذف الـ underscores إذا أتت من الـ Backend */}
      <h3 className="target-title-nano">{sectorName.replace(/_/g, ' ')}</h3>
      
      {/* البيانات التقنية - توزيع أفقي مضغوط */}
      <div className="target-data-compact">
        <div className="t-row">
          <span className="t-label">GPS:</span>
          <span className="t-value">{coordinates}</span>
        </div>
        <div className="t-row">
          <span className="t-label">LINK:</span>
          <span className="t-value status-flicker-blue">{status.replace(/_/g, ' ')}</span>
        </div>
      </div>

      {/* لمحة جمالية بسيطة جداً لا تأخذ مساحة */}
      <div className="wave-mini-nano">
        <div className="w-bar-nano"></div>
        <div className="w-bar-nano"></div>
      </div>
    </div>
  );
};

export default SectorInfo;
