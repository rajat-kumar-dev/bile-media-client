import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { TfiLock } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router-dom";
import axiosIns from "../../axios/axios";
import Loader from "../../components/loader/Loader";
import { toastAlert } from "../../utils";
import s from "./style.module.css";
const Newpass = () => {
  const navigateTo = useNavigate();
  const locationState = useLocation().state;
  const [invalidFields, setInvalidFields] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [apiRes, setApiRes] = useState({
    loading: false,
    data: null,
  });
  console.log(locationState);
  useEffect(() => {
    if (!locationState || !locationState.email || !locationState.otp)
      navigateTo("/", { replace: true });
  }, []);
  const submitHandler = async () => {
    const wrongFields = [];
    if (!password) wrongFields.push("pass");
    if (!confPassword || password !== confPassword)
      wrongFields.push("confpass");
    setInvalidFields(wrongFields);
    if (wrongFields.length) return;
    console.log("success");
    setApiRes({ ...apiRes, loading: true });

    try {
      const res = await axiosIns({
        url: `/auth_api/update_password`,
        method: "PATCH",
        data: { email: locationState.email, otp: locationState.otp, password },
      });
      if (res.data.status) {
        setApiRes({ ...apiRes, loading: false });
        toastAlert("Successfully Changed Your Password");
        localStorage.removeItem("forget-user-email");
        localStorage.removeItem("forget-user-otp");
        navigateTo("/");
      } else {
        setApiRes({ ...apiRes, loading: false });
        toastAlert(res.data.message);
      }
    } catch (err) {
      setApiRes({ ...apiRes, loading: false });
      toastAlert(err.message);
    }
  };

  function setValidField(field) {
    if (!invalidFields.includes(field)) return;
    const temp = invalidFields.filter((f) => f !== field);
    setInvalidFields(temp);
  }
  return (
    <>
      <div className={s.container}>
        <div className={s.content}>
          <h3>Create New Password</h3>
          <p>
            After creating new password, you'll have use this new password to
            access your account.
          </p>
          <div>
            <div
              className={`${s.inputBox} ${
                invalidFields.includes("pass") ? s.invalid : ""
              }`}
            >
              <TfiLock size={15} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setValidField("pass");
                }}
              />
            </div>
            {invalidFields.includes("pass") && (
              <div className={s.errMsg}>Invalid Password</div>
            )}
          </div>
          <div>
            <div
              className={`${s.inputBox} ${
                invalidFields.includes("confpass") ? s.invalid : ""
              }`}
            >
              <TfiLock size={15} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => {
                  setConfPassword(e.target.value);
                  setValidField("confpass");
                }}
              />
              {showPass ? (
                <BsEyeSlash
                  className={s.showHideEye}
                  style={{ color: "#5BCBF5" }}
                  onClick={() => setShowPass(false)}
                />
              ) : (
                <BsEye
                  className={s.showHideEye}
                  style={{ color: "#ffffff80" }}
                  onClick={() => setShowPass(true)}
                />
              )}
            </div>
            {invalidFields.includes("confpass") && (
              <div className={s.errMsg}>Password Mismatch</div>
            )}
          </div>
          <button
            className={s.saveBtn}
            onClick={submitHandler}
            disabled={apiRes.loading}
          >
            {apiRes.loading ? <Loader /> : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Newpass;
