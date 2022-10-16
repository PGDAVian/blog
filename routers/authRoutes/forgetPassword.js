const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

router.post("/send_forget_pass_link", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email }).select("-password");

    if (!user) {
      return res.status(400).json([
        {
          msg: "No User With This Email Address",
        },
      ]);
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.mail_account,
          pass: process.env.mail_app_pass,
        },
      });

      const resetLink = `https://guarded-peak-58085.herokuapp.com/reset/${user._id}`;

      let mailOptions = {
        from: "alphamhdy@gmail.com",
        to: email,
        subject: `The subject goes here `,
        html: `Please Click ${resetLink}`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(400).json([
            {
              msg: "something happend wrong",
            },
          ]);
        } else {
          return res.status(200).json([
            {
              msg: "please check your email",
            },
          ]);
        }
      });
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
