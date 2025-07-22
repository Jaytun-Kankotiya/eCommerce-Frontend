import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ProductProvider} from './contexts/ProductContext';
import ProductListing from './pages/ProductListing';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import UserProfile from './pages/UserProfile';
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';
import Address from './pages/Address';

function App() {
  return (
    <>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/productListing/:category"
            element={<ProductListing />}
          />
          <Route
            path="/productDetails/:productId"
            element={<ProductDetails />}
          />
          <Route path="/login" element={<UserProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/orders' element={<MyOrders />} />
          <Route path='/checkout' element={<Checkout />}  />
          <Route path='/address' element={<Address />}  />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
