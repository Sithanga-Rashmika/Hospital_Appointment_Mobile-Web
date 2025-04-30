import { detailsConstants } from "./constants";
import axios from "axios";
import Toast from 'react-native-toast-message';

export const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: detailsConstants.RETRIVE_REQUEST });
    try {
      const res = await axios.get("http://172.20.10.4:8800/adds/get");
      if (res.status === 200) {
        dispatch({
          type: detailsConstants.RETRIVE_SUCCESS,
          payload: res.data.payload,
        });
      } else {
        dispatch({ type: detailsConstants.RETRIVE_FALIURE });
        Toast.show({
          type: 'error',
          text1: 'Something went wrong..!',
        });
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 ||
          error.response.status === 404 ||
          error.response.status === 500
        ) {
          dispatch({ type: detailsConstants.RETRIVE_FALIURE });
          Toast.show({
            type: 'error',
            text1: 'Something went wrong..!',
          });
        }
      } else if (error.request) {
        dispatch({ type: detailsConstants.RETRIVE_FALIURE });
        Toast.show({
          type: 'error',
          text1: 'No response from the server..!',
        });
      }
    }
  };
};
