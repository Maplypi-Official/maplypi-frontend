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
          {/* دمج الأيقونة مع الاسم جهة اليسار */}
          <div className="prod-identity">
            <span className="prod-icon">{p.icon}</span>
            <span className="prod-name">{p.name}</span>
          </div>
          
          {/* إحصائيات المنتج في المنتصف */}
          <div className="prod-stats">
            <div className="stat-unit">
              <span className="unit-label">Stock:</span>
              <span className="unit-value">{p.stock}</span>
            </div>
            <div className="stat-unit">
              <span className="unit-label">Qual:</span>
              <span className="unit-value q-green">{p.quality}%</span>
            </div>
          </div>

          {/* السعر داخل الشكل البيضاوي الذهبي جهة اليمين */}
          <div className="prod-pricing">
            <span className="p-tag-pill">{p.price}π each</span>
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
