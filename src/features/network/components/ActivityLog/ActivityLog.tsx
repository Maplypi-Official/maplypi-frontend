import React, { useState, useEffect } from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

// تعريف واجهة البيانات لضمان التوافق مع ActivityItem والباك أند
interface LogEntry {
  id: string;
  user: string;
  action: string;
  time: string;
}

const ActivityLog: React.FC<{ data?: LogEntry[] }> = ({ data }) => {
  // بيانات افتراضية "فخمة" تظهر في حالة عدم وجود بيانات من الباك أند
  const defaultLogs: LogEntry[] = [
    { id: '1', user: 'System_Node', action: 'Matrix Grid Initialized', time: 'Just now' },
    { id: '2', user: 'User_402', action: 'Connected to Node A', time: '2m ago' },
    { id: '3', user: 'Merchant_Pi', action: 'Updated Inventory', time: '5m ago' },
  ];

  // استخدام البيانات القادمة من Props (الباك أند) أو البيانات الافتراضية
  const logsToDisplay = data || defaultLogs;

  return (
    <div className="activity-container">
      <div className="activity-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="activity-title">Live Network Feed</h3>
        <span style={{ color: '#22c55e', fontSize: '10px', fontWeight: 'bold' }}>● LIVE</span>
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
