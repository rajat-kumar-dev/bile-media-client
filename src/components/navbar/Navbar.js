import styles from './style.module.css';
import app_logo from '../../assets/images/app_logo.png';
import { FiSearch } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import LoginComp from '../loginComp/LoginComp';
import SignupComp from '../signupComp/SignupComp';
import ForgetPassPopup from '../forgetPassPopup/ForgetPassPopup';
import GlobalContext from '../../context/GlobalContext/GlobalContext';
import axiosIns from '../../axios/axios';
import actions from '../../context/GlobalContext/globalActions';
import { BiMenuAltRight } from 'react-icons/bi';
import ProfileMenu from '../profileMenu/ProfileMenu';
import { useNavigate } from 'react-router-dom';
const randImg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU';
const navLinks = [
  {
    name: 'Movies',
    link: '/',
  },
  {
    name: 'TV Shows',
    link: '/tvshows',
  },
  {
    name: 'Subscriptions',
    link: '/subscriptions',
  },
];
const Navbar = () => {
  console.log('[navbar]');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);
  const { auth, authUser } = state;
  const navigateTo = useNavigate();
  return (
    <>
      <div className={styles.navContainer}>
        <div
          className={styles.navLogo}
          onClick={() => {
            navigateTo('/');
          }}
        >
          <img src={app_logo} alt="" />
        </div>
        <div className={styles.navLinks}>
          <div
            className={
              window.location.pathname === '/' ? styles.activeLink : ''
            }
            onClick={() => {
              navigateTo('/');
            }}
          >
            Movies
          </div>
          {state.auth && (
            <>
              <div
                className={
                  window.location.pathname === '/tvshows'
                    ? styles.activeLink
                    : ''
                }
                onClick={() => {
                  // navigateTo("/tvshows");
                }}
              >
                TV Shows
              </div>
              <div
                className={
                  window.location.pathname === '/subscriptions'
                    ? styles.activeLink
                    : ''
                }
                onClick={() => {
                  // navigateTo("/subscriptions");
                }}
              >
                Subscriptions
              </div>
            </>
          )}
        </div>
        <div className={styles.navSearchbar}>
          <FiSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search for movies or TV shows" />
        </div>
        {auth && authUser ? (
          <div className={styles.authUser}>
            <div
              className={styles.userAvatar}
              // onClick={() => navigateTo('/editProfile')}
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
              dispatch({ type: actions.LOGIN_POPUP_OPEN, payload: true });
            }}
          >
            Login
          </div>
        )}
      </div>

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
