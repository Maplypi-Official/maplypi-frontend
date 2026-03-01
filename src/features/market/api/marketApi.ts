import axios from 'axios';

// استخدام الـ URL من البيئة أو الافتراضي لضمان الربط مع السيرفر المحلي
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * جلب المنتجات من الماركت (Matrix Market)
 * @param category - اختيارية لفلترة المنتجات بناءً على الـ FilterBar
 */
export const fetchProducts = async (category?: string) => {
  try {
    const response = await axios.get(`${API_URL}/market/products`, {
      params: { category: category !== 'All' ? category : undefined }
    });
    
    // إرجاع البيانات بنفس الهيكل المتوقع في useMarket.ts
    return response.data;
  } catch (error) {
    console.error("Matrix API Error [fetchProducts]:", error);
    throw error;
  }
};

/**
 * إنشاء عملية دفع جديدة عبر Pi SDK
 * @param productId - معرف المنتج لبدء المعاملة
 */
export const createPiPayment = async (productId: string) => {
  try {
    // 1. طلب إنشاء معاملة من الباك أند الخاص بنا أولاً لتوثيق الطلب
    const orderResponse = await axios.post(`${API_URL}/market/orders/create`, {
      productId,
      paymentMethod: 'Pi'
    });

    /** * 2. هنا يتم استدعاء Pi SDK الرسمي لاحقاً:
     * window.Pi.createPayment({ ...orderData ... })
     * تم تجهيز المكان لربط الـ Access Token والـ Payment ID
     */
    console.log("Pi Payment Initialized for Order:", orderResponse.data.orderId);
    
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
  return await axios.patch(`${API_URL}/market/products/${productId}/sync`, {
    quantity
  });
};
