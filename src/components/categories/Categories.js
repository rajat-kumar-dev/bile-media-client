import { AiFillAppstore } from "react-icons/ai";
import styles from "./style.module.css";
import React from "react";
import trend1 from "../../assets/images/trend1.png";
import trend2 from "../../assets/images/trend2.png";
import trend3 from "../../assets/images/trend3.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const trendingImg = [
  trend1,
  trend2,
  trend3,
  trend1,
  trend2,
  trend3,
  trend1,
  trend2,
  trend3,
];
const src =
  "https://graphicriver.img.customer.envatousercontent.com/files/301509692/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=bbb4b154c0ccf9f6610647bd14fd92e1";
const Categories = () => {
  const responsive = {
    xl: {
      breakpoint: { max: 2000, min: 900 },
      items: 10,
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
        Categories
        <span>
          <AiFillAppstore size={25} />
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
        {[...trendingImg, ...trendingImg].map((img, i) => (
          <div className={styles.product} key={i}>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={img} alt="image" draggable="false" />
                <div className={styles.categoryName}>
                  {["Action", "Comedy", "Fantasy", "Romance"][i % 4]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;