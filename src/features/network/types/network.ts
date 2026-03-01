/**
 * Maplypi Geo-Spatial Type Definitions
 * المسميات والأنواع متوافقة تماماً مع تصميم الخريطة والباك أند
 */

export type NodeTier = 'Premium' | 'Standard' | 'Basic';
export type NodeStatus = 'active' | 'pending' | 'maintenance';

export interface NetworkNode {
  // المعرف الفريد للنقطة على الخريطة
  id: string;
  
  // اسم المتجر أو المصنع (مثال: TechZone 314)
  name: string;
  
  // النوع بناءً على نظام Supply Chain
  type: 'Merchant' | 'Producer' | 'Guild' | 'Warehouse';
  
  // المستوى الذي يحدد شكل الأيقونة (ذهبي متوهج للـ Premium)
  tier: NodeTier;
  
  // الإحداثيات الجغرافية الدقيقة للـ GPS
  lat: number;
  lng: number;
  
  // الحالة التشغيلية للعقدة
  status: NodeStatus;
  
  // بيانات إضافية للظهور طبق الأصل في الـ UI
  metadata?: {
    // المسافة الحالية للمستخدم (مثال: 50m)
    distanceText?: string;
    
    // هل المستخدم في نطاق الـ Check-in حالياً؟
    isCheckingIn?: boolean;
    
    // إجمالي رصيد Pi المرتبط بهذه العقدة
    piVolume?: number;
  };
}

/**
 * تعريف بيانات المستخدم الحالية على الخريطة
 */
export interface UserLocation {
  lat: number;
  lng: number;
  // مدى البحث الجغرافي (مثال: 1km)
  searchRange: number; 
  // مستوى المستخدم الحالي
  level: number;
  // رصيد Pi الفعلي
  balance: number;
}
