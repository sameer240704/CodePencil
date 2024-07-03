const express = require("express");
const {
  postFriendRequest,
  acceptFriendRequest,
  getAllFriendRequestsForUser,
  rejectFriendRequest,
  getFriendsForUser,
} = require("../controllers/buddies.controllers");

const router = express.Router();

router.post("/postFriendRequest", postFriendRequest);
router.post("/acceptFriendRequest", acceptFriendRequest);
router.post("/getAllFriendRequestsForUser", getAllFriendRequestsForUser);
router.post("/rejectFriendRequest", rejectFriendRequest);
router.post("/getFriendsForUser", getFriendsForUser);

module.exports = router;
