import s from "./style.module.css";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import TVshowsBanner from "../../components/tvshowsBanner/TVshowsBanner";
import Shows from "../../components/shows/Shows";
import ChannelList from "../../components/channelList/ChannelList";
import { useEffect } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { useNavigate } from "react-router-dom";

const TVshows = () => {
  console.log("[tvshows]");
  const { state } = useContext(GlobalContext);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!state.auth) {
      navigateTo("/");
    }
  }, [state.auth]);
  return (
    <>
      <div className={s.container}>
        <TVshowsBanner />
        <Shows />
        <ChannelList />
      </div>
    </>
  );
};

export default TVshows;
