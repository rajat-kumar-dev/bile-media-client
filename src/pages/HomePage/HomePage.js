import ContinueWatching from "../../components/continueWatching/ContinueWatching";
import SortedForYou from "../../components/sortedForYou/sortedForYou";
import TrendingSlider from "../../components/trendingSlider/TrendingSlider";
import WebSeries from "../../components/webSeries/WebSeries";
import Categories from "../../components/categories/Categories";
import styles from "./style.module.css";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import { useEffect } from "react";
import axiosIns from "../../axios/axios";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { useNavigate } from "react-router-dom";
import actions from "../../context/GlobalContext/globalActions";

// const sliderData = [caro1, caro1, caro1, caro1, caro1];
const HomePage = () => {
  const navigateTo = useNavigate();
  const [videoList, setVideoList] = useState([]);
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    if (state.auth && state.authUser) {
      dispatch({ type: actions.LOADING });
      getVideoList();
    }
  }, [state.authUser]);
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
        setVideoList(res.data.results);
        dispatch({ type: actions.LOADED });
      } else {
        console.log("getVideoList else", res.data);
      }
    } catch (err) {
      console.log("getVideoList Error\n", err.message);
    }
  }
  if (!state.auth) return;
  return (
    <>
      <div className={styles.homePageContainer}>
        <ImageSlider slides={videoList} autoplay={false} speed={10000} />
        <TrendingSlider />
        <ContinueWatching />
        <WebSeries />
        <SortedForYou />
        <Categories />
      </div>
    </>
  );
};

export default HomePage;

// "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
// "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
// "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
// "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
// "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
