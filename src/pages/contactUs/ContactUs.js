import s from "./style.module.css";
import app_logo from "../../assets/images/app_logo_blue.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import axiosIns from "../../axios/axios";
const ContactUs = () => {
  const { state } = useContext(GlobalContext);
  const [contactus, setContactus] = useState("");
  useEffect(() => {
    if (state.auth && state.authUser) getContactus();
  }, [state.authUser]);
  async function getContactus() {
    try {
      const res = await axiosIns({
        url: "/auth_api/setting_list",
        method: "GET",
      });
      if (res.data.status) {
        setContactus(res.data.results[0].contactus);
      } else {
        console.log("getContactus else", res.data);
      }
    } catch (err) {
      console.log("getContactus Error\n", err.message);
    }
  }
  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>Contact Us</h2>
        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: contactus }}
        >
          {/* <div className={s.item}>
            <img src={app_logo} alt="" />
          </div>
          <div className={s.item}>
            <span>
              <FaMapMarkerAlt />
            </span>
            <div>Omar Elmi Dihoud Via Degfar Road Magadishu. 9733</div>
          </div>
          <div className={s.item}>
            <span>
              <MdMail />
            </span>
            <div>Omar Elmi Dihoud Via Degfar Road Magadishu. 9733</div>
          </div>
          <div className={s.item}>
            <span>
              <IoIosCall />
            </span>
            <div>Omar Elmi Dihoud Via Degfar Road Magadishu. 9733</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
