import s from "./style.module.css";
import app_logo from "../../assets/images/app_logo_blue.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
const ContactUs = () => {
  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>Contact Us</h2>
        <div className={s.content}>
          <div className={s.item}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
