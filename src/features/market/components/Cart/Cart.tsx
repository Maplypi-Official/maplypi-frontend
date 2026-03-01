import React from 'react';
import './Cart.css';

// تعريف الـ Props لضمان استقبال بيانات السلة من الباك أند أو الـ State Management
interface CartProps {
  totalAmount?: number;
  itemCount?: number;
}

const Cart: React.FC<CartProps> = ({ totalAmount = 0, itemCount = 0 }) => {
  // لا يظهر الكارت إلا إذا كان هناك منتجات مختارة
  if (itemCount === 0 && totalAmount === 0) return null;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="title-group">
          <span className="cart-title">Your Order</span>
          <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: '8px' }}>
            ({itemCount} items)
          </span>
        </div>
        <span className="pi-total">Total: {totalAmount.toFixed(2)} π</span>
      </div>
      
      <button className="checkout-btn" onClick={() => console.log("Processing Pi Payment...")}>
        Proceed to Secure Payment
      </button>
      
      <p style={{ textAlign: 'center', fontSize: '9px', color: '#64748b', marginTop: '10px', textTransform: 'uppercase' }}>
        Verified by Pi Network Mainnet Sync
      </p>
    </div>
  );
};

export default Cart;
