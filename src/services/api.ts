import axios from 'axios';

// تحديد عنوان الـ Backend (غيره لما ترفع الباك اند فعلياً)
const API_BASE_URL = 'http://localhost:5000/api'; 

// تعريف شكل بيانات المستخدم (Interface) زي ما في صورك
export interface UserData {
  username: string;
  piBalance: number;
  level: number;
  location: string;
}

// تعريف شكل بيانات الخريطة (Hexagons)
export interface HexagonData {
  id: string;
  coordinates: [number, number];
  owner: string;
  type: 'Premium' | 'Normal';
  price: number;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const maplypiService = {
  // جلب بيانات المستخدم (للحصول على الـ 125.75 Pi والـ Level 14)
  getUserProfile: async (username: string): Promise<UserData> => {
    const response = await api.get(`/users/${username}`);
    return response.data;
  },

  // جلب بيانات الخريطة (السداسيات زي cairo_hex_001)
  getMapHexagons: async (): Promise<HexagonData[]> => {
    const response = await api.get('/map/hexagons');
    return response.data;
  },

  // تحديث الرصيد بعد عملية شراء أو مكافأة
  updateBalance: async (username: string, newBalance: number) => {
    const response = await api.post(`/users/${username}/update-balance`, { newBalance });
    return response.data;
  }
};

export default api;
