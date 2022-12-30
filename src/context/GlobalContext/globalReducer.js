import { default as actions } from "./globalActions";
// import actions from "./globalActions";

const globalReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.LOADING:
      return { ...state, appLoading: payload };
    //==================================
    case actions.LOGIN:
      return { ...state, authUser: payload, auth: true };
    //==================================
    case actions.LOGOUT:
      return { ...state, auth: false, authUser: null };
    //==================================
    case actions.LOGIN_POPUP_OPEN:
      return { ...state, loginPopupOpen: payload };
    //==================================
    case actions.SIGNUP_POPUP_OPEN:
      return { ...state, signupPopupOpen: payload };
    //==================================
    case actions.CHANGE_PASS_OPEN:
      return { ...state, changePassOpen: payload };
    //==================================
    case actions.SET_SIGNUP_FORM_DATA:
      return { ...state, signupFormData: payload };
    //==================================
    default:
      return state;
  }
};

export default globalReducer;
