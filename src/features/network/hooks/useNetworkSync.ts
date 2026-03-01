import { useState, useEffect } from 'react';
/**
 * ⚠️ تنبيه: تأكد أن ملف الأنواع (network.ts) موجود في المسار الصحيح 
 * لمنع خطأ "Module not found" الذي يسبب السواد التام.
 */
import { NetworkNode, UserLocation } from '../types/network';

export const useNetworkSync = () => {
  // 1. تهيئة الحالة بمصفوفة فارغة وقيمة null مؤمنة
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userStats, setUserStats] = useState<UserLocation | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNetworkData = async () => {
      try {
        if (isMounted) setLoading(true);
        
        /**
         * 🛠️ محاكاة بيانات الشبكة (Mock Data) 
         * تم ضبط الإحداثيات لتكون قريبة من بعضها لضمان ظهور الـ Pins على الخريطة فوراً.
         */
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
            lat: 30.015, 
            lng: 31.235, 
            status: 'active',
            metadata: { isCheckingIn: true, distanceText: '50m' } 
          }
        ];

        const mockUser: UserLocation = {
          lat: 30.010, // إحداثيات مركزية قريبة من الـ Nodes
          lng: 31.230,
          searchRange: 1, 
          level: 14,
          balance: 125.75
        };

        // تحديث الحالة فقط إذا كان المكون لا يزال موجوداً في الذاكرة
        if (isMounted) {
          setNodes(mockNodes);
          setUserStats(mockUser);
        }
      } catch (error) {
        // تسجيل الخطأ في الـ Console للمساعدة في التصحيح
        console.error("Matrix Neural Sync Error:", error);
      } finally {
        if (isMounted) {
          /**
           * مزامنة زمنية تتوافق مع نظام الـ AppLoader الفخم
           */
          const timer = setTimeout(() => {
            if (isMounted) setLoading(false);
          }, 1500);
          
          return () => clearTimeout(timer);
        }
      }
    };

    fetchNetworkData();
    
    // تنظيف (Cleanup) لمنع تحديث الحالة لمكون تم إغلاقه
    return () => { 
      isMounted = false; 
    };
  }, []);

  // إرجاع القيم بنفس المسميات الأصلية لضمان عدم كسر المكونات المستهلكة
  return { nodes, loading, userStats };
};
