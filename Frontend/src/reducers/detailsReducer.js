import { detailsConstants } from "../actions/constants";

const initState = {
  adds: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case detailsConstants.RETRIVE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case detailsConstants.RETRIVE_SUCCESS:
      state = {
        ...state,
        loading: false,
        adds: action.payload,
      };
      break;
    case detailsConstants.RETRIVE_FALIURE:
      state = {
        ...state,
        loading: false,
      };
      break;
  }
  return state;
};
