import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import s from "./style.module.css";
import similar_icon from "../../assets/icons/similar_icon.png";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import src from "../../assets/images/trend1.png";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { TiDownload } from "react-icons/ti";
import Loader from "../../components/loader/Loader";
const Watch = () => {
  const navigateTo = useNavigate();
  const [watchlistRes, setWatchlistRes] = useState({
    loading: false,
    error: "",
  });
  // const [apiRes, setApiRes] = useState({
  //   loading: false,
  //   data: null,
  //   error: "",
  // });
  const { state } = useContext(GlobalContext);
  const [watchlisted, setWatchlisted] = useState("0");
  const { id } = useParams();
  const [video, setVideo] = useState("");
  const [similar, setSimilar] = useState([]);
  const category = () => {
    const cat = video.category?.map((cat) => {
      return cat.name;
    });
    return cat?.join(", ");
  };
  useEffect(() => {
    if (id) {
      getVideo();
      getSimilar();
    }
  }, [id]);
  async function getVideo() {
    try {
      const res = await axiosIns({
        url: "/video_list",
        method: "POST",
        data: {
          id,
        },
      });
      if (res.data.status) {
        console.log("getVideo", res.data);
        setVideo(res.data.results[0]);
        setWatchlisted(res.data.results[0].is_favorite);
      } else {
        console.log("getVideo else", res.data);
      }
    } catch (err) {
      console.log("getVideo Error\n", err.message);
    }
  }
  async function getSimilar() {
    try {
      const res = await axiosIns({
        url: "/similar_video_list",
        method: "POST",
        data: {
          id,
        },
      });
      if (res.data.status) {
        console.log("getSimilar", res.data);
        setSimilar(res.data.results);
      } else {
        console.log("getSimilar else", res.data);
      }
    } catch (err) {
      console.log("getSimilar Error\n", err.message);
    }
  }
  async function toggleWatchlist() {
    setWatchlistRes({
      ...watchlistRes,
      loading: true,
    });
    try {
      const res = await axiosIns({
        url: "/add_remove_watchlist",
        method: "POST",
        data: {
          video_id: id,
        },
      });
      if (res.data.status) {
        setWatchlisted("1");
      } else {
        setWatchlisted("0");
      }
      setWatchlistRes({
        loading: false,
        error: "",
      });
    } catch (err) {
      setWatchlistRes({
        loading: false,
        error: "",
      });
      console.log("toggleWatchlist Error\n", err.message);
    }
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.playerBox}>
          <div className={s.videoContainer}>
            <video src={video.video} controls autoPlay muted></video>
          </div>
          <div className={s.videoDetails}>
            <details>
              <summary className={s.detailsHead}>
                <div className={s.title}>
                  <h2>{video.name}</h2>
                  <span>{category()}</span>
                </div>
                <div className={s.moreBtn}>
                  <span>Know More</span>
                  <span className={s.open}>
                    <HiOutlineChevronDown size={18} />
                  </span>
                  <span className={s.close}>
                    <HiOutlineChevronUp size={18} />
                  </span>
                </div>
              </summary>
              <div className={s.description}>{video.description}</div>
            </details>

            <div className={s.btnBox}>
              <button className={s.mainBtn} onClick={toggleWatchlist}>
                {watchlistRes.loading ? (
                  <Loader />
                ) : watchlisted === "1" ? (
                  <>
                    <BsBookmarkFill size={18} /> Watchlist
                  </>
                ) : (
                  <>
                    <BsBookmark size={18} /> Watchlist
                  </>
                )}
              </button>
              <button className={s.mainBtn}>
                <TiDownload size={20} />
                Download
              </button>
            </div>
          </div>
        </div>
        <div className={s.similarList}>
          <h3>
            Similar Movies
            <img
              src={similar_icon}
              alt=""
              className={s.similarIcon}
              draggable="false"
            />
          </h3>
          <div className={s.listContainer}>
            {similar.length === 0 && <span>No Similar Movies Yet.</span>}
            {similar.map((vid, i) => (
              <div
                className={s.item}
                key={i}
                onClick={() => navigateTo(`/watch/${vid.id}`)}
              >
                <img src={vid.image} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
