import { useState, useEffect } from 'react';
import { Product } from '../types/market';

export const useMarket = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // هنا سيتم الربط مع السيرفر لاحقاً
  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => { setLoading(false); }, 1000);
  }, []);

  return { products, loading };
};
