import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "./CartContext";
import { Button, Form } from 'react-bootstrap';

function CartView() {
  const { cart, products, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    address1: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const purchasedItems = [];
  let totalAmount = 0;
  for (const [productId, quantity] of Object.entries(cart)) {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      totalAmount += product.price * quantity;
      purchasedItems.push({ ...product, quantity });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/confirmation', { state: { userInfo, purchasedItems, totalAmount } });
    clearCart();
  };
  const handleReturnToBrowse = () => {
    navigate('/');
  };

  return (
    <div className="cart-view">
      <h1>Cart</h1>
      {/* Render cart items here */}
      <ul>
        {Object.entries(cart).map(([productId, quantity]) => {
          const product = products.find(p => p.id === parseInt(productId));
          return (
            <li key={productId}>
              {product.title} - {quantity} x ${product.price} = ${(quantity * product.price).toFixed(2)}
            </li>
          );
        })}
      </ul>
      {/* User Information Form */}
      <Form onSubmit={handleSubmit}>
        <h3>Shipping Information:</h3>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={userInfo.fullName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="cardNumber">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={userInfo.cardNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="address1">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            name="address1"
            value={userInfo.address1}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={userInfo.city}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={userInfo.state}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="zip">
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={userInfo.zip}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Proceed to Confirmation</Button>
        <Button variant="secondary" onClick={handleReturnToBrowse}>Return to Browse</Button>

      </Form>
    </div>
  );
}

export default CartView;
