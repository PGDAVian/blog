const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");


const isAuthValid = require("../../middlewares/checkIsAuthValid")


router.get("/me", isAuthValid , async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json([
      {
        msg: "Server Error",
      },
    ]);
  }
});

module.exports = router;
