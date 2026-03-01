import { useState, useEffect } from 'react';
/** * إضافة كلمة type هنا هي السر لحل مشكلة السواد (Unexpected token)
 * لأنها تخبر Vite أن هذا الملف للتعريفات فقط ولا يحتوي على كود برمي 
 */
import type { Product } from '../types/market'; 
import axios from 'axios';

export const useMarket = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      try {
        // بدء عملية المزامنة مع الماركت
        if (isMounted) setLoading(true);

        /** * الربط مع الباك أند (API Endpoint)
         * ملاحظة: تم الإبقاء على الهيكل كما هو لضمان التوافق المستقبلي
         */
        // const response = await axios.get('http://localhost:5000/api/products');
        // if (isMounted) setProducts(response.data.data);

        // بيانات تجريبية (Mock Data) مطابقة تماماً لتصميم الماركت لضمان استقرار العرض
        const mockData: Product[] = [
          { 
            id: '1', name: 'Cyber Burger', price: 0.55, category: 'Food', 
            stock: 12, quality: 85, image: '' 
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
          // إيقاف حالة التحميل فور تجهيز البيانات
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to sync with Market Grid");
          setLoading(false); 
          console.error("Market Sync Error:", err);
        }
      }
    };

    fetchProducts();
    
    // تنظيف الذاكرة عند إغلاق المكون
    return () => { isMounted = false; };
  }, []);

  // إرجاع نفس المسميات التي يتوقعها ملف MarketPage.tsx
  return { products, loading, error };
};
