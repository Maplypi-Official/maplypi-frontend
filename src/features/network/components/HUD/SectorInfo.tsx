import React from 'react';
import './HUD.css';

/**
 * لوحة معلومات القطاع: تعرض اسم المنطقة الحالي وحالة النظام التقنية.
 * تعتمد على التصميم المعتمد في المرجع الذهبي لضمان الفخامة.
 */
const SectorInfo: React.FC = () => {
  // البيانات دي هتتربط لاحقاً بالـ Props اللي جاية من NetworkPage
  const sectorName = "ALPHA-CENTAURI SECTION";
  const coordinates = "27.12° N, 31.18° E";

  return (
    <div className="sector-info-v3 glass-panel-v3">
      <div className="sector-tag">ACTIVE_SECTOR</div>
      <h3 className="sector-title">{sectorName}</h3>
      
      <div className="sector-details">
        <div className="detail-item">
          <span className="detail-label">COORD:</span>
          <span className="detail-value">{coordinates}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">SIGNAL:</span>
          <span className="detail-value status-glow-blue">STABLE_LINK</span>
        </div>
      </div>

      {/* تأثير الرسم البياني الصغير (Visual Only) */}
      <div className="mini-graph-container">
        <div className="bar" style={{height: '40%'}}></div>
        <div className="bar" style={{height: '70%'}}></div>
        <div className="bar" style={{height: '50%'}}></div>
        <div className="bar" style={{height: '90%'}}></div>
      </div>
    </div>
  );
};

export default SectorInfo;

