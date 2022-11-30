import styles from "./style.module.css";
import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import continue1 from "../../assets/images/trend1.png";
import continue2 from "../../assets/images/trend2.png";
import continue3 from "../../assets/images/trend3.png";
import { BsPlayBtn } from "react-icons/bs";
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

  return (
    <div className={styles.trendingContainer}>
      <h3>
        Web Series
        <span>
          <BsPlayBtn size={25} />
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
        {[...images, ...images].map((item, i) => (
          <div className={styles.product} key={i}>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={item} alt="image" draggable="false" />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ContinueWatching;
