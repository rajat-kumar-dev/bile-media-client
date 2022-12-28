import s from "./style.module.css";
import randImg from "../../assets/images/trend1.png";
import tvicon from "../../assets/icons/tvicon.png";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
const ChannelList = () => {
  const [list, setList] = useState([
    {
      name: "a",
      logo: randImg,
      fav: true,
    },
    {
      name: "b",
      logo: randImg,
      fav: true,
    },
    {
      name: "c",
      logo: randImg,
      fav: false,
    },
    {
      name: "d",
      logo: randImg,
      fav: true,
    },
  ]);
  function onChannelClick(data) {
    console.log("channel cloick", data);
  }
  function onFavClick(data) {
    console.log("fav cloick", data);
  }
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
          {[...list, ...list, ...list].map((channel, i) => {
            return (
              <ChannelBox
                channel={channel}
                onChannelClick={onChannelClick}
                onFavClick={onFavClick}
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
          src={channel.logo}
          alt=""
          onClick={() => onChannelClick(channel.name)}
        />
        <span
          className={`${s.favBox} ${channel.fav ? s.favorite : ""}`}
          onClick={() => onFavClick(channel.fav)}
        >
          <AiFillHeart />
        </span>
      </div>
    </>
  );
};

export default ChannelList;
