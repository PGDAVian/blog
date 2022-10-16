const express = require("express");
const router = express.Router();
const checkIsAuthValid = require("../../middlewares/checkIsAuthValid");
const User = require("../../models/userModel");

router.post("/update", checkIsAuthValid, async (req, res) => {
  // console.log(req.body);
  const { image } = req.body;
  // console.log(req.user.id);

  try {
    const user = await User.findById(req.user.id);
    user.image = image;
    await user.save();
    return res.status(200).json([
      {
        msg: "Updated Image Successfully",
      },
    ]);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json([
      {
        msg: "Server Error",
      },
    ]);
  }
});

module.exports = router;
