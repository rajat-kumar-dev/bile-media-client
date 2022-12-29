import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import tvicon from "../../assets/icons/tvicon.png";
import randImg from "../../assets/images/trend1.png";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import s from "./style.module.css";
const FavoriteChannels = () => {
  const [list, setList] = useState([
    { id: 1, is_favorite: true },
    { id: 2, is_favorite: true },
    { id: 3, is_favorite: true },
    { id: 4, is_favorite: true },
  ]);
  const navigateTo = useNavigate();
  const { state } = useContext(GlobalContext);
  // useEffect(() => {
  //   if (!state.auth) {
  //     return navigateTo("/");
  //   }
  //   getFevoriteChList();
  // }, [state.auth]);
  async function getFevoriteChList() {
    try {
      const res = await axiosIns({
        url: "/auth_api/favorite_channel_list",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setList(res.data.results);
      } else {
        console.log("getFevoriteChList else", res.data);
      }
    } catch (err) {
      console.log("getFevoriteChList Error\n", err.message);
    }
  }

  function unfavorite(channel) {
    console.log(channel);
    const temp = list.map((ch) => {
      if (ch.id === channel.id) {
        return {
          ...ch,
          is_favorite: !ch.is_favorite,
        };
      }
      return ch;
    });
    setList(temp);
    setTimeout(() => {
      setList((prev) => prev.filter((ch) => ch.id !== channel.id));
    }, 300);
  }

  return (
    <>
      <div className={s.container}>
        <h3>
          Favorite Channels
          <span>
            <img src={tvicon} alt="" />
          </span>
        </h3>
        {!list.length && (
          <div
            style={{
              textAlign: "center",
              marginTop: "3rem",
            }}
          >
            No Favorite Channels
          </div>
        )}
        <div className={s.channelsContainer}>
          {list.map((channel, i) => {
            return (
              <ChannelBar channel={channel} unfavorite={unfavorite} key={i} />
            );
          })}
        </div>
      </div>
    </>
  );
};
const ChannelBar = ({ channel, unfavorite }) => {
  return (
    <>
      <div className={s.channelBar}>
        <img src={randImg} alt="" />
        <h4>Channel Name</h4>
        <span
          className={`${s.favBox} ${channel.is_favorite ? s.favorite : ""}`}
          onClick={() => unfavorite(channel)}
        >
          <AiFillHeart />
        </span>
      </div>
    </>
  );
};
export default FavoriteChannels;

//
// onClick={() => onFavClick(channel)}
