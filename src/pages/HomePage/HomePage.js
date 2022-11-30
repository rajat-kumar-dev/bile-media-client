import ContinueWatching from "../../components/continueWatching/ContinueWatching";
import MainCarousel from "../../components/mainCarousel/MainCarousel";
import SortedForYou from "../../components/sortedForYou/sortedForYou";
import TrendingSlider from "../../components/trendingSlider/TrendingSlider";
import WebSeries from "../../components/webSeries/WebSeries";
import Categories from "../../components/categories/Categories";
import styles from "./style.module.css";
import { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { default as actions } from "../../context/GlobalContext/globalActions";
import axios from "axios";
const HomePage = () => {
  // const { state, dispatch } = useContext(GlobalContext);
  // const [getUsersRes, setGetUsersRes] = useState({
  //   loading: false,
  //   users: [],
  //   error: "",
  // });
  // async function getUsers() {
  //   setGetUsersRes({ ...getUsersRes, loading: true });
  //   try {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  //     setGetUsersRes({ ...getUsersRes, users: res.data, loading: false });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error.message);
  //     setGetUsersRes({
  //       ...getUsersRes,
  //       loading: false,
  //       error: error.message,
  //     });
  //   }
  // }
  return (
    <div className={styles.homePageContainer}>
      {/* <div>{JSON.stringify(state)}</div> */}
      {/* <button
          onClick={() =>
            dispatch({
              type: actions.CHANGE_TEST_VALUE,
              payload: (Math.random() * 999) | 0,
            })
          }
        >
          Change test Value
        </button>
        <button onClick={getUsers}>
          {getUsersRes.loading ? "Loading..." : "Get User Data"}
        </button>
        {getUsersRes.error ?? ""}
        {getUsersRes.users.length} */}
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
