import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "./CartContext";
import { Button, Form, Container, Card, ListGroup } from 'react-bootstrap';

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
    <Container className="cart-view mt-5">
      <Card>
        <Card.Header as="h1">Cart</Card.Header>
        <Card.Body>
          <Card.Title as="h3">Cart Items:</Card.Title>
          {Object.entries(cart).length > 0 ? (
            <ListGroup variant="flush">
              {Object.entries(cart).map(([productId, quantity]) => {
                const product = products.find(p => p.id === parseInt(productId));
                return (
                  <ListGroup.Item key={productId}>
                    {product.title} - {quantity} x ${product.price} = ${(quantity * product.price).toFixed(2)}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <Card.Text className="mt-3">
            <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
          </Card.Text>
          <Form onSubmit={handleSubmit} className="mt-4">
            <h3>Shipping Information:</h3>
            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="cardNumber" className="mb-3">
              <Form.Label>Credit Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={userInfo.cardNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="address1" className="mb-3">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                name="address1"
                value={userInfo.address1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="city" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={userInfo.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="state" className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={userInfo.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="zip" className="mb-3">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control
                type="text"
                name="zip"
                value={userInfo.zip}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="me-2">Proceed to Confirmation</Button>
            <Button variant="secondary" onClick={handleReturnToBrowse}>Return to Browse</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CartView;
