import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

/**
 * 📟 ActivityLog - النسخة الأسطورية (Floating Nano Edition)
 * تم تثبيت الارتفاع لمنع الـ Scroll ورفع اللوحة فوق الـ Navbar.
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
  // بيانات افتراضية قوية لمنع الفراغ البصري
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'SYS', action: 'NEURAL LINK ACTIVE', time: 'LIVE' },
    { id: '2', user: 'NET', action: 'SCANNING NODES...', time: '2s' },
  ];

  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container glass-panel-v3">
      {/* رأس اللوحة التقني */}
      <div className="activity-header">
        <h3 className="activity-title">NETWORK FEED</h3>
        <div className="live-badge-wrapper">
          <div className="live-badge-dot"></div>
          <span className="live-badge-text">LIVE</span>
        </div>
      </div>

      {/* عرض سطرين فقط لضمان النظافة البصرية وعدم الحاجة لسكرول */}
      <div className="activity-list">
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

      {/* فوتر الـ Terminal لزيادة الفخامة */}
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
