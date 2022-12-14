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
import ProfileMenu from "../profileMenu/ProfileMenu";
import { useNavigate } from "react-router-dom";
const randImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";
const navLinks = [
  {
    name: "Movies",
    link: "/",
  },
  {
    name: "TV Shows",
    link: "/tvshows",
  },
  {
    name: "Subscriptions",
    link: "/subscriptions",
  },
];
const Navbar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
  const { auth, authUser } = state;
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!auth || !authUser) {
      dispatch({ type: actions.LOADING });
      getAuthUser();
    }
  }, [auth]);

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
          countryCode: res.data.results.country_code,
          avatar: res.data.results.profile_img,
        };
        dispatch({ type: actions.LOGIN, payload: user });
        dispatch({ type: actions.LOADED });
      } else {
        dispatch({ type: actions.LOADED });
      }
    } catch (err) {
      console.log(err.message);
      dispatch({ type: actions.LOADED });
    }
  }

  return (
    <>
      <div className={styles.navContainer}>
        <div
          className={styles.navLogo}
          onClick={() => {
            setActiveLink(0);
            navigateTo("/");
          }}
        >
          <img src={app_logo} alt="" />
        </div>
        <div className={styles.navLinks}>
          {navLinks.map((link, i) => (
            <div
              className={activeLink === i ? styles.activeLink : ""}
              onClick={() => {
                setActiveLink(i);
                navigateTo(link.link);
              }}
              key={i}
            >
              {link.name}
            </div>
          ))}
        </div>
        <div className={styles.navSearchbar}>
          <FiSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search for movies or TV shows" />
        </div>
        {auth && authUser ? (
          <div className={styles.authUser}>
            <div
              className={styles.userAvatar}
              onClick={() => navigateTo("/editProfile")}
            >
              {authUser.avatar ? (
                <img src={authUser.avatar} alt="avatar" />
              ) : (
                <span>{authUser.username.slice(0, 1)}</span>
              )}
            </div>
            <div
              className={styles.menuicon}
              onClick={() => setProfileMenuOpen(true)}
            >
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
      />
      <SignupComp
        open={signupOpen}
        setOpen={setSignupOpen}
        setLoginOpen={setLoginOpen}
      />

      {auth && authUser ? (
        <ProfileMenu open={profileMenuOpen} setOpen={setProfileMenuOpen} />
      ) : null}
    </>
  );
};
export default Navbar;

// setTestLoginOpen

// setTestLoginOpen(value){
//   setLoginOpen(value);
//   dispatch({})
// }
