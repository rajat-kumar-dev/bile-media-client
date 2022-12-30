import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import styles from "./style.module.css";
const AppLoader = () => {
  const { state } = useContext(GlobalContext);
  return state.appLoading ? (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  ) : null;
};

export default AppLoader;
