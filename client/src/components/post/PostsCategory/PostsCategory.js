import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getSameCategoryPosts,
  getAllPosts,
} from "../../../redux/actions/postActions";

const PostsCategory = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const postReducer = useSelector((state) => state.postReducer);
  let categories = [];

  const { sameCategoryPosts, posts } = postReducer;

  // console.log(postReducer);

  useEffect(() => {
    dispatch(getSameCategoryPosts(params.cat));
    dispatch(getAllPosts());
    // console.log("runn");
  }, [dispatch, params.cat]);

  useEffect(() => {
    if (category !== "") {
      // console.log(category.toLowerCase());
      dispatch(getSameCategoryPosts(category.toLowerCase()));
    }
  }, [dispatch, category]);

  if (sameCategoryPosts.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="text-4xl">Loading...</div>
      </div>
    );
  }

  // setCategory(sameCategoryPosts[0].tag)

  posts.map((post) => {
    categories.push(post.tag);
  });

  // console.log(categories);

  categories = [...new Set(categories)];

  // console.log(categories);

  return (
    <div className="py-32">
      <div className="container mx-auto">
        <div className="text-center text-4xl mb-10 uppercase">
          {sameCategoryPosts[0].tag}
        </div>
        <div className="flex flex-wrap gap-x-5 flex-col-reverse md:flex-row">
          <div className="w-full md:w-8/12 ">
            <div className=" grid gap-2 mt-5 md:mt-0 sm:grid-cols-2 lg:grid-cols-3">
              {sameCategoryPosts.map((post) => {
                return (
                  <Link
                    to={`/single/${post._id}`}
                    key={post._id}
                    className="p-3 border rounded-3xl relative group cursor-pointer hover:shadow-md hover:shadow-orange-500"
                  >
                    <div className="w-full mx-auto h-52   sm:w-full md:w-52 lg:w-48">
                      <img
                        src={post.photo}
                        className="w-full h-full object-cover rounded-3xl"
                        alt="post_img"
                      />
                    </div>
                    <div className="rounded-3xl bg-gradient-to-t from-black via-black inset-0 opacity-70 absolute cursor-pointer"></div>
                    <div className="transition-all duration-700 group-hover:bottom-4 absolute bottom-2 left-3 text-white capitalize">
                      <div className="text-xl ">
                        {post.title.substring(0, 20)}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-5xl group-hover:text-indigo-400">
                          {post.tag}
                        </div>

                        <div className="flex justify-between">
                          <div className="text-xl group-hover:text-orange-400">
                            read details...
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-3/12">
            <div className="text-center w-full">
              {categories.length === 0 ? (
                <>Loading tags...</>
              ) : (
                <div>
                  {categories.map((cat, idx) => (
                    <div key={idx} className="">
                      <div
                        onClick={(e) => setCategory(e.target.innerText)}
                        className="my-3 cursor-pointer py-2 uppercase rounded-lg bg-orange-500 text-black"
                      >
                        {cat}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsCategory;
