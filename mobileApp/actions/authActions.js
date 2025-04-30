import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Toast from 'react-native-toast-message';
import { userConstants } from "./constants";


export const Logins = (form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.LOGIN_USER_REQUEST });
    try {
      const res = await axios.post("http://172.20.10.4:8800/user/login", form);
      if (res.status === 201) {
        const user = res.data.user;
        const token = res.data.token;

        // Store token and user in AsyncStorage
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        Toast.show({
          type: 'success',
          text1: `Login Success, Welcome ${user.name}`,
        });

        dispatch({
          type: userConstants.LOGIN_USER_SUCCESS,
          payload: {
            user,
            token,
          },
        });
      } else if (res.status === 404) {
        Toast.show({
          type: 'error',
          text1: "Invalid Password..!",
        });
        dispatch({
          type: userConstants.LOGIN_USER_FAILURE,
        });
      } else if (res.status === 401) {
        Toast.show({
          type: 'error',
          text1: "Invalid Email Address..!",
        });
        dispatch({
          type: userConstants.LOGIN_USER_FAILURE,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};


export const isLoggedIn = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
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
          type: userConstants.LOGIN_USER_FAILURE,
          payload: { error: "Failed to login" },
        });
      }
    } catch (error) {
      console.error("Error retrieving token or user data", error);
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.LOGOUT_REQUEST });
    try {
      await AsyncStorage.clear();

      Toast.show({
        type: 'success',
        text1: "Logout Success..!",
      });

      dispatch({
        type: userConstants.LOGOUT_SUCCESS,
      });
    } catch (error) {
      console.error("Error clearing AsyncStorage", error);
    }
  };
};

export const SignUp = (form) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.CREATE_USER_REQUEST });
    try {
      const res = await axios.post("http://172.20.10.4:8800/user/signup", form);
      if (res.status === 201) {
        Toast.show({
          type: 'success',
          text1: `SignUp Success, Welcome ${form.name}`,
        });

        dispatch({
          type: userConstants.CREATE_USER_SUCCESS,
          payload: res.data.payload,
        });
      } else {
        if (res.response && res.response.status === 404) {
          Toast.show({
            type: 'error',
            text1: "Something Went Wrong In Account Creating..!",
          });
          dispatch({
            type: userConstants.CREATE_USER_FAILURE,
            payload: res.error,
          });
        } else if (res.response && res.response.status === 409) {
          Toast.show({
            type: 'error',
            text1: "Admin Already Registered...!",
          });
          dispatch({
            type: userConstants.CREATE_USER_FAILURE,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

