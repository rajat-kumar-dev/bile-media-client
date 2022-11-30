import styles from "./style.module.css";
import app_logo from "../../assets/images/app_logo.png";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import LoginComp from "../loginComp/LoginComp";
import SignupComp from "../signupComp/SignupComp";
import ForgetPassPopup from "../forgetPassPopup/ForgetPassPopup";
const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [forgetPassOpen, setForgetPassOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("bile-user-token");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  });
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <img src={app_logo} alt="" />
        </div>
        <div className={styles.navLinks}>
          <div className={styles.activeLink}>Movies</div>
          <div>TV Shows</div>
          <div>Subscriptions</div>
        </div>
        <div className={styles.navSearchbar}>
          <FiSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search for movies or TV shows" />
        </div>
        {auth ? (
          <div className={styles.authUser}>
            <div className={styles.userAvatar}>H</div>
            <div className={styles.profileOps}></div>
          </div>
        ) : (
          <div
            className={styles.navLoginbtn}
            onClick={() => {
              setSignupOpen(false);
              setLoginOpen(true);
            }}
          >
            Login
          </div>
        )}
      </div>
      {/* ===========popups========== */}
      <LoginComp
        open={loginOpen}
        setOpen={setLoginOpen}
        setSignupOpen={setSignupOpen}
        setForgetPassOpen={setForgetPassOpen}
      />
      <SignupComp
        open={signupOpen}
        setOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
      />
      <ForgetPassPopup open={forgetPassOpen} setOpen={setForgetPassOpen} />
    </>
  );
};
export default Navbar;
