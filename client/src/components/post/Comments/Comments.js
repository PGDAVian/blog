import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, saveComment } from "../../../redux/actions/postActions";
import Button from "../../Ui/Button";
import { getSinglePost } from "../../../redux/actions/postActions";
import { AiFillDelete } from "react-icons/ai";


const Comments = ({ user, postId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const postReducer = useSelector(state => state.postReducer)
  const userReducer = useSelector((state) => state.userReducer);
  const { isAuthenticated } = userReducer;

  const {post} = postReducer

  // console.log(post);
  // console.log(user);

  // console.log(comments);

  const deletingComment = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
  };

  const handleSubmitForm = (data) => {
    // dispatch();
    dispatch(saveComment(data, postId));
    reset();
  };

  // if (comments.length === 0) {
  //   return (
  //     <div>
  //       <div className="text-2xl">No Comments To Show , Add One.</div>
  //     </div>
  //   );
  // }

  if(post === null ){
    return <div className="text-2xl">Loading...</div>
  }

  return (
    <div>
      <div>total {post.comments.length} comments in this post</div>

      <div className="mt-5">
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-3">
          <div>
            <h4>
              {errors.comment && (
                <span>Please Enter Comment Description For This Post</span>
              )}
            </h4>
            <textarea
              type="textarea"
              placeholder="Enter Comment Description"
              {...register("comment", {
                required: true,
              })}
              className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
            />
          </div>
          <div>
            <Button disabled={!isAuthenticated} color="indigo" type="submit">
              {isAuthenticated === true
                ? " save your comment "
                : "Please Login To Post A Comment"}
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-5">
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <div className="flex">
              <div className="mr-3 flex space-x-2">
                <div className="h-8 w-8">
                  <img
                    src={comment.avatar}
                    className="h-full w-full object-cover rounded-full"
                    alt="user_img"
                  />
                </div>
                <div className="w-[100px]">
                  {comment.email.substring(0, 10)}
                </div>
              </div>
              <div className="bg-orange-500 p-2 mt-3 flex space-x-2 w-full justify-between rounded-lg">
                <div>{comment.text}</div>
                <div
                  onClick={() => deletingComment(postId, comment._id)}
                  className="cursor-pointer"
                >
                  {user !== null && comment.user === user._id ? (
                    <div className="flex space-x-2 items-center cursor-pointer hover:text-indigo-900 transition-all duration-500 px-3 py-1 hover:bg-white rounded-lg"><AiFillDelete/></div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
