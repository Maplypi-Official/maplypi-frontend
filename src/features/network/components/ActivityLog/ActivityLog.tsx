import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

/**
 * 📡 ActivityLog - النسخة النهائية المستقرة
 * متوافق 100% مع هيكل بيانات الباك أند (LogEntry)
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
  // بيانات افتراضية تعكس هوية النظام في حالة عدم وجود بيانات حقيقية
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'TechZone_Node', action: 'Confirmed Premium Status', time: 'Just now' },
    { id: '2', user: 'UrbanMart_Pi', action: 'New Inventory Synchronized', time: '2m ago' },
    { id: '3', user: 'Explorer_Alpha', action: 'Initiated Checking-in [50m]', time: '5m ago' },
  ];

  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container">
      {/* رأس القائمة بتصميم الـ HUD */}
      <div className="activity-header">
        <h3 className="activity-title">Live Network Feed</h3>
        <div className="live-badge-wrapper">
          <div className="live-badge-dot"></div>
          <span className="live-badge-text">LIVE FEED</span>
        </div>
      </div>

      {/* قائمة الأنشطة - تمرير البيانات دون تغيير المسميات */}
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

      {/* لمسة نهائية تقنية في أسفل القائمة */}
      <div className="activity-footer">
        <div className="footer-line"></div>
        <span className="terminal-cursor">_</span>
      </div>
    </div>
  );
};

export default ActivityLog;
