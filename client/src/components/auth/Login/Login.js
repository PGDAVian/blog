import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Ui/Button";
import { loginUser } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userReducer = useSelector((state) => state.userReducer);

  const { isAuthenticated} = userReducer;


  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/", {
        replace: true,
      });
    }
  }, [navigate, isAuthenticated]);

  const handleSubmitForm = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="container mx-auto relative">
      <div className="bg_img bg_login py-32 flex justify-center text-center">
        <div className="w-10/12 md:w-6/12 lg:w-4-12">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-5">
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
              <Button type="submit">Login</Button>
            </div>
          </form>
          <Link to='/forget_password' className="flex my-5">
            <Button color="indigo">Forget Password</Button>
          </Link>
          <Link to="/register">
            <Button>No Account ? Register Here!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
