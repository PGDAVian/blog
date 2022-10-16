import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { loadSingleUser } from "../../../redux/actions/authActions";

const SingleProfile = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const params = useParams();

  const { user, loading } = userReducer;

  useEffect(() => {
    dispatch(loadSingleUser(params.id));
  }, [dispatch, params.id]);

  if (user === null || loading === true) {
    return (
      <div className="py-32 text-center">
        <div className="text-3xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-32">
      <div className="container mx-auto flex flex-col items-center space-y-5">
        <div className="h-64 w-48">
          <img
            src={user.image}
            className="h-full w-full object-cover"
            alt="user_img"
          />
        </div>
        <div className="text-2xl">{user.name}</div>
        <div className="text-3xl">{user.email}</div>
        <Link
          to={`/single_user_posts/${user._id}`}
          className="bg-indigo-800 text-white cursor-pointer py-1 px-3 rounded-md"
        >
          view all the posts of this Author
        </Link>
        <Link
          to="/all_profile"
          className="bg-orange-800 text-white cursor-pointer py-1 px-3 rounded-md"
        >
          All Authors
        </Link>
      </div>
    </div>
  );
};

export default SingleProfile;
