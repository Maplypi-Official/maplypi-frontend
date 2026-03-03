import React from 'react';
import './HUD.css';

/**
 * 📍 SectorInfo - لوحة الموقع الملكية (Premium Location Edition)
 * تم حل مشكلة "MAIN OPERATIONS" وتنسيق الإحداثيات لتظهر كاملة.
 * تم الحفاظ على كافة الـ Props لضمان استقرار الربط مع الـ Backend.
 */
interface SectorInfoProps {
  sectorName?: string;
  lat?: number;
  lng?: number;
  status?: string;
}

const SectorInfo: React.FC<SectorInfoProps> = ({ 
  sectorName = "NORTHERN_ZONE_SECTOR", // تم تغيير القيمة الافتراضية لاسم أنيق
  lat = 30.1021, 
  lng = 31.3088,
  status = "STABLE_LINK" 
}) => {
  
  // دالة تنظيف النصوص لجعل العرض "Business Class" ونظيف
  const cleanText = (text: string) => text.replace(/_/g, ' ').toUpperCase();

  // تنسيق الإحداثيات بشكل دقيق جداً وبخط Terminal فخم
  const coordinates = `${lat.toFixed(4)}°N / ${lng.toFixed(4)}°E`;

  return (
    <div className="sector-info-v3 glass-panel-v3 target-loc-fixed gold-glow-border">
      
      {/* 🎯 رأس اللوحة - مؤشر استهداف احترافي */}
      <div className="target-tag-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <i className="fas fa-satellite-dish" style={{ color: '#3b82f6', fontSize: '10px' }}></i>
        <span className="target-label-nano" style={{ fontSize: '8px', color: '#3b82f6', fontWeight: 900, letterSpacing: '1px' }}>
            SECTOR SCAN
        </span>
      </div>
      
      {/* اسم القطاع - عرض بخط عريض وفخم يمنع التداخل */}
      <h3 className="target-title-nano" style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#ffffff', fontWeight: 800, borderBottom: '1px solid rgba(59, 130, 246, 0.2)', paddingBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {cleanText(sectorName)}
      </h3>
      
      {/* شبكة البيانات - عرض مضغوط يضمن ظهور الإحداثيات كاملة */}
      <div className="target-data-compact" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div className="t-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="t-label" style={{ fontSize: '7px', color: '#64748b', fontWeight: 700 }}>GPS:</span>
          <span className="t-value" style={{ fontSize: '9px', color: '#fbbf24', fontWeight: 600, fontFamily: 'Share Tech Mono, monospace' }}>
            {coordinates}
          </span>
        </div>
        
        <div className="t-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="t-label" style={{ fontSize: '7px', color: '#64748b', fontWeight: 700 }}>SYSTEM:</span>
          <span className="t-value status-flicker-blue" style={{ fontSize: '8px', color: '#10b981', fontWeight: 800 }}>
            {cleanText(status)}
          </span>
        </div>
      </div>

      {/* 🧬 بار الـ Scanning السفلي - يعطي إحساس بالحيوية */}
      <div className="scan-progress-nano" style={{ marginTop: '8px', height: '2px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: '65%', height: '100%', background: '#3b82f6', boxShadow: '0 0 5px #3b82f6' }}></div>
      </div>
    </div>
  );
};

export default SectorInfo;
