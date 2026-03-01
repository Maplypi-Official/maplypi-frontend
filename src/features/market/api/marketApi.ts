import axios from 'axios';

/**
 * تحسين جلب الـ URL ليتوافق مع Vite و Termux
 * نستخدم الصيغة المتوافقة مع Vite لضمان عدم حدوث سواد في الشاشة
 */
const API_URL = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:5000/api';

/**
 * جلب المنتجات من الماركت (Matrix Market)
 * @param category - اختيارية لفلترة المنتجات بناءً على الـ FilterBar
 */
export const fetchProducts = async (category?: string) => {
  try {
    const response = await axios.get(`${API_URL}/market/products`, {
      params: { category: category !== 'All' ? category : undefined }
    });
    
    // إرجاع البيانات بنفس الهيكل المتوقع في useMarket.ts لضمان التوافق
    return response.data;
  } catch (error) {
    console.error("Matrix API Error [fetchProducts]:", error);
    // نرجع مصفوفة فارغة في حالة الخطأ بدلاً من رمي خطأ يكسر الواجهة
    return { data: [] };
  }
};

/**
 * إنشاء عملية دفع جديدة عبر Pi SDK
 * @param productId - معرف المنتج لبدء المعاملة
 */
export const createPiPayment = async (productId: string) => {
  try {
    // 1. طلب إنشاء معاملة من الباك أند لتوثيق الطلب
    const orderResponse = await axios.post(`${API_URL}/market/orders/create`, {
      productId,
      paymentMethod: 'Pi'
    });

    console.log("Pi Payment Initialized for Order:", orderResponse.data?.orderId);
    return orderResponse.data;
  } catch (error) {
    console.error("Pi SDK Bridge Error:", error);
    throw error;
  }
};

/**
 * تحديث حالة المخزن بعد نجاح الدفع (Inventory Sync)
 */
export const syncInventory = async (productId: string, quantity: number) => {
  try {
    return await axios.patch(`${API_URL}/market/products/${productId}/sync`, {
      quantity
    });
  } catch (error) {
    console.error("Inventory Sync Error:", error);
    throw error;
  }
};
