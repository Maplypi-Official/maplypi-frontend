import React from 'react';
import './StatsBoard.css';

// التحديث ليتوافق مع الـ Types الجديدة والباك أند دون تغيير المسميات الأساسية
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
  // الحفاظ على الأرقام الافتراضية طبقاً للتصميم الأصلي
  const nodes = data?.activeNodes ?? "1.2k";
  const territory = data?.territoryControl 
    ? (typeof data.territoryControl === 'number' ? `${data.territoryControl}%` : data.territoryControl) 
    : "14.5%";
  const balance = data?.balance ?? "125.75";
  const level = data?.level ?? "14";

  return (
    <div className="stats-board-wrapper">
      {/* قسم الإحصائيات الشبكية - الهيكل الأصلي مع إضافة الروح الأسطورية */}
      <div className="stats-grid">
        <div className="stat-card border-gold">
          <div className="card-scanner"></div>
          <p className="label">Network Reach</p>
          <p className="value gold-text">
            {isLoading ? "SYNCING..." : `${nodes} Nodes`}
          </p>
        </div>
        
        <div className="stat-card border-purple">
          <div className="card-scanner"></div>
          <p className="label">Territory Control</p>
          <p className="value purple-text">
            {isLoading ? "CALCULATING..." : territory}
          </p>
        </div>
      </div>

      {/* لوحة الرصيد والمستوى - الشكل "طبق الأصل" الاحترافي */}
      <div className="balance-card-overlay border-gold-glow">
         <div className="balance-info">
            <p className="label-sm">MY PI BALANCE:</p>
            <p className="value-lg gold-text">
              {isLoading ? "---" : `${balance} π`}
            </p>
         </div>
         <div className="level-info">
            <div className="level-badge">
              <span className="level-label">LEVEL</span>
              <span className="level-number">{isLoading ? "--" : level}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StatsBoard;
