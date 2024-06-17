const express = require("express");
const { postFriendRequest } = require("../controllers/buddies.controllers");

const router = express.Router();

router.post("/postFriendRequest", postFriendRequest);

module.exports = router;
