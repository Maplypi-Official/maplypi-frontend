import React, { useState } from 'react';
import AppLoader from '../../../../components/AppLoader/AppLoader'; // استدعاء اللودر الموحد
import './AddProductForm.css';

const AddProductForm: React.FC = () => {
  // حالة الفورم شاملة لكل تفاصيل المنتج الواقعي والافتراضي
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Tech',
    origin: 'REAL_WORLD', 
    condition: 'NEW',
    description: '',
    location: '',
    stock: 1
  });

  // حالة التحميل الخاصة بعملية الإرسال
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // تفعيل اللودر الفخم بنوع 'form' لإبهار المستخدم
    setIsSubmitting(true);

    console.log("Submitting Asset to Galactic Database:", formData);

    // محاكاة وقت المعالجة والتشفير قبل إظهار النجاح
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Success! Your ${formData.origin === 'REAL_WORLD' ? 'Physical' : 'Digital'} item is now live.`);
    }, 4000); // 4 ثواني كافية لقرأة جمل التحميل الفخمة
  };

  return (
    <div className="add-product-container animate-fade-in">
      {/* استدعاء اللودر بنوع 'form' ليقوم بعرض جمل التشفير والتحقق من الأصول */}
      {isSubmitting && <AppLoader type="form" />}

      <div className="form-header">
        <h2 className="form-title">🚀 List New Asset</h2>
        <p className="form-subtitle">Bridge the Physical and Digital Worlds via Pi Network</p>
      </div>
      
      <form onSubmit={handleSubmit} className="market-form">
        {/* قسم رفع الصور */}
        <div className="upload-section">
          <label className="image-placeholder">
            <input type="file" accept="image/*" className="hidden-input" />
            <div className="upload-content">
              <span className="upload-icon">📸</span>
              <span className="upload-text">Add Product Photos</span>
              <span className="upload-subtext">High quality photos build more trust</span>
            </div>
          </label>
        </div>

        {/* حقل الاسم */}
        <div className="input-group">
          <label className="field-label">Product Name</label>
          <input 
            className="form-input"
            type="text" 
            placeholder="e.g. iPhone 15 Pro, Digital Art, or Real Estate"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        {/* حقل السعر والتصنيف */}
        <div className="form-row">
          <div className="input-group flex-1">
            <label className="field-label">Price (π)</label>
            <input 
              className="form-input"
              type="number" 
              step="0.0001"
              placeholder="0.00"
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required 
            />
          </div>
          <div className="input-group flex-1">
            <label className="field-label">Category</label>
            <select className="form-select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="Tech">Electronics</option>
              <option value="Food">Commodities</option>
              <option value="Craft">Collectibles</option>
              <option value="RealEstate">Properties</option>
            </select>
          </div>
        </div>

        {/* اختيار نوع المنتج (واقعي / افتراضي) */}
        <div className="input-group">
          <label className="field-label">Asset Origin</label>
          <div className="type-selector-wrapper">
            <button 
              type="button" 
              className={`type-btn ${formData.origin === 'REAL_WORLD' ? 'active-real' : ''}`}
              onClick={() => setFormData({...formData, origin: 'REAL_WORLD'})}
            >
              📦 Physical
            </button>
            <button 
              type="button" 
              className={`type-btn ${formData.origin === 'VIRTUAL' ? 'active-virtual' : ''}`}
              onClick={() => setFormData({...formData, origin: 'VIRTUAL'})}
            >
              💻 Digital
            </button>
          </div>
        </div>

        {/* حقول ديناميكية تظهر حسب نوع المنتج */}
        <div className="dynamic-fields-area">
          {formData.origin === 'REAL_WORLD' ? (
            <div className="field-group-animate">
              <div className="input-group">
                <label className="field-label">Location (City/Country)</label>
                <input 
                  className="form-input"
                  type="text" 
                  placeholder="Where is the item located?"
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="field-group-animate">
              <div className="input-group">
                <label className="field-label">Access/Delivery Method</label>
                <select className="form-select" onChange={(e) => setFormData({...formData, condition: e.target.value})}>
                  <option value="INSTANT">Instant Access</option>
                  <option value="EMAIL">Email Delivery</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="input-group">
          <label className="field-label">Full Description</label>
          <textarea 
            className="form-textarea"
            rows={3}
            placeholder="Describe the item condition, specs, or history..."
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="submit-form-btn" disabled={isSubmitting}>
          {isSubmitting ? "ENCRYPTING ASSET..." : "PUBLISH TO GLOBAL MARKET"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
