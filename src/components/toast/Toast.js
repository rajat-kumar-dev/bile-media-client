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
// const [done, setDone] = useState(false);
// <button onClick={() => setDone(true)}>Show Toast</button>
// ================
// <Toast open={done} setOpen={setDone} msg="Password Updated Successfully" />;
// ====== OR ======TODO:
// <Toast
//   open={done}
//   setOpen={setDone}
//   img={check_icon}
//   style={{ backgroundColor: "white" }}
// >
//   <div style={{ textAlign: "center", marginTop: "10px" }}>
//     <div style={{ color: "#42B874", fontWeight: "bold" }}>
//       Payment Successful
//     </div>
//     <div
//       style={{
//         maxWidth: "200px",
//         color: "black",
//         fontSize: "small",
//         marginTop: "5px",
//       }}
//     >
//       Thank You for choosing subscription plan. You can avail more features.
//     </div>
//   </div>
// </Toast>
