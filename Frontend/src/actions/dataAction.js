import { detailsConstants } from "./constants";
import {toast} from 'react-hot-toast'
import axios from 'axios'

export const fetchData = () => {
    console.log("hello actions")
  return async (dispatch) => {
    dispatch({ type: detailsConstants.RETRIVE_REQUEST });

    try {
      const res = await axios.get("http://localhost:8800/adds/get");
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: detailsConstants.RETRIVE_SUCCESS,
          payload: res.data.payload,
        });
      } else {
        dispatch({ type: detailsConstants.RETRIVE_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 ||
          error.response.status === 404 ||
          error.response.status === 500
        ) {
          dispatch({ type: detailsConstants.RETRIVE_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: detailsConstants.RETRIVE_FALIURE });
        toast.error("No response from the server..!", { id: "t3" });
      }
    }
  };
};
