import { useState } from "react";
import { useContext, useEffect } from "react";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import s from "./style.module.css";
const Faqs = () => {
  const { state } = useContext(GlobalContext);
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    if (state.auth && state.authUser) getFaqs();
  }, [state.authUser]);
  async function getFaqs() {
    try {
      const res = await axiosIns({
        url: "/faq_list",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setFaqs(res.data.results);
      } else {
        console.log("getFaqs else", res.data);
      }
    } catch (err) {
      console.log("getFaqs Error\n", err.message);
    }
  }
  if (!state.auth) return;
  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>FAQs</h2>
        <div className={s.content}>
          {/* ======== */}
          <details>
            <summary>
              <span>What is Lorem Ipsum?</span>
              <span className={`${s.accordIcon} ${s.open}`}>
                <HiOutlineChevronDown />
              </span>
              <span className={`${s.accordIcon} ${s.close}`}>
                <HiOutlineChevronUp />
              </span>
            </summary>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
            </p>
          </details>
          {/* ======== */}
          {faqs.map((faq, i) => (
            <details key={i}>
              <summary>
                <span>{faq.faqs}</span>
                <span className={`${s.accordIcon} ${s.open}`}>
                  <HiOutlineChevronDown />
                </span>
                <span className={`${s.accordIcon} ${s.close}`}>
                  <HiOutlineChevronUp />
                </span>
              </summary>
              <p>{faq.ans}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
};
export default Faqs;
