import { default as actions } from "./globalActions";
// import actions from "./globalActions";

const globalReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.SAVE_SIGNUP_DATA:
      return { ...state, signupData: payload };

    case actions.LOGIN:
      return { ...state, authUser: payload, auth: true };

    case actions.LOGOUT:
      return { ...state, auth: false, authUser: null };

    default:
      return state;
  }
};

export default globalReducer;
