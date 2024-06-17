const express = require("express");
const {
  getUsersLeaderboard,
  getSearchedUser,
} = require("../controllers/leaderboard.controllers");

const router = express.Router();

router.get("/getUsers", getUsersLeaderboard);
router.post("/getSearchedUser", getSearchedUser);

module.exports = router;
