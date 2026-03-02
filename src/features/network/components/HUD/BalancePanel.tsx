import React from 'react';
import './HUD.css';

/**
 * 🪙 BalancePanel - لوحة الرصيد الذهبية (النسخة النهائية)
 * تم الحفاظ على المسميات والهيكل الزجاجي (Glassmorphism)
 * متوافق تماماً مع نظام الـ Layers الجديد في الـ NetworkMaster
 */
interface BalancePanelProps {
  balance?: string | number;
  status?: string;
}

const BalancePanel: React.FC<BalancePanelProps> = ({ balance = "1,250.00", status = "SECURE_SYNC_ACTIVE" }) => {
  return (
    <div className="balance-panel-v3 glass-panel-v3 gold-glow-border">
      {/* رأس اللوحة بتصميم الـ HUD المتطور */}
      <div className="panel-header">
        <span className="panel-icon">🪙</span>
        <span className="panel-label">NETWORK_CREDITS</span>
      </div>

      {/* منطقة عرض القيمة - التركيز البصري هنا */}
      <div className="balance-value-container">
        <span className="currency-symbol">π</span>
        <h2 className="ui-bal-value">{balance}</h2>
      </div>

      {/* شريط الحالة السفلي (Live Monitor) */}
      <div className="panel-status-bar">
        <div className="status-dot-active pulsing-dot"></div>
        <span className="status-text">{status}</span>
      </div>

      {/* تأثير المسح الضوئي الفخم (Scanner Effect) */}
      <div className="panel-scan-line"></div>
    </div>
  );
};

export default BalancePanel;
