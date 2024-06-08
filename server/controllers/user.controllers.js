const User = require("../models/user.models");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  res.json({ message: "User logged in successfully" });
};

const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
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
    newUser.save();

    res.status(200).json("User registered successfully");
  } catch (error) {
    res.status(401).json("Couldn't register the user");
  }
};

module.exports = { loginUser, registerUser };
