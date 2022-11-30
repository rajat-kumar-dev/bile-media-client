import { useContext, useState } from "react";
import app_logo from "../../assets/images/app_logo.png";
import { BiDialpadAlt } from "react-icons/bi";
import { TfiLock } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";
import { BsEyeSlash, BsEye, BsCheckSquare, BsSquare } from "react-icons/bs";
import styles from "./style.module.css";
import Popup from "../popup/Popup";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import actions from "../../context/GlobalContext/globalActions";

function LoginComp({ open, setOpen, setSignupOpen, setForgetPassOpen }) {
  const { dispatch } = useContext(GlobalContext);
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
      console.log("loginHandler\n", res.data);
      if (res.data.status) {
        setApiRes({ ...apiRes, loading: false, error: "" });
        setOpen(false);
        localStorage.setItem("bile-user-token", res.data.results[0].token);
        setShowPass(false);
        setPhone("");
        setPassword("");
        setKeepLogged(false);
        await getAuthUser();
      } else {
        setApiRes({ ...apiRes, loading: false, error: res.data.message });
      }
    } catch (err) {
      console.log("loginHandler error\n", err.message);
      setApiRes({ ...apiRes, loading: false, error: err.message });
    }
  };
  async function getAuthUser() {
    try {
      const res = await axiosIns({
        method: "GET",
        url: "/get_profile_data",
      });
      console.log("getAuthUser\n", res.data);
      if (res.data.status) {
        const user = {
          id: res.data.results.id,
          username: res.data.results.user_name,
          email: res.data.results.email,
          phone: res.data.results.number,
          avatar: res.data.results.profile_img,
        };
        dispatch({ type: actions.LOGIN, payload: user });
      } else {
        return null;
      }
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }
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
