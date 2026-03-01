import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Global cosmic styles initialization
import App from './App'; 

/**
 * System Initialization Log
 * Monitors core boot stability within the browser console.
 */
console.log("Maplypi Matrix: Core Initialized.");

/**
 * Root Element Validation
 * Ensures the 'root' container exists in index.html before mounting.
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  /**
   * React 19 Root Rendering
   * Mounting the application with StrictMode enabled for best development practices.
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
   * Dispatched if the DOM fails to provide a mounting point.
   */
  console.error("Critical Error: Root element not found! Check your index.html file.");
}
