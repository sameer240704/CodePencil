const FriendRequest = require("../models/requests.models");
const User = require("../models/user.models");
const mongoose = require("mongoose");

const postFriendRequest = async (req, res) => {
  const { from, to } = req.body;

  try {
    if (from === to) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself" });
    }

    const fromObjectId = new mongoose.Types.ObjectId(from);
    const toObjectId = new mongoose.Types.ObjectId(to);

    const checkRequest = await FriendRequest.findOne({
      from: fromObjectId,
      to: toObjectId,
    });

    if (checkRequest) {
      return res.status(400).json({
        message: "You have already sent a friend request to this user",
      });
    }

    const checkOppositeRequest = await FriendRequest.findOne({
      from: toObjectId,
      to: fromObjectId,
    });
    if (checkOppositeRequest) {
      return res.status(400).json({
        message:
          "You have a friend request pending from this user, you cannot send a friend request",
      });
    }

    const fromUser = await User.findById(fromObjectId);
    if (!fromUser) {
      return res.status(400).json({ message: "You are not a registered user" });
    }

    const toUser = await User.findById(toObjectId);
    if (!toUser) {
      return res.status(400).json({
        message: "You are not sending a request to a registered user",
      });
    }

    const friendRequest = new FriendRequest({
      from: fromObjectId,
      to: toObjectId,
      status: "PENDING",
    });

    await friendRequest.save();

    return res
      .status(200)
      .json({ message: "Friend Request Sent successfully" });
  } catch (error) {
    console.error("Error creating friend request:", error);
    return res.status(500).json({ message: "Please try again" });
  }
};

const getAllFriendRequestsForUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const receivedRequests = await FriendRequest.find({
      to: userObjectId,
      status: "PENDING",
    });

    const receivedUserIds = receivedRequests.map((request) => request.from);
    const receivedUsers = await User.find(
      { _id: { $in: receivedUserIds } },
      "username"
    );

    return res.status(200).json({
      receivedRequests: receivedRequests.map((request) => ({
        _id: request._id,
        from: receivedUsers.find((user) => user._id.equals(request.from))
          .username
      })),
    });
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return res.status(500).json({ message: "Please try again" });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.status !== "PENDING") {
      return res.status(400).json({ message: "Friend request is not pending" });
    }

    friendRequest.status = "ACCEPTED";
    await friendRequest.save();

    const fromUser = await User.findById(friendRequest.from);
    const toUser = await User.findById(friendRequest.to);

    if (!fromUser || !toUser) {
      return res.status(400).json({ message: "Both users must be registered" });
    }

    fromUser.friends.push(friendRequest.to);
    toUser.friends.push(friendRequest.from);

    await fromUser.save();
    await toUser.save();

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return res.status(500).json({ message: "Please try again" });
  }
};

const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.status === "ACCEPTED") {
      return res
        .status(400)
        .json({ message: "You have already accepted their request" });
    }

    await friendRequest.deleteOne();

    return res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    return res.status(500).json({ message: "Please try again" });
  }
};

const getFriendsForUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId).populate("friends", "username profileImage");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error("Error fetching friends for user:", error);
    return res.status(500).json({ message: "Please try again" });
  }
};

module.exports = {
  postFriendRequest,
  getAllFriendRequestsForUser,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendsForUser,
};
