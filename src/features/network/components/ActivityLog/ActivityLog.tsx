import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

interface LogEntry {
  id: string;
  user: string;
  action: string;
  time: string;
}

interface ActivityLogProps {
  data?: LogEntry[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ data }) => {
  // بيانات تجريبية بنفس هيكل الـ Backend لضمان عدم فراغ اللوحة
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'SYSTEM', action: 'NEURAL LINK ESTABLISHED', time: 'ACTIVE' },
    { id: '2', user: 'NETWORK', action: 'SCANNING NEARBY NODES', time: '2s ago' },
  ];

  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container">
      {/* الهيدر التقني */}
      <div className="activity-header">
        <h3 className="activity-title">Live Network Feed</h3>
        <div className="live-badge-wrapper">
          <div className="live-badge-dot"></div>
          <span className="live-badge-text">LIVE</span>
        </div>
      </div>

      {/* عرض الأنشطة */}
      <div className="activity-list">
        {logsToDisplay.map((log) => (
          <ActivityItem 
            key={log.id} 
            user={log.user} 
            action={log.action} 
            time={log.time} 
          />
        ))}
      </div>

      {/* التذييل التقني */}
      <div className="activity-footer">
        <div className="footer-line"></div>
        <span className="terminal-cursor">_</span>
      </div>
    </div>
  );
};

export default ActivityLog;
