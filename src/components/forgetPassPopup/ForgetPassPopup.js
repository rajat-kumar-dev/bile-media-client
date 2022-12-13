import { useState } from "react";
import app_logo from "../../assets/images/app_logo.png";
import { IoIosClose } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./style.module.css";
import OtpVerifyPopup from "../otpVerifyPopup/OtpVerifyPopup";
import Popup from "../popup/Popup";
import { toastAlert } from "../../utils";
import axiosIns from "../../axios/axios";

function ForgetPassPopup({ open, setOpen }) {
  const [otpPopupOpen, setOtpPopupOpen] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [email, setEmail] = useState("");
  const [apiRes, setApiRes] = useState({
    loading: false,
    error: "",
  });
  const submitHandler = async () => {
    const wrongFields = [];
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !validEmailRegex.test(email)) {
      wrongFields.push("email");
    }
    setInvalidFields(wrongFields);
    if (wrongFields.length) return;
    //  sendOTP
    setApiRes({ ...apiRes, loading: true });
    try {
      const res = await axiosIns({
        url: `/update_password`,
        method: "PATCH",
        data: { email },
      });
      if (res.data.status) {
        setApiRes({ ...apiRes, loading: false });
        toastAlert("OTP sent to your email");
        setOpen(false);
        setOtpPopupOpen(true);
      } else {
        setApiRes({ ...apiRes, loading: false });
        toastAlert(res.data.message);
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
          <div className={styles.verifyPassModal}>
            <button onClick={() => setOpen(false)} className={styles.closeBtn}>
              <IoIosClose />
            </button>
            <div className={styles.logoBox}>
              <img src={app_logo} alt="Bile" />
            </div>
            <h5>Forget Passoword</h5>
            <div className={styles.forgetmsg}>
              Enter your registered email address we'll send you an OTP to
              authenticate & verify your account.
            </div>
            <div className={styles.inputContainer}>
              <div>
                <div
                  className={`${styles.inputBox} ${
                    invalidFields.includes("email") ? styles.invalid : ""
                  }`}
                >
                  <HiOutlineMail size={18} />
                  <input
                    type="email"
                    placeholder="Email Id"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.trim());
                      setValidField("email");
                    }}
                  />
                </div>
                {invalidFields.includes("email") && (
                  <div className={styles.errMsg}>Invalid Email</div>
                )}
              </div>
            </div>

            <button className={styles.sendOtpBtn} onClick={submitHandler}>
              Send Me OTP
            </button>
          </div>
        </Popup>
      ) : null}
      <OtpVerifyPopup
        email={email}
        open={otpPopupOpen}
        setOpen={setOtpPopupOpen}
      />
    </>
  );
}

export default ForgetPassPopup;
