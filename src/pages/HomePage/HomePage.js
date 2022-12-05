import ContinueWatching from "../../components/continueWatching/ContinueWatching";
import SortedForYou from "../../components/sortedForYou/sortedForYou";
import TrendingSlider from "../../components/trendingSlider/TrendingSlider";
import WebSeries from "../../components/webSeries/WebSeries";
import Categories from "../../components/categories/Categories";
import styles from "./style.module.css";
import check_icon from "../../assets/images/check_icon.png";
import { useState } from "react";
import Toast from "../../components/toast/Toast";
import ImageSlider from "../../components/imageSlider/ImageSlider";
const sliderData = [
  "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
  "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
  "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
];

const HomePage = () => {
  const [done, setDone] = useState(false);
  return (
    <div className={styles.homePageContainer}>
      {/* <MainCarousel /> */}
      <ImageSlider slides={sliderData} autoplay={true} />
      <button onClick={() => setDone(true)}>Click</button>
      {/* <Toast
        open={done}
        setOpen={setDone}
        msg="Password Updated Successfully"
      /> */}
      <Toast
        open={done}
        setOpen={setDone}
        img={check_icon}
        style={{ backgroundColor: "white" }}
      >
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <div style={{ color: "#42B874", fontWeight: "bold" }}>
            Payment Successful
          </div>
          <div
            style={{
              maxWidth: "200px",
              color: "black",
              fontSize: "small",
              marginTop: "5px",
            }}
          >
            Thank You for choosing subscription plan. You can avail more
            features.
          </div>
        </div>
      </Toast>
      <TrendingSlider />
      <ContinueWatching />
      <WebSeries />
      <SortedForYou />
      <Categories />
    </div>
  );
};

export default HomePage;
