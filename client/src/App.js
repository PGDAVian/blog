import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import setAuthToken from "./utils/setAuthToken";
import { clearMessage, loadUser } from "./redux/actions/authActions";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import CreatePost from "./components/post/CreatePost";
import Profile from "./components/auth/Profile/Profile";
import ForgetPass from "./components/auth/ForgetPass/ForgetPass";
import ResetPass from "./components/auth/ResetPass/ResetPass";
import SingleProfile from "./components/auth/SingleProfile/SingleProfile";
import AllProfile from "./components/auth/AllProfile/AllProfile";
import SinglePost from "./components/post/SinglePost/SinglePost";
import AllPostOfASingleUser from "./components/post/AllPostOfASingleUser/AllPostOfASingleUser";
import PostsCategory from "./components/post/PostsCategory/PostsCategory";
// import EditPost from "./components/post/EditPost";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { message } = userReducer;

  useEffect(() => {
    if (message.length !== 0) {
      for (let i = 0; i < message.length; i++) {
        toast(message[i].msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
      dispatch(clearMessage());
    }
  }, [dispatch, message.length, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className="">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/all_profile" element={<AllProfile />} />
        <Route path="/single_profile/:id" element={<SingleProfile />} />
        <Route path="/single_user_posts/:id" element={<AllPostOfASingleUser />} />
        <Route path="/forget_password" element={<ForgetPass />} />
        <Route path="/reset/:id" element={<ResetPass />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/single/:id" element={<SinglePost />} />
        <Route path="/category/:cat" element={<PostsCategory />} />
      </Routes>
    </div>
  );
}

export default App;
