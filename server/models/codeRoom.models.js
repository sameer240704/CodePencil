const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeRoomSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notebooks: [
      {
        notebookName: {
          type: String,
          required: true,
        },
        files: [
          {
            type: String,
            required: true,
          },
        ],
        date: {
          type: Date,
          default: Date.now,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CodeRoom", codeRoomSchema);
