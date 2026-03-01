import React from 'react';
import './ProductCard.css';

// الحفاظ على الـ Interface مرن لضمان عدم الكسر مع بيانات الباك أند
const ProductCard: React.FC<{product: any}> = ({product}) => {
  // الحفاظ على القيم الافتراضية لمنع ظهور أخطاء في الـ UI
  const {
    name = "Unknown Resource",
    price = 0,
    stock = 0,
    quality = 100,
    image = "https://via.placeholder.com/300x140"
  } = product;

  return (
    <div className="product-card">
      <div className="product-image" style={{backgroundImage: `url(${image})`}}>
        <span className="quality-badge">{quality}% Quality</span>
      </div>
      
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        
        <div className="product-meta">
          <div className="price-tag">
            <span className="price">{Number(price).toFixed(2)} π</span>
          </div>
          <span className="stock">In Stock: {stock}</span>
        </div>
        
        <button className="buy-btn">
          Add To Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
