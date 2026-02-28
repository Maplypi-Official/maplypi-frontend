import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // إضافة المسار الأساسي لضمان عمل الروابط في المتصفحات المختلفة
  base: './', 
  server: {
    // السماح بالوصول من أي IP (مهم جداً للـ LocalTunnel والـ Pi Browser)
    host: true, 
    port: 5173,
    strictPort: true,
    // معالجة مشاكل الـ CORS أثناء التطوير
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // لضمان توافق الكود مع متصفحات الموبايل القديمة
    target: 'esnext' 
  }
})
