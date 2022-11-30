import { useContext, useState } from "react";
import app_logo from "../../assets/images/app_logo.png";
import { IoIosClose } from "react-icons/io";
// import { HiOutlineMail } from "react-icons/hi";
import styles from "./style.module.css";
// import OtpVerifiedPopup from "../otpVerifiedPopup/OtpVerifiedPopup";
import OtpInput from "otp-input-react-18";
import Popup from "../popup/Popup";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";

function SignupOtpVerify({ open, setOpen }) {
  const { state } = useContext(GlobalContext);
  const [otp, setOtp] = useState("");
  const [apiRes, setApiRes] = useState({
    loading: false,
    data: null,
    error: "",
  });
  // const [verifiedPopupOpen, setVerifiedPopupOpen] = useState(false);

  const submitHandler = async () => {
    if (!otp.trim() || otp.length < 4) {
      return alert("OTP is required");
    }
    // return;
    try {
      setApiRes({ ...apiRes, loading: true });
      const res = await axiosIns({
        url: `/otp_register_process?email=${state.signupData.email}&otp=${otp}`,
        method: "GET",
      });
      if (res.data.status) {
        console.log(res.data);
        registerUser();
      } else {
        console.log(res.data);
        setApiRes({ ...apiRes, loading: false, error: res.data.message });
      }
    } catch (err) {
      console.log(err.message);
      setApiRes({ ...apiRes, loading: false, error: err.message });
    }
  };

  async function registerUser() {
    try {
      const res = await axiosIns({
        url: `/user_register`,
        method: "POST",
        data: {
          email: state.signupData.email,
          number: state.signupData.phone,
          password: state.signupData.password,
          deviceType: "123456",
          deviceID: "123456",
          deviceToken: "123456",
          country_code: "+91",
          user_name: state.signupData.username,
        },
      });
      if (res.data.status) {
        console.log(res.data);
        localStorage.setItem("bile-user-token", res.data.results[0].token);
        setApiRes({ ...apiRes, loading: false });
        setOpen(false);
        // setOtpPopupOpen(true);
      } else {
        console.log(res.data);
        setApiRes({ ...apiRes, loading: false, error: res.data.message });
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
          <div className={styles.verifyOtpModal}>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>
              <IoIosClose />
            </button>
            <div className={styles.logoBox}>
              <img src={app_logo} alt="Bile" />
            </div>
            <h5>Verification</h5>
            <div className={styles.forgetmsg}>
              You must recieve a 4-digit OTP that sent to
              <b>
                {state.signupData.email?.substring(0, 3)}****
                {state.signupData.email?.substring(
                  state.signupData.email?.length - 11
                )}
              </b>
            </div>
            <div className={styles.inputContainer}>
              <OtpInput value={otp} onChange={(v) => setOtp(v)} numInputs={4} />
            </div>
            <div className={styles.resendOtpBtn}>Resend Me OTP</div>
            <span style={{ color: "red" }}>{apiRes.error}</span>
            <button className={styles.verifyOtpBtn} onClick={submitHandler}>
              {apiRes.loading ? "Loading..." : "Verify"}
            </button>
          </div>
        </Popup>
      ) : null}
    </>
  );
}

export default SignupOtpVerify;
