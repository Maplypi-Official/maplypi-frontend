import React from 'react';
import './DailyRewards.css';

const DailyRewards: React.FC = () => {
  return (
    <section className="ts-panel daily-reward-panel">
      <h3 className="reward-title-mirror">DAILY REWARDS</h3>
      
      <div className="reward-content-wrapper">
        {/* شريط تسجيل الدخول */}
        <div className="progress-group">
          <div className="progress-info">
            <span className="p-text">Check-ins:</span>
            <span className="p-count">15/20</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* شريط المراجعات */}
        <div className="progress-group">
          <div className="progress-info">
            <span className="p-text">Reviews:</span>
            <span className="p-count">3/5</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* منطقة الصندوق (Chest) - تم استبدال الإيموجي بأيقونة فخمة */}
        <div className="chest-section">
          <div className="empty-slot-track">
             <div className="inner-glow-track"></div>
          </div>
          <div className="reward-chest-mirror">
             <span className="chest-icon">🧰</span> {/* يمكن استبدالها بصورة PNG لاحقاً */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyRewards;
