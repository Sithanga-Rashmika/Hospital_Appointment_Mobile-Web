import { appointmentConstants } from "./constants";
import axios from "axios";
import Toast from 'react-native-toast-message';
import Swal from "sweetalert2";

export const newAppointment = (form) => {
  return async (dispatch) => {
    dispatch({ type: appointmentConstants.NEW_APPOINTMENT_REQUEST });
    try {
      const res = await axios.post(
        "http://172.20.10.4:8800/appointment/add",
        form
      );
      if (res.status === 201) {
        dispatch({
          type: appointmentConstants.NEW_APPOINTMENT_SUCCESS,
          payload: res.data.payload,
        });
        Toast.show({
          type: 'success',
          text1: 'Appointment placed Successfully..!',
        });
      } else {
        dispatch({ type: appointmentConstants.NEW_APPOINTMENT_FALIURE });
        Toast.show({
          type: 'error',
          text1: 'Something went wrong..!',
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 500) {
          dispatch({ type: appointmentConstants.NEW_APPOINTMENT_FALIURE });
          Toast.show({
            type: 'error',
            text1: 'Something went wrong..!',
          });
        }
      } else if (error.request) {
        dispatch({ type: appointmentConstants.NEW_APPOINTMENT_FALIURE });
        Toast.show({
          type: 'error',
          text1: 'No response from the server..!',
        });
      }
    }
  };
};

export const fetchAppointment = (form) => {
  return async (dispatch) => {
    dispatch({ type: appointmentConstants.GET_APPOINTMENT_REQUEST });

    try {
      const res = await axios.post(
        "http://172.20.10.4:8800/appointment/get",
        form
      );
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: appointmentConstants.GET_APPOINTMENT_SUCCESS,
          payload: res.data.payload,
        });
      } else {
        dispatch({ type: appointmentConstants.GET_APPOINTMENT_FALIURE });
        Toast.show({
          type: 'error',
          text1: 'Something went wrong..!',
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 500) {
          dispatch({ type: appointmentConstants.GET_APPOINTMENT_FALIURE });
          Toast.show({
            type: 'error',
            text1: 'Something went wrong..!',
          });
        } else if (error.response.status === 404) {
          dispatch({ type: appointmentConstants.GET_APPOINTMENT_FALIURE });
        }
      } else if (error.request) {
        dispatch({ type: appointmentConstants.GET_APPOINTMENT_FALIURE });
        Toast.show({
          type: 'error',
          text1: 'No response from the server..!',
        });
      }
    }
  };
};

export const deleteAppointment = (form) => {
  return async (dispatch) => {
    dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_REQUEST });

    try {
      const res = await axios.post(
        "http://172.20.10.4:8800/appointment/delete",
        form
      );
      if (res.status === 200) {
        dispatch({
          type: appointmentConstants.DELETE_APPOINTMENT_SUCCESS,
          payload: res.data.payload,
        });
        Swal.fire({
          title: "Appointment Deleted!",
          text: "Your appointment has been successfully deleted.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_FALIURE });
        Toast.show({
          type: 'error',
          text1: 'Something went wrong..!',
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 500) {
          dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_FALIURE });
          Toast.show({
            type: 'error',
            text1: 'Something went wrong..!',
          });
        } else if (error.response.status === 404) {
          dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_FALIURE });
        }
      } else if (error.request) {
        dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_FALIURE });
        Toast.show({
          type: 'error',
          text1: 'No response from the server..!',
        });
      }
    }
  };
};
