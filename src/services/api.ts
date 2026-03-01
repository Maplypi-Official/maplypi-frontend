import axios from 'axios';

// 1. تعريف واجهات البيانات (Interfaces) وتصديرها بوضوح
export interface UserData {
  username: string;
  piBalance: number | string; 
  level: number;
  location: string;
}

export interface HexagonData {
  id: string;
  coordinates: [number, number];
  owner: string;
  type: 'Premium' | 'Normal';
  price: number;
}

// 2. إعداد عنوان الـ API - متوافق مع منافذ السيرفر الافتراضية
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; 

// 3. إنشاء نسخة axios بإعدادات متقدمة
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000, // زيادة المهلة قليلاً لضمان استقرار الربط مع Pi Network
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. تصدير الخدمات البرمجية (Core Services)
export const maplypiService = {
  
  // جلب ملف المستخدم مع ضمان الاستقرار (Stability First)
  getUserProfile: async (username: string): Promise<UserData> => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.warn("⚠️ Matrix Offline: Using Fallback User Stats.");
      return {
        username: username || 'EkoPi',
        piBalance: '125.75', // مطابقة لتصميم الماتريكس
        level: 14,
        location: 'Cairo Citadel District'
      };
    }
  },

  // جلب بيانات خريطة المربعات (Network Grid)
  getMapHexagons: async (): Promise<HexagonData[]> => {
    try {
      const response = await api.get('/map/hexagons');
      return response.data;
    } catch (error) {
      console.error("❌ Grid Sync Error:", error);
      return []; // إرجاع مصفوفة فارغة لمنع كسر الخريطة
    }
  },

  // تحديث الرصيد بعد عمليات الشراء في الماركت
  updateBalance: async (username: string, newBalance: number) => {
    try {
      const response = await api.post(`/users/${username}/update-balance`, { newBalance });
      return response.data;
    } catch (error) {
      console.error("❌ Balance Sync Error:", error);
      throw error;
    }
  }
};

export default api;
