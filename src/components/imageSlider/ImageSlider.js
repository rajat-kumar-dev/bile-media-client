// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIns from "../../axios/axios";
import styles from "./styles.module.css";
const ImageSlider = ({ className, style, autoplay, speed = 2000 }) => {
  const [slides, setSlides] = useState([]);

  const navigateTo = useNavigate();
  const [current, setCurrent] = useState(2);
  const before =
    current - 2 >= 0 ? current - 2 : slides?.length + (current - 2);
  const prev = current - 1 >= 0 ? current - 1 : slides?.length - 1;
  const next = current + 1 > slides?.length - 1 ? 0 : current + 1;
  const after =
    current + 2 > slides?.length - 1
      ? Math.floor((current + 2) % slides.length)
      : current + 2;

  const currentSlideClick = () => {
    navigateTo(`/watch/${slides[current].id}`);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    let ID = null;
    if (autoplay) {
      ID = setInterval(() => {
        nextSlide();
      }, speed);
    }
    return () => {
      clearInterval(ID);
    };
  }, [nextSlide]);
  useEffect(() => {
    getVideoList();
  }, []);
  async function getVideoList() {
    try {
      const res = await axiosIns({
        url: "/video_list",
        method: "POST",
        data: {
          is_promposal: "Yes",
        },
      });
      if (res.data.status) {
        setSlides(res.data.results);
      } else {
        console.log("getVideoList else", res.data);
      }
    } catch (err) {
      console.log("getVideoList Error\n", err.message);
    }
  }
  return (
    <>
      <div className={className} style={style}>
        <section className={styles.slider}>
          {slides &&
            slides.map((slide, i) => {
              return (
                <div
                  onClick={
                    i === current
                      ? currentSlideClick
                      : i === prev
                      ? prevSlide
                      : i === next
                      ? nextSlide
                      : null
                  }
                  key={i}
                  className={`${styles.slide} ${
                    i === current
                      ? styles.center
                      : i === prev
                      ? styles.prev
                      : i === next
                      ? styles.next
                      : i === before
                      ? styles.before
                      : i === after
                      ? styles.after
                      : ""
                  }`}
                >
                  <img src={slide.image} alt="travel" draggable="false" />
                </div>
              );
            })}
        </section>
      </div>
    </>
  );
};
export default ImageSlider;
