import React from 'react';
import './HUD.css';

/**
 * 📍 SectorInfo - لوحة الموقع الملكية (Premium Location Edition)
 * تم الرفع لضمان الطيران فوق الـ Navbar بمسافة احترافية 125px.
 * تم الحفاظ على كافة الـ Props لضمان استقرار الربط مع الـ Backend.
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
  
  // دالة تنظيف النصوص من الـ Underscores في العرض فقط
  const cleanText = (text: string) => text.replace(/_/g, ' ');

  // تنسيق الإحداثيات بشكل فخم ومختصر لمنع التمدد الرأسي
  const coordinates = `${lat.toFixed(4)}°N ${lng.toFixed(4)}°E`;

  return (
    <div className="sector-info-v3 glass-panel-v3 target-loc-fixed gold-glow-border">
      
      {/* 🎯 رأس اللوحة - مؤشر استهداف احترافي مع أيقونة فخمة */}
      <div className="target-tag-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <i className="fas fa-crosshairs" style={{ color: '#3b82f6', fontSize: '10px' }}></i>
        <span className="target-label-nano" style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 800, letterSpacing: '1px' }}>
            CURRENT LOCATION
        </span>
      </div>
      
      {/* اسم القطاع - عرض نظيف وفخم بدون Underscores */}
      <h3 className="target-title-nano" style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#ffffff', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '5px' }}>
        {cleanText(sectorName)}
      </h3>
      
      {/* شبكة البيانات - عرض أفقي مدمج يمنع السكرول ويحافظ على الهوية */}
      <div className="target-data-compact" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div className="t-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="t-label" style={{ fontSize: '8px', color: '#64748b', fontWeight: 700 }}>GPS:</span>
          <span className="t-value" style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 600, fontFamily: 'Share Tech Mono, monospace' }}>
            {coordinates}
          </span>
        </div>
        
        <div className="t-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="t-label" style={{ fontSize: '8px', color: '#64748b', fontWeight: 700 }}>LINK:</span>
          <span className="t-value status-flicker-blue" style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, textTransform: 'capitalize' }}>
            {cleanText(status).toLowerCase()}
          </span>
        </div>
      </div>

      {/* 🧬 تأثير الموجة المصغر - يضيف فخامة تقنية هادئة */}
      <div className="wave-mini-nano" style={{ marginTop: '8px', opacity: 0.3 }}>
        <div className="w-bar-nano"></div>
      </div>
    </div>
  );
};

export default SectorInfo;
