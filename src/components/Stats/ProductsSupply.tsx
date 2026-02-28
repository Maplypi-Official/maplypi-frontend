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
  <section className="ts-panel product-matrix-grid">
    <div className="panel-header-row">
      <h3>PRODUCTS & SUPPLY</h3>
    </div>

    {/* شبكة المنتجات (3 كروت بجانب بعضها) */}
    <div className="prod-grid-container">
      {products.map((p) => (
        <div key={p.name} className="prod-card-box">
          <div className="prod-header-mini">
            <span className="p-mini-icon">{p.icon}</span>
            <span className="p-mini-name">{p.name}</span>
          </div>
          
          <div className="prod-details-mini">
            <div className="mini-stat">
              <span className="m-label">STOCK:</span>
              <span className="m-val">{p.stock}</span>
            </div>
            <div className="mini-stat">
              <span className="m-label">QUALITY:</span>
              <span className="m-val q-green">{p.quality}%</span>
            </div>
            <div className="mini-stat">
              <span className="m-label">PRICE:</span>
              <span className="m-val gold-text">{p.price}π each</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* أزرار الأكشن المزدوجة */}
    <div className="product-actions-group">
      <button className="btn-add-supply">ADD SUPPLY</button>
      <button className="ts-btn-gold-action-mini">ADVERTISE STORE</button>
    </div>
  </section>
);

export default ProductsSupply;
