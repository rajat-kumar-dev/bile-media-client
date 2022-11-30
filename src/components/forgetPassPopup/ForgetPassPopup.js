import { useState } from 'react';
import app_logo from '../../assets/images/app_logo.png';
import { IoIosClose } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';
import styles from './style.module.css';
import OtpVerifyPopup from '../otpVerifyPopup/OtpVerifyPopup';
import Popup from '../popup/Popup';

function ForgetPassPopup({ open, setOpen }) {
  const [otpPopupOpen, setOtpPopupOpen] = useState(false);

  const [email, setEmail] = useState('abc@gmail.com');

  const submitHandler = () => {
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (validEmailRegex.test(email)) {
      setOpen(false);
      setOtpPopupOpen(true);
    }
    return console.log('invalid email');
  };
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
              <div className={styles.inputBox}>
                <HiOutlineMail size={18} />
                <input
                  type="email"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
