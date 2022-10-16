const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/userModel");


router.post(
  "/login",
  [
    check("email", "please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    } else {
      const { email, password } = req.body;

      try {
        let user = await User.findOne({ email: email });
        if (!user) {
          return res.status(400).json([
            {
              msg: "Invalid Credentials",
            },
          ]);
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json([
              {
                msg: "Invalid Credentials",
              },
            ]);
          } else {
            const payload = {
              user: {
                id: user.id,
              },
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRATE,
              {
                expiresIn: 36000000,
              },
              (err, token) => {
                if (err) {
                  throw err;
                } else {
                  return res.status(200).json({ token: token });
                }
              }
            );
          }
        }
      } catch (error) {
        console.error(error.message);
        return res.status(500).json([
          {
            msg: "Server Error",
          },
        ]);
      }
    }
  }
);

module.exports = router;
