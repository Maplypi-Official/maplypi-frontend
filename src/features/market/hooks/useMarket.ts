import { useState, useEffect, useCallback } from 'react';
/** * استخدام 'import type' ضروري جداً لتجنب أخطاء التجميع (Unexpected token) في Vite 
 * ويضمن بقاء الشاشة مستقرة
 */
import type { Product } from '../types/market'; 
import axios from 'axios';

export const useMarket = (category: string = 'All') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // نظام الصفحات لدعم ملايين المنتجات دون إبطاء التطبيق
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async (pageNum: number, isNewCategory: boolean = false) => {
    let isMounted = true;
    
    try {
      if (isMounted) setLoading(true);

      /** * الربط مع الباك أند (API Endpoint)
       * ملاحظة: تم تجهيز الهيكل لدعم رقم الصفحة والتصنيف لاحقاً
       * const response = await axios.get(`http://localhost:5000/api/products?page=${pageNum}&category=${category}`);
       * const newItems = response.data.data;
       */

      // محاكاة بيانات ضخمة وعصرية (Modern & Luxury Mock Data)
      const mockBatch: Product[] = [
        { 
          id: `tech-${pageNum}-1`, name: 'Nebula AI Unit', price: 15.5, category: 'Tech', 
          stock: 3, quality: 99, image: '', durability: 100 
        },
        { 
          id: `lux-${pageNum}-2`, name: 'Mars Oasis Plot', price: 550.0, category: 'Luxury', 
          stock: 1, quality: 100, image: '', durability: 100 
        },
        { 
          id: `robot-${pageNum}-3`, name: 'Alpha Guard Robot', price: 85.0, category: 'Tech', 
          stock: 5, quality: 92, image: '', durability: 80 
        },
        { 
          id: `craft-${pageNum}-4`, name: 'Quantum Vase', price: 2.5, category: 'Craft', 
          stock: 10, quality: 88, image: '', durability: 100 
        }
      ];

      if (isMounted) {
        // إذا كان هناك تغيير في الفئة، نستبدل البيانات، وإلا نضيفها للقائمة الحالية
        setProducts(prev => isNewCategory ? mockBatch : [...prev, ...mockBatch]);
        
        // محاكاة وجود المزيد من البيانات (دعم ملايين المنتجات)
        setHasMore(pageNum < 500); 
        setError(null);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted) {
        setError("Failed to sync with Market Grid");
        setLoading(false);
        console.error("Market Sync Error:", err);
      }
    }

    return () => { isMounted = false; };
  }, [category]);

  // إعادة ضبط الحالة عند تغيير الفئة (Filtering)
  useEffect(() => {
    setPage(1);
    fetchProducts(1, true);
  }, [category, fetchProducts]);

  // دالة تحميل المزيد - يتم استدعاؤها عند التمرير لأسفل
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  // إرجاع نفس المسميات الأصلية لضمان عدم كسر المكونات الأخرى
  return { products, loading, error, loadMore, hasMore };
};
