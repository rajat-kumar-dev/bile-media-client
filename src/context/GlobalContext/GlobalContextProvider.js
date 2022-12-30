import React, { useReducer } from "react";
import GlobalContext from "./GlobalContext";
import globalReducer from "./globalReducer";

const initialState = {
  //right
  auth: false,
  authUser: null,
  appLoading: false,
  loginPopupOpen: false,
  signupPopupOpen: false,
  changePassOpen: false,
  //
  signupFormData: {},
  signinData: null,
};
const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
