import React, { useReducer } from "react";
import GlobalContext from "./GlobalContext";
import globalReducer from "./globalReducer";

const initialState = {
  appLoading: false,
  signupFormData: {},
  signinData: null,
  authUser: null,
  auth: false,
  //right
  loginPopupOpen: false,
  signupPopupOpen: false,
  //
  changePassOpen: false,
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
