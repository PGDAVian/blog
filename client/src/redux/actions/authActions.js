import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => {
  return (dispatch) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("/api/me", { config })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "loadUser",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "authError",
        });
      });
  };
};

export const loadAllUsers = () => {
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
      .get("/api/all_user", { config })
      .then((res) => {
        dispatch({
          type: "loadAllUsers",
          payload: res.data.users,
        });
      })
      .catch((err) => {
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const loadSingleUser = (id) => {
  return (dispatch) => {
    // console.log(id);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: "loading",
    });
    axios
      .get(`/api/single_profile/${id}`, { config })
      .then((res) => {
        dispatch({
          type: "loadSingleUser",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "setMsg",
          payload: err.response.data,
        });
      });
  };
};

export const clearMessage = () => {
  return (dispatch) => {
    dispatch({
      type: "clearMessage",
    });
  };
};

export const registerUser = (data) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/api/register", data, { config })
      .then((res) => {
        console.log(res.data);
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

export const loginUser = (data) => {
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
      .post("/api/login", data, { config })
      .then((res) => {
        dispatch({
          type: "loginUser",
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

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: "authError",
    });
  };
};

export const sendForgetPasswordLink = (data) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/api/send_forget_pass_link", data, { config })
      .then((res) => {
        console.log(res.data);
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

export const resetPassword = (data, urlParameter) => {
  return (dispatch) => {
    // console.log(data);
    // console.log(urlParameter);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`/api/reset_pass/${urlParameter}`, data, { config })
      .then((res) => {
        console.log(res.data);
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

export const changeUserImage = (data) => {
  return (dispatch) => {
    console.log(data);
    const userImg = {
      image: data,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`/api/update`, userImg, { config })
      .then((res) => {
        console.log(res.data);
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
