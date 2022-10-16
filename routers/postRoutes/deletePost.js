const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");

router.delete("/delete/:postId", async (req, res) => {
  try {
    // console.log("conn");
    console.log(req.params.postId);

    const deletePost = await Posts.findByIdAndRemove(req.params.postId);

    return res.status(200).json({
      msg: "Post Deleted Successfully",
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
