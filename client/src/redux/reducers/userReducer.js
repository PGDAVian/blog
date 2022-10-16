const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  users: [],
  loading: false,
  message: [],
};

const userReducer = (state = initialState, action) => {
  if (action.type === "setMsg") {
    return {
      ...state,
      message: action.payload,
    };
  } else if (action.type === "clearMessage") {
    return {
      ...state,
      message: [],
    };
  } else if (action.type === "loading") {
    return {
      ...state,
      loading: true,
    };
  } 
  else if (action.type === "loadAllUsers") {
    return({
      ...state , 
      users : action.payload,
      loading : false 
    })
  }
  else if (action.type === "loadUser") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      users: [],
      loading: false,
    };
  } else if (action.type === "loadSingleUser") {
    return {
      ...state,
      user: action.payload.user,
      users: [],
      loading: false,
    };
  } else if (action.type === "loginUser") {
    localStorage.setItem("token", action.payload.token);
    return {
      ...state,
      token: action.payload.token,
      loading: false,
      users: [],
      isAuthenticated: true,
      message: [{ msg: "login successfull" }],
    };
  } else if (action.type === "authError") {
    localStorage.removeItem("token");
    return {
      ...state,
      isAuthenticated: null,
      user: null,
      users: [],
      token: null,
      loading: false,
      message: [],
    };
  }
  return state;
};

export default userReducer;
