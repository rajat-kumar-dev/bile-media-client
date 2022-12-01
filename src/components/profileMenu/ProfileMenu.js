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
  { name: "Home", icon: <FiHome /> },
  { name: "Watchlist", icon: <BsBookmark /> },
  { name: "Downloads", icon: <SlCloudDownload /> },
  { name: "Manage Accounts", icon: <MdOutlineSwitchAccount /> },
  { name: "Settings", icon: <FiSettings /> },
];
const StaticMenuItems = [
  { name: "FAQs", icon: <TbMessages /> },
  { name: "Contact Us", icon: <MdConnectWithoutContact /> },
  { name: "Rate Us", icon: <AiOutlineStar /> },
  { name: "Terms & Conditions", icon: <FaUserClock /> },
  { name: "Privacy Policy", icon: <HiOutlineNewspaper /> },
];
const randImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";
const MenuSection = ({ name, menuItems }) => {
  return (
    <div>
      <h3 className={styles.menuSectName}>{name}</h3>
      {menuItems.map((item) => {
        return (
          <div className={styles.menuItem}>
            <div className={styles.menuIconBox}>{item.icon}</div>
            <div>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

const ProfileMenu = ({ open, setOpen }) => {
  const { dispatch } = useContext(GlobalContext);
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
                  <img src={randImg} alt="" />
                </div>
                <div className={styles.userNamePhone}>
                  <h3>Ahmad Ullah</h3>
                  <div>+250 434 342 242</div>
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
