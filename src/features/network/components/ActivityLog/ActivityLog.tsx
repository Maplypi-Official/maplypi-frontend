import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

/**
 * 📟 ActivityLog - نسخة الـ HUD المصغرة (الركن السفلي الأيمن)
 * تم الحفاظ على الهيكل البرمجي لضمان التوافق التام مع الـ Backend.
 * التعديلات بصرية فقط لضمان "الفخامة" وعدم تداخل اللوحات.
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
  // بيانات افتراضية (Fallback) لضمان عدم وجود مساحة فارغة في حالة تأخر الـ Backend
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'SYS', action: 'NEURAL LINK ACTIVE', time: 'LIVE' },
    { id: '2', user: 'NET', action: 'SCANNING NODES...', time: '2s' },
  ];

  // الحفاظ على نفس مسمى المتغير لضمان استقرار الربط البرمجي
  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container glass-panel-v3">
      {/* تأثير خط المسح التقني (Scanner Line) المتحرك */}
      <div className="panel-scan-line"></div>

      {/* الهيدر التقني - تصميم HUD مصغر */}
      <div className="activity-header">
        <h3 className="activity-title">NETWORK FEED</h3>
        <div className="live-badge-wrapper">
          <div className="live-badge-dot pulse-red"></div>
          <span className="live-badge-text">LIVE</span>
        </div>
      </div>

      {/* عرض الأنشطة - تم تحديد العدد لمنع الـ Scrolling والحفاظ على مساحة الخريطة */}
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

      {/* التذييل التقني - شريط الحالة السفلي (Terminal Style) */}
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
