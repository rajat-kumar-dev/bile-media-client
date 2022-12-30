import s from "./style.module.css";
import img1 from "../../assets/images/trend1.png";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import axiosIns from "../../axios/axios";
import Loader from "../../components/loader/Loader";
const watchlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const Watchlist = () => {
  console.log("[watchlist]");

  const navigateTo = useNavigate();
  const [videoList, setVideoList] = useState([]);
  const { state } = useContext(GlobalContext);
  const [apiRes, setApiRes] = useState({
    loading: false,
    error: "",
  });
  useEffect(() => {
    if (state.auth && state.authUser) {
      getWatchlist();
    }
  }, [state.auth]);
  async function getWatchlist() {
    setApiRes({
      loading: true,
      error: "",
    });
    try {
      const res = await axiosIns({
        url: "/auth_api/video_watchlist",
        method: "GET",
      });
      if (res.data.status) {
        console.log("getWatchlist", res.data);
        setVideoList(res.data.results);
      } else {
        console.log("getWatchlist else", res.data);
      }
      setApiRes({
        loading: false,
        error: "",
      });
    } catch (err) {
      console.log("getWatchlist Error\n", err.message);
      setApiRes({
        loading: false,
        error: "",
      });
    }
  }
  return (
    <>
      <div className={s.watchlistPage}>
        <h3 className={s.heading}>Watchlist</h3>
        <div className={s.listContainer}>
          {apiRes.loading ? (
            <div
              style={{
                margin: "3rem auto 0",
              }}
            >
              <Loader size={50} />
            </div>
          ) : (
            <>
              {videoList.map((vid, i) => (
                <div
                  className={s.listItem}
                  key={i}
                  onClick={() => navigateTo(`/watch/${vid.id}`)}
                >
                  <img src={vid.image} alt="" />
                </div>
              ))}
              {!videoList.length ? (
                <div
                  style={{
                    margin: "2rem auto 0",
                    color: "#ffffff99",
                  }}
                >
                  Watchlist is empty
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default React.memo(Watchlist);
