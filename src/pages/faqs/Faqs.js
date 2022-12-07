import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import s from "./style.module.css";
const Faqs = () => {
  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>FAQs</h2>
        <div className={s.content}>
          {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
            <details key={i}>
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
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of
              </p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
};
export default Faqs;
