import styles from "./style.module.css";
const Toast = ({ children, className, style, open, setOpen, img, msg }) => {
  const preventClose = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {open && (
        <div className={styles.toastContainer} onClick={() => setOpen(false)}>
          <div
            className={`${styles.modal} ${className}`}
            style={style}
            onClick={preventClose}
          >
            {img && <img src={img} alt="" />}
            <div>
              {msg && <div>{msg}</div>}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
