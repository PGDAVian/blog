const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/userModel");


router.post(
  "/register",
  [
    check("name", "Name is Required!").not().isEmpty(),
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
      const { name, email, password , image } = req.body;

      try {
        let user = await User.findOne({ email: email });
        if (user) {
          return res.status(400).json([
            {
              msg: "User Already Exists",
            },
          ]);
        } else {
          user = new User({
            name: name,
            email: email,
            password: password,
            image : image 
          });

          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);

          await user.save();

          return res.status(200).json([
            {
              msg: "User Registration successfull , Please Login !",
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
    }
  }
);

module.exports = router;
