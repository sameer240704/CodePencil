const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const path = require("path");
const upload = require("../middlewares/multer.middleware");

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

    const updateStatus = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          status: "Online",
        },
      }
    );

    if (!updateStatus) {
      res
        .status(400)
        .json({ message: "Cannot login the user, try again later" });
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

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Couldn't find the user you are looking for " });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).status({ message: "Error: getUserById broke down " });
  }
};

const logoutUser = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findById(_id);

    if (!user) {
      res.status(400).json({ message: "User doesn't exists" });
    }

    const updateStatus = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          status: "Offline",
        },
      }
    );

    if (!updateStatus) {
      res
        .status(400)
        .json({ message: "Cannot logout the user. Please try again" });
    }

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error logging out user: ", error.message);
    res.status(400).json({ message: "Please try logging out again" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username profileImage");

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({ message: "Please try again" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserById,
  logoutUser,
  getAllUsers,
};
