const initialState = {
  authData: null,      // always: { user, token } OR null
  loading: false,
  error: false,
  updateLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: false,
      };

    case "AUTH_SUCCESS":
      // 🔒 store only redux state (NO extra localStorage logic here)
      return {
        ...state,
        authData: action.data, // expected shape: { user, token }
        loading: false,
        error: false,
      };

    case "AUTH_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };

    // ---------------- UPDATE PROFILE ----------------

    case "UPDATING_START":
      return {
        ...state,
        updateLoading: true,
        error: false,
      };

    case "UPDATING_SUCCESS":
      return {
        ...state,
        authData: action.data, // keep same shape
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return {
        ...state,
        updateLoading: false,
        error: true,
      };

    // ---------------- FOLLOW / UNFOLLOW ----------------

    case "FOLLOW_USER":
      if (!state.authData?.user) return state;

      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following,
              action.data,
            ],
          },
        },
      };

    case "UNFOLLOW_USER":
      if (!state.authData?.user) return state;

      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: state.authData.user.following.filter(
              (personId) => personId !== action.data
            ),
          },
        },
      };

    // ---------------- LOGOUT ----------------

    case "LOG_OUT":
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;
