/**
 * Maplypi Geo-Spatial Type Definitions
 * المسميات والأنواع متوافقة تماماً مع تصميم الخريطة والباك أند
 */

export type NodeTier = 'Premium' | 'Standard' | 'Basic';
export type NodeStatus = 'active' | 'pending' | 'maintenance';

export interface NetworkNode {
  id: string;
  name: string;
  type: 'Merchant' | 'Producer' | 'Guild' | 'Warehouse';
  tier: NodeTier;
  lat: number;
  lng: number;
  status: NodeStatus;
  metadata?: {
    distanceText?: string;
    isCheckingIn?: boolean;
    piVolume?: number;
  };
}

export interface UserLocation {
  lat: number;
  lng: number;
  searchRange: number; 
  level: number;
  balance: number;
}
