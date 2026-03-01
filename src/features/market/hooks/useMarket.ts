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
        setLoading(true);
        
        /** * الربط مع الباك أند (API Endpoint)
         * بمجرد تفعيل السيرفر، قم بإزالة التعليق عن الأسطر التالية:
         */
        // const response = await axios.get('http://localhost:5000/api/products');
        // if (isMounted) setProducts(response.data.data);

        // بيانات تجريبية (Mock Data) تطابق الـ Schema لضمان استقرار العرض
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

        if (isMounted) {
          setProducts(mockData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to sync with Market Grid");
          console.error("Market Sync Error:", err);
        }
      } finally {
        if (isMounted) {
          // تأخير بسيط لمحاكاة الـ Matrix loading
          setTimeout(() => setLoading(false), 800);
        }
      }
    };

    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  return { products, loading, error };
};
