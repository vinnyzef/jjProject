import React from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmation() {
  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Your order has been successfully submitted!</p>
      <Link to="/">Return to Store</Link>
    </div>
  );
}

export default OrderConfirmation;
