const User = require("../model/userModel");

// Add Book to favourite
const addToFavourite = async (req, res) => {
  try {
    const { bookId } = req.body; // Get bookId from request body
    const userId = req.user.id; // Extract user ID from `Authentication` middleware

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in favorites
    if (userData.favourites.includes(bookId)) {
      return res.status(400).json({ message: "Book is already in favourite" });
    }

    // Add the book to the user's favourites
    await User.findByIdAndUpdate(
      userId,
      { $push: { favourites: bookId } },
      { new: true }
    );

    return res.status(200).json({
      message: "Book is Added to favourite",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Remove from Favourites
const removeFavourite = async (req, res) => {
  try {
    const { bookId } = req.body; // Get bookId from request body
    const userId = req.user.id; // Extract user ID from `Authentication` middleware

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userData.favourites.includes(bookId)) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { favourites: bookId } },
        { new: true }
      );
    }
    return res.status(200).json({
      message: "Book is removed from favourite",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Get All favourite books
const allFavouriteBook = async (req, res) => {
  try {
    const id = req.user.id;
    const userData = await User.findById(id).populate("favourites");
    const favBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: favBooks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addToFavourite,
  removeFavourite,
  allFavouriteBook,
};
