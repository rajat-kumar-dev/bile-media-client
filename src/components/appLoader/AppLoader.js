import styles from "./style.module.css";
const AppLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        {/* <div className={styles.loaderCircle}></div> */}
      </div>
    </div>
  );
};

export default AppLoader;
