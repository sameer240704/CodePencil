const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields must be filled!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const registerUser = async (req, res) => {
  const { name, username, email, password, profileImage } = req.body;

  try {
    if (!email || !password || !name || !username) {
      return res.status(400).json({ message: "All fields must be filled!" });
    }

    if (!profileImage) {
      return res
        .status(400)
        .json({ message: "Please enter your profile image" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "The password is not strong enough" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hash,
      profileImage,
    });

    const token = createToken(newUser._id);

    newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { loginUser, registerUser };
