// import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const ImageSlider = ({ slides, className, style, autoplay, speed = 2000 }) => {
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
    if (!slides) return;
    console.log("current slide clicked", current);
    navigateTo(`/watch/${slides[current].id}`);
  };

  const nextSlide = () => {
    if (!slides) return;
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    if (!slides) return;
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
// ImageSlider.propTypes = {
//   slider: PropTypes.array.isRequired,
// };
export default ImageSlider;
