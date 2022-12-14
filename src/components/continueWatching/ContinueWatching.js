import styles from "./style.module.css";
import React, { useContext, useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import continue1 from "../../assets/images/contWatch1.png";
import continue2 from "../../assets/images/contWatch2.png";
import continue3 from "../../assets/images/contWatch3.png";
import { DiBingSmall } from "react-icons/di";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import axiosIns from "../../axios/axios";
import { BsFillPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const images = [
  continue1,
  continue2,
  continue3,
  continue1,
  continue2,
  continue3,
];
const src =
  "https://graphicriver.img.customer.envatousercontent.com/files/301509692/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=bbb4b154c0ccf9f6610647bd14fd92e1";
const ContinueWatching = () => {
  const { state } = useContext(GlobalContext);
  const [watchlist, setWatchlist] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!state.auth) return;
    getWatchingList();
  }, [state.authUser]);
  const responsive = {
    xl: {
      breakpoint: { max: 2000, min: 900 },
      items: 5,
    },
    lg: {
      breakpoint: { max: 900, min: 700 },
      items: 5,
    },
    md: {
      breakpoint: { max: 700, min: 500 },
      items: 4,
    },
    sm: {
      breakpoint: { max: 500, min: 300 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 300, min: 0 },
      items: 1,
    },
  };
  async function getWatchingList() {
    try {
      const res = await axiosIns({
        url: "/auth_api/mywatch_video_list",
        method: "POST",
      });
      console.log("getWatchingList", res.data);
      if (res.data.status) {
        setWatchlist(res.data.results);
      } else {
        console.log("getWatchingList else", res.data);
      }
    } catch (err) {
      console.log("getWatchingList Error\n", err.message);
    }
  }
  if (!state.auth) return;
  if (!watchlist.length) return;
  return (
    <div className={styles.trendingContainer}>
      <h3>
        Continue Watching
        <span>
          <DiBingSmall size={28} />
        </span>
      </h3>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={false}
        showDots={false}
        arrows={false}
      >
        {watchlist.map((item, i) => (
          <div
            className={styles.product}
            key={i}
            onClick={() => navigateTo(`/watch/${item.id}`)}
          >
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={item.image} alt="image" draggable="false" />
                <div className={styles.playBtn}>
                  <BsFillPlayFill />
                </div>
              </div>
            </div>
            <div className={styles.timeline}>
              <div className={styles.mediaDetails}>
                <span>{item.name}</span>
                <span>
                  {item.duration_hours}:{item.duration_minutes}:
                  {item.duration_second}
                </span>
              </div>
              <div className={styles.timebar}>
                <div
                  className={styles.bar}
                  style={{
                    translate: `${70 - 100}% 0`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ContinueWatching;

//   <div className="item">
//
//       <div className="image">
//         <img src={item.image} alt="image" />
//       </div>
//       <div className="detail">
//         <div className="title"> {item.title} </div>
//         <div className="desc">
//           {item.description.slice(0, 15)}...
//         </div>
//       </div>
//   </div>
