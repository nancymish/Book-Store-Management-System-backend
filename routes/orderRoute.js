const express = require("express");
const { Authentication, checkAdmin } = require("../middleware/authmiddleware");

const {
  placeOrder,
  getorderHistory,
  getallOrder,
  updatestatus,
} = require("../controller/order");

const router = express.Router();
router.post("/auth/place-order", Authentication, placeOrder);
router.get("/auth/order-history", Authentication, getorderHistory);
router.get("/auth/all-order-history", Authentication, checkAdmin, getallOrder);
router.put("/auth/update-status", Authentication, checkAdmin, updatestatus);
module.exports = router;
