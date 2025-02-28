const Order = require("../model/order");
const User = require("../model/userModel");

//Place Order
const placeOrder = async (req, res) => {
  try {
    const id = req.user.id;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDatafromDb = await newOrder.save();

      //saving Order in User model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDatafromDb._id },
      });

      //Clearing from cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.json({
      status: "Success",
      message: "Order Placed Successfully...",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

//get order history of particular user
const getorderHistory = async (req, res) => {
  try {
    const id = req.user.id;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const orderData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

//get all orders by Admin role
const getallOrder = async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

//update order --- admin role
const updatestatus = async (req, res) => {
  try {
    const id = req.user.id;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status updated Successfully...",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

module.exports = {
  placeOrder,
  getorderHistory,
  getallOrder,
  updatestatus,
};
