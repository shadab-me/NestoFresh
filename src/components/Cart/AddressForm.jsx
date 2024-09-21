import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../store/CartContext";
import "./address-form.css";

function AddressForm() {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    phoneNumber: "",
  });
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Start loader when submit button is clicked
    submitOrder(formData, cartCtx.items, handleSuccess);
  };

  const handleSuccess = () => {
    // Clear the cart and stop the loader
    cartCtx.clearCart();
    setLoading(false); // Stop loader when the order is successful

    // Set the order submitted state to true to show the success message
    setIsOrderSubmitted(true);

    // Redirect the user to the root page after 5 seconds
    setTimeout(() => {
      navigate("/"); // Navigate to the root (home) page
    }, 5000);
  };

  return (
    <>
      {isOrderSubmitted ? (
        <div className="order-success">
          <h2>Order Submitted Successfully!</h2>
          <p>
            A representative will call you in 2 minutes to confirm the order.
          </p>
        </div>
      ) : (
        <>
          {cartCtx.items.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is currently empty!</h2>
              <p>
                Start adding items to your cart to experience the shopping joy.
              </p>
              <Link to={"/"}>
                <button className="button-resto">Restaurant List</button>
              </Link>
            </div>
          ) : (
            <div className="address-form">
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
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />

                {/* Show loader if loading state is true */}
                {loading ? (
                  <div className="loader"></div>
                ) : (
                  <button type="submit" disabled={loading}>
                    Confirm Order
                  </button>
                )}
              </form>
              <Link to="/cart">Back to Cart</Link>
            </div>
          )}
        </>
      )}
    </>
  );
}

function submitOrder(orderDetails, cartItems, onSuccess) {
  const token = "7558034752:AAGFmnVZQiimmA2tEIogbSyraaqdXWzfBac"; // Replace with your bot token
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const chatId = 552375707; // Replace with your chat ID

  // Format the order message
  const messageText = formatOrderMessage(orderDetails, cartItems);

  fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageText,
      parse_mode: "Markdown", // Allows basic styling
    }),
  })
    .then((telegramResponse) => telegramResponse.json())
    .then((telegramData) => {
      console.log("Telegram message sent:", telegramData);
      onSuccess(); // Trigger success callback
    })
    .catch((telegramError) => {
      console.error("Error sending Telegram message:", telegramError);
    });
}

function formatOrderMessage(orderDetails, cartItems) {
  let message = `*Order Confirmation*\n\n`;
  message += `*Delivery Details:*\n`;
  message += `- *Address:* ${orderDetails.address}\n`;
  message += `- *Phone Number:* ${orderDetails.phoneNumber}\n\n`;

  message += `*Items Ordered:*\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}* (Size: ${item.size})\n`;
    message += `   - Quantity: ${item.amount}\n`;
    message += `   - Price: ₹${item.price}\n\n`;
  });

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  message += `*Total Price: ₹${totalPrice}*\n`;

  return message;
}

export default AddressForm;
