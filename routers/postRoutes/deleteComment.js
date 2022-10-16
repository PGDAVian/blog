const express = require("express");
const router = express.Router();
const Posts = require("../../models/postModel");
const Users = require("../../models/userModel");
const checkIsAuthValid = require("../../middlewares/checkIsAuthValid");

router.delete(
  "/delete_comment/:postId/:commentId",
  checkIsAuthValid,
  async (req, res) => {
    try {
      // console.log(req.params.postId);
      // console.log(req.params.commentId);

      const findPost = await Posts.findById(req.params.postId).populate("user");

      const findComment = findPost.comments.find(
        (comment) => comment.id === req.params.commentId
      );

      if (findComment.user.toString() !== req.user.id) {
        return res.status(401).json([
          {
            msg: "User not authorized",
          },
        ]);
      }

      let idx = findPost.comments
        .map((comment) => comment.id.toString())
        .indexOf(req.params.commentId);

      findPost.comments.splice(idx, 1);

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
  }
);

module.exports = router;
