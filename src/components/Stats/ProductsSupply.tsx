import './ProductsSupply.css';
import './ProductsSupply.css';
import React from 'react';

interface Product { name: string; stock: number; quality: number; price: number; icon: string; }
interface Props { products: Product[]; }

const ProductsSupply: React.FC<Props> = ({ products }) => (
  <section className="ts-panel product-matrix full-width">
    <h3>PRODUCTS & SUPPLY</h3>
    <div className="prod-list">
      {products.map((p) => (
        <div key={p.name} className="prod-card">
          <div className="prod-head">{p.icon} {p.name}</div>
          <div className="prod-details">
            <span>Stock: {p.stock}</span>
            <span className="q-tag">Qual: {p.quality}%</span>
            <span className="p-tag">{p.price}π</span>
          </div>
        </div>
      ))}
    </div>
    <div className="action-row">
      <button className="ts-btn gold">ADVERTISE STORE</button>
    </div>
  </section>
);
export default ProductsSupply;
