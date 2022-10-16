import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { logoutUser, loadUser } from "../../../redux/actions/authActions";
import { GiCancel } from "react-icons/gi";
import Button from "../../Ui/Button";
import Modal from "../../Ui/Modal";
import { useRef } from "react";
import { changeUserImage } from "../../../redux/actions/authActions";

const Profile = () => {
  const imgRef = useRef();
  const [toggleModal, setToggleModal] = useState(false);
  const [image, setImage] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { isAuthenticated, user } = userReducer;
  const { message } = userReducer;

  const openModal = () => {
    setToggleModal(true);
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  useEffect(() => {
    dispatch(loadUser());
    console.log("runn");
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (user !== null) {
      setImageLink(user.image);
    }
    console.log("runn");
  }, [message.length]);

  // useEffect(() => {
  //   if (isAuthenticated === null) {
  //     navigate("/login", {
  //       replace: true,
  //     });
  //   }
  // }, [navigate]);

  const handleLogout = (e) => {
    dispatch(logoutUser());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserImage(imageLink));
    closeModal();
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (image !== "" && image !== undefined) {
      const format = image.name.split(".");
      if (format[1] === "jpg" || format[1] === "jpeg" || format[1] === "png") {
        const imgData = new FormData();
        imgData.append("file", image);
        imgData.append("upload_preset", "heroku-upload-practice");
        imgData.append("cloud_name", "doctog5my");
        setMsg("Setting Up Your Photo Please Wait...");
        fetch(`https://api.cloudinary.com/v1_1/doctog5my/image/upload`, {
          method: "post",
          body: imgData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            setImageLink(imgData.url);
            setImage("");
            imgRef.current.value = "";
            setMsg("");
          });
      } else {
        setMsg("image format not valid!!");
      }
    } else {
      setMsg("no image ! please select a valid image");
    }
  };

  if (isAuthenticated === null) {
    return <Navigate to="/login" replace />;
  }

  if (user === null) {
    return (
      <div className="py-32 flex justify-center">
        <div className="text-5xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="py-32  flex flex-wrap flex-col items-center">
        <h3 className="text-4xl">profile info of current user.</h3>
        <div className="h-48 w-48 mt-10">
          <img
            src={user.image}
            className="rounded-xl h-full w-full object-cover"
            alt="user_img"
          />
        </div>
        <div>
          {toggleModal === true ? (
            <Modal>
              <div className="w-full">
                <div className="flex justify-evenly">
                  <div>
                    <div className=" h-48 w-48">
                      <img
                        src={imageLink}
                        alt="user_img"
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-5"
                      >
                        <div className="mt-5">
                          <div className="mb-3">
                            <span className="text-bold">Note : </span>{" "}
                            <span>
                              Please Select A Photo With .jpg or .png or .jpeg
                              format
                            </span>
                          </div>
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            placeholder="select a photo"
                            ref={imgRef}
                          />
                        </div>
                        <div>{msg !== "" ? msg : ""}</div>
                        <div
                          onClick={handlePreview}
                          className="bg-indigo-800 text-white cursor-pointer py-1 px-3 rounded-md"
                        >
                          validate and preview your photo
                        </div>
                        <div className="md:w-6/12 ">
                          <Button>save changes</Button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div onClick={closeModal} className="text-xl cursor-pointer">
                    <GiCancel className="text-3xl rounded-xl hover:bg-red-800 hover:text-white hover:rotate-180 transition-all duration-1000 p-1" />
                  </div>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
        <div className="my-5">
          <Button onClick={openModal}>update your profile picture</Button>
        </div>

        <div className="space-y-5">
          <div>
            <Link
              to={`/single_user_posts/${user._id}`}
              className="bg-indigo-800 text-white cursor-pointer py-1 px-3 rounded-md"
            >
              view all the posts of this Author
            </Link>
          </div>

          <div>
            <Link
              to="/all_profile"
              className="bg-orange-800 text-white cursor-pointer py-1 px-3 rounded-md"
            >
              All Authors
            </Link>
          </div>
        </div>

        <h4 className="text-5xl text-bold my-5">{user.name}</h4>
        <h4 className="text-5xl text-bold">{user.email}</h4>
        <div className="w-1/2 mt-8 text-center">
          <Link
            to="/login"
            onClick={handleLogout}
            className="bg-indigo-500 flex justify-center py-2 rounded-md text-white"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
