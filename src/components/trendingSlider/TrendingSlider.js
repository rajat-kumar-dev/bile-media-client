import { SlGraph } from "react-icons/sl";
import styles from "./style.module.css";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import axiosIns from "../../axios/axios";
import { useNavigate } from "react-router-dom";

const TrendingSlider = () => {
  const { state } = useContext(GlobalContext);
  const [trendingVideoList, setTrendingVideoList] = useState([]);
  const navigateTo = useNavigate();
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
        url: state.authUser ? "/auth_api/video_list" : "/web_api/video_list",
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
          <div
            className={styles.product}
            key={i}
            onClick={() => navigateTo(`/watch/${video.id}`)}
          >
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
