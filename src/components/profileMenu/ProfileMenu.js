import styles from "./style.module.css";
import { FiEdit3, FiHome, FiSettings } from "react-icons/fi";
import { AiOutlineLogout, AiOutlineStar } from "react-icons/ai";
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
const generalMenuItems = [
  { name: "Home", icon: <FiHome size={20} /> },
  { name: "Watchlist", icon: <BsBookmark size={20} /> },
  { name: "Downloads", icon: <SlCloudDownload size={20} /> },
  { name: "Manage Accounts", icon: <MdOutlineSwitchAccount size={20} /> },
  { name: "Settings", icon: <FiSettings /> },
];
const StaticMenuItems = [
  { name: "FAQs", icon: <TbMessages size={20} /> },
  { name: "Contact Us", icon: <MdConnectWithoutContact size={20} /> },
  { name: "Rate Us", icon: <AiOutlineStar size={20} /> },
  { name: "Terms & Conditions", icon: <FaUserClock size={20} /> },
  { name: "Privacy Policy", icon: <HiOutlineNewspaper size={20} /> },
];
const randImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";
const MenuSection = ({ name, menuItems }) => {
  return (
    <div>
      <h3 className={styles.menuSectName}>{name}</h3>
      {menuItems.map((item) => {
        return (
          <div className={styles.menuItem} key={item.name}>
            <div className={styles.menuIconBox}>{item.icon}</div>
            <div>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

const ProfileMenu = ({ open, setOpen }) => {
  const { state, dispatch } = useContext(GlobalContext);
  console.log(state);
  const { authUser } = state;
  function closeMenu() {
    setOpen(false);
  }
  function userLogout() {
    localStorage.removeItem("bile-user-token");
    console.log("logged out");
    setOpen(false);
    dispatch({ type: actions.LOGOUT });
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
              <button className={styles.chagePassBtn}>Change Password</button>
              <div className={styles.editProfileBtn}>
                <FiEdit3 />
              </div>
            </div>
            <div className={styles.menuSection}>
              <MenuSection name="General" menuItems={generalMenuItems} />
              <MenuSection name="Static" menuItems={StaticMenuItems} />
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
