import { useState, useEffect } from 'react';
// استيراد التعريفات لضمان توافق الأنواع مع الباك أند
import { NetworkNode, UserLocation } from '../types/network';

export const useNetworkSync = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState(true);
  
  // إضافة حالة لإحصائيات المستخدم (Balance/Level) للوصول لشكل 100% طبق الأصل
  const [userStats, setUserStats] = useState<UserLocation | null>(null);

  useEffect(() => {
    // محاكاة جلب البيانات الحقيقية من الـ API والـ Socket.io
    const fetchNetworkData = async () => {
      try {
        setLoading(true);
        
        // هنا سيتم الربط مع الـ Backend API لاحقاً
        // البيانات الافتراضية الآن تطابق التصميم الفخم
        const mockNodes: NetworkNode[] = [
          { 
            id: 'n1', name: 'TechZone 314', type: 'Merchant', tier: 'Premium', 
            lat: 30.01, lng: 31.23, status: 'active' 
          },
          { 
            id: 'n2', name: 'UrbanMart Pi', type: 'Merchant', tier: 'Standard', 
            lat: 30.02, lng: 31.24, status: 'active',
            metadata: { isCheckingIn: true, distanceText: '50m' } 
          }
        ];

        const mockUser: UserLocation = {
          lat: 30.00,
          lng: 31.22,
          searchRange: 1, // 1km كما في التصميم
          level: 14,
          balance: 125.75
        };

        setNodes(mockNodes);
        setUserStats(mockUser);
      } catch (error) {
        console.error("Matrix Sync Error:", error);
      } finally {
        // تأخير بسيط لمحاكاة واقعية التحميل نيونياً
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchNetworkData();
  }, []);

  // الحفاظ على نفس المسميات المرجعة لضمان عدم كسر التطبيق
  return { nodes, loading, userStats };
};
