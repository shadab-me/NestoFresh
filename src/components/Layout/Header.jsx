import React, { useState, useEffect } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header(props) {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  // Scroll handler to make header sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Conditionally apply styles based on route
  const isHomePage = location.pathname === "/";

  return (
    <React.Fragment>
      <header
        className={`${
          isSticky || !isHomePage ? classes.smallHeader : classes.header
        }`}
      >
        <div className={classes["header-content"]}>
          <div className={classes.left}>
            <Link to="/" className={classes.homeButton}>
              Home
            </Link>
          </div>

          <div className={classes.right}>
            <Link to="/cart" className={classes.cartButton}>
              <HeaderCartButton />
            </Link>
          </div>

          {!isSticky && isHomePage && (
            <>
              <img src={logo} alt="Nesto Fresh Logo" className={classes.logo} />
              <div className={classes.buttons}>
                <button className={classes.btn}>
                  <i className="fas fa-utensils"></i> Order On Call
                </button>
                <button className={classes.btn}>
                  <i className="fas fa-bag"></i> Order On WhatsApp
                </button>
              </div>
            </>
          )}

          {(isSticky || !isHomePage) && (
            <div className={classes.buttons}>
              <button className={classes.btn}>
                <i className="fas fa-utensils"></i> Order On Call
              </button>
            </div>
          )}
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;
