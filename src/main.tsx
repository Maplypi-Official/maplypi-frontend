import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx' // تم تغيير الامتداد لـ TSX

// استخدام الـ (!) لإخبار TypeScript أن العنصر موجود بالتأكيد في index.html
const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
