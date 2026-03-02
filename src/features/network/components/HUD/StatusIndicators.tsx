import React from 'react';
import './HUD.css';

/**
 * 🛰️ StatusIndicators - النسخة الأسطورية (Ultra-Nano Edition)
 * تم تصغير الحجم بنسبة 40% لضمان أقصى كفاءة لمساحة الشاشة.
 * المسميات المحدثة: QUANTUM FLUX و SYSTEM POWER بتوهج رقمي.
 */
const StatusIndicators: React.FC = () => {
  return (
    <div className="status-indicators-v3 glass-panel-v3 nano-scale">
      {/* مؤشر الاتصال - Connectivity: تصميم رشيق جداً */}
      <div className="indicator-item-nano">
        <span className="indicator-icon-nano blue-text">📡</span>
        <div className="indicator-content">
          <span className="label-nano">CONNECTIVITY</span>
          <div className="progress-nano">
            <div className="progress-fill blue-bg" style={{ width: '98.4%' }}></div>
          </div>
          <span className="value-nano">98.4%</span>
        </div>
      </div>

      <div className="indicator-divider-nano"></div>

      {/* مؤشر الطاقة - SYSTEM POWER: المسمى الجديد المحدث */}
      <div className="indicator-item-nano">
        <span className="indicator-icon-nano gold-text">⚡</span>
        <div className="indicator-content">
          <span className="label-nano">SYSTEM POWER</span>
          <div className="progress-nano">
            <div className="progress-fill gold-bg" style={{ width: '85%' }}></div>
          </div>
          <span className="value-nano">STABLE</span>
        </div>
      </div>
      
      {/* 🌌 QUANTUM FLUX: التأثير الرقمي المتوهج */}
      <div className="flux-container-nano">
        <div className="flux-content">
          <span className="label-nano gold-glow-text">QUANTUM FLUX</span>
          <span className="value-nano mono digital-flicker">1.2 GB/S</span>
        </div>
      </div>

      {/* لمسة تقنية أخيرة: تأثير وميض رقمي بسيط في الخلفية */}
      <div className="indicator-scan-glow"></div>
    </div>
  );
};

export default StatusIndicators;
