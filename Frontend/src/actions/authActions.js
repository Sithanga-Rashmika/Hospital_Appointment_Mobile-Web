import { userConstants } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";

export const Logins = (form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.LOGIN_USER_REQUEST });
    const res = await axios.post("http://localhost:8800/user/login", form);
    if (res.status === 201) {
      const user = res.data.user;
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Login Success, Welcome ${user.name} `, {
        id: "login",
      });

      dispatch({
        type: userConstants.LOGIN_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
    } else if (res.status === 404) {
      toast.error("Invalid Password..!");
      dispatch({
        type: userConstants.LOGIN_USER_FALIURE,
      });
    } else if (res.status === 401) {
      toast.error("Invalid Email Address..!");
      dispatch({
        type: userConstants.LOGIN_USER_FALIURE,
      });
    }
  };
};

export const isLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({
          type: userConstants.LOGIN_USER_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    } else {
      dispatch({
        type: userConstants.LOGIN_USER_FALIURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.LOGOUT_REQUEST });
    localStorage.clear();
    toast.success(`Logout Success..!`, {
      id: "logout",
    });
    dispatch({
      type: userConstants.LOGOUT_SUCCESS,
    });
  };
};

export const SignUp = (form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.CREATE_USER_REQUEST });
    const res = await axios.post("http://localhost:8800/user/signup", form);
    if (res.status === 201) {
      toast.success(`SignUp Success, Welcome ${form.name}`, {
        id: "signup",
      });
      dispatch({
        type: userConstants.CREATE_USER_SUCCESS,
        payload: res.data.payload,
      });
    } else {
      if (res.response.status === 404) {
        toast.error("Somthing Went Wrong In Account Creating..!");
        dispatch({
          type: userConstants.CREATE_USER_FALIURE,
          payload: res.error,
        });
      } else if (res.response.status === 404) {
        toast.error("Admin Already Registered...!");
        dispatch({
          type: userConstants.CREATE_USER_FALIURE,
        });
      }
    }
  };
};
