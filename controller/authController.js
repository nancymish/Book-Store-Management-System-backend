const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authsignup = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater then 3" });
    }

    const alreadyUser = await User.findOne({ username: username });
    if (alreadyUser) {
      res.status(400).json({ message: "username already exist..." });
    }
    const alreadyemail = await User.findOne({ email: email });
    if (alreadyemail) {
      res.status(400).json({ message: "email already exist..." });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length should be greater then 5" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });

    await newUser.save();
    res.status(200).json({ message: "Sign-up Successfull..." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const authlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const alreadyUser = await User.findOne({ email: email });
    if (!alreadyUser) {
      return res.status(400).json({ message: "Invalid email or password..." });
    }

    const isMatch = await bcrypt.compare(password, alreadyUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password..." });
    }
    const token = jwt.sign(
      {
        id: alreadyUser._id,
        role: alreadyUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "20d" }
    );
    return res.status(200).json({
      message: "Login Successfully...",
      id: alreadyUser._id,
      role: alreadyUser.role,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
};
// User update
const authUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, address, email } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        address,
        email,
      },
      {
        new: true,
      }
    );

    if (!updateUser) return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "user updated successfully...", updateUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
};
module.exports = { authsignup, authlogin, authUpdate };
