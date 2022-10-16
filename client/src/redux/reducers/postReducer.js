const initialState = {
  posts: [],
  post: null,
  postUser : null , 
  latestPosts: [],
  similarPosts: [],
  sameCategoryPosts: [],
  loading: false,
};

const postReducer = (state = initialState, action) => {
  if (action.type === "loading") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "getAllPosts") {
    return {
      ...state,
      posts: action.payload.posts,
      post: null,
      getSimilarPosts: [],
      loading: false,
    };
  } else if (action.type === "getSinglePost") {
    return {
      ...state,
      posts: [],
      // postUser : action.payload.postUser , 
      post: action.payload.post,
      loading: false,
    };
  } else if (action.type === "getAllPostOfSingleUser") {
    return {
      ...state,
      posts: action.payload.posts,
      post: null,
      getSimilarPosts: [],
      loading: false,
    };
  } else if (action.type === "getLatestPosts") {
    return {
      ...state,
      posts: [],
      latestPosts: action.payload,
      loading: false,
    };
  } else if (action.type === "getSimilarPosts") {
    return {
      ...state,
      posts: [],
      similarPosts: action.payload,
      sameCategoryPosts: [],
      loading: false,
    };
  } else if (action.type === "getSameCategoryPosts") {
    return {
      ...state,
      // posts: [],
      similarPosts: [],
      sameCategoryPosts: action.payload,
      loading: false,
    };
  }

  return state;
};

export default postReducer;
