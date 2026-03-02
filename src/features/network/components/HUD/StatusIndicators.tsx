import React from 'react';
import './HUD.css';

/**
 * 🛰️ StatusIndicators - النسخة الذرية (Atomic Nano Edition)
 * تم تصغير الحجم بنسبة 40% إضافية (إجمالي تصغير ضخم) لتوفير مساحة رؤية كاملة.
 * المسميات: QUANTUM FLUX و SYSTEM POWER مع تأثير التوهج الرقمي.
 */
const StatusIndicators: React.FC = () => {
  return (
    <div className="status-indicators-v3 glass-panel-v3 atomic-nano">
      {/* مؤشر الاتصال - Connectivity: مدمج جداً */}
      <div className="indicator-item-atomic">
        <span className="indicator-icon-atomic blue-text">📡</span>
        <div className="indicator-content-atomic">
          <div className="label-row">
            <span className="label-atomic">CONN</span>
            <span className="value-atomic">98%</span>
          </div>
          <div className="progress-atomic">
            <div className="progress-fill blue-bg" style={{ width: '98%' }}></div>
          </div>
        </div>
      </div>

      {/* مؤشر الطاقة - SYSTEM POWER: تم دمج النص مع البار */}
      <div className="indicator-item-atomic">
        <span className="indicator-icon-atomic gold-text">⚡</span>
        <div className="indicator-content-atomic">
          <div className="label-row">
            <span className="label-atomic">PWR</span>
            <span className="value-atomic gold-glow-text">STABLE</span>
          </div>
          <div className="progress-atomic">
            <div className="progress-fill gold-bg" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>
      
      {/* 🌌 QUANTUM FLUX: الخط الفخم المتوهج في سطر واحد */}
      <div className="flux-atomic-wrapper">
        <span className="label-atomic-flux">QUANTUM FLUX:</span>
        <span className="value-atomic mono digital-flicker">1.2G</span>
      </div>
    </div>
  );
};

export default StatusIndicators;
