import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

/**
 * 📟 ActivityLog - النسخة الذرية المصغرة (Nano HUD)
 * تم تقليص الحجم بنسبة 40% مع الحفاظ على الهيكل البرمجي.
 */
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
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'SYS', action: 'NEURAL LINK ACTIVE', time: 'LIVE' },
    { id: '2', user: 'NET', action: 'SCANNING NODES...', time: '2s' },
  ];

  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container glass-panel-v3">
      {/* خط المسح التقني */}
      <div className="panel-scan-line"></div>

      <div className="activity-header">
        <h3 className="activity-title">NETWORK FEED</h3>
        <div className="live-badge-wrapper">
          <div className="live-badge-dot"></div>
          <span className="live-badge-text">LIVE</span>
        </div>
      </div>

      <div className="activity-list">
        {/* عرض سطرين فقط لضمان عدم الحاجة لـ Scroll نهائياً */}
        {logsToDisplay.slice(0, 2).map((log) => (
          <div key={log.id} className="compact-log-item">
             <ActivityItem 
                user={log.user} 
                action={log.action} 
                time={log.time} 
              />
          </div>
        ))}
      </div>

      <div className="activity-footer">
        <div className="footer-line"></div>
        <div className="terminal-prompt">
          <span className="terminal-user">root@maply:</span>
          <span className="terminal-cursor">_</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
