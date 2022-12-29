import s from "./style.module.css";
import tvicon from "../../assets/icons/tvicon.png";
import { AiFillHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { toastAlert } from "../../utils";
const ChannelList = () => {
  const [list, setList] = useState([]);
  const { state } = useContext(GlobalContext);
  useEffect(() => {
    if (state.auth) {
      getChannelList();
    }
  }, [state.auth]);

  async function getChannelList() {
    try {
      const res = await axiosIns({
        url: "/auth_api/channel_list",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setList(res.data.results);
      } else {
        console.log("getChannelList else", res.data);
      }
    } catch (err) {
      console.log("getChannelList Error\n", err.message);
    }
  }

  function onChannelClick(channel) {
    console.log("channel cloick", channel);
  }

  async function toggleFavoriteApi(channel) {
    toggleFavorite(channel);
    try {
      const res = await axiosIns({
        url: "/auth_api/add_remove_favorite",
        method: "POST",
        data: { id: channel.id, type_id: "channel" },
      });
      // if (((Math.random() * 80) | 0) % 3 === 0)
      //   throw new Error("avvveiny error fek diya");
      if (res.data.status) {
      } else {
        console.log("toggleFavorite else", res.data);
        toastAlert("Unable to update favorite channel.");
        revertFavState(channel);
      }
    } catch (err) {
      console.log("toggleFavorite Error\n", err.message);
      revertFavState(channel);
      toastAlert("Unable to update favorite channel.");
    }
  }

  function toggleFavorite(channel) {
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
  }

  function revertFavState(channel) {
    const temp = list.map((ch) => {
      if (ch.id === channel.id) {
        return channel;
      }
      return ch;
    });
    setList(temp);
  }
  if (!list.length) return;
  return (
    <>
      <div className={s.container}>
        <h3>
          Channel List
          <span>
            <img src={tvicon} alt="" />
          </span>
        </h3>
        <div className={s.channels}>
          {list.map((channel, i) => {
            return (
              <ChannelBox
                key={i}
                channel={channel}
                onChannelClick={onChannelClick}
                onFavClick={toggleFavoriteApi}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const ChannelBox = ({ channel, onChannelClick, onFavClick, size = 120 }) => {
  return (
    <>
      <div style={{ "--size": size + "px" }} className={s.channelBox}>
        <img
          src={channel.image}
          alt=""
          onClick={() => onChannelClick(channel)}
          draggable="false"
          title={channel.name}
        />
        <span
          className={`${s.favBox} ${channel.is_favorite ? s.favorite : ""}`}
          onClick={() => onFavClick(channel)}
        >
          <AiFillHeart />
        </span>
      </div>
    </>
  );
};

export default ChannelList;
