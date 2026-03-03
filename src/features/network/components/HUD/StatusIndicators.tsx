import React from 'react';
import './HUD.css';

/**
 * 🛰️ StatusIndicators - النسخة الملكية (Premium Business Edition)
 * تم تحويل المصطلحات التقنية المعقدة لمؤشرات جودة مفهومة للمستخدم.
 * تم الحفاظ على الهيكل العام لضمان عدم كسر التنسيق مع الخريطة.
 */
const StatusIndicators: React.FC = () => {
  return (
    <div className="status-indicators-v3 glass-panel-v3 atomic-nano gold-glow-border">
      
      {/* 📡 مؤشر الاتصال - Connectivity: تجربة مستخدم سلسة */}
      <div className="indicator-item-atomic" style={{ marginBottom: '10px' }}>
        <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span className="label-atomic" style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 700 }}>NETWORK</span>
          <span className="value-atomic" style={{ fontSize: '9px', color: '#10b981', fontWeight: 800 }}>STABLE</span>
        </div>
        <div className="progress-atomic" style={{ height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div className="progress-fill blue-bg" style={{ width: '92%', height: '100%', background: '#3b82f6', boxShadow: '0 0 8px #3b82f6' }}></div>
        </div>
      </div>

      {/* 🔐 مؤشر الأمان - Security Power: يعطي ثقة للمشتري والبائع */}
      <div className="indicator-item-atomic" style={{ marginBottom: '10px' }}>
        <div className="label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span className="label-atomic" style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 700 }}>SECURITY</span>
          <span className="value-atomic gold-glow-text" style={{ fontSize: '9px', color: '#eab308', fontWeight: 800 }}>ENCRYPTED</span>
        </div>
        <div className="progress-atomic" style={{ height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div className="progress-fill gold-bg" style={{ width: '100%', height: '100%', background: '#eab308', boxShadow: '0 0 8px #eab308' }}></div>
        </div>
      </div>
      
      {/* 💎 NODE IDENTITY: بديل فخم للـ Quantum Flux */}
      <div className="flux-atomic-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6px' }}>
        <span className="label-atomic-flux" style={{ fontSize: '8px', color: '#64748b', fontWeight: 800 }}>NODE ID:</span>
        <span className="value-atomic mono digital-flicker" style={{ fontSize: '9px', color: '#ffffff', fontWeight: 700, fontFamily: 'Share Tech Mono, monospace' }}>
          MP-7721
        </span>
      </div>

    </div>
  );
};

export default StatusIndicators;
