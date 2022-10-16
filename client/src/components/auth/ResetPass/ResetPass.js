import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../redux/actions/authActions";
import Button from "../../Ui/Button";

const ResetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const userReducer = useSelector((state) => state.userReducer);

  const { message } = userReducer;

  console.log(message);

  useEffect(() => {
    if (message.length !== 0) {
      if(message[0].msg === "Password Resetted Successfully"){
        navigate('/login' , {
          replace : true 
        })
      }
    }
  }, [message, message.length, navigate]);

  //   console.log(params.id);

  const handleSubmitForm = (data) => {
    // console.log(data);
    reset()
    dispatch(resetPassword(data, params.id));
  };

  return (
    <div className="py-32 flex flex-col items-center">
      <div className="text-4xl">reset your password here !</div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mt-10 mb-8">
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
          <Button color="indigo" type="submit">
            reset password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
