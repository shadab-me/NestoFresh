import classes from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import { useContext } from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <>
      {hasItems === false ? (
        <div className={classes["empty-cart"]}>
          <h2>Your cart is currently empty!</h2>
          <p>Start adding items to your cart to experience the shopping joy.</p>
          <Link to={"/"}>
            <button className={classes["button-resto"]}>Restaurant List</button>{" "}
          </Link>
        </div>
      ) : (
        <div className={classes.cart} style={{ width: "60%", margin: "auto" }}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            {hasItems && (
              <Link to={"/address-form"}>
                <button className={classes.button}>Order</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
