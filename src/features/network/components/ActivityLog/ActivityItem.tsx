import React from 'react';

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
        <div className="status-dot"></div>
        <div className="status-line"></div>
      </div>
      
      {/* محتوى النشاط بتنسيق متوافق مع الـ Backend */}
      <div className="activity-content">
        <p className="activity-text">
          <span className="user-tag">{user} </span>
          <span className="action-text">{action}</span>
        </p>
        
        <span className="activity-time">{time}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
