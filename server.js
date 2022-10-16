const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const path = require("path");
const app = express();

//Middlewares
app.use(express.json({ extended: false }));
app.use(cors());

///connect database
ConnectDB();

///Routes

const registerUser = require("./routers/authRoutes/registerUser");
const loginUser = require("./routers/authRoutes/loginUser");
const loadUser = require("./routers/authRoutes/loadUser");
const forgetPassword = require("./routers/authRoutes/forgetPassword");
const resetPassword = require("./routers/authRoutes/resetPassword");
const updateUserImg = require("./routers/authRoutes/updateUserImg");
const getAllUsers = require("./routers/authRoutes/getAllUsers");
const getSingleUser = require("./routers/authRoutes/getSingleUser");
const createPost = require("./routers/postRoutes/createPost");
const getAllPost = require("./routers/postRoutes/getAllPost");
const getSinglePost = require("./routers/postRoutes/getSinglePost");
const getAllPostOfSingleUser = require("./routers/postRoutes/getAllPostOfSingleUser");
const getLatestPosts = require("./routers/postRoutes/getLatestPosts");
const getSimilarPosts = require("./routers/postRoutes/getSimilarPosts");
const getSameCategoryPost = require("./routers/postRoutes/getSameCategoryPost");
const deletePost = require("./routers/postRoutes/deletePost");
const updatePost = require("./routers/postRoutes/updatePost");
const addComment = require("./routers/postRoutes/addComment");
const deleteComment = require("./routers/postRoutes/deleteComment");

app.use("/api", registerUser);
app.use("/api", loginUser);
app.use("/api", loadUser);
app.use("/api", forgetPassword);
app.use("/api", resetPassword);
app.use("/api", updateUserImg);
app.use("/api", getAllUsers);
app.use("/api", getSingleUser);

app.use("/api", createPost);
app.use("/api", getAllPost);
app.use("/api", getSinglePost);
app.use("/api", getAllPostOfSingleUser);
app.use("/api", getLatestPosts);
app.use("/api", getSimilarPosts);
app.use("/api", getSameCategoryPost);
app.use("/api", deletePost);
app.use("/api", updatePost);
app.use("/api", addComment);
app.use("/api", deleteComment);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api Running");
  });
}

///port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
