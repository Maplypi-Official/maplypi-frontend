import { useState, useEffect } from 'react';
import { NetworkNode, UserLocation } from '../types/network.d';

export const useNetworkSync = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserLocation | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNetworkData = async () => {
      try {
        setLoading(true);
        
        // هنا سيتم الربط مع الـ Backend API لاحقاً عبر axios
        // البيانات الافتراضية الآن تطابق تصميم الـ Matrix
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

        if (isMounted) {
          setNodes(mockNodes);
          setUserStats(mockUser);
        }
      } catch (error) {
        console.error("Matrix Sync Error:", error);
      } finally {
        if (isMounted) {
          // تأخير محاكاة تحميل الشبكة العصبية
          setTimeout(() => setLoading(false), 1000);
        }
      }
    };

    fetchNetworkData();
    return () => { isMounted = false; };
  }, []);

  return { nodes, loading, userStats };
};
