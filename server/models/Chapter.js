const mongoose = require("mongoose");

const ChapterSchema = mongoose.Schema({
  name: {
    type: String,
  },

  topics: {
    type: String,
  },
});

module.exports = mongoose.model("Chapter", ChapterSchema);
