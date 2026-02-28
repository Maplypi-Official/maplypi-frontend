import React from 'react';
import './ProductCard.css';

const ProductCard: React.FC<{product: any}> = ({product}) => (
  <div className="product-card">
    <div className="product-image" style={{backgroundImage: `url(${product.image})`}}>
      <span className="quality-badge">{product.quality}% Qual</span>
    </div>
    <div className="product-info">
      <h4 className="product-name">{product.name}</h4>
      <div className="product-meta">
        <span className="price">{product.price} π</span>
        <span className="stock">Stock: {product.stock}</span>
      </div>
      <button className="buy-btn">PURCHASE</button>
    </div>
  </div>
);
export default ProductCard;
