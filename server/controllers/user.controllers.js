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
      throw Error("All fields must be filled!");
      // return res.status(400).send({ message: "All fields must be filled!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw Error("User doesn't exist!");
      // return res.status(400).send({ message: "User doesn't exist!" });
    }

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) {
      throw Error("Password is incorrect");
      // return res.status(400).send({ message: "Password is incorrect" });
    }

    res.status(200).json(newUser._id);
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!email || !password || !name || !username) {
      // throw Error("All fields must be filled!");
      return res.status(400).send({ message: "All fields must be filled!" });
    }

    if (!validator.isEmail(email)) {
      // throw Error("Invalid email");
      return res.status(400).send({ message: "Invalid email" });
    }

    if (!validator.isStrongPassword(password)) {
      // throw Error("The password is not strong enough");
      return res
        .status(400)
        .send({ message: "The password is not strong enough" });
    }

    if (existingUser) {
      // throw Error("User already exists!");
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hash,
    });

    const token = createToken(newUser._id);

    newUser.save();

    res.status(200).json(newUser._id, token);
  } catch (error) {
    res.status(401).json({ message: "Couldn't register the user" });
  }
};

module.exports = { loginUser, registerUser };
