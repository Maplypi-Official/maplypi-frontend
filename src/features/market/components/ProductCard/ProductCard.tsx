import React from 'react';
import './ProductCard.css';

// الحفاظ على الـ Interface مرن لضمان عدم الكسر مع بيانات الباك أند
const ProductCard: React.FC<{product: any}> = ({product}) => {
  // الحفاظ على القيم الافتراضية لضمان استقرار الواجهة
  const {
    name = "Unknown Resource",
    price = 0,
    stock = 0,
    quality = 100,
    durability = 100,
    category = "General", // إضافة الفئة للتحكم في الألوان
    image = ""
  } = product;

  // تحديد نوع الندرة بناءً على الفئة لتطبيق الـ CSS المناسب
  const rarityClass = category.toLowerCase();

  return (
    <div className={`product-card ${rarityClass}`}>
      <div className="product-image" style={{backgroundImage: `url(${image})`}}>
        <span className="quality-badge">{quality}% Quality</span>
        
        {/* وسوم الندرة للمنتجات الأسطورية والميثيك */}
        {category === 'Legendary' && <span className="rarity-tag rarity-legendary">Unique</span>}
        {category === 'Mythic' && <span className="rarity-tag rarity-mythic">Limited</span>}
      </div>
      
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        
        {/* بار المتانة (Durability) */}
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
        
        {/* الحفاظ على المسمى الأصلي buy-btn لعدم كسر التوافق */}
        <button className="buy-btn">
          Add To Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
