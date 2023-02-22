const path = require("path");

const express = require("express");

// for requiring your own files in a project, path to file from file that is requiring it, without extension
const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

// Setting some options for the app
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware checks every incoming request, any static files in public folder will be served. Without this we
// would need to do a lot of app.get for every file and image
app.use(express.static("public"));
// Another middleware to encode posts
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

// middleware is here, because this must be run only if previous routes in file failed
app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(3000);
