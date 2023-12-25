const express = require("express");
const router = express.Router();

// const { auth, isInstructor } = require("../middleware/auth");

const {
  addProfile,
  getProfile,
  userDetails,
  getEducatorDetails,
  updateEducatorDetails,
} = require("../controllers/profile");

router.post("/addProfile", addProfile);

router.get("/getProfile", getProfile);

router.get("/userdetails/:userid", userDetails);

router.post("/updateeducatordetails/:userid", updateEducatorDetails);

router.get("/educatordetails/:userid", getEducatorDetails);

module.exports = router;
