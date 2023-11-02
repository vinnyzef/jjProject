import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ConfirmationView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, purchasedItems, totalAmount } = location.state;

  const redactedCardNumber = "**** **** **** " + userInfo.cardNumber.slice(-4);

  const handleBackToBrowse = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-view">
      <h1>Order Confirmation</h1>
      <h3>Purchased Items:</h3>
      <ul>
        {purchasedItems.map(item => (
          <li key={item.id}>
            {item.title} - {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total Purchase Amount: ${totalAmount.toFixed(2)}</p>
      <h3>User Information:</h3>
      <p>Full Name: {userInfo.fullName}</p>
      <p>Email: {userInfo.email}</p>
      <p>Credit Card: {redactedCardNumber}</p>
      <p>Address: {userInfo.address1}, {userInfo.city}, {userInfo.state} {userInfo.zip}</p>
      <Button onClick={handleBackToBrowse}>Back to Browse</Button>
    </div>
  );
}

export default ConfirmationView;
