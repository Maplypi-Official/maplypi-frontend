import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

interface LogEntry { id: string; user: string; action: string; time: string; }
interface ActivityLogProps { data?: LogEntry[]; }

const ActivityLog: React.FC<ActivityLogProps> = ({ data }) => {
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'SYS', action: 'NEURAL LINK ACTIVE', time: 'LIVE' },
    { id: '2', user: 'NET', action: 'SCANNING NODES...', time: '2s' },
  ];

  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container glass-panel-v3">
      <div className="activity-header">
        <h3 className="activity-title">MAPLY FEED</h3>
        <div className="live-badge-wrapper">
          <div className="live-badge-dot"></div>
          <span className="live-badge-text">LIVE</span>
        </div>
      </div>

      <div className="activity-list">
        {/* سطرين فقط لضمان الثبات البصري */}
        {logsToDisplay.slice(0, 2).map((log) => (
          <div key={log.id} className="compact-log-item">
             <ActivityItem user={log.user} action={log.action} time={log.time} />
          </div>
        ))}
      </div>

      <div className="activity-footer">
        <div className="footer-line"></div>
        <div className="terminal-prompt">
          {/* هوية جذابة وقوية تعبر عن خريطة MaplyPi */}
          <span className="terminal-user">MAPLY_PI//GLOBAL_SCAN:</span>
          <span className="terminal-cursor">■</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
