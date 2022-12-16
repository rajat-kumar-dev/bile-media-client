import ContinueWatching from "../../components/continueWatching/ContinueWatching";
import SortedForYou from "../../components/sortedForYou/sortedForYou";
import TrendingSlider from "../../components/trendingSlider/TrendingSlider";
import WebSeries from "../../components/webSeries/WebSeries";
import Categories from "../../components/categories/Categories";
import s from "./style.module.css";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import Loader from "../../components/loader/Loader";
const LandingPage = () => {
  return (
    <>
      <div className={s.container}>
        <h3>Landing Page</h3>
        {/* <Loader /> */}
        {/* <ImageSlider autoplay={true} speed={5000} /> */}
        {/* <TrendingSlider /> */}
        {/* <ContinueWatching /> */}
        {/* <WebSeries /> */}
        {/* <SortedForYou /> */}
        {/* <Categories /> */}
      </div>
    </>
  );
};

export default LandingPage;
