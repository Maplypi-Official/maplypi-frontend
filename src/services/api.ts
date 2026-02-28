import axios from 'axios';

// 1. تعريف واجهات البيانات (Interfaces) وتصديرها بوضوح
export interface UserData {
  username: string;
  piBalance: number | string; // جعلناها مرنة لتقبل أرقام أو نصوص الـ Pi
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

// 2. إعداد عنوان الـ API
const API_BASE_URL = 'http://localhost:5000/api'; 

// 3. إنشاء نسخة axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. تصدير الخدمات البرمجية
export const maplypiService = {
  // جلب ملف المستخدم مع معالجة الخطأ لضمان عدم ظهور صفحة بيضاء
  getUserProfile: async (username: string): Promise<UserData> => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.warn("⚠️ Using Fallback data for Maplypi Dashboard.");
      // بيانات افتراضية تطابق هوية Maplypi
      return {
        username: username || 'EkoPi',
        piBalance: '125.75',
        level: 14,
        location: 'Cairo Citadel District'
      };
    }
  },

  getMapHexagons: async (): Promise<HexagonData[]> => {
    try {
      const response = await api.get('/map/hexagons');
      return response.data;
    } catch (error) {
      console.error("❌ Map Loading Error:", error);
      return [];
    }
  },

  updateBalance: async (username: string, newBalance: number) => {
    const response = await api.post(`/users/${username}/update-balance`, { newBalance });
    return response.data;
  }
};

export default api;
