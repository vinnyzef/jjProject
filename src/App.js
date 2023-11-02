import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import BrowseComponent from './BrowseComponent';
import CartView from './CartView';
import ConfirmationView from './ConfirmationView';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BrowseComponent />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/confirmation" element={<ConfirmationView/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
