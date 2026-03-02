import React from 'react';
import './StatsBoard.css';

/**
 * 📊 StatsBoard - لوحة البيانات الإحصائية المركزية
 * تم الحفاظ على المسميات (activeNodes, territoryControl, balance) لضمان الربط مع الـ API
 */
interface StatsBoardProps {
  data?: {
    activeNodes?: number | string;
    territoryControl?: number | string;
    balance?: number | string;
    level?: number | string;
  };
  isLoading?: boolean;
}

const StatsBoard: React.FC<StatsBoardProps> = ({ data, isLoading }) => {
  // الحفاظ على الأرقام الافتراضية "الأسطورية" في حال تأخر الـ Backend
  const nodes = data?.activeNodes ?? "1,254";
  const territory = data?.territoryControl 
    ? (typeof data.territoryControl === 'number' ? `${data.territoryControl}%` : data.territoryControl) 
    : "14.5%";
  const balance = data?.balance ?? "125.75";
  const level = data?.level ?? "14";

  return (
    <div className="stats-board-wrapper">
      <div className="stats-grid">
        {/* كارت وصول الشبكة */}
        <div className="stat-card border-gold">
          <div className="card-scanner"></div>
          <p className="label">Network Reach</p>
          <p className="value gold-text">
            {isLoading ? "SYNCING..." : `${nodes} Nodes`}
          </p>
        </div>
        
        {/* كارت السيطرة على القطاع */}
        <div className="stat-card border-purple">
          <div className="card-scanner"></div>
          <p className="label">Territory Control</p>
          <p className="value purple-text">
            {isLoading ? "CALCULATING..." : territory}
          </p>
        </div>
      </div>

      {/* لوحة الرصيد المدمجة - HUD Style */}
      <div className="balance-card-overlay border-gold-glow">
         <div className="balance-info">
            <p className="label-sm">ACCOUNT_BALANCE:</p>
            <p className="value-lg gold-text">
              {isLoading ? "LOADING..." : `${balance} π`}
            </p>
         </div>
         <div className="level-info">
            <div className="level-badge">
              <span className="level-label">LVL</span>
              <span className="level-number">{level}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StatsBoard;
