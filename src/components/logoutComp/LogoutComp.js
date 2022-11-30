import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import actions from "../../context/GlobalContext/globalActions";

const LogoutComp = ({ className, children, style }) => {
  const { dispatch } = useContext(GlobalContext);
  function userLogout() {
    localStorage.removeItem("bile-user-token");
    console.log("logged out");
    dispatch({ type: actions.LOGOUT });
  }
  return (
    <div className={className} style={{ ...style }} onClick={userLogout}>
      {children}
    </div>
  );
};

export default LogoutComp;
