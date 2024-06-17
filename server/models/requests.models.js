const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendRequestsSchema = new Schema(
  {
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    status: {
      type: String,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FriendRequest", friendRequestsSchema);
