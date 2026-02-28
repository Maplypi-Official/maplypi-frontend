import React, { useEffect, useState } from 'react';
import { maplypiService } from '../../services/api'; 
import maplypiLogo from '../../assets/logo3.png';

// Components
import Crown from '../Crown/Crown';
import Header from '../Header/Header';
import MyStore from '../Stats/MyStore';
import ProductsSupply from '../Stats/ProductsSupply';
import BusinessGrowth from '../Stats/BusinessGrowth';

// استيراد التنسيق الموحد للكارت الكبير
import './Dashboard.css';

interface UserData {
  username: string;
  piBalance: number | string;
  level: number;
  location: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // قائمة المنتجات (سيتم جلبها مستقبلاً من الـ Backend)
  const products = [
    { name: 'FOOD', stock: 10, quality: 85, price: 0.5, icon: '🍴' },
    { name: 'TECH', stock: 7, quality: 92, price: 1.2, icon: '💻' },
    { name: 'CRAFT', stock: 14, quality: 88, price: 0.8, icon: '🎨' }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // نستخدم اسم المستخدم الافتراضي EkoPi كما هو محدد في الـ Backend
        const data = await maplypiService.getUserProfile('EkoPi');
        setUserData(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Offline Mode Active.");
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  // شاشة التحميل (تظهر بلمسة MaplyPi الذهبية)
  if (loading) return <div className="loading-screen">INITIALIZING MAPLYPI... 🌍</div>;

  return (
    <div className="ts-dashboard-container">
      {/* 👑 التاج الذهبي: يطفو فوق الكارت (Absolute) */}
      <Crown logoUrl={maplypiLogo} />
      
      {/* 📦 الكارت الموحد: يحتوي على كل أقسام الداشبورد */}
      <div className="maply-main-card">
        
        {/* الهيدر: تم دمج الرصيد والاسم فيه بدقة */}
        <Header 
          userName={userData?.username || 'EkoPi'} 
          level={userData?.level || 14} 
          merchant={userData?.username || 'EkoPi'}
          balance={userData?.piBalance || '125.75'}
        />

        <main className="ts-main-grid">
          {/* قسم المتجر والموقع الجغرافي */}
          <MyStore location={userData?.location || 'Cairo Citadel District'} />
          
          {/* قسم الإيرادات السريعة (تحديث لحظي) */}
          <section className="ts-panel recent-sales">
            <div className="panel-header-simple">
              <h3>RECENT SALES</h3>
            </div>
            <div className="revenue-stat">+2.4π</div>
            <p className="sub-text">Last transaction 2m ago</p>
          </section>

          {/* قائمة المنتجات وسلاسل الإمداد */}
          <ProductsSupply products={products} />
          
          {/* تحليل النمو والزر الرئيسي */}
          <BusinessGrowth />
        </main>
      </div>
      
      {/* تنبيه الخطأ في حالة انقطاع الاتصال بالـ Backend */}
      {error && <div className="error-toast">{error}</div>}
    </div>
  );
};

export default Dashboard;
