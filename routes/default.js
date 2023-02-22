const express = require("express");

// this is better practice when dividing app into more manageable pieces, best to only use app in the main file and Router in the others
const router = express.Router();

// router is an object
router.get("/", (req, res) => {
  res.render("index"); // file name without the .ejs
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
