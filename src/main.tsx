import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Global cosmic styles initialization
import App from './App'; 

/**
 * System Initialization Log
 * يراقب استقرار إقلاع النظام في متصفح Pi Browser
 */
console.log("Maplypi Matrix: Core Initialized.");

/**
 * Root Element Validation
 * التأكد من وجود حاوية الـ DOM قبل بدء الرندر لمنع الـ White Screen.
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  /**
   * React 19 Root Rendering
   * استخدام StrictMode لضمان أفضل الممارسات البرمجية وتجنب الأخطاء الجانبية.
   */
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  /**
   * Critical Error Handling
   * يتم إرساله في حالة فشل الوصول لعنصر الـ Root في index.html.
   */
  console.error("Critical Error: Root element not found! Check your index.html file.");
}
