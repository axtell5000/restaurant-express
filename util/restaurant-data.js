const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "restaurants.json"); // path of file to be used

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath); // read file
  const storedRestaurants = JSON.parse(fileData); // convert to JS object existing data from file

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); // to JSON object string and write to file with new data
}

// need to export the things you want to expose to other files so they can require/ import it
module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
