import React from "react";
import RestaurantCard from "./RestaurantCard"; // Import your card component
import CartContext from "../../../store/CartContext";
import { useContext } from "react";
import "./Resto.css";
import restaurants from "../../../data/resto";

function Restaurants(props) {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount = 1) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount,
      price: props.price,
    });
  };

  // const DUMMY_MEALS = [
  //   {
  //     id: "resto_001",
  //     name: "DA PEPPER ️PIZZA",
  //     image:
  //       "https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85",
  //     discount: "10%",
  //     proDiscount: "None",
  //     deliveryTime: "40",
  //     cuisine: "Indian",
  //     rating: "3.6",
  //     costPerPerson: 150,
  //     phone_number: "+918383930685",
  //   },
  //   {
  //     id: "resto_002",
  //     name: "The Moga Indian Restaurant",
  //     image:
  //       "https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85",
  //     discount: "10%",
  //     proDiscount: "None",
  //     deliveryTime: "30",
  //     cuisine: "Indian",
  //     rating: "3.9",
  //     costPerPerson: 150,
  //     phone_number: "+917298042980",
  //   },
  //   {
  //     id: "resto_003",
  //     name: "Kesar Restaurant",
  //     image:
  //       "https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85",
  //     discount: "10%",
  //     proDiscount: "None",
  //     deliveryTime: "40",
  //     cuisine: "Indian",
  //     rating: "4.5",
  //     costPerPerson: 150,
  //     phone_number: "",
  //   },
  //   {
  //     id: "resto_003",
  //     name: "Max Pizza",
  //     image:
  //       "https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85",
  //     discount: "40%",
  //     proDiscount: "None",
  //     deliveryTime: "30",
  //     cuisine: "Italian, Fast Food, Beverages",
  //     rating: "4.5",
  //     costPerPerson: 150,
  //     phone_number: "",
  //   },
  // ];
  // const DUMMY_MEALS = [
  //   {
  //     id: "1",
  //     name: "Pizza Hut",
  //     image:
  //       "https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85",
  //     discount: "40% OFF Up to ₹80",
  //     proDiscount: "PRO extra 15% OFF",
  //     deliveryTime: "39 mins",
  //     cuisine: "Italian, Fast Food, Beverages",
  //     rating: 4.6,
  //     costPerPerson: 200,
  //   },
  //   {
  //     id: "2",
  //     name: "Paper Pizza",
  //     image:
  //       "https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85",
  //     discount: "40% OFF Up to ₹80",
  //     proDiscount: "PRO extra 15% OFF",
  //     deliveryTime: "39 mins",
  //     cuisine: "Italian, Fast Food, Beverages",
  //     rating: 4.6,
  //     costPerPerson: 200,
  //   },
  //   {
  //     id: "2",
  //     name: "Paper Pizza",
  //     image:
  //       "https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85",
  //     discount: "40% OFF Up to ₹80",
  //     proDiscount: "PRO extra 15% OFF",
  //     deliveryTime: "39 mins",
  //     cuisine: "Italian, Fast Food, Beverages",
  //     rating: 4.6,
  //     costPerPerson: 200,
  //   },
  //   {
  //     id: "2",
  //     name: "Paper Pizza",
  //     image:
  //       "https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85",
  //     discount: "40% OFF Up to ₹80",
  //     proDiscount: "PRO extra 15% OFF",
  //     deliveryTime: "39 mins",
  //     cuisine: "Italian, Fast Food, Beverages",
  //     rating: 4.6,
  //     costPerPerson: 200,
  //   },
  // ];

  return (
    <div className="restos">
      <div className="resto-container">
        {restaurants.map((resto) => (
          <RestaurantCard
            restaurant={resto}
            onAddToCart={addToCartHandler}
            key={resto.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
