const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
  
  name: {
    type: String,
  },

  code: {
    type: String,
  },

  description: {
    type: String,
  },



  curriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculum",
  },

});

module.exports = mongoose.model("Subject", SubjectSchema);
