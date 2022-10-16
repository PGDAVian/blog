import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllUsers } from "../../../redux/actions/authActions";

const AllProfile = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);

  console.log(userReducer);
  const { users, loading } = userReducer;

  useEffect(() => {
    dispatch(loadAllUsers());
  }, [dispatch]);

  if (loading === true) {
    return (
      <div className="py-32">
        <div className=" text-4xl flex justify-center">Loading...</div>
      </div>
    );
  } else {
    if (users.length === 0) {
      return (
        <div className="py-32">
          <div className=" text-4xl flex justify-center">No User To Show</div>
        </div>
      );
    }
  }

  return (
    <div className="py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-5">All Author's</div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-3 sm:mx-0 justify-center">
          {users.map((user) => (
            <div key={user._id}>
              <Link
                to={`/single_profile/${user._id}`}
                className=" flex flex-col items-center px-1 py-5 text-white rounded-xl bg-indigo-800"
              >
                <div className="h-28 border border-orange-500 p-1 rounded-xl">
                  <img
                    src={user.image}
                    className="h-full w-full object-cover rounded-xl"
                    alt="user_image"
                  />
                </div>
                <div className="text-xl">{user.name}</div>
                <div className="text-xs">{user.email}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProfile;
