const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");

router.get("/all_post", async (req, res) => {
  try {
    const posts = await Posts.find().sort({date : -1})
    if (!posts) {
      return res.status(400).json([
        {
          msg: "No Post Found! Please Login And Add A Post",
        },
      ]);
    } else {
      return res.status(200).json({
        posts: posts,
      });
    }
  } catch (error) {
    return res.status(500).json([
      {
        msg: "Server Error",
      },
    ]);
  }
});

module.exports = router;
