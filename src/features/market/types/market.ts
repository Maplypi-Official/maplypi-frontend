/**
 * تعريف هيكل المنتجات لدعم التجارة الواقعية والافتراضية
 * تم الحفاظ على المسميات الأصلية لضمان عدم كسر التوافق مع Backend و Frontend
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  // دعم التصنيفات الحالية مع السماح بتصنيفات مخصصة
  category: 'Food' | 'Tech' | 'Craft' | 'Legendary' | 'Mythic' | 'CyberTech' | string; 
  stock: number;
  quality: number;
  image: string;
  status?: 'available' | 'out_of_stock';
  description?: string;
  
  /** * إضافات لدعم رؤية المستخدم للمنتجات الحقيقية والافتراضية 
   * اختياري (Optional) لضمان عدم كسر البيانات القديمة
   */
  origin?: 'REAL_WORLD' | 'VIRTUAL'; // لتحديد إذا كان المنتج ملموساً أم رقمياً
  ownerId?: string; // لربط المنتج بحساب البائع في شبكة Pi
  location?: string; // في حال كان منتجاً واقعياً يحتاج شحن
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  totalAmount: number;
  currency: 'Pi';
  timestamp: Date | string;
  // إضافة حالة الطلب لتسهيل التتبع بين البائع والمشتري
  orderStatus?: 'PENDING' | 'COMPLETED' | 'SHIPPED'; 
}
