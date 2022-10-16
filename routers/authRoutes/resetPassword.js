const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../../models/userModel");

router.post("/reset_pass/:urlParams", async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findById(req.params.urlParams);
    if (!user) {
      return res.status(400).json([
        {
          msg: "No User Found With This Token!",
        },
      ]);
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return res.status(200).json([
        {
          msg: "Password Resetted Successfully",
        },
      ]);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json([
      {
        msg: "Server Error",
      },
    ]);
  }
});

module.exports = router;
