import React from 'react';

// الحفاظ على نفس المسميات (user, action, time) لضمان عدم كسر أي مكون أب
const ActivityItem: React.FC<{user: string, action: string, time: string}> = ({user, action, time}) => (
  <div className="activity-item">
    {/* نقطة الحالة المتوهجة - تعكس النشاط اللحظي في الماتريكس */}
    <div className="status-dot"></div>
    <div className="activity-content">
      <p>
        <strong style={{ color: '#eab308' }}>{user}</strong> {action}
      </p>
      <span className="activity-time">{time}</span>
    </div>
  </div>
);

export default ActivityItem;
