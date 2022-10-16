const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");

router.get("/single_profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.status(200).json({
      user: user,
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
