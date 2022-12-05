import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
const ImageSlider = ({ slides, className, style, autoplay, speed = 2000 }) => {
  const [current, setCurrent] = useState(2);
  const before = current - 2 >= 0 ? current - 2 : slides.length + (current - 2);
  const prev = current - 1 >= 0 ? current - 1 : slides.length - 1;
  const next = current + 1 > slides.length - 1 ? 0 : current + 1;
  const after =
    current + 2 > slides.length - 1
      ? Math.floor((current + 2) % slides.length)
      : current + 2;

  const currentSlideClick = () => {};

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
      // console.log("cleared");
      clearInterval(ID);
    };
  }, [nextSlide]);

  return (
    <>
      <div className={className} style={style}>
        <section className={styles.slider}>
          {slides.map((img, i) => {
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
                <img src={img} alt="travel" draggable="false" />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default ImageSlider;
