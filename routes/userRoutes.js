const express = require("express");
const { Authentication } = require("../middleware/authmiddleware");
const {
  addToFavourite,
  removeFavourite,
  allFavouriteBook,
} = require("../controller/Favourite");

const { addToCart, removeCart, allCartbook } = require("../controller/cart");
const router = express.Router();

// Favourite Routes
router.put("/auth/add-to-favourite", Authentication, addToFavourite);
router.put("/auth/remove-favourite", Authentication, removeFavourite);
router.get("/auth/all-fav-book", Authentication, allFavouriteBook);

//Cart Routes
router.put("/auth/add-to-cart", Authentication, addToCart);
router.put("/auth/remove-cart", Authentication, removeCart);
router.get("/auth/all-cart-book", Authentication, allCartbook);

module.exports = router;
