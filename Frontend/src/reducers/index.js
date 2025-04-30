import { combineReducers } from "redux";
import detailsReducer from "./detailsReducer";
import userReducer from "./userReducer";
import appointmentReducer from "./appointmentReducer";

const rootReducer = combineReducers({
  details: detailsReducer,
  user: userReducer,
  appointment: appointmentReducer,
});

export default rootReducer;
