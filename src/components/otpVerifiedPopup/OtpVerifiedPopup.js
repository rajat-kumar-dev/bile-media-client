import verified_img from '../../assets/images/verified_img.png';
import Popup from '../popup/Popup';

import styles from './style.module.css';

function OtpVerifiedPopup({ open, setOpen }) {
  return (
    <>
      {open ? (
        <Popup>
          <div className={styles.verifyOtpModal}>
            <div className={styles.logoBox}>
              <img src={verified_img} alt="Verified" />
            </div>
            <h5>OTP Verified</h5>
            <div className={styles.forgetmsg}>
              Now you can create new password
            </div>
            <button
              className={styles.verifyOtpBtn}
              onClick={() => setOpen(false)}
            >
              Continue
            </button>
            <div className={styles.resendOtpBtn} onClick={() => setOpen(false)}>
              Back To Login
            </div>
          </div>
        </Popup>
      ) : null}
    </>
  );
}

export default OtpVerifiedPopup;
