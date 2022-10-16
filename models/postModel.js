const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    // required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    // required: true,
  },
  desc: {
    type: String,
    // required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: String , 
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: false,
      },
    },
  ],
  date: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("post", postSchema);
