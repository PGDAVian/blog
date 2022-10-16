const express = require("express");
const router = express.Router();
const User = require('../../models/userModel')

router.get("/all_user", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    return res.status(500).json([
      {
        msg: "Server Error",
      },
    ]);
  }
});

module.exports = router;
