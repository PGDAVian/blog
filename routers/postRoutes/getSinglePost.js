const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");
const User = require("../../models/userModel");

router.get("/single/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id).populate('user')
    // const user = await User.findById(post.user).select("-password");
    if (!post) {
      return res.status(400).json([
        {
          msg: "No Post Found! With This Id , Please Go To Home And Click On This Post Again",
        },
      ]);
    } else {
      return res.status(200).json({
        post: post,
      });
    }
    // return res.send('single')
  } catch (error) {
    return res.status(500).json([
      {
        msg: "Server Error",
      },
    ]);
  }
});

module.exports = router;
