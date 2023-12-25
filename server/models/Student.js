const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({

  studentDepartment: {
    type: String,
    min: 6,
    max: 255,
    default: null,
  },

  studentUniversity: {
    type: String,
    min: 6,
    max: 255,
    default: null,
  },

  studentRollNo: {
    type: String,
    min: 6,
    max: 255,
    default: null,
  },

  studentCourses: [
    { 

      type: mongoose.Schema.Types.ObjectId,
      ref: "Curriculum",
    }
  ],
});

module.exports = mongoose.model("Student", StudentSchema);
