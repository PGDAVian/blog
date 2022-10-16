const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");

router.put("/update/:postId", async (req, res) => {
  try {
    // console.log("conn");
    // console.log(req.params.postId);
    // console.log(req.body);
    const { name, tag, desc } = req.body;

    const findPost = await Posts.findById(req.params.postId);

    if (name !== "") {
      findPost.title = name;
    }
    if (tag !== "") {
      findPost.tag = tag;
    }
    if (desc !== "") {
      findPost.desc = desc;
    }

    await findPost.save();

    return res.status(200).json({
      msg: "Post Updated Successfully",
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
