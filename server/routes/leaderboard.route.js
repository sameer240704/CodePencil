const express = require("express");
const {
  getUsersLeaderboard,
} = require("../controllers/leaderboard.controllers");

const router = express.Router();

router.get("/getUsers", getUsersLeaderboard);

module.exports = router;
