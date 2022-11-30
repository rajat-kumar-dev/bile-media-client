import { useCallback, useContext, useEffect, useState } from "react";
import app_logo from "../../assets/images/app_logo.png";
import { BiDialpadAlt } from "react-icons/bi";
import { TfiLock } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./style.module.css";
import { FaRegUser } from "react-icons/fa";
import Popup from "../popup/Popup";
import SignupOtpVerify from "../signupOtpVerify/SignupOtpVerify";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { default as actions } from "../../context/GlobalContext/globalActions";

const SignupComp = ({ open, setOpen, setLoginOpen }) => {
  const { dispatch } = useContext(GlobalContext);
  const [otpPopupOpen, setOtpPopupOpen] = useState(false);
  const [apiRes, setApiRes] = useState({
    loading: false,
    data: null,
    error: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  async function initSignup() {
    if (!username.trim() || !phone || !email || !password || !confPassword) {
      return alert("Please fill out all the fields");
    }
    if (password !== confPassword) {
      return alert("Confirm Password missmatch");
    }
    try {
      setApiRes({ ...apiRes, loading: true });
      const res = await axiosIns({
        url: `/otp_register_process?email=${email}`,
        method: "GET",
      });
      if (res.data.status) {
        console.log(res.data);
        setApiRes({ ...apiRes, loading: false });
        setOpen(false);
        setOtpPopupOpen(true);
        dispatch({
          type: actions.SAVE_SIGNUP_DATA,
          payload: {
            username,
            phone,
            email,
            password,
            confPassword,
          },
        });
        // resetState
        setShowPass("");
        setUsername("");
        setPhone("");
        setEmail("");
        setPassword("");
        setConfPassword("");
      }
    } catch (err) {
      console.log(err.message);
      setApiRes({ ...apiRes, loading: false, error: err.message });
    }
  }
  return (
    <>
      {open ? (
        <Popup>
          <div className={styles.signupModal}>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>
              <IoIosClose />
            </button>
            <div className={styles.logoBox}>
              <img src={app_logo} alt="Bile" />
            </div>
            <h5>Create New Account</h5>
            <div className={styles.signupmsg}>
              already have an account?{" "}
              <span
                className={styles.loginBtn}
                onClick={() => {
                  setOpen(false);
                  setLoginOpen(true);
                }}
              >
                Login
              </span>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputBox}>
                <FaRegUser size={14} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={styles.inputBox}>
                <BiDialpadAlt size={20} />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.trim())}
                />
              </div>
              <div className={styles.inputBox}>
                <HiOutlineMail size={18} />
                <input
                  type="email"
                  placeholder="Email Addresss"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </div>
              <div className={styles.inputBox}>
                <TfiLock size={15} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.inputBox}>
                <TfiLock size={15} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
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
            <p className={styles.registerMsg}>
              By clicking on Register button you are agree with our
              <span> Terms Conditions</span> and <span>Privacy Pilicy</span>
            </p>
            <span style={{ color: "red" }}>{apiRes.error}</span>
            <button className={styles.signupBtn} onClick={initSignup}>
              {apiRes.loading ? "Loading..." : "Register"}
            </button>
          </div>
        </Popup>
      ) : null}
      <SignupOtpVerify
        // user={{ username, phone, email, password, confPassword }}
        open={otpPopupOpen}
        setOpen={setOtpPopupOpen}
      />
    </>
  );
};
export default SignupComp;
