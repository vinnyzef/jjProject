import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CartContext } from './CartContext';

function BrowseComponent() {
  const { products } = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <div className="products">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Button onClick={() => navigate('/cart')}>Go to Cart</Button>
    </div>
  );
}

export default BrowseComponent;
