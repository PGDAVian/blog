import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);

  const { isAuthenticated } = userReducer;

  // console.log(userReducer);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="relative">
      <div
        className={` ${
          menu === true
            ? `hidden`
            : `z-40 container mx-auto bg-purple-900 text-white px-3 rounded-full my-5 fixed top-0 left-0 right-0`
        }`}
      >
        <div className="flex justify-around">
          <div className="w-[80px]">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-10 cursor-pointer items-center">
            <Link to="/create">Write</Link>
            {isAuthenticated === true ? (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">SignIn</Link>
                <Link to="/register">SignUp</Link>
              </>
            )}
          </div>
          <div
            onClick={toggleMenu}
            className="flex items-center text-2xl md:hidden"
          >
            <GiHamburgerMenu />
          </div>
        </div>
      </div>
      <div
        className={` ${
          menu === false
            ? `hidden`
            : `md:hidden z-50 fixed  w-full h-screen top-0 left-0 right-0 bottom-0 bg-black opacity-70`
        }`}
      >
        <div className="flex flex-col mt-10">
          <div className="text-white flex justify-around items-center">
            <div className="w-[60px] opacity-100">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div onClick={toggleMenu} className="text-xl cursor-pointer">
              {/* <GiCancel /> */}
              <GiCancel className="text-3xl rounded-xl hover:bg-red-800 hover:text-white hover:rotate-180 transition-all duration-1000 p-1" />
            </div>
          </div>
          <div className="text-white text-center mt-10 space-y-5 flex flex-col px-5">
            <Link to="/create" className="border-b border-white pb-2">
              Write
            </Link>
            {isAuthenticated === true ? (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="border-b border-white pb-2">
                  SignIn
                </Link>
                <Link to="/register" className="border-b border-white pb-2">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
