import React from 'react';
import ActivityItem from './ActivityItem';
import './ActivityLog.css';

const ActivityLog: React.FC = () => (
  <div className="activity-container">
    <h3 className="activity-title">Live Network Feed</h3>
    <ActivityItem user="User_402" action="Connected to Node A" time="2m ago" />
    <ActivityItem user="Merchant_Pi" action="Updated Inventory" time="5m ago" />
  </div>
);
export default ActivityLog;
