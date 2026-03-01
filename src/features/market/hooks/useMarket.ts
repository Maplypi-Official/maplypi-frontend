import { useState, useEffect } from 'react';
import { Product } from '../types/market';
import axios from 'axios'; // جاهز للربط مع السيرفر

export const useMarket = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // دالة جلب البيانات من الباك أند (Matrix API)
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        /** * الربط مع الباك أند اللي عملناه (API Endpoint)
         * بمجرد تشغيل السيرفر، الكود ده هيسحب البيانات الحقيقية
         */
        // const response = await axios.get('http://localhost:5000/api/products');
        // setProducts(response.data.data);

        // بيانات تجريبية "فخمة" لحين تفعيل السيرفر (تطابق الـ Schema في الباك أند)
        const mockData: Product[] = [
          { 
            id: '1', name: 'Cyber Burger', price: 0.55, category: 'Food', 
            stock: 12, quality: 85, image: 'https://placehold.co/400x300/1a1433/eab308?text=Cyber+Food' 
          },
          { 
            id: '2', name: 'Quantum CPU', price: 1.20, category: 'Tech', 
            stock: 5, quality: 98, image: 'https://placehold.co/400x300/1a1433/eab308?text=Quantum+Tech' 
          },
          { 
            id: '3', name: 'Golden π Vase', price: 0.80, category: 'Craft', 
            stock: 2, quality: 90, image: 'https://placehold.co/400x300/1a1433/eab308?text=Pi+Craft' 
          },
          { 
            id: '4', name: 'Neural Link', price: 2.50, category: 'Tech', 
            stock: 8, quality: 99, image: 'https://placehold.co/400x300/1a1433/eab308?text=Neural+Link' 
          }
        ];

        setProducts(mockData);
      } catch (err) {
        setError("Failed to sync with Market Grid");
        console.error("Market Sync Error:", err);
      } finally {
        // تأخير بسيط لمحاكاة الـ Matrix loading
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchProducts();
  }, []);

  // الحفاظ على المسميات الأصلية لضمان عدم كسر المكونات
  return { products, loading, error };
};
