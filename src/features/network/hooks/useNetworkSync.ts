import { useState, useEffect } from 'react';
// ✅ استخدام 'import type' لضمان خفة الوزن وعدم كسر Vite/Build
import type { NetworkNode, UserLocation } from '../types/network';

/**
 * 📡 useNetworkSync - محرك المزامنة العصبي (Neural Sync Engine)
 * المسؤول عن جلب بيانات العقد وموقع المستخدم وإحصائيات الشبكة.
 * تم الحفاظ على المسميات (nodes, loading, userStats) لضمان استقرار الـ UI.
 */
export const useNetworkSync = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userStats, setUserStats] = useState<UserLocation | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNetworkData = async () => {
      try {
        if (isMounted) setLoading(true);
        
        // محاكاة بيانات العقد (Nodes) - متوافقة مع التوزيعة الأسطورية في الـ MapCanvas
        const mockNodes: NetworkNode[] = [
          { 
            id: 'n1', 
            name: 'TechZone 314', 
            type: 'Merchant', 
            tier: 'Premium', 
            lat: 30.012, 
            lng: 31.232, 
            status: 'active' 
          },
          { 
            id: 'n2', 
            name: 'UrbanMart Pi', 
            type: 'Merchant', 
            tier: 'Standard', 
            lat: 30.007, 
            lng: 31.226, 
            status: 'active',
            metadata: { isCheckingIn: true, distanceText: '50m' } 
          },
          {
            id: 'n3',
            name: 'Alpha Node',
            type: 'Warehouse',
            tier: 'Basic',
            lat: 30.014,
            lng: 31.231,
            status: 'active'
          }
        ];

        // محاكاة بيانات المستخدم (User Stats) - متوافقة مع الـ Backend
        const mockUser: UserLocation = {
          lat: 30.010,
          lng: 31.230,
          searchRange: 1, 
          level: 14,
          balance: 125.75
        };

        // تأخير بسيط لمحاكاة زمن استجابة السيرفر الحقيقي (1.5 ثانية)
        if (isMounted) {
          setNodes(mockNodes);
          setUserStats(mockUser);
        }
      } catch (error) {
        console.error("Matrix Neural Sync Error:", error);
      } finally {
        if (isMounted) {
          // محاكاة زمن التحميل لإظهار الـ Loading Animation الفخم
          const timer = setTimeout(() => {
            if (isMounted) setLoading(false);
          }, 1500);
          return () => clearTimeout(timer);
        }
      }
    };

    fetchNetworkData();

    // تنظيف المكون (Cleanup) لمنع تداخل العمليات
    return () => { isMounted = false; };
  }, []);

  return { nodes, loading, userStats };
};
