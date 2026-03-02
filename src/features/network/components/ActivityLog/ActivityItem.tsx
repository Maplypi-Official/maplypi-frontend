import React from 'react';

/**
 * 📡 ActivityItem - النسخة النهائية الاحترافية
 * تم الحفاظ على المسميات (user, action, time) لضمان التوافق مع الباك أند
 * تم إضافة هيكل الـ HUD المتطور لتعزيز الهوية البصرية للشبكة
 */

interface ActivityItemProps {
  user: string;
  action: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ user, action, time }) => {
  return (
    <div className="activity-item">
      {/* المؤشر الضوئي الحي (Live Pulse) */}
      <div className="status-indicator">
        <div className="status-dot-wrapper">
          <div className="status-dot"></div>
          <div className="status-dot-inner"></div>
        </div>
        <div className="status-line"></div>
      </div>
      
      {/* محتوى النشاط بتنسيق احترافي */}
      <div className="activity-content">
        <div className="activity-main">
          <p className="activity-text">
            <span className="user-tag">{user}</span>
            <span className="action-text">{action}</span>
          </p>
        </div>
        
        {/* توقيت النشاط بتنسيق الساعات الذرية */}
        <div className="activity-meta">
          <span className="activity-time-icon"></span>
          <span className="activity-time">{time}</span>
        </div>
      </div>

      {/* لمسة تقنية: زاوية زخرفية صغيرة */}
      <div className="item-corner-accent"></div>
    </div>
  );
};

export default ActivityItem;
