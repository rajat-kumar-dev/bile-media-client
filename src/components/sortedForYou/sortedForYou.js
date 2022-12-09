import styles from "./style.module.css";
import { BsCollectionPlay } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import axiosIns from "../../axios/axios";
import { useNavigate } from "react-router-dom";

const SortedForYou = () => {
  const navigateTo = useNavigate();
  const { state } = useContext(GlobalContext);
  const [videoList, setVideoList] = useState([]);
  const [expand, setExpand] = useState(false);
  const [showList, setShowList] = useState([]);
  useEffect(() => {
    getVideoList();
  }, [state.authUser]);

  async function getVideoList() {
    try {
      const res = await axiosIns({
        url: "/video_list_shorted",
        method: "POST",
      });
      console.log("sortedforyou=:", res.data);
      if (res.data.status) {
        setVideoList(res.data.results);
        setShowList([...res.data.results.slice(0, 7)]);
      } else {
        console.log("getVideoList else", res.data);
      }
    } catch (err) {
      console.log("getVideoList Error\n", err.message);
    }
  }
  const expandHandler = () => {
    if (!expand) {
      setExpand(true);
      setShowList([...videoList]);
      return;
    }
    setExpand(false);
    setShowList([...videoList.slice(0, 7)]);
  };
  return (
    <div className={styles.container}>
      <h3>
        Sorted For You
        <span>
          <BsCollectionPlay size={25} />
        </span>
      </h3>
      <div className={styles.itemsBox}>
        {showList.map((video, i) => {
          return (
            <div
              className={styles.item}
              key={i}
              onClick={() => navigateTo(`/watch/${video.id}`)}
            >
              <img src={video.image} alt="" />
            </div>
          );
        })}
      </div>
      {/* */}
      <div className={styles.expand} onClick={expandHandler}>
        {expand ? (
          <>
            Collapse Content <FiChevronUp size={25} />
          </>
        ) : (
          <>
            Extend Content <FiChevronDown size={25} />
          </>
        )}
      </div>
    </div>
  );
};
export default SortedForYou;
