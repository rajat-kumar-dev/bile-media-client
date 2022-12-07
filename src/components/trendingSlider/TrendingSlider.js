import { SlGraph } from "react-icons/sl";
import styles from "./style.module.css";
import React, { useContext, useEffect, useState } from "react";
import trend1 from "../../assets/images/trend1.png";
import trend2 from "../../assets/images/trend2.png";
import trend3 from "../../assets/images/trend3.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import axiosIns from "../../axios/axios";
const src =
  "https://graphicriver.img.customer.envatousercontent.com/files/301509692/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=bbb4b154c0ccf9f6610647bd14fd92e1";
const TrendingSlider = () => {
  const { state } = useContext(GlobalContext);
  const [trendingVideoList, setTrendingVideoList] = useState([]);
  useEffect(() => {
    getVideoList();
  }, [state.authUser]);
  const responsive = {
    xl: {
      breakpoint: { max: 2000, min: 900 },
      items: 7,
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
  async function getVideoList() {
    try {
      const res = await axiosIns({
        url: "/video_list",
        method: "POST",
      });
      if (res.data.status) {
        setTrendingVideoList(res.data.results);
      } else {
        console.log("getVideoList else", res.data);
      }
    } catch (err) {
      console.log("getVideoList Error\n", err.message);
    }
  }
  return (
    <div className={styles.trendingContainer}>
      <h3>
        Trending Now
        <span>
          <SlGraph size={20} />
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
        {trendingVideoList.map((video, i) => (
          <div className={styles.product} key={i}>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={video.image} alt="image" draggable="false" />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TrendingSlider;
// autoPlay={false}
// autoPlaySpeed={1500}
// keyBoardControl={true}
// customTransition="all .5"
// transitionDuration={500}
// containerClass="carousel-container"
// removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
// dotListClass="custom-dot-list-style"
// itemClass="carousel-item-padding-40-px"
