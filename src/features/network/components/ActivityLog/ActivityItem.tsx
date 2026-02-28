import React from 'react';

const ActivityItem: React.FC<{user: string, action: string, time: string}> = ({user, action, time}) => (
  <div className="activity-item">
    <div className="status-dot"></div>
    <div className="activity-content">
      <p><strong>{user}</strong> {action}</p>
      <span>{time}</span>
    </div>
  </div>
);
export default ActivityItem;
