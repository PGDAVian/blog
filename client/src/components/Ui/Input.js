import React from "react";

const Input = ({ type, placeholder , ref , ...otherProps  }) => {
  return (
    <>
      <input 
        type={type} 
        placeholder={placeholder} 
        {...otherProps} 
        className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
        />
    </>
  );
};

export default Input;
