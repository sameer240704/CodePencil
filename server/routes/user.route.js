const express = require("express");
const {
  loginUser,
  registerUser,
  getUserById,
} = require("../controllers/user.controllers");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user/:userId", getUserById);

module.exports = router;
