import { default as actions } from "./globalActions";
// import actions from "./globalActions";

const globalReducer = (state, { type, payload }) => {
  switch (type) {
    case actions.CHANGE_TEST_VALUE:
      return { ...state, testValue: payload };

    case actions.SAVE_SIGNUP_DATA:
      return { ...state, signupData: payload };
    default:
      return state;
  }
};

export default globalReducer;
