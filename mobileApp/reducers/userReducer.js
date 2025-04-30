import { userConstants } from "../actions/constants";

const initState = {
  user: {},
  token: {},
  loading: false,
  authenticated: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_USER_REQUEST:
      state = {
        ...state,
        loading: true,
        authenticated:false,
      };
      break;
    case userConstants.LOGIN_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        authenticated:true,
        user: action.payload.user,
        token: action.payload.token,
      };
      break;
    case userConstants.LOGIN_USER_FALIURE:
      state = {
        ...state,
        loading: false,
        authenticated:false,
      };
      break;
    case userConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.LOGOUT_SUCCESS:
      state = {
        ...state,
        loading: false,
        authenticated:false,
      };
      break;
    case userConstants.LOGIN_USER_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
