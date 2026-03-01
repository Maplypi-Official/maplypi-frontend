import React from 'react';
import './StatsBoard.css';

// التحديث ليتوافق مع الـ Types الجديدة والباك أند دون تغيير المسميات الأساسية
interface StatsBoardProps {
  data?: {
    activeNodes?: number;
    territoryControl?: number;
    // إضافة حقول الرصيد والمستوى للوصول لتطابق 100%
    balance?: number;
    level?: number;
  };
  isLoading?: boolean;
}

const StatsBoard: React.FC<StatsBoardProps> = ({ data, isLoading }) => {
  // الحفاظ على الأرقام الافتراضية طبقاً للتصميم
  const nodes = data?.activeNodes ?? "1.2k";
  const territory = data?.territoryControl ? `${data.territoryControl}%` : "14.5%";
  const balance = data?.balance ?? "125.75";
  const level = data?.level ?? "14";

  return (
    <div className="stats-board-wrapper">
      {/* قسم الإحصائيات الشبكية - الهيكل الأصلي */}
      <div className="stats-grid">
        <div className="stat-card border-gold">
          <p className="label">Network Reach</p>
          <p className="value gold-text">
            {isLoading ? "---" : `${nodes} Nodes`}
          </p>
        </div>
        
        <div className="stat-card border-purple">
          <p className="label">Territory Control</p>
          <p className="value purple-text">
            {isLoading ? "---" : territory}
          </p>
        </div>
      </div>

      {/* لوحة الرصيد والمستوى - الإضافة التجميلية للوصول للشكل "طبق الأصل" */}
      <div className="balance-card-overlay border-gold">
         <div className="balance-info">
            <p className="label-sm">MY PI BALANCE:</p>
            <p className="value-lg gold-text">{isLoading ? "---" : `${balance} π`}</p>
         </div>
         <div className="level-info">
            <p className="level-badge">LEVEL: {isLoading ? "--" : level}</p>
         </div>
      </div>
    </div>
  );
};

export default StatsBoard;
