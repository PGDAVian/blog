import axios from "axios";

export const createPost = (postData) => {
  return (dispatch) => {
    // console.log(postData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`/api/create_post`, postData, { config })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "setMsg",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const getAllPosts = () => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: "loading",
    });

    axios
      .get("/api/all_post", { config })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "getAllPosts",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const getSinglePost = (id) => {
  return (dispatch) => {
    // console.log(id);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // dispatch({
    //   type: "loading",
    // });

    axios
      .get(`/api/single/${id}`, { config })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "getSinglePost",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const getAllPostOfSingleUser = (id) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: "loading",
    });
    axios
      .get(`/api/all_post_of_single_user/${id}`, { config })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "getAllPostOfSingleUser",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const getLatestPosts = () => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: "loading",
    });
    axios
      .get(`/api/latest_posts`, { config })
      .then((res) => {
        dispatch({
          type: "getLatestPosts",
          payload: res.data.latestPosts,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const getSimilarPosts = (tagName) => {
  return (dispatch) => {
    // console.log(tagName);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: "loading",
    });
    axios
      .post(`/api/similar_posts`, { tagName }, { config })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "getSimilarPosts",
          payload: res.data.similarPosts,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const getSameCategoryPosts = (category) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: "loading",
    });
    axios
      .post(`/api/same_category_posts`, { category }, { config })
      .then((res) => {
        dispatch({
          type: "getSameCategoryPosts",
          payload: res.data.sameCatPosts,
        });
      })
      .catch((err) => {
        // console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: "loading",
    });
    axios
      .delete(`/api/delete/${postId}`, { config })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "setMsg",
          payload: "Post Deleted Successfully!",
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const updatePost = (data, postId) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(data);
    console.log(postId);
    // dispatch({
    //   type: "loading",
    // });
    axios
      .put(`/api/update/${postId}`, data, { config })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "setMsg",
          payload: res.data.msg,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const saveComment = (data, postId) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(`/api/comment/${postId}`, data, { config })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "getSinglePost",
          payload: res.data,
        });
      })
      .catch((err) => {
        // console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .delete(`/api/delete_comment/${postId}/${commentId}`, { config })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "getSinglePost",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};
