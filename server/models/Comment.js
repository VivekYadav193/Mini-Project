const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  comment: {
    type: String,
    default: null,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
