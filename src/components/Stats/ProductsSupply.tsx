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
  <section className="ts-panel product-matrix-grid-compact">
    <div className="panel-header-row">
      <h3 className="p-supply-title">PRODUCTS & SUPPLY</h3>
    </div>

    {/* حاوية التمرير الأفقي المبهرة */}
    <div className="prod-scroll-wrapper">
      <div className="prod-grid-container-adaptive">
        {products.map((p) => (
          <div key={p.name} className="prod-card-box-mini">
            <div className="prod-header-nano">
              <span className="p-nano-icon">{p.icon}</span>
              <span className="p-nano-name">{p.name}</span>
            </div>
            
            <div className="prod-details-nano">
              <div className="nano-stat">
                <span className="n-label">STOCK:</span>
                <span className="n-val">{p.stock}</span>
              </div>
              <div className="nano-stat">
                <span className="n-label">QUAL:</span>
                <span className="n-val q-green">{p.quality}%</span>
              </div>
              <div className="nano-stat">
                <span className="n-price-row">
                   <span className="n-val gold-text">{p.price}π</span>
                   <span className="n-unit">/ea</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* أزرار الأكشن المزدوجة المصغرة */}
    <div className="product-actions-group-compact">
      <button className="btn-add-supply-mini">ADD SUPPLY</button>
      <button className="ts-btn-gold-action-nano">ADVERTISE STORE</button>
    </div>
  </section>
);

export default ProductsSupply;
