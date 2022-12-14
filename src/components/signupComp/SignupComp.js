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
import { toastAlert } from "../../utils";
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
  const [invalidFields, setInvalidFields] = useState([]);

  async function initSignup() {
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const wrongFields = [];
    if (!username.trim()) wrongFields.push("username");
    if (!phone || phone.length < 10) wrongFields.push("phone");
    if (!email || !validEmailRegex.test(email)) {
      wrongFields.push("email");
    }
    if (!password) wrongFields.push("pass");
    if (!confPassword || password !== confPassword)
      wrongFields.push("confpass");
    setInvalidFields(wrongFields);
    if (wrongFields.length) return;
    console.log("success");
    setApiRes({ ...apiRes, loading: true });
    const result = await checkEmailPhone(email, phone);
    if (!result.success) {
      toastAlert(result.error);
      setApiRes({ ...apiRes, loading: false });
      return;
    }
    try {
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
        setShowPass("");
        setUsername("");
        setPhone("");
        setEmail("");
        setPassword("");
        setConfPassword("");
        toastAlert("Verify Password");
      } else {
        setApiRes({ ...apiRes, loading: false, error: res.data.message });
        toastAlert(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
      setApiRes({ ...apiRes, loading: false, error: err.message });
      toastAlert(err.message);
    }
  }
  function setValidField(field) {
    if (!invalidFields.includes(field)) return;
    const temp = invalidFields.filter((f) => f !== field);
    setInvalidFields(temp);
  }
  // function setInvalidField(field) {
  //   if (invalidFields.includes(field)) return;
  //   setInvalidFields([...invalidFields, field]);
  // }
  async function checkEmailPhone(email, phone) {
    try {
      const res = await axiosIns({
        url: `/email_number_check`,
        method: "POST",
        data: {
          email,
          number: phone,
        },
      });
      console.log(res.data);
      if (res.data.status) {
        return {
          success: true,
          error: "",
        };
      } else {
        return {
          success: false,
          error: res.data.message,
        };
      }
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
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
              <div>
                <div
                  className={`${styles.inputBox} ${
                    invalidFields.includes("username") ? styles.invalid : ""
                  }`}
                >
                  <FaRegUser size={14} />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setValidField("username");
                    }}
                  />
                </div>
                {invalidFields.includes("username") && (
                  <div className={styles.errMsg}>Invalid username</div>
                )}
              </div>
              <div>
                <div
                  className={`${styles.inputBox} ${
                    invalidFields.includes("phone") ? styles.invalid : ""
                  }`}
                >
                  <BiDialpadAlt size={20} />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={phone}
                    onChange={(e) => {
                      if (isNaN(e.target.value)) return;
                      if (e.target.value.length > 10) return;
                      setPhone(e.target.value.trim());
                      setValidField("phone");
                    }}
                  />
                </div>
                {invalidFields.includes("phone") && (
                  <div className={styles.errMsg}>Invalid Phone Number</div>
                )}
              </div>
              <div>
                <div
                  className={`${styles.inputBox} ${
                    invalidFields.includes("email") ? styles.invalid : ""
                  }`}
                >
                  <HiOutlineMail size={18} />
                  <input
                    type="email"
                    placeholder="Email Addresss"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.trim());
                      setValidField("email");
                    }}
                  />
                </div>
                {invalidFields.includes("email") && (
                  <div className={styles.errMsg}>Invalid Email Address</div>
                )}
              </div>
              <div>
                <div
                  className={`${styles.inputBox} ${
                    invalidFields.includes("pass") ? styles.invalid : ""
                  }`}
                >
                  <TfiLock size={15} />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setValidField("pass");
                    }}
                  />
                </div>
                {invalidFields.includes("pass") && (
                  <div className={styles.errMsg}>Invalid Password</div>
                )}
              </div>
              <div>
                <div
                  className={`${styles.inputBox} ${
                    invalidFields.includes("confpass") ? styles.invalid : ""
                  }`}
                >
                  <TfiLock size={15} />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confPassword}
                    onChange={(e) => {
                      setConfPassword(e.target.value);
                      setValidField("confpass");
                    }}
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
                      style={{ color: "#ffffff80" }}
                      onClick={() => setShowPass(true)}
                    />
                  )}
                </div>
                {invalidFields.includes("confpass") && (
                  <div className={styles.errMsg}>Password Mismatch</div>
                )}
              </div>
            </div>
            <p className={styles.registerMsg}>
              By clicking on Register button you are agree with our
              <span> Terms Conditions</span> and <span>Privacy Pilicy</span>
            </p>
            {/* <span style={{ color: "red" }}>{apiRes.error}</span> */}
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
