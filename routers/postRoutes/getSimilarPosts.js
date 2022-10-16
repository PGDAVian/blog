const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");

router.post("/similar_posts", async (req, res) => {
  try {
    const similarPosts = await Posts.find({ tag: req.body.tagName })
      .sort({ date: -1 })
      .limit(2);
    return res.status(200).json({
      similarPosts: similarPosts,
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
