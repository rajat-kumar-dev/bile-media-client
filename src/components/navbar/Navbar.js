import styles from "./style.module.css";
import app_logo from "../../assets/images/app_logo.png";
import { FiSearch } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import LoginComp from "../loginComp/LoginComp";
import SignupComp from "../signupComp/SignupComp";
import ForgetPassPopup from "../forgetPassPopup/ForgetPassPopup";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import axiosIns from "../../axios/axios";
import actions from "../../context/GlobalContext/globalActions";
import { BiMenuAltRight } from "react-icons/bi";
const randImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";
const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [forgetPassOpen, setForgetPassOpen] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
  const { auth, authUser } = state;
  // console.log(authUser);
  useEffect(() => {
    getAuthUser();
  }, []);

  async function getAuthUser() {
    try {
      const res = await axiosIns({
        method: "GET",
        url: "/get_profile_data",
      });
      console.log("getAuthUser\n", res.data);
      if (res.data.status) {
        const user = {
          id: res.data.results.id,
          username: res.data.results.user_name,
          email: res.data.results.email,
          phone: res.data.results.number,
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
        {auth && authUser ? (
          <div className={styles.authUser}>
            <div className={styles.userAvatar}>
              {authUser.avatar ? (
                <img src={authUser.avatar} alt="avatar" />
              ) : (
                <span>{authUser.username.slice(0, 1)}</span>
              )}
            </div>
            <div className={styles.menuicon}>
              <BiMenuAltRight size={30} />
            </div>
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