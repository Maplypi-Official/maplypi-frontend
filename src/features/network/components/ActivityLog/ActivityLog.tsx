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

/**
 * 📟 ActivityLog - نسخة الـ HUD المصغرة (Bottom-Right)
 * تم تصغير الأبعاد لضمان عدم تداخل اللوحات ومنع الـ Scrolling.
 */
const ActivityLog: React.FC<ActivityLogProps> = ({ data }) => {
  // بيانات افتراضية لضمان استمرارية الواجهة في حالة عدم وجود داتا من الباك أند
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'SYS', action: 'NEURAL LINK ACTIVE', time: 'LIVE' },
    { id: '2', user: 'NET', action: 'SCANNING NODES...', time: '2s' },
  ];

  // الحفاظ على نفس مسمى المتغير لضمان عدم الكسر
  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container glass-panel-v3">
      {/* تأثير خط المسح التقني (Scanner Line) */}
      <div className="panel-scan-line"></div>

      {/* الهيدر التقني - حجم مصغر */}
      <div className="activity-header">
        <h3 className="activity-title">NETWORK FEED</h3>
        <div className="live-badge-wrapper">
          <div className="live-badge-dot"></div>
          <span className="live-badge-text">LIVE</span>
        </div>
      </div>

      {/* عرض الأنشطة - قائمة محدودة الارتفاع لمنع الـ Scrolling */}
      <div className="activity-list">
        {logsToDisplay.slice(0, 3).map((log) => (
          <div key={log.id} className="compact-log-item">
             <ActivityItem 
                user={log.user} 
                action={log.action} 
                time={log.time} 
              />
          </div>
        ))}
      </div>

      {/* التذييل التقني - شريط الحالة السفلي */}
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
