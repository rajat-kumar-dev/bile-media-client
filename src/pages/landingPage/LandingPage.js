import ContinueWatching from "../../components/continueWatching/ContinueWatching";
import SortedForYou from "../../components/sortedForYou/sortedForYou";
import TrendingSlider from "../../components/trendingSlider/TrendingSlider";
import WebSeries from "../../components/webSeries/WebSeries";
import Categories from "../../components/categories/Categories";
import s from "./style.module.css";
import MoviesBanner from "../../components/moviesBanner/MoviesBanner";
const LandingPage = () => {
  console.log("[landing_page]");

  return (
    <>
      <div className={s.container}>
        <MoviesBanner />
        {/* <TrendingSlider /> */}
        {/* <ContinueWatching /> */}

        {/* <WebSeries /> */}

        {/* <SortedForYou /> */}
        <Categories />
      </div>
    </>
  );
};

export default LandingPage;
