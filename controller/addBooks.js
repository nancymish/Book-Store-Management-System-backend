const Book = require("../model/book");

//Add New Book
const addBook = async (req, res) => {
  try {
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      url: req.body.url,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "Book added successfully..." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Update Book
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { url, title, author, price, language, desc } = req.body;

    await Book.findByIdAndUpdate(bookId, {
      url,
      title,
      author,
      price,
      language,
      desc,
    });

    return res.status(200).json({ message: "Book Updated Successfully..." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Delete Book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    return res
      .status(200)
      .json({ message: "Book has been Deleted Successfully..." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//GetBook
const getBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Get Recentky Added Book
const recentBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(8);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//get Description about single book
const bookDesc = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  getBook,
  recentBook,
  bookDesc,
};
