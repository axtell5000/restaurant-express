const express = require("express");
const uuid = require("uuid");

const resData = require("../util/restaurant-data");

// this is better practice when dividing app into more manageable pieces, best to only use app in the main file and rRouter in the others
const router = express.Router();

router.get("/restaurants", (req, res) => {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  const storedRestaurants = resData.getStoredRestaurants();

  // for sorting
  storedRestaurants.sort((resA, resB) => {
    if (order === "asc" && resA.name > resB.name) {
      return 1;
    } else if (order === "desc" && resB.name > resA.name) {
      return 1;
    }
    return -1;
  });

  // Second value is an object of all the dynamic values on the template to use
  res.render("restaurants", {
    noOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

// working with a route using dynamic parameterd the :id is an eg
router.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id; // reading parameter from url
  const storedRestaurants = resData.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  res.status(404).render("404");
});

router.get("/confirm", (req, res) => {
  res.render("confirm");
});

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

router.post("/recommend", (req, res) => {
  const restaurant = req.body; // new data from form to be pushed later
  restaurant.id = uuid.v4(); // adding new property to the object

  const storedRestaurants = resData.getStoredRestaurants();

  storedRestaurants.push(restaurant); // Add newly entered data from form and push to end of object

  resData.storeRestaurants(storedRestaurants);
  res.redirect("/confirm");
});

module.exports = router;
