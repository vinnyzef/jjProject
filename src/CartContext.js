import React, { createContext, useState, useEffect } from 'react';
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        fetch("http://localhost:3000/products.json").then(res => res.json()).then((data) => setProducts(data.products))
        // console.log(response.json());
        // const data = await response.json();
        // setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
  
     fetchProducts();
  }, []);
  

  const addToCart = (productId) => {
    setCart((prevCart) => {
      return { ...prevCart, [productId]: (prevCart[productId] || 0) + 1 };
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[productId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [productId]: newQuantity };
    });
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, products }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
