const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connection is successfull...");
  } catch (error) {
    console.log("error in connecting with database", error);
  }
};

module.exports = connectDB;
