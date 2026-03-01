import { useState, useEffect } from 'react';
// تأكد من أن مسار الأنواع صحيح ولا يسبب خطأ في الاستيراد
import { NetworkNode, UserLocation } from '../types/network';

export const useNetworkSync = () => {
  // تهيئة الحالة بقيم افتراضية (مصفوفة فارغة) لمنع خطأ .length
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userStats, setUserStats] = useState<UserLocation | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNetworkData = async () => {
      try {
        if (isMounted) setLoading(true);
        
        /**
         * بيانات الشبكة الافتراضية - مطابقة للهوية البصرية للـ Matrix
         * تم التأكد من مطابقة الحقول للأنواع المعرفة في types/network
         */
        const mockNodes: NetworkNode[] = [
          { 
            id: 'n1', 
            name: 'TechZone 314', 
            type: 'Merchant', 
            tier: 'Premium', 
            lat: 30.01, 
            lng: 31.23, 
            status: 'active' 
          },
          { 
            id: 'n2', 
            name: 'UrbanMart Pi', 
            type: 'Merchant', 
            tier: 'Standard', 
            lat: 30.02, 
            lng: 31.24, 
            status: 'active',
            metadata: { isCheckingIn: true, distanceText: '50m' } 
          }
        ];

        const mockUser: UserLocation = {
          lat: 30.00,
          lng: 31.22,
          searchRange: 1, 
          level: 14,
          balance: 125.75
        };

        // المزامنة الفعلية للبيانات
        if (isMounted) {
          setNodes(mockNodes);
          setUserStats(mockUser);
        }
      } catch (error) {
        // تسجيل الخطأ بدقة لتسهيل تتبعه في المتصفح
        console.error("Matrix Neural Sync Error:", error);
      } finally {
        if (isMounted) {
          /**
           * تأخير محاكاة تحميل الشبكة لإعطاء إحساس بالمزامنة الحية.
           * هذا يتوافق مع ظهور AppLoader الذي أضفناه سابقاً.
           */
          setTimeout(() => {
            if (isMounted) setLoading(false);
          }, 1500); 
        }
      }
    };

    fetchNetworkData();
    
    // Cleanup function لمنع الـ Memory Leaks أو تحديث الحالة بعد إلغاء المكون
    return () => { 
      isMounted = false; 
    };
  }, []);

  return { nodes, loading, userStats };
};
