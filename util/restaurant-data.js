const filePath = path.join(__dirname, "data", "restaurants.json"); // path of file to be used

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath); // read file
  const storedRestaurants = JSON.parse(fileData); // convert to JS object existing data from file

  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); // to JSON object string and write to file with new data
}
