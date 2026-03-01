import axios from 'axios';

// 1. تعريف واجهات البيانات (Interfaces)
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

// 2. إعداد عنوان الـ API - تصحيح الطريقة لتناسب Vite
// Vite يستخدم import.meta.env بدلاً من process.env
const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api'; 

// 3. إنشاء نسخة axios بإعدادات متقدمة
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. تصدير الخدمات البرمجية (Core Services)
export const maplypiService = {
  
  // جلب ملف المستخدم مع ضمان الاستقرار (Fallback System)
  getUserProfile: async (username: string): Promise<UserData> => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.warn("⚠️ Matrix Offline: Using Fallback User Stats.");
      // بيانات افتراضية لضمان عدم ظهور شاشة بيضاء في حالة غياب الباك أند
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
      return []; 
    }
  },

  // تحديث الرصيد
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
