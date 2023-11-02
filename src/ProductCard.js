import React, { useContext, useState } from 'react';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { addToCart, removeFromCart } = useContext(CartContext);

  const increment = () => {
    setQuantity(quantity + 1);
    addToCart(product.id);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      removeFromCart(product.id);
    }
  };

  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          ${product.price}
        </Card.Text>
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" onClick={decrement}>
            <DashCircle />
          </Button>
          <FormControl
            style={{ width: '50px', textAlign: 'center' }}
            type="number"
            value={quantity}
            readOnly
          />
          <Button variant="outline-secondary" onClick={increment}>
            <PlusCircle />
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
