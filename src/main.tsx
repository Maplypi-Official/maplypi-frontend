import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // تحميل التنسيقات العامة والأساسية
import App from './App' 

// رسالة تأكيد في الكونسول لمراقبة استقرار التشغيل عند بدء المصفوفة
console.log("Maplypi Matrix: Core Initialized."); 

const rootElement = document.getElementById('root');

if (rootElement) {
  // إنشاء الجذر الأساسي لـ React 19
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // رسالة تحذيرية في حال وجود مشكلة في الربط بملف index.html
  console.error("Critical Error: Root element not found! Check your index.html file.");
}
