import { AiFillAppstore } from "react-icons/ai";
import styles from "./style.module.css";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import axiosIns from "../../axios/axios";
const src =
  "https://graphicriver.img.customer.envatousercontent.com/files/301509692/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=bbb4b154c0ccf9f6610647bd14fd92e1";
const Categories = () => {
  const { state } = useContext(GlobalContext);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, [state.authUser]);
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
  async function getCategoryList() {
    try {
      const res = await axiosIns({
        url: state.authUser
          ? "/auth_api/category_list"
          : "/web_api/category_list",
        method: "GET",
      });
      if (res.data.status) {
        setCategoryList(res.data.results);
      } else {
        console.log("getCategoryList else", res.data);
      }
    } catch (err) {
      console.log("getCategoryList Error\n", err.message);
    }
  }
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
        {categoryList.map((cat, i) => (
          <div className={styles.product} key={i}>
            <div className={styles.item}>
              <div className={styles.image}>
                <img src={cat.image} alt="image" draggable="false" />
                <div className={styles.categoryName}>{cat.name}</div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;
