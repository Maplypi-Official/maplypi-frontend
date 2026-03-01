import React, { useState } from 'react';
// استدعاء الـ Dashboard الحقيقي لاختباره
import Dashboard from './components/Layout/Dashboard';
// استدعاء الـ Navbar الأساسي
import Navbar from './components/Navigation/Navbar';

// استيراد التنسيقات المركزية
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  /**
   * دالة الرندر الهجينة (Hybrid Render)
   * تشغل الـ Dashboard الحقيقي وتعزل الباقي
   */
  const renderPage = () => {
    const sectionStyle: React.CSSProperties = {
      padding: '40px 20px',
      color: '#eab308',
      textAlign: 'center',
      marginTop: '100px',
      fontFamily: 'monospace'
    };

    try {
      switch (currentPage) {
        case 'DASHBOARD': 
          // تشغيل المكون الحقيقي هنا
          return <Dashboard />;
        case 'MARKET': 
          return (
            
