import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import styles from "./style.module.css";
import { IoIosClose } from "react-icons/io";
const randImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";
const EditProfile = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const authUser = state.authUser;
  const fileRef = useRef(null);
  const [avatar, setAvatar] = useState(authUser?.avatar || "");
  const [newAvatarFile, setNewAvatarFile] = useState();
  const [username, setUsername] = useState(authUser?.username || "");
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [invalidFields, setInvalidFields] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!authUser) {
      console.log("state", state);
      navigateTo("/");
    }
  }, [authUser]);
  const updateProfile = () => {
    const wrongFields = [];
    if (!username.trim()) wrongFields.push("username");
    if (!phone) wrongFields.push("phone");
    if (!email) wrongFields.push("email");
    setInvalidFields(wrongFields);
    if (wrongFields.length) {
      console.log("wrong fields");
      return;
    }
    const updateData = {};
    if (invalidFields.length) return;
    console.log("success");
    if (username.trim() !== authUser.username)
      updateData.username = username.trim();
    if (phone !== authUser.phone) updateData.phone = phone;
    if (email !== authUser.email) updateData.email = email;
    if (avatar !== authUser.avatar) updateData.avatar = newAvatarFile;
    window.updateData = updateData;
    console.log(updateData, invalidFields);
  };
  if (!authUser) return;
  return (
    <div className={styles.editProfilePage}>
      <h4 className={styles.heading}>Edit Profile</h4>
      <div className={styles.editProfileSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.imgBox}>
            {avatar ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <span>{authUser.username.slice(0, 1)}</span>
            )}
            {avatar && (
              <button
                onClick={() => setAvatar("")}
                className={styles.removeAvatarBtn}
              >
                <IoIosClose />
              </button>
            )}
          </div>
          <button
            className={styles.changePicBtn}
            onClick={() => fileRef.current.click()}
          >
            Change Picture
          </button>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${styles.inputBox} ${
            invalidFields.includes("username") ? styles.invalid : ""
          }`}
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value.trim())}
          placeholder="Mobile Number"
          className={`${styles.inputBox} ${
            invalidFields.includes("phone") ? styles.invalid : ""
          }`}
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          placeholder="Email"
          className={`${styles.inputBox} ${
            invalidFields.includes("email") ? styles.invalid : ""
          }`}
        />
        <button
          className={`${styles.editProfileBtn} ${styles.saveBtn}`}
          onClick={updateProfile}
        >
          Save
        </button>
        <button className={`${styles.editProfileBtn} ${styles.changePassBtn}`}>
          Change Password
        </button>
      </div>
      <div className={styles.visuallyHidden}>
        <input
          type="file"
          ref={fileRef}
          accept="image/jpeg, image/png"
          onChange={({ target }) => {
            if (target.files.length) {
              setNewAvatarFile(target.files[0]);
              setAvatar(URL.createObjectURL(target.files[0]));
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
