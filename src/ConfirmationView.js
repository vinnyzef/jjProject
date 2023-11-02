import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, ListGroup, Container, Row, Col } from 'react-bootstrap';

function ConfirmationView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, purchasedItems, totalAmount } = location.state;

  const redactedCardNumber = "**** **** **** " + userInfo.cardNumber.slice(-4);

  const handleBackToBrowse = () => {
    navigate('/');
  };

  return (
    <Container className="confirmation-view mt-5">
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <Card>
            <Card.Header as="h1">Order Confirmation</Card.Header>
            <Card.Body>
              <Card.Title as="h3">Purchased Items:</Card.Title>
              <ListGroup variant="flush">
                {purchasedItems.map(item => (
                  <ListGroup.Item key={item.id}>
                    {item.title} - {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Text>
                <strong>Total Purchase Amount:</strong> ${totalAmount.toFixed(2)}
              </Card.Text>
              <Card.Title as="h3">User Information:</Card.Title>
              <Card.Text>
                <strong>Full Name:</strong> {userInfo.fullName}<br />
                <strong>Email:</strong> {userInfo.email}<br />
                <strong>Credit Card:</strong> {redactedCardNumber}<br />
                <strong>Address:</strong> {userInfo.address1}, {userInfo.city}, {userInfo.state} {userInfo.zip}
              </Card.Text>
              <Button variant="primary" onClick={handleBackToBrowse}>Back to Browse</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ConfirmationView;
