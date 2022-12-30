import s from "./style.module.css";
import { IoIosClose } from "react-icons/io";
import { BiCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { useEffect } from "react";
import axiosIns from "../../axios/axios";
import Loader from "../../components/loader/Loader";
const Subscriptions = () => {
  console.log("[subscription]");
  const navigateTo = useNavigate();
  const [subsList, setSubsList] = useState([]);
  const [activePlan, setActivePlan] = useState(null);
  const { state } = useContext(GlobalContext);
  const [plansRes, setPlansRes] = useState({
    loading: false,
    error: "",
  });
  const [currPlanRes, setCurrPlanRes] = useState({
    loading: false,
    error: "",
  });

  useEffect(() => {
    if (state.auth && state.authUser) {
      getSubsList();
      getActivePlan();
    }
  }, [state.authUser]);
  async function getSubsList() {
    try {
      setPlansRes({ loading: true });
      const res = await axiosIns({
        url: "/auth_api/subscription_list",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setSubsList(res.data.results);
        setPlansRes({ loading: false });
      } else {
        console.log("getSubsList else", res.data);
        setPlansRes({ loading: false, error: res.data.message });
      }
    } catch (err) {
      console.log("getSubsList Error\n", err.message);
      setPlansRes({ loading: false, error: err.message });
    }
  }
  async function getActivePlan() {
    try {
      setCurrPlanRes({ loading: true });
      const res = await axiosIns({
        url: "/auth_api/my_subscription",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setActivePlan(res.data.results[0]);
        setCurrPlanRes({ loading: false });
      } else {
        console.log("getSubsList else", res.data);
        setCurrPlanRes({ loading: false, error: res.data.message });
      }
    } catch (err) {
      console.log("getSubsList Error\n", err.message);
      setCurrPlanRes({ loading: false, error: err.message });
    }
  }
  if (!state.auth) return;
  console.log(subsList);
  return (
    <>
      <div className={s.container}>
        <div className={s.currentSub}>
          {currPlanRes.loading ? (
            <>
              <div className={s.currentSubHead}>
                <div>Your Active Plane</div>
              </div>
              <div className={s.planDetails}>
                <Loader size={30} />
              </div>
            </>
          ) : currPlanRes.error ? (
            <>
              <div className={s.currentSubHead}>
                <div>Your Active Plane</div>
              </div>
              <div className={s.planDetails}>
                <div className={s.noplan}>{currPlanRes.error}</div>
              </div>
            </>
          ) : (
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
          )}
        </div>
        {plansRes.loading ? (
          <div
            style={{
              margin: "3rem auto 0",
            }}
          >
            <Loader size={50} />
          </div>
        ) : plansRes.error ? (
          <div
            style={{
              margin: "3rem auto 0",
              color: "red",
              textAlign: "center",
            }}
          >
            {plansRes.error}
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default Subscriptions;
