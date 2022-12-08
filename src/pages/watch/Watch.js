import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import s from "./style.module.css";
import similar_icon from "../../assets/icons/similar_icon.png";
const Watch = () => {
  const { state } = useContext(GlobalContext);
  const { id } = useParams();
  const [video, setVideo] = useState(
    "http://13.246.105.57:5000/uploads/video_1668419862865.mp4"
  );
  useEffect(() => {
    if (state.auth && state.authUser) getVideo();
  }, [state.authUser]);
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
      } else {
        console.log("getVideo else", res.data);
      }
    } catch (err) {
      console.log("getVideo Error\n", err.message);
    }
  }
  return (
    <>
      <div className={s.container}>
        <div className={s.playerBox}>
          <div className={s.videoContainer}>
            <video src={video.video} controls>
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={s.videoDetails}>
            <p>fdfdf</p>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
              <div className={s.item}>g</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
