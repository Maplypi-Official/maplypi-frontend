import React from 'react';
import './StatsBoard.css';

// تعريف الـ Props لضمان التوافق مع بيانات الباك أند القادمة من الصفحة الأم
interface StatsBoardProps {
  data?: {
    activeNodes?: number;
    territoryControl?: number;
  };
  isLoading?: boolean;
}

const StatsBoard: React.FC<StatsBoardProps> = ({ data, isLoading }) => {
  // الحفاظ على الأرقام الافتراضية في حال لم تتوفر بيانات من السيرفر
  const nodes = data?.activeNodes ?? "1.2k";
  const territory = data?.territoryControl ? `${data.territoryControl}%` : "14.5%";

  return (
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
  );
};

export default StatsBoard;
