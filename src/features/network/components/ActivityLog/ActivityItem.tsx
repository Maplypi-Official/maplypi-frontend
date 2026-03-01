import React from 'react';

// الحفاظ على نفس المسميات (user, action, time) لضمان التوافق المطلق
const ActivityItem: React.FC<{user: string, action: string, time: string}> = ({user, action, time}) => (
  <div className="activity-item">
    {/* نقطة الحالة المتوهجة - تعكس النبض الحي للشبكة */}
    <div className="status-indicator">
      <div className="status-dot"></div>
      <div className="status-line"></div>
    </div>
    
    <div className="activity-content">
      <p className="activity-text">
        <span className="user-tag">{user}</span> {action}
      </p>
      <span className="activity-time">{time}</span>
    </div>
  </div>
);

export default ActivityItem;
