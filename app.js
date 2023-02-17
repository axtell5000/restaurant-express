const fs = require("fs");
const path = require("path");

const uuid = require("uuid");
const express = require("express");

const app = express();

// Setting some options for the app
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware checks every incoming request, any static files in public folder will be served. Without this we
// would need to do a lot of app.get for every file and image
app.use(express.static("public"));
// Another middleware to encode posts
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index"); // file name without the .ejs
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  // Second value is an object of all the dynamic values on the template to use
  res.render("restaurants", {
    noOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

// working with a route using dynamic parameterd the :id is an eg
app.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id; // reading parameter from url

  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  res.status(404).render("404");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body; // new data from form to be pushed later
  restaurant.id = uuid.v4(); // adding new property to the object

  const storedRestaurants = getStoredRestaurants();

  storedRestaurants.push(restaurant); // Add newly entered data from form and push to end of object

  storeRestaurants(storedRestaurants);
  res.redirect("/confirm");
});

// middleware is here, because this must be run only if previous routes in file failed
app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(3000);
