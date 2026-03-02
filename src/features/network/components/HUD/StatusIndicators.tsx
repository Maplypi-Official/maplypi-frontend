import React from 'react';
import './HUD.css';

/**
 * 🛰️ StatusIndicators - مؤشرات الحالة التقنية (النسخة الاحترافية)
 * تعرض حالة الاتصال (Connectivity) واستهلاك الطاقة (Power) بتصميم HUD مصغر.
 * تم الحفاظ على الهيكل والمسميات لضمان التوافق التام مع الـ Frontend الحالي.
 */
const StatusIndicators: React.FC = () => {
  return (
    <div className="status-indicators-v3 glass-panel-v3">
      {/* مؤشر الاتصال - Connectivity: يعكس استقرار الشبكة */}
      <div className="indicator-item">
        <div className="indicator-icon blue-text">📡</div>
        <div className="indicator-content">
          <span className="label-xs">CONNECTIVITY</span>
          <div className="progress-mini">
            <div className="progress-fill blue-bg" style={{ width: '98.4%' }}></div>
          </div>
          <span className="value-xs">CONN: 98.4%</span>
        </div>
      </div>

      <div className="indicator-divider"></div>

      {/* مؤشر الطاقة - Power: يعكس كفاءة استهلاك الموارد */}
      <div className="indicator-item">
        <div className="indicator-icon gold-text">⚡</div>
        <div className="indicator-content">
          <span className="label-xs">SYSTEM_POWER</span>
          <div className="progress-mini">
            <div className="progress-fill gold-bg" style={{ width: '85%' }}></div>
          </div>
          <span className="value-xs">PWR: OK</span>
        </div>
      </div>
      
      {/* تأثير نبض البيانات (Data Rate) - يعطي إحساساً بالتدفق الحي للبيانات */}
      <div className="data-rate-mini">
        <span className="label-xs">DATA_RATE:</span>
        <span className="value-xs mono">1.2 GB/S</span>
      </div>
      
      {/* لمسة تقنية أخيرة: تأثير وميض رقمي بسيط */}
      <div className="indicator-scan-glow"></div>
    </div>
  );
};

export default StatusIndicators;
