import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../store/CartContext";
import { useContext } from "react";
import CartItem from "./CartItem";
import "./address-form.css";

function AddressForm() {
  const cartCtx = useContext(CartContext);
  const [formData, setFormData] = useState({
    address: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(formData);
    event.preventDefault();
    submitOrder(formData);
  };

  return (
    <>
      {cartCtx.items.length == 0 ? (
        <div class="empty-cart">
          <h2>Your cart is currently empty!</h2>
          <p>Start adding items to your cart to experience the shopping joy.</p>
          <Link to={"/"}>
            <button class="button-resto">Restaurant List</button>{" "}
          </Link>
        </div>
      ) : (
        <div className="address-form">
          {console.log(cartCtx.items)}
          <h2>Enter Your Delivery Details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel" // Use "tel" input type for phone numbers
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <button type="submit">Confirm Order</button>
          </form>
          <Link to="/cart">Back to Cart</Link>
        </div>
      )}
    </>
  );
}

function submitOrder(orderDetails) {
  fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Order submitted successfully:", data);
    })
    .catch((error) => {
      console.error("Error submitting order:", error);
    });
}

export default AddressForm;
