const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");

router.post("/same_category_posts", async (req, res) => {
  try {
    const sameCatPosts = await Posts.find({ tag: req.body.category });

    return res.status(200).json({
      sameCatPosts: sameCatPosts,
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
