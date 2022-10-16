import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Button from "../../Ui/Button";
import { registerUser } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userReducer = useSelector((state) => state.userReducer);
  // console.log(userReducer);

  const { isAuthenticated, loading, message } = userReducer;

  useEffect(() => {
    if (message[0]) {
      if (message[0].msg === "User Registration successfull , Please Login !") {
        navigate("/login", {
          replace: true,
        });
      }
    }
  }, [message, navigate]);

  const handleSubmitForm = (data) => {
    const userObj = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: "https://www.w3schools.com/w3images/avatar2.png",
    };

    // console.log(userObj);
    dispatch(registerUser(userObj));
  };

  if (isAuthenticated === true) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto relative">
      <div className="bg_img bg_login py-32 flex justify-center text-center">
        <div className="w-10/12 md:w-6/12 lg:w-4-12">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
            <div>
              <h4>{errors.name && <span>please enter your name</span>}</h4>
              <input
                type="text"
                placeholder="Enter Name"
                {...register("name", {
                  required: true,
                })}
                className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
              />
            </div>
            <div>
              <h4>{errors.email && <span>please enter a valid email</span>}</h4>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
              />
            </div>
            <div>
              <h4>
                {errors.password && (
                  <span>password length more then 5 characture</span>
                )}
              </h4>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true, minLength: 5 })}
                className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
              />
            </div>

            <div>
              <Button type="submit">
                {loading === true ? "Loading..." : "Register"}
              </Button>
            </div>
          </form>
          <div className="mt-5">
            <Link to="/login">
              <Button color="indigo">Have A Account ? Login Here!</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
