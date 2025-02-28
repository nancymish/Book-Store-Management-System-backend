const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors")
const connectDB = require("./util/db");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoute")

connectDB();
//middle ware
app.use(express.json());
app.use(cors());

//routes
app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", orderRoute)


app.listen(process.env.PORT, () => {
  console.log(`server is listening on http://localhost:${process.env.PORT}`);
});
