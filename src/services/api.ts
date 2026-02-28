import axios from 'axios';

// تحديد عنوان الـ Backend (تأكد أن بورت الباك اند 5000)
const API_BASE_URL = 'http://localhost:5000/api'; 

// تعريف شكل بيانات المستخدم (Interface) المتوافق مع الـ Dashboard
export interface UserData {
  username: string;
  piBalance: number;
  level: number;
  location: string;
}

// تعريف شكل بيانات الخريطة والأراضي السداسية
export interface HexagonData {
  id: string;
  coordinates: [number, number];
  owner: string;
  type: 'Premium' | 'Normal';
  price: number;
}

// إنشاء نسخة Axios مع إعدادات افتراضية
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // مهلة 5 ثوانٍ قبل اعتبار الطلب فاشلاً
  headers: {
    'Content-Type': 'application/json',
  },
});

export const maplypiService = {
  // جلب بيانات الملف الشخصي (EkoPi - Level 14)
  getUserProfile: async (username: string): Promise<UserData> => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.warn("⚠️ Backend unreachable. Using offline mock data for:", username);
      // بيانات افتراضية لضمان عدم توقف الواجهة (Fallback Data)
      return {
        username: username || 'EkoPi',
        piBalance: 125.75,
        level: 14,
        location: 'Cairo Citadel District'
      };
    }
  },

  // جلب بيانات الخريطة (السداسيات)
  getMapHexagons: async (): Promise<HexagonData[]> => {
    try {
      const response = await api.get('/map/hexagons');
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch map hexagons:", error);
      return []; // إرجاع مصفوفة فارغة لتجنب كسر الـ Map Component
    }
  },

  // تحديث الرصيد (الربط مع محفظة Pi المستقبلي)
  updateBalance: async (username: string, newBalance: number) => {
    const response = await api.post(`/users/${username}/update-balance`, { newBalance });
    return response.data;
  }
};

export default api;
