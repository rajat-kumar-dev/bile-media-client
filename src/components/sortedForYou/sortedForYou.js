import styles from "./style.module.css";
import trend1 from "../../assets/images/trend1.png";
import trend2 from "../../assets/images/trend2.png";
import trend3 from "../../assets/images/trend3.png";
import { BsCollectionPlay } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";
const array = [
  trend1,
  trend2,
  trend3,
  trend1,
  trend2,
  trend3,
  trend1,
  trend2,
  trend3,
  trend1,
  trend2,
  trend3,
  trend1,
  trend2,
];
const SortedForYou = () => {
  const [expand, setExpand] = useState(false);
  const [trendingImg, setTrendingImg] = useState(array);

  const expandHandler = () => {
    if (!expand) {
      setExpand(true);
      setTrendingImg([...array, ...array]);
      return;
    }
    setExpand(false);
    setTrendingImg(array);
  };
  return (
    <div className={styles.container}>
      <h3>
        Sorted For You
        <span>
          <BsCollectionPlay size={25} />
        </span>
      </h3>
      <div className={styles.itemsBox}>
        {trendingImg.map((img, i) => {
          return (
            <div className={styles.item} key={i}>
              <img src={img} alt="" />
            </div>
          );
        })}
      </div>

      <div className={styles.expand} onClick={expandHandler}>
        {expand ? (
          <>
            Collapse Content <FiChevronUp size={25} />
          </>
        ) : (
          <>
            Extend Content <FiChevronDown size={25} />
          </>
        )}
      </div>

      {/* <div className=""></div> */}
    </div>
  );
};
export default SortedForYou;
