import React from 'react';
import './ProductsSupply.css';

interface Product { 
  name: string; 
  stock: number; 
  quality: number; 
  price: number; 
  icon: string; 
}

interface Props { 
  products: Product[]; 
}

const ProductsSupply: React.FC<Props> = ({ products }) => (
  <section className="ts-panel product-matrix full-width">
    <div className="panel-header-row">
      <h3>PRODUCTS & SUPPLY</h3>
      <span className="inventory-status">Live Inventory</span>
    </div>

    <div className="prod-list">
      {products.map((p) => (
        <div key={p.name} className="prod-card">
          <div className="prod-info-group">
            <span className="prod-icon">{p.icon}</span>
            <span className="prod-name">{p.name}</span>
          </div>
          
          <div className="prod-stats-group">
            <div className="stat-item">
              <span className="stat-label">Stock:</span>
              <span className="stat-value">{p.stock}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Qual:</span>
              <span className="stat-value q-tag">{p.quality}%</span>
            </div>
          </div>

          <div className="prod-price-tag">
            <span className="p-tag">{p.price}π</span>
          </div>
        </div>
      ))}
    </div>

    <div className="action-row">
      <button className="ts-btn-gold-action">ADVERTISE STORE</button>
    </div>
  </section>
);

export default ProductsSupply;
