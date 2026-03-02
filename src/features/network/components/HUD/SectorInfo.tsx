import React from 'react';
import './HUD.css';

/**
 * 🛰️ SectorInfo - لوحة معلومات القطاع (النسخة الاحترافية)
 * تعرض اسم المنطقة الحالي وحالة الربط التقنية بتنسيق HUD.
 * تم الحفاظ على كافة المسميات (sectorName, lat, lng, status) لضمان عدم كسر التطبيق.
 */
interface SectorInfoProps {
  sectorName?: string;
  lat?: number;
  lng?: number;
  status?: string;
}

const SectorInfo: React.FC<SectorInfoProps> = ({ 
  sectorName = "MAIN_OPERATIONS_SECTOR", 
  lat = 30.10, 
  lng = 31.31,
  status = "STABLE_LINK"
}) => {
  
  // تنسيق الإحداثيات بشكل تقني احترافي لضمان دقة العرض الرقمي
  const coordinates = `${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E`;

  return (
    <div className="sector-info-v3 glass-panel-v3 purple-glow-border">
      {/* تسمية الفئة العلوية - تعطي إيحاء بأن النظام يقوم بالتحليل الآن */}
      <div className="sector-tag pulse-text">ACTIVE_SECTOR</div>
      
      {/* اسم القطاع - الخط هنا عريض وواضح لتمييز المنطقة فوراً */}
      <h3 className="sector-title">{sectorName}</h3>
      
      {/* تفاصيل البيانات التقنية - منظمة في صفوف للحفاظ على مساحة الشاشة */}
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

      {/* 📊 الرسم البياني الصغير (Live Data Viz) - يعطي حياة للواجهة */}
      <div className="mini-graph-container">
        <div className="bar" style={{height: '40%'}}></div>
        <div className="bar" style={{height: '70%'}}></div>
        <div className="bar" style={{height: '50%'}}></div>
        <div className="bar" style={{height: '90%'}}></div>
        <div className="bar" style={{height: '65%'}}></div>
      </div>

      {/* الزاوية الزخرفية - عنصر جمالي لتوحيد هوية اللوحات */}
      <div className="panel-corner-accent"></div>
    </div>
  );
};

export default SectorInfo;
