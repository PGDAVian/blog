import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../redux/actions/postActions";
import naturePhoto from "../../assets/profile_back.jpg";
import foodPhoto from "../../assets/food.jpg";
import travelPhoto from "../../assets/travel.jpg";
import codingPhoto from "../../assets/coding.png";
import animalPhoto from "../../assets/animal-1.jpg";

const Home = () => {
  const dispatch = useDispatch();
  // const userReducer = useSelector((state) => state.userReducer);
  const postReducer = useSelector((state) => state.postReducer);
  // const { isAuthenticated } = userReducer;
  const { posts, loading } = postReducer;
  let category = [];
  let tags = [];
  // console.log(postReducer);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (posts.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="text-4xl">No Post To Show!</div>
      </div>
    );
  }

  const catObjArray = [];

  if (posts.length !== 0) {
    posts.map((post) => tags.push(post.tag));
    category = [...new Set(tags)];

    for (let i = 0; i < category.length; i++) {
      let v = 0;
      for (let j = 0; j < posts.length; j++) {
        if (category[i] === posts[j].tag) {
          v += 1;
        }
      }
      const key = category[i];
      const value = v;
      const data = {
        [key]: value,
      };
      catObjArray.push(data);
    }
  }

  return (
    <div className="py-32 flex flex-col items-center ">
      {/* <div className="text-5xl">
        {isAuthenticated === null ? (
          <>This Is Home Page You Are Not Logged In</>
        ) : (
          <>WelCome To Home Page You Are Logged In</>
        )}
      </div> */}
      <div className="text-5xl mt-5">
        {loading === true ? (
          <>Loading...</>
        ) : (
          <div className="container">
            <div className="text-5xl text-center mb-7">Categories</div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {category.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-3 border rounded-3xl relative group cursor-pointer hover:shadow-md hover:shadow-orange-500"
                >
                  <Link to={`/category/${cat}`}>
                    <div className="w-64 h-52 sm:w-72">
                      <img
                        src={
                          cat === "nature"
                            ? naturePhoto
                            : "" || cat === "food"
                            ? foodPhoto
                            : "" || cat === "coding"
                            ? codingPhoto
                            : "" || cat === "travel"
                            ? travelPhoto
                            : "" || cat === "animal"
                            ? animalPhoto
                            : ""
                        }
                        className="w-full h-full object-cover rounded-3xl"
                        alt="post_img"
                      />
                    </div>
                    <div className="mt-4 mb-2">{cat}</div>
                    <div className="text-xl">
                      Total{" "}
                      {catObjArray.map((ct) =>
                        Object.keys(ct).map((k) => (cat === k ? ct[k] : null))
                      )}{" "}
                      posts in this category
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
