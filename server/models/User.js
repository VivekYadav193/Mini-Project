const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },

  date: {
    type: Date,
    default: Date.now,
  },
  accountType: {
    type: String,
    enum: ["admin", "educator", "developer", "student"],
    required: true,
  },
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Educator",
    default: null,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null,
  },
});

module.exports = mongoose.model("User", UserSchema);
