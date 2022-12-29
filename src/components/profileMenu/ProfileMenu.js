import styles from "./style.module.css";
import { FiEdit3, FiHome, FiSettings } from "react-icons/fi";
import { AiOutlineLogout, AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import { SlCloudDownload } from "react-icons/sl";
import { TbMessages } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi";
import {
  MdOutlineSwitchAccount,
  MdConnectWithoutContact,
} from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import actions from "../../context/GlobalContext/globalActions";
import { useNavigate } from "react-router-dom";
import { toastAlert } from "../../utils";
const generalMenuItems = [
  { name: "Home", icon: <FiHome size={20} />, link: "/" },
  { name: "Watchlist", icon: <BsBookmark size={20} />, link: "/watchlist" },
  {
    name: "Downloads",
    icon: <SlCloudDownload size={20} />,
    link: "/downloads",
  },
  {
    name: "Favorite Channels",
    icon: <AiOutlineHeart size={20} />,
    link: "/favoriteChannels",
  },

  {
    name: "Manage Accounts",
    icon: <MdOutlineSwitchAccount size={20} />,
    link: "/manageacc",
  },
  { name: "Settings", icon: <FiSettings />, link: "/settings" },
];
const StaticMenuItems = [
  { name: "FAQs", icon: <TbMessages size={20} />, link: "/faqs" },
  {
    name: "Contact Us",
    icon: <MdConnectWithoutContact size={20} />,
    link: "/contact",
  },
  { name: "Rate Us", icon: <AiOutlineStar size={20} />, link: "/rateus" },
  { name: "Terms & Conditions", icon: <FaUserClock size={20} />, link: "/t&c" },
  {
    name: "Privacy Policy",
    icon: <HiOutlineNewspaper size={20} />,
    link: "/privacypolicy",
  },
];
const randImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";

const ProfileMenu = ({ open, setOpen }) => {
  console.log("[profile_menu]");
  const { state, dispatch } = useContext(GlobalContext);
  const navigateTo = useNavigate();
  const { authUser } = state;
  function closeMenu() {
    setOpen(false);
  }
  function userLogout() {
    localStorage.removeItem("bile-user-token");
    setOpen(false);
    navigateTo("/");
    dispatch({ type: actions.LOGOUT });
    toastAlert("Logout Successfully");
  }

  return (
    <>
      {open ? (
        <div className={styles.profileMenuContainer}>
          <div className={styles.outsideArea} onClick={closeMenu}></div>
          <div className={styles.profileMenu}>
            <div className={styles.profileSection}>
              <div className={styles.profilDetails}>
                <div className={styles.userImage}>
                  {authUser.avatar ? (
                    <img src={authUser.avatar} alt="avatar" />
                  ) : (
                    <span>{authUser.username.slice(0, 1)}</span>
                  )}
                </div>
                <div className={styles.userNamePhone}>
                  <h3>{authUser.username}</h3>
                  <div>
                    {authUser.countryCode} {authUser.phone}
                  </div>
                </div>
              </div>
              <button
                className={styles.chagePassBtn}
                onClick={() => {
                  setOpen(false);
                  dispatch({ type: actions.CHANGE_PASS_OPEN });
                }}
              >
                Change Password
              </button>
              <div
                className={styles.editProfileBtn}
                onClick={() => {
                  setOpen(false);
                  navigateTo("/editprofile");
                }}
              >
                <FiEdit3 />
              </div>
            </div>
            <div className={styles.menuSection}>
              <div>
                <h3 className={styles.menuSectName}>General</h3>
                {generalMenuItems.map((item) => {
                  return (
                    <div
                      className={styles.menuItem}
                      key={item.name}
                      onClick={() => {
                        setOpen(false);
                        navigateTo(item.link);
                      }}
                    >
                      <div className={styles.menuIconBox}>{item.icon}</div>
                      <div>{item.name}</div>
                    </div>
                  );
                })}
              </div>
              <div>
                <h3 className={styles.menuSectName}>Static</h3>
                {StaticMenuItems.map((item) => {
                  return (
                    <div
                      className={styles.menuItem}
                      key={item.name}
                      onClick={() => {
                        setOpen(false);
                        navigateTo(item.link);
                      }}
                    >
                      <div className={styles.menuIconBox}>{item.icon}</div>
                      <div>{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.menuFooter}>
              <span className={styles.versionBox}>Version: 0.00.01</span>
              <button className={styles.logoutBtn} onClick={userLogout}>
                <span>Logout</span>
                <span className={styles.logoutIconBox}>
                  <AiOutlineLogout size={25} />
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProfileMenu;
