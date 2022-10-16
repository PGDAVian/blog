import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Ui/Button";
import { sendForgetPasswordLink } from "../../../redux/actions/authActions";

const ForgetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);

  const { message } = userReducer;
  console.log(message);

  const handleSubmitForm = (data) => {
    dispatch(sendForgetPasswordLink(data));
    reset();
  };

  return (
    <div className="py-32">
      <div className="flex justify-center flex-col items-center">
        <div className="text-4xl">Enter your Email Address !!</div>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="mt-10 mb-5">
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
            <Button type="submit">send email</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
