import axios from 'axios';

// 1. تعريف واجهات البيانات (Interfaces) لضمان توافق النوع بين الـ Frontend والـ Backend
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

// 2. إعداد عنوان الـ API - استخدام import.meta.env بدلاً من process.env لضمان عمل Vite
const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api'; 

// 3. إنشاء نسخة axios بإعدادات متقدمة تضمن استقرار الاتصال
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000, // مهلة زمنية كافية لتجنب التعليق
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. تصدير الخدمات البرمجية (Core Services) المستخدمة في الـ Dashboard والـ Network
export const maplypiService = {
  
  // جلب ملف المستخدم مع نظام Fallback لمنع الشاشة البيضاء في حالة عدم وجود باك أند
  getUserProfile: async (username: string): Promise<UserData> => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.warn("⚠️ Matrix Offline: Using Fallback User Stats.");
      // بيانات تجريبية مطابقة لتصميم الماتريكس لضمان استمرارية التشغيل
      return {
        username: username || 'EkoPi',
        piBalance: '125.75', 
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
      return []; // إرجاع مصفوفة فارغة بدلاً من Null لمنع انهيار الخريطة
    }
  },

  // تحديث الرصيد بعد العمليات المالية
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
