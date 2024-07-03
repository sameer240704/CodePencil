const express = require("express");
const {
  loginUser,
  registerUser,
  getUserById,
  logoutUser,
  getAllUsers,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user/:userId", getUserById);
router.post("/logout", logoutUser);
router.get("/allUsers", getAllUsers);

module.exports = router;
