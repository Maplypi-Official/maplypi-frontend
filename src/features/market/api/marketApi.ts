import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchProducts = async (category?: string) => {
  const response = await axios.get(`${API_URL}/market/products`, {
    params: { category }
  });
  return response.data;
};

export const createPiPayment = async (productId: string) => {
  // سيتم الربط مع Pi SDK هنا
};
