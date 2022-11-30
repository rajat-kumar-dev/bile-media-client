import { useState } from "react";
import app_logo from "../../assets/images/app_logo.png";
import { IoIosClose } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./style.module.css";
import OtpVerifiedPopup from "../otpVerifiedPopup/OtpVerifiedPopup";
import OtpInput from "otp-input-react-18";
import Popup from "../popup/Popup";

function OtpVerifyPopup({ email, open, setOpen }) {
  const [otp, setOtp] = useState("");
  const [verifiedPopupOpen, setVerifiedPopupOpen] = useState(false);
  const submitHandler = () => {
    console.log(otp);
    setOpen(false);
    setVerifiedPopupOpen(true);
  };
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
            <div className={styles.inputContainer}>
              {/* <div className={styles.inputBox}>
                <input type="text" onChange={(e) => setOtp(e.target.value)} />
              </div> */}
              <OtpInput value={otp} onChange={(v) => setOtp(v)} numInputs={4} />
            </div>
            <div className={styles.resendOtpBtn}>Resend Me OTP</div>
            <button className={styles.verifyOtpBtn} onClick={submitHandler}>
              Verify
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
