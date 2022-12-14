import { default as actions } from "./globalActions";
// import actions from "./globalActions";

const globalReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.LOADING:
      return { ...state, appLoading: true };

    case actions.LOADED:
      return { ...state, appLoading: false };

    case actions.SAVE_SIGNUP_DATA:
      return { ...state, signupData: payload };

    case actions.LOGIN:
      return { ...state, authUser: payload, auth: true };

    case actions.LOGOUT:
      return { ...state, auth: false, authUser: null };
    case actions.LOGIN_OPEN:
      return { ...state, loginOpen: true };
    case actions.LOGIN_CLOSE:
      return { ...state, loginOpen: false };
    default:
      return state;
  }
};

export default globalReducer;
