import React, { useState, useEffect, useContext } from "react";
import CartContext from "../../../store/CartContext";
import ThePaperPizza from "../../../data/menu";
import "./MenuPage.css";
import restaurants from "../../../data/resto";
import { useParams } from "react-router-dom";

function MenuPage() {
  const [menuData, setMenuData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const cartCtx = useContext(CartContext);
  const { id } = useParams();

  const { discount } = restaurants.find((resto) => {
    return resto.id === id;
  });

  useEffect(() => {
    setMenuData(ThePaperPizza);
  }, []);

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prevState) => ({
      ...prevState,
      [itemId]: size,
    }));
  };

  const addToCartHandler = (item) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    const selectedSize = selectedSizes[item.id] || "Regular";
    const price = item.sizes ? item.sizes[selectedSize] : item.price;

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity++;
    } else {
      updatedCartItems.push({ ...item, quantity: 1, selectedSize });
    }

    setCartItems(updatedCartItems);
    const discountedPrice = Math.round(price * discount);
    cartCtx.addItem({
      id: item.id,
      name: item.name,
      amount: 1,
      price: discountedPrice,
      size: selectedSize,
    });
  };

  const removeFromCartHandler = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.id === itemId
    );

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity--;
      if (updatedCartItems[existingItemIndex].quantity === 0) {
        updatedCartItems.splice(existingItemIndex, 1);
      }
    }

    setCartItems(updatedCartItems);
    cartCtx.removeItem(itemId);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const handleImageError = (e, category) => {
    console.log(category);
    if (category === "pizza") {
      e.target.src =
        "https://i.ibb.co/rGP6MRH/chad-montano-Mq-T0asuo-Ic-U-unsplash.jpg";
    } else {
      e.target.src =
        "https://i.ibb.co/rGP6MRH/chad-montano-Mq-T0asuo-Ic-U-unsplash.jpg"; // Replace with your default image URL for other categories
    }
  };

  return (
    <div className="menu-page">
      {console.log(calculateTotalPrice)}
      {Object.keys(menuData).map((category) => (
        <div key={category} className="menu-category">
          <h2>{category}</h2>
          <div className="menu-items">
            {menuData[category].items.map((item) => (
              <div className="menu-item" key={item.id}>
                <div className="menu-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => handleImageError(e, category)}
                  />
                </div>
                <div className="menu-item-details">
                  <h3 className="menu-item-name">{item.name}</h3>
                  {item.sizes && (
                    <div className="menu-item-price">
                      <label>Choose Size: </label>
                      <select
                        value={selectedSizes[item.id] || "Regular"}
                        onChange={(e) =>
                          handleSizeChange(item.id, e.target.value)
                        }
                      >
                        {Object.keys(item.sizes).map((size) => (
                          <option key={size} value={size}>
                            {size}: ₹{item.sizes[size]}
                          </option>
                        ))}
                      </select>

                      <p className="menu-item-price">
                        {discount !== 1 ? (
                          <>
                            <span className="original-price">
                              ₹{item.sizes[selectedSizes[item.id] || "Regular"]}
                            </span>{" "}
                            <span className="discounted-price">
                              {Math.round(
                                item.sizes[
                                  selectedSizes[item.id] || "Regular"
                                ] * discount // Applying 10% discount
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            <p>
                              Price: ₹
                              {item.sizes[selectedSizes[item.id] || "Regular"]}
                            </p>
                          </>
                        )}
                      </p>
                    </div>
                  )}
                  {!item.sizes && (
                    <p className="menu-item-price">₹{item.price}</p>
                  )}
                  <p className="menu-item-description">
                    {item.description.split(" ").splice(0, 9).join(" ") +
                      "...."}
                  </p>
                  <div className="quantity-control">
                    {cartItems.find((i) => i.id === item.id)?.quantity >= 1 ? (
                      <button
                        className="btn-remove"
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        REMOVE
                      </button>
                    ) : (
                      ""
                    )}
                    <span className="item-count">
                      {cartItems.find((i) => i.id === item.id)?.quantity || 0}
                    </span>
                    <button
                      className="btn-add"
                      onClick={() => addToCartHandler(item)}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuPage;
