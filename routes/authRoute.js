const express = require("express");
const {
  authsignup,
  authlogin,
  authUpdate,
} = require("../controller/authController");
const { authAdmin } = require("../controller/adminController");
const { Authentication, checkAdmin } = require("../middleware/authmiddleware");
const {
  addBook,
  updateBook,
  deleteBook,
  getBook,
  recentBook,
  bookDesc,
} = require("../controller/addBooks");



const router = express.Router();

//User Login and Signup
router.post("/auth/signup", authsignup);
router.post("/auth/login", authlogin);

//Admin Role
router.put("/auth/update-user/:id", authUpdate);
router.get("/auth/get-user-info", Authentication, checkAdmin, authAdmin);

//Add Update and Delete and get all books Routes
router.post("/auth/add-book", Authentication, checkAdmin, addBook);
router.put("/auth/update-book/:id", Authentication, checkAdmin, updateBook);
router.delete("/auth/delete-book/:id", Authentication, checkAdmin, deleteBook);
router.get("/auth/get-all-book", getBook);
router.get("/auth/recent-book", recentBook);
router.get("/auth/book-desc/:id", bookDesc);



module.exports = router;
