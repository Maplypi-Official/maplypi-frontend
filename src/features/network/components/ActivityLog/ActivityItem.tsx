import React from 'react';

interface ActivityItemProps {
  user: string;
  action: string;
  time: string;
}

/**
 * 📟 ActivityItem - النسخة الذرية الأسطورية (Ultra-Slim Edition)
 * تم ضغط العناصر عمودياً لضمان عدم حدوث سكرول نهائياً.
 * تم استبدال المسميات القديمة بحالة نظام مبتكرة (DEEP SCAN).
 */
const ActivityItem: React.FC<ActivityItemProps> = ({ user, action, time }) => {
  return (
    <div className="activity-item-nano">
      {/* المؤشر الضوئي - نسخة نحيفة جداً */}
      <div className="item-prefix">
        <span className="dot-blink"></span>
      </div>
      
      {/* محتوى السطر - كل البيانات في سطر واحد مضغوط */}
      <div className="item-core">
        <p className="item-text-wrapper">
          <span className="user-id">[{user.replace(/_/g, '')}]</span>
          <span className="action-msg">{action.replace(/_/g, ' ')}</span>
        </p>
        
        {/* الحالة المبتكرة الجديدة - DEEP SCAN بدل المسمى القديم */}
        <div className="item-meta">
          <span className="scan-status">DEEP SCAN</span>
          <span className="time-stamp">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
