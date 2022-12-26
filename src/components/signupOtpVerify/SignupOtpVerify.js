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
import actions from "../../context/GlobalContext/globalActions";
import { toastAlert } from "../../utils";
import Loader from "../loader/Loader";
function SignupOtpVerify({ open, setOpen }) {
  const { state, dispatch } = useContext(GlobalContext);
  const { signupFormData } = state; //signupFormData
  const [otp, setOtp] = useState("");
  const [apiRes, setApiRes] = useState({
    loading: false,
    data: null,
    error: "",
  });
  // const [verifiedPopupOpen, setVerifiedPopupOpen] = useState(false);

  const submitHandler = async () => {
    if (!otp.trim() || otp.length < 4) {
      let msg = "";
      if (!otp.trim()) msg = "OTP is required";
      if (otp.trim() && otp.length < 4) msg = "OTP must be 4 digit";
      toastAlert(msg);
      return;
    }
    try {
      setApiRes({ ...apiRes, loading: true });
      const res = await axiosIns({
        url: `/auth_api/otp_register_process?email=${signupFormData.email}&otp=${otp}`,
        method: "GET",
      });
      if (res.data.status) {
        console.log(res.data);
        registerUser();
      } else {
        console.log(res.data);
        setApiRes({ ...apiRes, loading: false, error: res.data.message });
        toastAlert(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
      toastAlert(err.message);
      setApiRes({ ...apiRes, loading: false, error: err.message });
    }
  };

  async function registerUser() {
    try {
      const res = await axiosIns({
        url: `/auth_api/user_register`,
        method: "POST",
        data: {
          email: signupFormData.email,
          number: signupFormData.phone,
          password: signupFormData.password,
          user_name: signupFormData.username,
        },
      });
      if (res.data.status) {
        console.log(res.data);
        localStorage.setItem("bile-user-token", res.data.results[0].token);
        setApiRes({ ...apiRes, loading: false, error: "" });
        setOpen(false);
        await getAuthUser();
        toastAlert(res.data.message);
        setOtp("");
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
  async function getAuthUser() {
    try {
      const res = await axiosIns({
        method: "GET",
        url: "/auth_api/get_profile_data",
      });
      console.log("getAuthUser\n", res.data);
      if (res.data.status) {
        const user = {
          id: res.data.results.id,
          username: res.data.results.user_name,
          email: res.data.results.email,
          phone: res.data.results.number,
          countryCode: res.data.results.country_code,
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
          <div className={styles.verifyOtpModal}>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>
              <IoIosClose />
            </button>
            <div className={styles.logoBox}>
              <img src={app_logo} alt="Bile" />
            </div>
            <h5>Verification</h5>
            <div className={styles.forgetmsg}>
              You must recieve a 4-digit OTP that sent to{" "}
              <b>
                {signupFormData.email?.substring(0, 3)}****
                {signupFormData.email?.substring(
                  signupFormData.email?.length - 11
                )}
              </b>
            </div>
            <div className={styles.inputContainer}>
              <OtpInput value={otp} onChange={(v) => setOtp(v)} numInputs={4} />
            </div>
            <div className={styles.resendOtpBtn}>Resend Me OTP</div>
            <button
              className={styles.verifyOtpBtn}
              onClick={submitHandler}
              disabled={apiRes.loading}
            >
              {apiRes.loading ? <Loader /> : "Verify"}
            </button>
          </div>
        </Popup>
      ) : null}
    </>
  );
}

export default SignupOtpVerify;
