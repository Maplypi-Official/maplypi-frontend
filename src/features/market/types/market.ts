/**
 * Market Resource Type Definitions
 * متوافق 100% مع الـ Schema الخاص بالباك أند وتصميم الماركت الفخم
 */

export interface Product {
  // المعرف الفريد للمنتج من قاعدة البيانات (MongoDB _id)
  id: string;
  
  // اسم المنتج (مثل: Cyber Burger)
  name: string;
  
  // سعر المنتج بعملة Pi
  price: number;
  
  // التصنيف لضمان عمل الـ FilterBar بدقة
  category: 'Food' | 'Tech' | 'Craft';
  
  // الكمية المتاحة في المخزن حالياً
  stock: number;
  
  // نسبة الجودة التي تظهر في الـ Quality Badge
  quality: number;
  
  // رابط صورة المنتج (Neon Optimized)
  image: string;

  // حقول إضافية اختيارية لضمان عدم كسر التطبيق عند جلب بيانات كاملة من السيرفر
  status?: 'available' | 'out_of_stock';
  description?: string;
}

/**
 * تعريف هيكل الطلب (Order) عند الضغط على Purchase
 */
export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  totalAmount: number;
  currency: 'Pi';
  timestamp: Date;
}
