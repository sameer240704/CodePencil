const mongoose = require("mongoose");
const codeHistoryEntrySchema = require("./codeRoom.models");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Online",
    },
    friends: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
