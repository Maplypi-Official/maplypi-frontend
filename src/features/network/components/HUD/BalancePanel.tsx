import React from 'react';
import './HUD.css';

/**
 * 🪙 BalancePanel - لوحة الرصيد الذهبية (النسخة الأسطورية)
 * تم الحفاظ على المسميات الأصلية لضمان التوافق التام مع الـ Backend
 * التصميم يعتمد على الـ Glassmorphism والتوهج الذهبي (Gold Glow)
 */
interface BalancePanelProps {
  balance?: string | number;
  status?: string;
}

const BalancePanel: React.FC<BalancePanelProps> = ({ 
  balance = "125.75", 
  status = "SECURE_SYNC_ACTIVE" 
}) => {
  return (
    <div className="balance-panel-v3 glass-panel-v3 gold-glow-border">
      {/* رأس اللوحة - يعكس هوية الشبكة */}
      <div className="panel-header">
        <span className="panel-icon">🪙</span>
        <span className="panel-label">NETWORK_CREDITS</span>
      </div>

      {/* منطقة القيمة الرقمية - الخط عريض وواضح (High Visibility) */}
      <div className="balance-value-container">
        <span className="currency-symbol">π</span>
        <h2 className="ui-bal-value">{balance}</h2>
      </div>

      {/* شريط الحالة الحية (Live Monitor) */}
      <div className="panel-status-bar">
        <div className="status-dot-active pulsing-dot"></div>
        <span className="status-text">{status}</span>
      </div>

      {/* تأثير المسح الضوئي (Scanner Effect) الذي يمر فوق اللوحة لفخامة التصميم */}
      <div className="panel-scan-line"></div>
    </div>
  );
};

export default BalancePanel;
