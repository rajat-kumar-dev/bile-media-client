import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./mainCarousel.css";
import caro1 from "../../assets/images/caro1.png";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const images = [
  "https://store-images.s-microsoft.com/image/apps.60096.67031780619167476.74548016-d6ad-41a7-b6d3-7f7513901b55.550bed84-ed58-4011-84cd-867dd0d7206e?q=90&w=480&h=270",
  caro1,
  "https://store-images.s-microsoft.com/image/apps.60096.67031780619167476.74548016-d6ad-41a7-b6d3-7f7513901b55.550bed84-ed58-4011-84cd-867dd0d7206e?q=90&w=480&h=270",
  caro1,
  "https://store-images.s-microsoft.com/image/apps.60096.67031780619167476.74548016-d6ad-41a7-b6d3-7f7513901b55.550bed84-ed58-4011-84cd-867dd0d7206e?q=90&w=480&h=270",
  caro1,
];

const MainCarousel = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    beforeChange: (current, next) => setImageIndex(next),
  };

  return (
    <div className="caro-wrapper">
      <div className="high_app">
        <div className="demo-app">
          <Slider {...settings}>
            {images.map((img, idx) => (
              <div
                key={idx}
                className={idx === imageIndex ? "slide activeSlide" : "slide"}
              >
                <img src={img} alt={img} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default MainCarousel;
// ================
