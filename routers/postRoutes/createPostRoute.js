const express = require("express");
const router = express.Router();

router.get("/create", async (req, res) => {
  try {
    console.log("conn");
    res.send("router connected!");
  } catch (error) {
    return res.status(500).json([
      {
        msg: "Server Error",
      },
    ]);
  }
});

module.exports = router;
