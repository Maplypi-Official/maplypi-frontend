import React from 'react';
import './ProductCard.css';

// الحفاظ على الـ Interface مرن لضمان عدم الكسر مع بيانات الباك أند
const ProductCard: React.FC<{product: any}> = ({product}) => {
  // الحفاظ على القيم الافتراضية وإضافة خاصية المتانة (Durability)
  const {
    name = "Unknown Resource",
    price = 0,
    stock = 0,
    quality = 100,
    durability = 100, // نسبة استهلاك المنتج
    image = "https://via.placeholder.com/300x140"
  } = product;

  return (
    <div className="product-card">
      <div className="product-image" style={{backgroundImage: `url(${image})`}}>
        <span className="quality-badge">{quality}% Quality</span>
      </div>
      
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        
        {/* نظام الاستهلاك (Durability Bar) لزيادة الربح وإجبار المستخدم على الشراء لاحقاً */}
        <div className="durability-container">
          <div className="durability-label">Durability: {durability}%</div>
          <div className="durability-bar">
            <div 
              className="durability-fill" 
              style={{ width: `${durability}%`, backgroundColor: durability < 30 ? '#ef4444' : '#eab308' }}
            ></div>
          </div>
        </div>

        <div className="product-meta">
          <div className="price-tag">
            <span className="price">{Number(price).toFixed(2)} π</span>
          </div>
          <span className="stock">Stock: {stock}</span>
        </div>
        
        {/* زر الإضافة - مع الحفاظ على المسمى الأصلي buy-btn لعدم كسر الـ CSS */}
        <button className="buy-btn">
          Add To Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
