import React from 'react';

interface ActivityItemProps {
  user: string;
  action: string;
  time: string;
}

/**
 * 📟 ActivityItem - النسخة المصغرة الاحترافية
 * تم تحسين الهيكل البصري ليتناسب مع لوحة الـ HUD الجانبية بدون استهلاك مساحة.
 */
const ActivityItem: React.FC<ActivityItemProps> = ({ user, action, time }) => {
  return (
    <div className="activity-item">
      {/* المؤشر الضوئي الحي (Live Pulse) - تصميم رفيع */}
      <div className="status-indicator">
        <div className="status-dot"></div>
        <div className="status-line"></div>
      </div>
      
      {/* محتوى النشاط بتنسيق Terminal متناسق */}
      <div className="activity-content">
        <p className="activity-text">
          <span className="user-tag">{user} </span>
          <span className="action-text">{action}</span>
        </p>
        
        {/* التوقيت بتنسيق باهت لإعطاء الأولوية للحدث */}
        <span className="activity-time">{time}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
