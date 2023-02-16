const fs = require("fs");
const path = require("path");
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
  const filePath = path.join(__dirname, "data", "restaurants.json"); // path of file to be used

  const fileData = fs.readFileSync(filePath); // read file
  const storedRestaurants = JSON.parse(fileData); // convert to JS object existing data from file

  storedRestaurants.push(restaurant); // Add newly entered data from form and push to end of object

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); // to JSON object string and write to file with new data
  res.redirect("/confirm");
});

app.listen(3000);
