import React from 'react';
import './Cart.css';

const Cart: React.FC = () => (
  <div className="cart-container">
    <div className="cart-header">
      <span className="cart-title">Your Order</span>
      <span className="pi-total">Total: 0.00 π</span>
    </div>
    <button className="checkout-btn">Proceed to Payment</button>
  </div>
);
export default Cart;
