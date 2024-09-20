import React from "react";
import mealsImage from "../../assets/pexels-catscoming-365459.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <Link to={"/"}>
          <h1>Tango Bites</h1>{" "}
        </Link>
        <Link to="/cart">
          <HeaderCartButton>
          </HeaderCartButton>
        </Link>{" "}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
        <div className={classes["offer-banner"]}>Up to 60% Off!</div>
      </div>
    </React.Fragment>
  );
}

export default Header;
