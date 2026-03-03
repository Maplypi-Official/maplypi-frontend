import React from 'react';
import './HUD.css';

/**
 * 🪙 BalancePanel - لوحة الرصيد الملكية (Premium E-commerce Edition)
 * تم الحفاظ على المسميات الأصلية (Props & Functions) لضمان التوافق مع الـ Backend.
 * التعديل شمل تنظيف العرض البصري وحذف الـ Underscores في الواجهة فقط.
 */
interface BalancePanelProps {
  balance?: string | number;
  status?: string;
}

const BalancePanel: React.FC<BalancePanelProps> = ({ 
  balance = "125.75", 
  status = "SECURE_SYNC_ACTIVE" 
}) => {
  
  // دالة بسيطة لتنظيف النصوص من الـ Underscores في العرض فقط دون تغيير القيمة الأصلية
  const formatStatus = (text: string) => {
    return text.replace(/_/g, ' ').toLowerCase();
  };

  return (
    <div className="balance-panel-v3 glass-panel-v3 gold-glow-border">
      
      {/* 👑 رأس اللوحة - أيقونة فخمة ونص نظيف */}
      <div className="panel-header" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="fas fa-wallet" style={{ color: '#eab308', fontSize: '12px' }}></i>
        <span className="panel-label" style={{ fontSize: '10px', color: '#eab308', fontWeight: 800, letter-spacing: '0.5px' }}>
          NETWORK CREDITS
        </span>
      </div>

      {/* 💰 منطقة القيمة المالية - تصميم "Luxury" */}
      <div className="balance-value-container" style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span className="currency-symbol" style={{ fontSize: '18px', color: '#eab308', fontWeight: 900 }}>π</span>
        <h2 className="ui-bal-value" style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>
          {balance}
        </h2>
      </div>

      {/* 🟢 شريط الحالة الحية - نص نظيف واحترافي */}
      <div className="panel-status-bar" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6px' }}>
        <div className="status-dot-active pulsing-dot" style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }}></div>
        <span className="status-text" style={{ fontSize: '9px', color: '#94a3b8', textTransform: 'capitalize', fontWeight: 600 }}>
          {formatStatus(status)}
        </div>
      </div>

      {/* ✨ تأثير المسح الضوئي الفخم */}
      <div className="panel-scan-line"></div>
    </div>
  );
};

export default BalancePanel;
