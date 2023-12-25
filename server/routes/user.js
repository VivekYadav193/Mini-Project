const express = require("express");
const router = express.Router();

const { login, signup, sendotp } = require("../controllers/Auth");

router.post("/login", login);

router.post("/signup", signup);

router.post("/sendotp", sendotp);

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
