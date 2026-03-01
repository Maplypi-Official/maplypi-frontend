import { useState, useEffect } from 'react';
import { Product } from '../types/market'; 
import axios from 'axios';

export const useMarket = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      try {
        // نضمن أن التحميل يبدأ فوراً
        if (isMounted) setLoading(true);

        /** * الربط مع الباك أند (API Endpoint)
         * سيبقى كما هو لسهولة التفعيل لاحقاً حسب طلبك
         */
        // const response = await axios.get('http://localhost:5000/api/products');
        // if (isMounted) setProducts(response.data.data);

        // بيانات تجريبية (Mock Data) مطابقة تماماً لتصميم الماركت
        const mockData: Product[] = [
          { 
            id: '1', name: 'Cyber Burger', price: 0.55, category: 'Food', 
            stock: 12, quality: 85, image: '' // تركناها فارغة مؤقتاً لضمان عدم تعليق التحميل
          },
          { 
            id: '2', name: 'Quantum CPU', price: 1.20, category: 'Tech', 
            stock: 5, quality: 98, image: '' 
          },
          { 
            id: '3', name: 'Golden π Vase', price: 0.80, category: 'Craft', 
            stock: 2, quality: 90, image: '' 
          },
          { 
            id: '4', name: 'Neural Link', price: 2.50, category: 'Tech', 
            stock: 8, quality: 99, image: '' 
          }
        ];

        if (isMounted) {
          setProducts(mockData);
          setError(null);
          // إلغاء الـ setTimeout الخارجي ودمجه هنا لضمان استقرار الرندر
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to sync with Market Grid");
          setLoading(false); // نوقف التحميل حتى في حالة الخطأ
          console.error("Market Sync Error:", err);
        }
      }
    };

    fetchProducts();
    
    // تنظيف الموارد عند مغادرة الصفحة لمنع الـ Memory Leak
    return () => { isMounted = false; };
  }, []);

  return { products, loading, error };
};
