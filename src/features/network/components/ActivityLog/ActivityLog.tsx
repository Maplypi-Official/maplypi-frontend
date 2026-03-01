import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

// تعريف الـ Interface بما يتوافق مع هيكل البيانات في الباك أند
interface LogEntry {
  id: string;
  user: string;
  action: string;
  time: string;
}

const ActivityLog: React.FC<{ data?: LogEntry[] }> = ({ data }) => {
  // بيانات افتراضية تعكس روح الـ Matrix والماركت
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'TechZone_Node', action: 'Confirmed Premium Status', time: 'Just now' },
    { id: '2', user: 'UrbanMart_Pi', action: 'New Inventory Synchronized', time: '2m ago' },
    { id: '3', user: 'Explorer_Alpha', action: 'Initiated Checking-in [50m]', time: '5m ago' },
  ];

  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container">
      <div className="activity-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="activity-title">Live Network Feed</h3>
        <div className="live-badge">
          <span style={{ color: '#22c55e', fontSize: '9px', fontWeight: 'bold' }}>● LIVE</span>
        </div>
      </div>

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
    </div>
  );
};

export default ActivityLog;
