import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import single_cover from "../../../assets/single_post_cover.png";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { deletePost, updatePost } from "../../../redux/actions/postActions";
import { loadUser } from "../../../redux/actions/authActions";
import Modal from "../../Ui/Modal";
import Button from "../../Ui/Button";

// import { data } from "../../../dummyData/dummy";
import {
  getSinglePost,
  getLatestPosts,
  getSimilarPosts,
} from "../../../redux/actions/postActions";
import { useState } from "react";
import Comments from "../Comments/Comments";

const SinglePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postReducer = useSelector((state) => state.postReducer);
  const userReducer = useSelector((state) => state.userReducer);

  const { post, latestPosts, similarPosts, loading, postUser } = postReducer;
  const { isAuthenticated } = userReducer;
  const { user } = userReducer;

  // console.log(userReducer);

  useEffect(() => {
    dispatch(getSinglePost(params.id));
    // dispatch(loadUser())
    // console.log("runn");
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(getLatestPosts());
  }, [dispatch]);

  useEffect(() => {
    if (post !== null) {
      dispatch(getSimilarPosts(post.tag));
      // console.log('hey');
    }
    // console.log("runn");
  }, [dispatch, post]);

  useEffect(() => {
    if (isAuthenticated === true && user === null) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  // console.log(openModal);

  const deletingPost = (postId) => {
    dispatch(deletePost(postId));
    navigate("/", {
      replace: true,
    });
  };

  const handleSubmitForm = (data) => {
    dispatch(updatePost(data, params.id));
    reset();
    toggleModal();
  };

  // console.log(post);

  if (
    loading === true ||
    post === null ||
    (isAuthenticated === true && user === null)
  ) {
    return (
      <div className="py-32 text-center">
        <div className="text-4xl">Loading....</div>
      </div>
    );
  }

  // console.log(post);

  return (
    <div className="py-32">
      <div className="container mx-auto">
        {openModal === true ? (
          <>
            <Modal>
              <div className="flex flex-wrap py-5">
                <div className="w-8/12 mx-auto md:w-6/12 lg:w-4/12">
                  <div className="text-3xl uppercase mb-5">
                    Update Your post
                  </div>
                  <div>
                    <form
                      onSubmit={handleSubmit(handleSubmitForm)}
                      className="space-y-7"
                    >
                      <div>
                        <h4>
                          {errors.name && (
                            <span>please enter a Heading For This Post</span>
                          )}
                        </h4>
                        <input
                          type="text"
                          placeholder="Enter Post Name"
                          {...register("name", {
                            required: false,
                          })}
                          className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
                          defaultValue={post.title}
                        />
                      </div>
                      <div>
                        <select
                          className="cursor-pointer bg-indigo-800 text-white w-full  py-[3px] pl-3 pr-5 rounded-full md:w-1/2"
                          {...register("tag", {
                            required: false,
                          })}
                          defaultValue={post.tag}
                        >
                          <option value="coding" className="bg-indigo-800">
                            Coding
                          </option>
                          <option value="nature" className="bg-indigo-800">
                            Nature
                          </option>
                          <option value="animal" className="bg-indigo-800">
                            Animal
                          </option>
                          <option value="food" className="bg-indigo-800">
                            Food
                          </option>
                          <option value="travel" className="bg-indigo-800">
                            Travel
                          </option>
                        </select>
                      </div>
                      <div>
                        <h4>
                          {errors.desc && (
                            <span>Please Enter Description For This Post</span>
                          )}
                        </h4>
                        <textarea
                          type="textarea"
                          placeholder="Enter Post Description"
                          {...register("desc", {
                            required: false,
                          })}
                          className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
                          defaultValue={post.desc}
                        />
                      </div>
                      <div>
                        <Button color="indigo" type="submit">
                          Update Your Post
                        </Button>
                      </div>
                    </form>
                  </div>
                  <div onClick={toggleModal} className="text-xl cursor-pointer">
                    <GiCancel className="absolute top-10 right-16 text-3xl rounded-xl hover:bg-red-800 hover:text-white hover:rotate-180 transition-all duration-1000 p-1" />
                  </div>
                </div>
              </div>
            </Modal>
          </>
        ) : null}

        <div className="flex flex-wrap gap-x-5">
          <div className="w-full md:w-7/12 flex flex-col items-right">
            <div className="h-[250px] w-full">
              <img
                src={single_cover}
                className="w-full h-full object-cover rounded-2xl"
                alt="single_post_cover"
              />
            </div>
            <div>
              <div className="h-48 w-[280px] mx-auto sm:w-[330px] -mt-28 sm:ml-10">
                <img
                  src={post.photo}
                  className="w-full h-full object-cover rounded-xl"
                  alt="post_img"
                />
              </div>
              <div className="text-center sm:ml-10 sm:text-left">
                <div className="">
                  <div className="text-3xl mt-7 mb-2">{post.title}</div>

                  {isAuthenticated !== null ? (
                    <>
                      {user === null ? (
                        <>Loading...</>
                      ) : (
                        <>
                          {user._id === post.user ? (
                            <>
                              <div className="flex mb-5 ml-5 mt-5 space-x-5 items-center justify-center sm:justify-start">
                                <div
                                  onClick={toggleModal}
                                  className="flex items-center space-x-2 bg-blue-800 text-white py-1 px-3 rounded-lg cursor-pointer"
                                >
                                  <RiEditBoxFill />
                                  <span>update</span>
                                </div>
                                <div
                                  onClick={() => deletingPost(post._id)}
                                  className="flex items-center space-x-2 bg-red-800 text-white py-1 px-3 rounded-lg cursor-pointer"
                                >
                                  <AiTwotoneDelete /> <span>Delete</span>{" "}
                                </div>
                              </div>
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  ) : null}
                </div>
                <Link
                  to={`/single_profile/${post.user._id}`}
                  className="flex cursor-pointer group items-center justify-center sm:justify-start space-x-2"
                >
                  <div className="h-10 w-10">
                    <img
                      src={post.user.image}
                      className="h-full w-full object-cover rounded-full"
                      alt="author_img"
                    />
                  </div>
                  <div className="transition-all duration-1000 text-black rounded-xl group-hover:bg-orange-500 group-hover:px-5">
                    {post.user.name} click here to view author's profile
                  </div>
                </Link>
                <div className="text-sm mt-3">{post.date}</div>
                <div className="text-xl mt-2 mb-5">Category : {post.tag}</div>
                <div className="text-md">{post.desc}</div>

                <div className="mt-5">
                  <div className="text-2xl">Comments</div>
                  <Comments user={user} postId={post._id} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-4/12">
            <div className="w-full mt-5 md:mt-0">
              <div className="text-xl bg-orange-400 px-5 py-1 rounded-lg">
                Latest Posts
              </div>
              <div>
                <div>
                  {latestPosts.length === 0 ? (
                    <>Loading...</>
                  ) : (
                    <>
                      {latestPosts.map((lpost) => (
                        <div
                          key={lpost._id}
                          className="border shadow-md rounded-xl my-3 group cursor-pointer transition-all duration-700 hover:bg-orange-100  ml-10 mr-10 sm:mr-2 sm:ml-0"
                        >
                          <Link to={`/single/${lpost._id}`} className="flex">
                            <div className="h-20 w-20">
                              <img
                                src={lpost.photo}
                                className="h-full w-full object-cover p-2 rounded-xl"
                                alt="post_image"
                              />
                            </div>
                            <div className="text-sm mt-5 space-y-3 group-hover:mt-3 transition-all duration-700">
                              <div className="text-sm">
                                {lpost.title.substring(0, 10)}
                              </div>
                              <div>{lpost.tag}</div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full mt-16">
              <div className="text-xl bg-indigo-800 text-white px-5 py-1 rounded-lg">
                Similar Posts
              </div>
              <div>
                <div>
                  {similarPosts.length === 0 ? (
                    <>Loading...</>
                  ) : (
                    <>
                      {similarPosts.map((sPost) => (
                        <div
                          key={sPost._id}
                          className="border shadow-md rounded-xl my-3 group cursor-pointer transition-all duration-700 hover:bg-orange-100  ml-10 mr-10 sm:mr-2 sm:ml-0"
                        >
                          <Link to={`/single/${sPost._id}`} className="flex">
                            <div className="h-20 w-20">
                              <img
                                src={sPost.photo}
                                className="h-full w-full object-cover p-2 rounded-xl"
                                alt="post_image"
                              />
                            </div>
                            <div className="text-sm mt-5 space-y-3 group-hover:mt-3 transition-all duration-700">
                              <div className="text-sm">
                                {sPost.title.substring(0, 10)}
                              </div>
                              <div>{sPost.tag}</div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
