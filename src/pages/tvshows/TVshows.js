import s from "./style.module.css";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import TVshowsBanner from "../../components/tvshowsBanner/TVshowsBanner";
import Shows from "../../components/shows/Shows";
import ChannelList from "../../components/channelList/ChannelList";

const TVshows = () => {
  console.log("[tvshows]");
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
