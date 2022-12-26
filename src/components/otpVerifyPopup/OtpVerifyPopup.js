import { useState } from "react";
import app_logo from "../../assets/images/app_logo.png";
import { IoIosClose } from "react-icons/io";
import styles from "./style.module.css";
import OtpVerifiedPopup from "../otpVerifiedPopup/OtpVerifiedPopup";
import OtpInput from "otp-input-react-18";
import Popup from "../popup/Popup";
import axiosIns from "../../axios/axios";
import { toastAlert } from "../../utils";
import Loader from "../loader/Loader";

function OtpVerifyPopup({ open, setOpen }) {
  const [otp, setOtp] = useState("");
  const [verifiedPopupOpen, setVerifiedPopupOpen] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [apiRes, setApiRes] = useState({
    loading: false,
    error: "",
  });
  const email = localStorage.getItem("forget-user-email");
  const submitHandler = async () => {
    const wrongFields = [];
    if (!otp.trim() || otp.trim().length < 4) wrongFields.push("otp");
    setInvalidFields(wrongFields);
    if (wrongFields.length) return;
    //  verify OTP
    setApiRes({ ...apiRes, loading: true });
    try {
      const res = await axiosIns({
        url: `/auth_api/update_password`,
        method: "PATCH",
        data: { email, otp },
      });
      if (res.data.status) {
        setApiRes({ ...apiRes, loading: false });
        toastAlert("OTP Verified");
        localStorage.setItem("forget-user-otp", otp);
        setOtp("");
        setOpen(false);
        setVerifiedPopupOpen(true);
      } else {
        setApiRes({ ...apiRes, loading: false });
        toastAlert("Incorrect OTP");
      }
    } catch (err) {
      setApiRes({ ...apiRes, loading: false });
      toastAlert(err.message);
    }
  };
  function setValidField(field) {
    if (!invalidFields.includes(field)) return;
    const temp = invalidFields.filter((f) => f !== field);
    setInvalidFields(temp);
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
                {email.substring(0, 3)}****
                {email.substring(email.length - 11)}
              </b>
            </div>
            <div
              className={`${styles.inputContainer} ${
                invalidFields.includes("otp") ? styles.invalid : ""
              }`}
            >
              <OtpInput
                value={otp}
                onChange={(v) => {
                  setOtp(v);
                  setValidField("otp");
                }}
                numInputs={4}
              />
              {invalidFields.includes("otp") && (
                <div className={styles.errMsg}>Invalid OTP</div>
              )}
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
      <OtpVerifiedPopup
        open={verifiedPopupOpen}
        setOpen={setVerifiedPopupOpen}
      />
    </>
  );
}

export default OtpVerifyPopup;
