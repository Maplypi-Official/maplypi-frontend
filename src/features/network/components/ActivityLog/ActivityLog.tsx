import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

/**
 * 📈 ActivityLog - النسخة الملكية (Premium Trade Feed)
 * تم تحويل سجل النشاط إلى "خلاصات حية" تعبر عن حركة السوق والشبكة بفخامة.
 * تم الحفاظ على الـ Props والـ المسميات لضمان عدم كسر الربط مع الـ Backend.
 */
interface LogEntry { id: string; user: string; action: string; time: string; }
interface ActivityLogProps { data?: LogEntry[]; }

const ActivityLog: React.FC<ActivityLogProps> = ({ data }) => {
  // بيانات افتراضية تعكس الهوية الجديدة (بدون Underscores وبمصطلحات فخمة)
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'Global', action: 'Market Pulse Active', time: 'LIVE' },
    { id: '2', user: 'Network', action: 'Syncing Local Nodes', time: '1s' },
  ];

  const logsToDisplay = data || defaultLogs;

  // دالة تنظيف النصوص لضمان الفخامة في العرض (UI Only)
  const cleanText = (text: string) => text.replace(/_/g, ' ');

  return (
    <div className="activity-container glass-panel-v3 gold-glow-border">
      {/* 🚀 رأس اللوحة - عنوان فخم مع مؤشر مباشر */}
      <div className="activity-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="activity-title" style={{ fontSize: '11px', color: '#ffffff', fontWeight: 800, letterSpacing: '0.8px', margin: 0 }}>
          MAPLY FEED
        </h3>
        <div className="live-badge-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '10px' }}>
          <div className="live-badge-dot" style={{ width: '5px', height: '5px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 5px #10b981' }}></div>
          <span className="live-badge-text" style={{ fontSize: '8px', color: '#10b981', fontWeight: 900 }}>LIVE</span>
        </div>
      </div>

      {/* 📝 قائمة النشاط - سطرين بنصوص نظيفة لضمان الثبات البصري */}
      <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {logsToDisplay.slice(0, 2).map((log) => (
          <div key={log.id} className="compact-log-item" style={{ borderLeft: '2px solid rgba(234, 179, 8, 0.3)', paddingLeft: '8px' }}>
             <ActivityItem 
                user={cleanText(log.user)} 
                action={cleanText(log.action)} 
                time={log.time} 
             />
          </div>
        ))}
      </div>

      {/* 💎 فوتر اللوحة - هوية جذابة تعبر عن القوة والابتكار */}
      <div className="activity-footer" style={{ marginTop: '10px' }}>
        <div className="footer-line" style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '8px' }}></div>
        <div className="terminal-prompt" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="terminal-user" style={{ fontSize: '9px', color: '#eab308', fontWeight: 800 }}>
            MAPLY SYSTEM ACTIVE:
          </span>
          <span className="terminal-cursor" style={{ color: '#ffffff', animation: 'flicker 1s infinite' }}>■</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
