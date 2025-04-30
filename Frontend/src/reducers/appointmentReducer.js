import { appointmentConstants } from "../actions/constants";

const initState = {
  appointments: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case appointmentConstants.GET_APPOINTMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case appointmentConstants.GET_APPOINTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        appointments: action.payload,
      };
      break;
    case appointmentConstants.GET_APPOINTMENT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case appointmentConstants.NEW_APPOINTMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case appointmentConstants.NEW_APPOINTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case appointmentConstants.NEW_APPOINTMENT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case appointmentConstants.DELETE_APPOINTMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case appointmentConstants.DELETE_APPOINTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        appointments: action.payload,
      };
      break;
    case appointmentConstants.DELETE_APPOINTMENT_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
