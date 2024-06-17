const FriendRequest = require("../models/requests.models");

const postFriendRequest = async (req, res) => {
  const { from, to } = req.body;

  try {
    // Implement getting friend request logic over here
  } catch (error) {
    return res.status(400).json({ message: "Please try again" });
  }
};

module.exports = { postFriendRequest };
