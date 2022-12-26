import { default as actions } from "./globalActions";
// import actions from "./globalActions";

const globalReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.LOADING:
      return { ...state, appLoading: true };

    case actions.LOADED:
      return { ...state, appLoading: false };

    case actions.SET_SIGNUP_FORM_DATA:
      return { ...state, signupFormData: payload };

    case actions.LOGIN:
      return { ...state, authUser: payload, auth: true };

    case actions.LOGOUT:
      return { ...state, auth: false, authUser: null };

    case actions.LOGIN_POPUP_OPEN:
      return { ...state, loginPopupOpen: payload };

    case actions.SIGNUP_POPUP_OPEN:
      return { ...state, signupPopupOpen: payload };

    case actions.CHANGE_PASS_OPEN:
      return { ...state, changePassOpen: true };
    case actions.CHANGE_PASS_CLOSE:
      return { ...state, changePassOpen: false };
    default:
      return state;
  }
};

export default globalReducer;
