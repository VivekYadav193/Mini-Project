const mongoose = require("mongoose");

const CurriculumSchema = mongoose.Schema({
  curriculumName: {
    type: String,
  },

  chapter: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],

  courseObjectives: [
    {
      type: String,
      default: null,
    },
  ],

  books: [
    {
      type: String,
      default: null,
    },
  ],

  accessControlList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  feedBack: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Curriculum", CurriculumSchema);
