import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import styles from "./style.module.css";
import { IoIosClose } from "react-icons/io";
import actions from "../../context/GlobalContext/globalActions";
import axiosIns from "../../axios/axios";
import { toastAlert } from "../../utils";
const randImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU";
const EditProfile = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [apiRes, setApiRes] = useState({
    loading: false,
    data: null,
    error: "",
  });
  const authUser = state.authUser;
  const fileRef = useRef(null);
  const [avatar, setAvatar] = useState(authUser?.avatar || "");
  const [newAvatarFile, setNewAvatarFile] = useState(null);
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
  const submitHandler = () => {
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
    if (username.trim() !== authUser.username)
      updateData.username = username.trim();
    // if (phone !== authUser.phone) updateData.phone = phone;
    // if (email !== authUser.email) updateData.email = email;
    if (avatar !== authUser.avatar && newAvatarFile)
      updateData.avatar = newAvatarFile;
    console.log(authUser, updateData);
    if (!Object.keys(updateData).length) {
      toastAlert("Profile Updated Successfully");
      return;
    }
    updateProfile(updateData);
  };

  async function updateProfile(data) {
    const formData = new FormData();
    if (data.username) formData.append("user_name", data.username);
    // if (data.phone) formData.append("number", data.phone);
    // if (data.email) formData.append("email", data.email);
    if (data.avatar) formData.append("profile_img", data.avatar);
    try {
      setApiRes({ ...apiRes, loading: true });
      const res = await axiosIns({
        url: "/profile_update",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("updateProfile\n", res.data);
      if (res.data.status) {
        getAuthUser();
      } else {
        setApiRes({ ...apiRes, loading: false, error: res.data.message });
      }
    } catch (err) {
      console.log("updateProfile error\n", err.message);
      setApiRes({ ...apiRes, loading: false, error: err.message });
    }
  }
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
        setApiRes({ ...apiRes, loading: false, error: "" });
        setNewAvatarFile(null);
        toastAlert("Profile Updated Successfully");
      } else {
        return null;
      }
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  if (!authUser) return;
  return (
    <>
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
          <span style={{ color: "red" }}>{apiRes.error}</span>
          <button
            className={`${styles.editProfileBtn} ${styles.saveBtn}`}
            onClick={submitHandler}
          >
            {apiRes.loading ? "Loading..." : "Save"}
          </button>
          <button
            className={`${styles.editProfileBtn} ${styles.changePassBtn}`}
          >
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
    </>
  );
};

export default EditProfile;
