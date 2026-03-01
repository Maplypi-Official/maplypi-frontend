import React, { useState } from 'react';
import Navbar from './components/Navigation/Navbar';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('DASHBOARD');

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#05050a', color: '#eab308', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '24px', textShadow: '0 0 10px #eab308' }}>MAPLYPI SYSTEM ONLINE</h1>
      <p style={{ color: '#64748b' }}>Current Section: {currentPage}</p>
      
      <div style={{ marginTop: '20px', border: '1px solid #eab308', padding: '20px' }}>
        SYSTEM INITIALIZING...
      </div>

      <Navbar activeTab={currentPage} onTabChange={setCurrentPage} />
    </div>
  );
};

export default App;
