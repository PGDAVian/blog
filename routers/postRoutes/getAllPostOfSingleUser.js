const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");

router.get("/all_post_of_single_user/:id", async (req, res) => {
  try {
    const posts = await Posts.find({ user: req.params.id }).populate("user", [
      "_id",
      "name",
      "email",
      "image",
    ]);
    return res.status(200).json({
      posts: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json([
      {
        msg: "Server Error",
      },
    ]);
  }
});

module.exports = router;
