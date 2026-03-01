import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // التأكد من تحميل التصميم الكوني أولاً
import App from './App' 

// رسالة تأكيد في الكونسول لمراقبة استقرار التشغيل
console.log("Maplypi Matrix: Core Initialized."); 

const rootElement = document.getElementById('root');

if (rootElement) {
  // إنشاء الجذر الأساسي للتطبيق
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  // رسالة تحذيرية في حال وجود مشكلة في ملف index.html
  console.error("Critical Error: Root element not found. Check your index.html file.");
}
