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
      throw Error("Fields are empty");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw Error("User doesn't exist");
    }

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) {
      throw Error("Incorrect Password");
    }

    res.json({ message: "User logged in successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Cannot Login the user" });
  }
};

const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      throw Error("User already exists");
    }

    if (!email || !password || !name || !username) {
      throw Error("All fields must be filled!");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Generate a good password");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hash,
    });

    // const token = createToken(user._id);

    newUser.save();

    res.status(200).json("User registered successfully");
  } catch (error) {
    console.log(error.message);
    res.status(401).json("Couldn't register the user");
  }
};

module.exports = { loginUser, registerUser };
