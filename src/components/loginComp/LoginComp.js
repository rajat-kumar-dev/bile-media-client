import { useState } from "react";
import app_logo from "../../assets/images/app_logo.png";
import { BiDialpadAlt } from "react-icons/bi";
import { TfiLock } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";
import { BsEyeSlash, BsEye, BsCheckSquare, BsSquare } from "react-icons/bs";
import styles from "./style.module.css";
import Popup from "../popup/Popup";
import axiosIns from "../../axios/axios";

function LoginComp({ open, setOpen, setSignupOpen, setForgetPassOpen }) {
  const [apiRes, setApiRes] = useState({
    loading: false,
    data: null,
    error: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogged, setKeepLogged] = useState(false);
  const loginHandler = async () => {
    const data = {
      phone,
      password,
    };
    console.log(data);

    try {
      setApiRes({ ...apiRes, loading: true });
      const res = await axiosIns({
        url: "/user_login",
        method: "POST",
        data: {
          number: phone,
          password: password,
          deviceType: "123456",
          deviceID: "123456",
          country_code: "+91",
          deviceToken: "123456",
        },
      });
      if (res.data.status) {
        console.log(res.data);
        localStorage.setItem("bile-user-token", res.data.results[0].token);
        setApiRes({ ...apiRes, loading: false, error: "" });
        setOpen(false);
      } else {
        console.log(res.data);
        setApiRes({ ...apiRes, loading: false, error: res.data.message });
      }
    } catch (err) {
      console.log(err.message);
      setApiRes({ ...apiRes, loading: false, error: err.message });
    }
  };
  return (
    <>
      {open ? (
        <Popup>
          <div className={styles.loginModal}>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>
              <IoIosClose />
            </button>
            <div className={styles.logoBox}>
              <img src={app_logo} alt="Bile" />
            </div>
            <h5>login to your account</h5>
            <div className={styles.signupmsg}>
              don't have an account?
              <span
                className={styles.signupBtn}
                onClick={() => {
                  setOpen(false);
                  setSignupOpen(true);
                }}
              >
                Create New
              </span>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputBox}>
                <BiDialpadAlt size={20} />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.inputBox}>
                <TfiLock size={15} />
                <input
                  value={password}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPass ? (
                  <BsEyeSlash
                    className={styles.showHideEye}
                    style={{ color: "#5BCBF5" }}
                    onClick={() => setShowPass(false)}
                  />
                ) : (
                  <BsEye
                    className={styles.showHideEye}
                    onClick={() => setShowPass(true)}
                  />
                )}
              </div>
            </div>
            <div className={styles.loginOptBox}>
              <div
                className={styles.keepLoggedBox}
                onClick={() => setKeepLogged(!keepLogged)}
              >
                {keepLogged ? (
                  <BsCheckSquare size={16} style={{ color: "#5bcbf5" }} />
                ) : (
                  <BsSquare size={16} />
                )}
                <p>Keep Me Logged In</p>
              </div>
              <span
                className={styles.forgetPassBtn}
                onClick={() => {
                  setOpen(false);
                  setForgetPassOpen(true);
                }}
              >
                Forgot Passoword?
              </span>
            </div>
            <span style={{ color: "red" }}>{apiRes.error}</span>
            <button className={styles.loginBtn} onClick={loginHandler}>
              {apiRes.loading ? "Loading..." : "Login"}
            </button>
          </div>
        </Popup>
      ) : null}
    </>
  );
}

export default LoginComp;
