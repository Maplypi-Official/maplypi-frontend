import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاولة جلب البيانات من السيرفر
    axios.get('http://localhost:5000/api/lands/all')
      .then(res => {
        setLands(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("خطأ في الاتصال بالسيرفر:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', 
      backgroundColor: '#0f0f0f', 
      color: '#e0e0e0', 
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <header style={{ marginBottom: '40px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ color: '#ffca28', fontSize: '2.5rem', margin: '0' }}>🌍 Maplypi Engine</h1>
        <p style={{ color: '#888' }}>Building the future of Pi Network Ecosystem</p>
      </header>

      {loading ? (
        <div className="loader">Loading Lands...</div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {lands.length > 0 ? lands.map(land => (
            <div key={land._id} style={{ 
              background: '#1e1e1e', 
              padding: '20px', 
              borderRadius: '15px', 
              border: '1px solid #333',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              transition: 'transform 0.3s'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#00e676', fontWeight: 'bold', marginBottom: '10px' }}>
                ID: {land.hexId}
              </div>
              <h2 style={{ margin: '10px 0', color: '#fff' }}>📍 Digital Land</h2>
              <p style={{ margin: '5px 0' }}>👤 Owner: <span style={{ color: '#ffca28' }}>{land.owner}</span></p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '15px 0' }}>💰 {land.price} Pi</p>
              <div style={{ 
                display: 'inline-block',
                padding: '5px 15px', 
                borderRadius: '20px', 
                backgroundColor: land.landType === 'Commercial' ? '#1565c0' : '#455a64',
                fontSize: '0.9rem'
              }}>
                {land.landType}
              </div>
            </div>
          )) : (
            <p>No lands found. Try adding one with curl!</p>
          )}
        </div>
      )}

      <footer style={{ marginTop: '50px', color: '#555', fontSize: '0.8rem' }}>
        Maplypi Web3 Dashboard v1.0 | Developed in Termux
      </footer>
    </div>
  );
}

export default App;
