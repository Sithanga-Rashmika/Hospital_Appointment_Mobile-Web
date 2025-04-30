import { appointmentConstants } from "./constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const newAppointment = (form) => {
  return async (dispatch) => {
    dispatch({ type: appointmentConstants.NEW_APPOINTMENT_REQUEST });

    try {
      const res = await axios.post(
        "http://localhost:8800/appointment/add",
        form
      );

      if (res.status === 201) {
        dispatch({
          type: appointmentConstants.NEW_APPOINTMENT_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Appointment placed Successfully..!");
      } else {
        dispatch({ type: appointmentConstants.NEW_APPOINTMENT_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 500) {
          dispatch({ type: appointmentConstants.NEW_APPOINTMENT_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        }
      } else if (error.request) {
        dispatch({ type: appointmentConstants.NEW_APPOINTMENT_FALIURE });
        toast.error("No response from the server..!", { id: "t3" });
      }
    }
  };
};

export const fetchAppointment = (form) => {
  return async (dispatch) => {
    dispatch({ type: appointmentConstants.GET_APPOINTMENT_REQUEST });

    try {
      const res = await axios.post(
        "http://localhost:8800/appointment/get",
        form
      );
      if (res.status === 200) {
        dispatch({
          type: appointmentConstants.GET_APPOINTMENT_SUCCESS,
          payload: res.data.payload,
        });
      } else {
        dispatch({ type: appointmentConstants.GET_APPOINTMENT_FALIURE });
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 500) {
          dispatch({ type: appointmentConstants.GET_APPOINTMENT_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        } else if (error.response.status === 404) {
          dispatch({ type: appointmentConstants.GET_APPOINTMENT_FALIURE });
        }
      } else if (error.request) {
        dispatch({ type: appointmentConstants.GET_APPOINTMENT_FALIURE });
        toast.error("No response from the server..!", { id: "t3" });
      }
    }
  };
};

export const deleteAppointment = (form) => {
  return async (dispatch) => {
    dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_REQUEST });

    try {
      const res = await axios.post(
        "http://localhost:8800/appointment/delete",
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
        toast.error("Something went wrong..!", { id: "t1" });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 500) {
          dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_FALIURE });
          toast.error("Something went wrong..!", { id: "t2" });
        } else if (error.response.status === 404) {
          dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_FALIURE });
        }
      } else if (error.request) {
        dispatch({ type: appointmentConstants.DELETE_APPOINTMENT_FALIURE });
        toast.error("No response from the server..!", { id: "t3" });
      }
    }
  };
};
