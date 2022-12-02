import ContinueWatching from "../../components/continueWatching/ContinueWatching";
import MainCarousel from "../../components/mainCarousel/MainCarousel";
import SortedForYou from "../../components/sortedForYou/sortedForYou";
import TrendingSlider from "../../components/trendingSlider/TrendingSlider";
import WebSeries from "../../components/webSeries/WebSeries";
import Categories from "../../components/categories/Categories";
import styles from "./style.module.css";
import Navbar from "../../components/navbar/Navbar";
const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <MainCarousel />
      <TrendingSlider />
      <ContinueWatching />
      <WebSeries />
      <SortedForYou />
      <Categories />
    </div>
  );
};

export default HomePage;
