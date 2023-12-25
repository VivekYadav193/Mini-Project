const User = require("../models/User");
const mongoose = require("mongoose");
const Student = require("../models/Student");
const Educator = require("../models/Educator");

exports.addProfile = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = User.findOne({ _id: userid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.accountType == "student") {
      const {
        studentDepartment,
        studentUniversity,
        studentRollNo,
        studentCourse,
      } = req.body;

      const updatedStudent = await Student.findOneAndUpdate(
        { _id: user.student },
        {
          studentDepartment,
          studentUniversity,
          studentRollNo,
          studentCourse,
          currentYearOfStudy,
          studentBatch,
        },
        { new: true }
      );

      return res.status(201).json({
        success: true,
        updatedStudent,
        message: "student profile updated successfully",
      });
    } else if (user.accountType == "educator") {
      const {
        educatorId,
        designation,
        educatorDepartment,

        educatorCollege,
      } = req.body;

      const updatedEducator = await Educator.findOneAndUpdate(
        { _id: user.educator },
        {
          educatorId,
          designation,
          educatorDepartment,

          educatorCollege,
        },
        { new: true }
      );

      return res.status(201).json({
        success: true,
        updatedEducator,
        message: "educator profile updated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid account type",
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.accountType == "student") {
      const student = await Student.findOne({ _id: user.student }).populate(
        "student"
      );

      return res.status(200).json({
        success: true,
        student,
        message: "student profile fetched successfully",
      });
    } else if (user.accountType == "educator") {
      const educator = await Educator.findOne({ _id: user.educator }).populate(
        "educator"
      );

      return res.status(200).json({
        success: true,
        educator,
        message: "educator profile fetched successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid account type",
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.userDetails = async (req, res) => {
  try {
    const { userid } = req.params;
    console.log(userid);
    console.log("hello");
    const user = await User.findOne({ _id: userid });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
      message: "user details fetched successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Educator Details Controller
exports.updateEducatorDetails = async (req, res) => {
  const {
    educatorId,
    designation,
    educatorDepartment,
    educatorCollege,
    educatorCourses,
  } = req.body;

  try {
    const updatedEducator = await Educator.findByIdAndUpdate(
      req.params.userid,
      {
        educatorId,
        designation,
        educatorDepartment,
        educatorCollege,
        educatorCourses,
      },
      { new: true }
    );

    if (!updatedEducator) {
      return res.status(404).json({ error: "Educator not found" });
    }

    res.status(200).json({ educator: updatedEducator });
  } catch (error) {
    console.error("Error updating educator details:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

exports.getEducatorDetails = async (req, res) => {
  try {
    const educatorId = req.params.userid;

    console.log(educatorId);

    const educator = await Educator.findById(educatorId);

    console.log(educator);
    if (!educator) {
      return res.status(404).json({ error: "Educator not found" });
    }

    res.status(200).json({ educator });
  } catch (error) {
    console.error("Error fetching educator details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
