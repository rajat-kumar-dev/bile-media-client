import s from "./style.module.css";
import { IoIosClose } from "react-icons/io";
import { BiCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { useEffect } from "react";
import axiosIns from "../../axios/axios";
const Subscriptions = () => {
  const navigateTo = useNavigate();
  const [subsList, setSubsList] = useState([]);
  const [activePlan, setActivePlan] = useState(null);
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    if (state.auth && state.authUser) {
      getSubsList();
      getActivePlan();
    }
  }, [state.authUser]);
  async function getSubsList() {
    try {
      const res = await axiosIns({
        url: "/auth_api/subscription_list",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setSubsList(res.data.results);
      } else {
        console.log("getSubsList else", res.data);
      }
    } catch (err) {
      console.log("getSubsList Error\n", err.message);
    }
  }
  async function getActivePlan() {
    try {
      const res = await axiosIns({
        url: "/auth_api/my_subscription",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setActivePlan(res.data.results[0]);
      } else {
        console.log("getSubsList else", res.data);
      }
    } catch (err) {
      console.log("getSubsList Error\n", err.message);
    }
  }
  if (!state.auth) return;
  console.log(subsList);
  return (
    <>
      <div className={s.container}>
        <div className={s.currentSub}>
          {activePlan ? (
            <>
              <div className={s.currentSubHead}>
                <div>Your Active Plane</div>
                <div className={s.remainingDays}>
                  {activePlan?.day_left} days left
                </div>
              </div>
              <div className={s.planDetails}>
                <div>
                  <div className={s.subType}>
                    {activePlan?.subscription_name}
                  </div>
                  <span className={s.price}>Sh. {activePlan?.price} </span>
                  <span className={s.duration}>
                    {activePlan?.duration} Month
                  </span>
                </div>
                <div>
                  {activePlan?.is_button_show === "1" ? (
                    <button className={s.renewBtn}>Renew</button>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={s.currentSubHead}>
                <div>Your Active Plane</div>
              </div>
              <div className={s.planDetails}>
                <div className={s.noplan}>You don't have any active plan!</div>
              </div>
            </>
          )}
        </div>
        <div className={s.subs}>
          {subsList
            .sort((s1, s2) => s1.price - s2.price)
            .map((sub, i) => (
              <div key={i} className={s.card}>
                <div
                  className={s.cardHead}
                  style={{ backgroundImage: `url(${sub.image})` }}
                >
                  <h4>{sub.name}</h4>
                  <div>
                    <span className={s.planPrice}>Sh. {sub.price}</span>
                    <span className={s.palnDur}>{sub.duration} month</span>
                  </div>
                </div>
                <div className={s.cardBody}>
                  {sub.features_array.map((feature, i) => (
                    <div key={i} className={s.featureBox}>
                      {feature.available === "1" ? (
                        <span className={s.checkIcon}>
                          <BiCheck />
                        </span>
                      ) : (
                        <span className={s.crossIcon}>
                          <IoIosClose />
                        </span>
                      )}
                      {feature.name}
                    </div>
                  ))}
                  <button
                    disabled={activePlan}
                    className={s.buyBtn}
                    onClick={() =>
                      navigateTo("/buysubscription", { state: sub })
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
