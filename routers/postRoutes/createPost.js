const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");
const User = require("../../models/userModel");
const isAuthValid = require("../../middlewares/checkIsAuthValid");
const { check, validationResult } = require("express-validator");

router.post(
  "/create_post",
  [
    check("title", "Title is required").not().isEmpty(),
    check("tag", "Title is required").not().isEmpty(),
    check("desc", "Description is required").not().isEmpty(),
  ],
  isAuthValid,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    } else {
      const { title, photo, tag, desc, date } = req.body;
      try {
        const user = await User.findById(req.user.id).select("-password");

        const newPost = new Posts({
          user: user.id,
          title: title,
          photo: photo,
          tag: tag,
          desc: desc,
          author: user.name,
          authorImg: user.image,
          date: date,
        });

        await newPost.save();

        return res.status(200).json([
          {
            msg: "Post Created successfully",
          },
        ]);
      } catch (error) {
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
