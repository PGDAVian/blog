const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");
const Users = require("../../models/userModel");
const checkIsAuthValid = require("../../middlewares/checkIsAuthValid");

router.put("/comment/:postId", checkIsAuthValid, async (req, res) => {
  try {
    const { comment } = req.body;

    const user = await Users.findById(req.user.id);
    const findPost = await Posts.findById(req.params.postId).populate('user')

    const newComment = {
      user : req.user.id ,
      text: comment,
      email: user.email,
      avatar: user.image,
      time: new Date().toLocaleString(),
    };

    findPost.comments.unshift(newComment);

    await findPost.save();

    return res.status(200).json({
      post: findPost, 
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
