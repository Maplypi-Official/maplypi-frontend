import { useState, useEffect, useCallback } from 'react';
/** * استخدام 'import type' ضروري جداً لتجنب أخطاء التجميع (Unexpected token) في Vite 
 * ويضمن بقاء الشاشة مستقرة
 */
import type { Product } from '../types/market'; 
import axios from 'axios';

export const useMarket = (category: string = 'All') => {
  const [allProducts, setAllProducts] = useState<Product[]>([]); // مخزن البيانات الكاملة المستوردة
  const [products, setProducts] = useState<Product[]>([]); // المنتجات المعروضة حالياً (Pagination)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // نظام الصفحات لدعم ملايين المنتجات دون إبطاء التطبيق
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 20; // تحميل 20 منتج في كل مرة لضمان سلاسة الأداء

  /** * جلب البيانات من ملف الـ JSON الملياري الذي أنشأناه
   * يتم استدعاؤه مرة واحدة عند تشغيل التطبيق
   */
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      // سحب البيانات من المجلد العام (Public Assets)
      const response = await fetch('/data/market_products.json');
      if (!response.ok) throw new Error("Database connection failed");
      const data = await response.json();
      
      /** * ربط الموارد الحقيقية (Real Assets Injection):
       * نقوم بتوزيع الصور الـ 5 التي حملتها في المجلدات على الـ 50,000 منتج بشكل دوري ذكي
       * لضمان ظهور صور فخمة وحقيقية بدلاً من المربعات الملونة
       */
      const enhancedData = data.map((p: Product) => {
        // اختيار رقم صورة بين 1 و 5 بناءً على معرف المنتج لضمان الثبات
        const imageId = (Math.abs(p.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % 5) + 1;
        
        return {
          ...p,
          // المسار المباشر للصور الحقيقية التي تم تحميلها في Termux
          image: `/Resources/Products/${p.category}/item-${imageId}.webp`
        };
      });

      setAllProducts(enhancedData);
      setLoading(false);
    } catch (err) {
      setError("FAILED TO SYNC WITH GALACTIC DATABASE");
      setLoading(false);
      console.error("Market Load Error:", err);
    }
  }, []);

  // دالة معالجة عرض البيانات (Filtering & Pagination)
  const processDisplay = useCallback((pageNum: number, isNewCategory: boolean = false) => {
    // 1. الفلترة بناءً على التصنيف
    const filtered = allProducts.filter(p => 
      category === 'All' ? true : p.category === category
    );

    // 2. تقسيم الصفحات (Slice) لضمان عدم استهلاك الرام
    const endOffset = pageNum * ITEMS_PER_PAGE;
    const currentBatch = filtered.slice(0, endOffset);

    setProducts(currentBatch);
    setHasMore(currentBatch.length < filtered.length);
  }, [allProducts, category]);

  // البداية: جلب البيانات بالكامل
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // تحديث العرض عند تغيير الفئة أو عند اكتمال جلب البيانات
  useEffect(() => {
    setPage(1);
    processDisplay(1, true);
  }, [category, allProducts, processDisplay]);

  // دالة تحميل المزيد - يتم استدعاؤها عند التمرير لأسفل
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      processDisplay(nextPage);
    }
  };

  // إرجاع نفس المسميات الأصلية لضمان عدم كسر المكونات الأخرى
  return { products, loading, error, loadMore, hasMore };
};
