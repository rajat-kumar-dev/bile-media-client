import React, { useReducer } from "react";
import GlobalContext from "./GlobalContext";
import globalReducer from "./globalReducer";

const initialState = {
  testValue: 10,
  signupData: {},
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
// done
