const User = require("../models/user.models");

const getUsersLeaderboard = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const count = await User.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const offset = (page - 1) * limit;

    const users = await User.find()
      .sort({ points: -1 })
      .skip(offset)
      .limit(limit)
      .select("-password");

    res.status(200).json({ users, totalPages });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = { getUsersLeaderboard };
