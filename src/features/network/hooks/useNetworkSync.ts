import { useState, useEffect } from 'react';
// ✅ تم استخدام 'import type' لمنع انهيار الشاشة في Vite
import type { NetworkNode, UserLocation } from '../types/network';

export const useNetworkSync = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userStats, setUserStats] = useState<UserLocation | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNetworkData = async () => {
      try {
        if (isMounted) setLoading(true);
        
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
          lat: 30.010,
          lng: 31.230,
          searchRange: 1, 
          level: 14,
          balance: 125.75
        };

        if (isMounted) {
          setNodes(mockNodes);
          setUserStats(mockUser);
        }
      } catch (error) {
        console.error("Matrix Neural Sync Error:", error);
      } finally {
        if (isMounted) {
          const timer = setTimeout(() => {
            if (isMounted) setLoading(false);
          }, 1500);
          return () => clearTimeout(timer);
        }
      }
    };

    fetchNetworkData();
    return () => { isMounted = false; };
  }, []);

  return { nodes, loading, userStats };
};
