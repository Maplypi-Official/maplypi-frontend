import React from 'react'
import { createRoot } from 'react-dom/client'

const TestApp = () => (
  <div style={{ background: '#0a0516', color: '#eab308', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
    <h1 style={{ fontSize: '40px' }}>MAPLYPI SYSTEM</h1>
    <p style={{ color: 'white' }}>If you see this, the compiler is working.</p>
    <div style={{ border: '1px solid #eab308', padding: '10px', marginTop: '20px' }}>
      CORE READY
    </div>
  </div>
)

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<TestApp />);
}
