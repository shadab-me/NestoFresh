import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";

function RestaurantCard({ restaurant }) {
  return (
    <div className="card">
      <Link to={`/menu/${restaurant.id}`}>
        {" "}
        <div className="card-media">
          <img src={restaurant.image} alt={restaurant.name} />
          <div className="discount">{restaurant.discount}</div>
          <div className="pro-discount">{restaurant.proDiscount}</div>
          <div className="delivery-time">{restaurant.deliveryTime} mints</div>
        </div>
        <div className="card-description">
          <div className="about-place">
            <div className="place">
              <p className="place-name">{restaurant.name}</p>
              <p className="place-speciality">{restaurant.cuisine}</p>
            </div>
            <div className="place-review">
              <p className="rating">{restaurant.rating} &#x2605;</p>
              <p className="per-person">₹{restaurant.costPerPerson} per one</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;
