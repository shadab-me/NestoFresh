import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Restaurents from "./components/Meals/MealItem/Restaurents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./components/Meals/MealItem/MenuPage";
import AddressForm from "./components/Cart/AddressForm";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <BrowserRouter>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <Routes>
          <Route path="/" element={<Restaurents />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu/:id" element={<MenuPage />} />
          <Route path="/address-form" element={<AddressForm />}></Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
