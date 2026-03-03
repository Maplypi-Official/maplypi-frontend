import React from 'react';

interface ActivityItemProps {
  user: string;
  action: string;
  time: string;
}

/**
 * 📟 ActivityItem - النسخة الملكية (Premium Slim Edition)
 * تم ضغط العناصر لتوفير مساحة رؤية وضمان عدم حدوث سكرول.
 * الهوية الجديدة تركز على الفخامة التجارية (MaplyPi Identity).
 */
const ActivityItem: React.FC<ActivityItemProps> = ({ user, action, time }) => {
  
  // دالة تنظيف اليوزر من أي Underscores أو رموز مشوهة للعرض
  const cleanUser = user.replace(/_/g, '').toUpperCase();
  
  // دالة تنظيف النص الحركي (Action) ليكون شيك ومفهوم
  const cleanAction = action.replace(/_/g, ' ');

  return (
    <div className="activity-item-nano" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '2px 0' }}>
      
      {/* 🔵 المؤشر الضوئي - نبض أزرق هادئ يعبر عن حيوية البيانات */}
      <div className="item-prefix">
        <span className="dot-blink" style={{ width: '3px', height: '3px', background: '#3b82f6', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 5px #3b82f6' }}></span>
      </div>
      
      {/* 💎 محتوى السطر - تصميم "Luxury Minimalist" */}
      <div className="item-core" style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', overflow: 'hidden' }}>
        
        <p className="item-text-wrapper" style={{ margin: 0, fontSize: '9px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <span className="user-id" style={{ color: '#eab308', fontWeight: 800, marginRight: '5px' }}>{cleanUser}</span>
          <span className="action-msg" style={{ color: '#cbd5e1', fontWeight: 500 }}>{cleanAction}</span>
        </p>
        
        {/* 🕒 الحالة والوقت - خط صغير وأنيق جداً */}
        <div className="item-meta" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '8px' }}>
          <span className="scan-status" style={{ fontSize: '7px', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px' }}>LIVE</span>
          <span className="time-stamp" style={{ fontSize: '8px', color: '#94a3b8', fontFamily: 'Share Tech Mono, monospace' }}>{time}</span>
        </div>

      </div>
    </div>
  );
};

export default ActivityItem;
