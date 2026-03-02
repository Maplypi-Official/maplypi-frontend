/**
 * 🛰️ MaplyPi Geo-Spatial & Network Type Definitions
 * المسميات والأنواع متوافقة تماماً مع تصميم الخريطة والباك أند (Core Logic).
 * هذا الملف هو المرجع الأساسي لضمان عدم كسر التوافقية (Backward Compatibility).
 */

export type NodeTier = 'Premium' | 'Standard' | 'Basic';
export type NodeStatus = 'active' | 'pending' | 'maintenance';

/**
 * 📍 NetworkNode: يمثل أي نقطة أو متجر أو عقدة تظهر على الخريطة
 */
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
    lastActive?: string;
  };
}

/**
 * 👤 UserLocation: يمثل حالة المستخدم الحالية وموقعه الجغرافي وإحصائياته
 */
export interface UserLocation {
  lat: number;
  lng: number;
  searchRange: number; 
  level: number;
  balance: number;
  sectorName?: string; // أضفنا علامة استفهام لضمان عدم الكسر إذا لم يتوفر الاسم
}

/**
 * 📝 ActivityItem: لضمان عمل سجل النشاط (Activity Log) بكفاءة مع البيانات
 */
export interface ActivityItem {
  id: string;
  type: 'node_found' | 'sync_success' | 'alert' | 'transaction';
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'success';
}

/**
 * 🛠️ NetworkState: يمثل الحالة العامة للـ Feature (مفيد للـ Redux أو Context)
 */
export interface NetworkState {
  nodes: NetworkNode[];
  userStats: UserLocation | null;
  loading: boolean;
  error: string | null;
}
