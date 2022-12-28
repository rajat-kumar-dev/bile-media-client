import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import ImageSlider from "../imageSlider/ImageSlider";

const TVshowsBanner = () => {
  const [list, setList] = useState([]);
  const { state } = useContext(GlobalContext);
  const navigateTo = useNavigate();
  useEffect(() => {
    getTVshowsBanners();
  }, [state.authUser]);
  async function getTVshowsBanners() {
    try {
      const res = await axiosIns({
        url: state.authUser ? "/auth_api/banner_list" : "/web_api/banner_list",
        method: "GET",
      });
      if (res.data.status) {
        setList(
          res.data.results.map((obj) => {
            return {
              ...obj,
              image: obj.thumbnail,
            };
          })
        );
      } else {
        console.log("getTVshowsBanners else", res.data);
      }
    } catch (err) {
      console.log("getTVshowsBanners Error\n", err.message);
    }
  }
  function onCurrentClick(currentSlide) {
    // console.log(currentSlide);
    navigateTo(`/watch/${currentSlide.id}`);
  }
  return (
    <>
      <ImageSlider
        slides={[...list, ...list]}
        autoplay={true}
        speed={10000}
        onCurrentClick={onCurrentClick}
      />
    </>
  );
};

export default TVshowsBanner;
