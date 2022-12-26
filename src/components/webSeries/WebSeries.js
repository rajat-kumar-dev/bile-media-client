import styles from "./style.module.css";
import React, { useContext, useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import continue1 from "../../assets/images/trend1.png";
import continue2 from "../../assets/images/trend2.png";
import continue3 from "../../assets/images/trend3.png";
import { BsPlayBtn } from "react-icons/bs";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
const images = [
  continue1,
  continue2,
  continue3,
  continue1,
  continue2,
  continue3,
];
const ContinueWatching = () => {
  const { state } = useContext(GlobalContext);
  const [webSeriesList, setWebseriesList] = useState([]);

  useEffect(() => {
    getWebseriesList();
  }, [state.authUser]);
  const responsive = {
    xl: {
      breakpoint: { max: 2000, min: 900 },
      items: 5,
    },
    sm: {
      breakpoint: { max: 600, min: 400 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
    },
  };
  async function getWebseriesList() {
    try {
      const res = await axiosIns({
        url: state.authUser
          ? "/webseries_api/webseries_list"
          : "/web_api/webseries_list",
        method: "POST",
      });
      if (res.data.status) {
        setWebseriesList(res.data.results);
      } else {
        console.log("getWebseriesList else", res.data);
      }
    } catch (err) {
      console.log("getWebseriesList Error\n", err.message);
    }
  }
  if (!webSeriesList.length) return;
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
        // showDots={true}
        // arrows={true}
      >
        {webSeriesList.map((item, i) => (
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
