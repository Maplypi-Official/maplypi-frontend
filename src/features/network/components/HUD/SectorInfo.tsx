import React from 'react';
import './HUD.css';

/**
 * 🛰️ SectorInfo - لوحة معلومات القطاع (النسخة النهائية)
 * تعرض اسم المنطقة الحالي وحالة الربط التقنية.
 * تم الحفاظ على كافة المسميات (sectorName, coordinates) لضمان التوافق.
 */
interface SectorInfoProps {
  sectorName?: string;
  lat?: number;
  lng?: number;
  status?: string;
}

const SectorInfo: React.FC<SectorInfoProps> = ({ 
  sectorName = "ALPHA-CENTAURI SECTION", 
  lat = 27.12, 
  lng = 31.18,
  status = "STABLE_LINK"
}) => {
  
  // تنسيق الإحداثيات بشكل تقني احترافي
  const coordinates = `${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E`;

  return (
    <div className="sector-info-v3 glass-panel-v3 purple-glow-border">
      {/* تسمية الفئة العلوية */}
      <div className="sector-tag pulse-text">ACTIVE_SECTOR</div>
      
      {/* اسم القطاع - العنوان الرئيسي للوحة */}
      <h3 className="sector-title">{sectorName}</h3>
      
      {/* تفاصيل البيانات التقنية */}
      <div className="sector-details">
        <div className="detail-item">
          <span className="detail-label">COORD:</span>
          <span className="detail-value">{coordinates}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">SIGNAL:</span>
          <span className="detail-value status-glow-blue">{status}</span>
        </div>
      </div>

      {/* 📊 تأثير الرسم البياني الصغير (Visual Data Visualization) */}
      <div className="mini-graph-container">
        <div className="bar" style={{height: '40%'}}></div>
        <div className="bar" style={{height: '70%'}}></div>
        <div className="bar" style={{height: '50%'}}></div>
        <div className="bar" style={{height: '90%'}}></div>
        <div className="bar" style={{height: '65%'}}></div>
      </div>

      {/* خط زخرفي تقني للهوية البصرية */}
      <div className="panel-corner-accent"></div>
    </div>
  );
};

export default SectorInfo;
