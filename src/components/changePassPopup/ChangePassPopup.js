import s from "./style.module.css";
import Popup from "../popup/Popup";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import { toastAlert } from "../../utils";
import axiosIns from "../../axios/axios";

function ChangePassPopup({ open, closeHandler }) {
  const [currentPass, setCurrentPass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const [apiRes, setApiRes] = useState({
    loading: false,
    err: "",
  });

  const saveHandler = async () => {
    const wrongFields = [];
    if (!currentPass) wrongFields.push("currPass");
    if (!newpass) wrongFields.push("newPass");
    if (!confNewPass || newpass !== confNewPass) wrongFields.push("confPass");
    setInvalidFields(wrongFields);
    if (wrongFields.length) return;
    if (currentPass === newpass) {
      toastAlert("New password cannot be the same");
      return;
    }
    console.log("sucess");
    setApiRes({ ...apiRes, loading: true });
    try {
      const res = await axiosIns({
        url: `/auth_api/change_password`,
        method: "PATCH",
        data: { password: currentPass, new_password: newpass },
      });
      if (res.data.status) {
        setApiRes({ ...apiRes, loading: false });
        toastAlert("Successfully Changed Your Password");
        closeHandler();
        resetForm();
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
  function resetForm() {
    setCurrentPass("");
    setNewpass("");
    setConfNewPass("");
  }
  return (
    <>
      {open ? (
        <Popup>
          <div className={s.modal}>
            <button onClick={closeHandler} className={s.closeBtn}>
              <IoIosClose />
            </button>
            <div className={s.content}>
              <h3>Change Password</h3>
              <p>
                After creating new password, you'll have use this new password
                to access your account.
              </p>
              <div className={s.inputContainer}>
                <div
                  className={`${s.inputBox} ${
                    invalidFields.includes("currPass") ? s.invalid : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Current Password"
                    value={currentPass}
                    onChange={(e) => {
                      setCurrentPass(e.target.value);
                      setValidField("currPass");
                    }}
                  />
                  {invalidFields.includes("currPass") && (
                    <div className={s.errMsg}>
                      {!currentPass
                        ? "Current Password is Required"
                        : "Invalid Password"}
                    </div>
                  )}
                </div>
                <div
                  className={`${s.inputBox} ${
                    invalidFields.includes("newPass") ? s.invalid : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="New Password"
                    value={newpass}
                    onChange={(e) => {
                      setNewpass(e.target.value);
                      setValidField("newPass");
                    }}
                  />
                  {invalidFields.includes("newPass") && (
                    <div className={s.errMsg}>Invalid New Password</div>
                  )}
                </div>

                <div
                  className={`${s.inputBox} ${
                    invalidFields.includes("confPass") ? s.invalid : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    value={confNewPass}
                    onChange={(e) => {
                      setConfNewPass(e.target.value);
                      setValidField("confPass");
                    }}
                  />
                  {invalidFields.includes("confPass") && (
                    <div className={s.errMsg}>Password Mismatch</div>
                  )}
                </div>
              </div>
              <button className={s.saveBtn} onClick={saveHandler}>
                {apiRes.loading ? "Saving..." : "Done"}
              </button>
            </div>
          </div>
        </Popup>
      ) : null}
    </>
  );
}

export default ChangePassPopup;
/* {invalidFields.includes("phone") && (
                  <div className={s.errMsg}>Invalid Phone Number</div>
                )} */
