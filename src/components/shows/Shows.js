import s from "./style.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BsPlayBtnFill } from "react-icons/bs";
import randImg from "../../assets/images/trend1.png";
const responsive = {
  tablet: {
    breakpoint: { min: 0, max: 780 },
    items: 3,
    partialVisibilityGutter: 10,
  },
  large: {
    breakpoint: { min: 781, max: 3000 },
    items: 6,
    partialVisibilityGutter: 20,
  },
};
const Shows = () => {
  return (
    <>
      <div className={s.container}>
        <h3>
          Shows
          <span>
            <BsPlayBtnFill />
          </span>
        </h3>
        <div className={s.showsSliders}>
          <Carousel
            arrows={false}
            responsive={responsive}
            containerClass={s.caroContainer}
            partialVisible={true}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
              <div className={s.caroItem} key={i}>
                <img src={randImg} alt="" draggable="false" />
              </div>
            ))}
          </Carousel>
          <Carousel
            arrows={false}
            responsive={responsive}
            containerClass={s.caroContainer}
            partialVisible={true}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
              <div className={s.caroItem} key={i}>
                <img src={randImg} alt="" draggable="false" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};
export default Shows;
