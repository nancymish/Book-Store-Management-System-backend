const User = require("../model/userModel");

const addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userData.cart.includes(bookId)) {
      return res.status(400).json({ message: "Book is already in cart" });
    }

    await User.findByIdAndUpdate(
      userId,
      { $push: { cart: bookId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Book is Added to Cart",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Remove from Cart
const removeCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    await User.findById(userId);
    await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: bookId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Book is removed from cart",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Get All Carts books
const allCartbook = async (req, res) => {
  try {
    const id = req.user.id;
    const userData = await User.findById(id).populate("cart");
    const cart= userData.cart.reverse();

    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured", error: error.message });
  }
};

module.exports = {
  addToCart,
  removeCart,
  allCartbook,
};
