import React from 'react';
import './HUD.css';

/**
 * لوحة الرصيد الذهبية: تعرض رصيد المستخدم بتصميم زجاجي (Glassmorphism)
 * تعتمد على التوهج الذهبي لتمييز القيمة المالية للنظام.
 */
const BalancePanel: React.FC = () => {
  // ملاحظة: سنقوم بربط القيمة لاحقاً ببيانات الـ Backend الحقيقية
  const balance = "1,250.00"; 

  return (
    <div className="balance-panel-v3 glass-panel-v3">
      <div className="panel-header">
        <span className="panel-icon">🪙</span>
        <span className="panel-label">NETWORK_CREDITS</span>
      </div>
      <div className="balance-value-container">
        <span className="currency-symbol">π</span>
        <h2 className="ui-bal-value">{balance}</h2>
      </div>
      <div className="panel-status-bar">
        <div className="status-dot-active"></div>
        <span className="status-text">SECURE_SYNC_ACTIVE</span>
      </div>
    </div>
  );
};

export default BalancePanel;

