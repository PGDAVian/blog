const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");

router.get("/latest_posts", async (req, res) => {
  try {
    const latestPosts = await Posts.find({}).sort({ date: -1 }).limit(3)
    return res.status(200).json({
      latestPosts: latestPosts,
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
