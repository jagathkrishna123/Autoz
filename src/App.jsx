import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Landingpage from './Pages/Landingpage';
import Productdetails from './Pages/Productdetails';
import Cart from './Pages/Cart';
import Lenis from 'lenis';
import ScrollToTop from './ScrollToTop';

const App = () => {
      useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

  }, []);
  return (
    <BrowserRouter>
    <ScrollToTop />
      <CartProvider>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;