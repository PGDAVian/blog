import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllPostOfSingleUser } from "../../../redux/actions/postActions";
// import { profileData } from "../../../dummyData/dummy";

const AllPostOfASingleUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const postReducer = useSelector((state) => state.postReducer);
  // const

  // const {posts} = postReducer

  // const { user } = post;

  // console.log(post);
  // console.log(user);

  // console.log(postReducer);

  const { posts } = postReducer;


  // console.log(user);

  useEffect(() => {
    dispatch(getAllPostOfSingleUser(params.id));
  }, [dispatch, params.id]);

  if (posts.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="text-3xl">Loading...</div>
      </div>
    );
  }
  const { user } = posts[0];
  return (
    <div className="py-32">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-6/12 sm:w-3/12  mx-auto">
            <Link to={`/single_profile/${user._id}`} className=" flex flex-col items-center px-1 py-5 text-white rounded-xl bg-indigo-800">
              <div className="h-28 border border-orange-500 p-1 rounded-xl">
                <img
                  src={user.image}
                  className="h-full w-full object-cover rounded-xl"
                  alt="user_image"
                />
              </div>
              <div className="text-xl">{user.name}</div>
              <div className="text-xs">{user.email}</div>
            </Link>
          </div>
          <div className="w-full sm:w-4/12">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border shadow-md rounded-xl my-3 group cursor-pointer transition-all duration-700 hover:bg-orange-100  ml-10 mr-10 sm:mr-2 sm:ml-0"
              >
                <Link to={`/single/${post._id}`} className="flex">
                  <div className="h-20 w-20">
                    <img
                      src={post.photo}
                      className="h-full w-full object-cover p-2 rounded-xl"
                      alt="post_image"
                    />
                  </div>
                  <div className="text-sm mt-5 space-y-3 group-hover:mt-3 transition-all duration-700">
                    <div className="text-sm">{post.title.substring(0, 10)}</div>
                    <div>{post.tag}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="w-full sm:w-4/12 h-20 bg-blue-800"></div>
        </div>
      </div>
    </div>
  );
};

export default AllPostOfASingleUser;
