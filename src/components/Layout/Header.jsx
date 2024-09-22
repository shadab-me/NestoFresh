import React from "react";
import mealsImage from "../../assets/pexels-catscoming-365459.jpg"; // Change this to the correct image
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Update to point to the correct path of the Nesto Fresh logo

function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes["header-content"]}>
          <img src={logo} alt="Nesto Fresh Logo" className={classes.logo} />
          <div className={classes.buttons}>
            <button className={classes.btn}>
              <i className="fas fa-utensils"></i> Food Delivery
            </button>
            <button className={classes.btn}>
              <i className="fas fa-bag"></i> Grocery
            </button>
            <button className={classes.btn}>
              <i className="fas fa-box"></i> Package Delivery
            </button>
          </div>
        </div>
        <Link to="/cart" className={classes.cartButton}>
          <HeaderCartButton />
        </Link>
      </header>
      <div className={classes["offer-banner"]}>Up to 60% Off!</div>
    </React.Fragment>
  );
}

export default Header;
