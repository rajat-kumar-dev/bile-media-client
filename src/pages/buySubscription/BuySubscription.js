import s from "./style.module.css";
import { IoIosClose } from "react-icons/io";
import { BiCheck } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { useEffect } from "react";
import axiosIns from "../../axios/axios";
import { BsArrowRight, BsPaypal } from "react-icons/bs";
const BuySubscription = () => {
  const navigateTo = useNavigate();
  const subscription = useLocation().state;
  const [cardHolder, setCardHolder] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardValidity, setCardValidity] = useState("");
  const [cvv, setCvv] = useState("");
  const [apiRes, setApiRes] = useState({
    loading: false,
    error: "",
  });
  const { state, dispatch } = useContext(GlobalContext);
  // console.log(subscription);
  function buySubHandler() {
    if (!cardHolder.trim()) {
      console.log(" holder required!");
      return;
    }
    if (!cardNum) {
      console.log(" number required!");
      return;
    }
    if (!cardValidity) {
      console.log(" validity required!");
      return;
    }
    if (!cvv) {
      console.log(" cvv required!");
      return;
    }
    buySubscription();
  }
  async function buySubscription() {
    setApiRes({ error: "", loading: true });
    try {
      const res = await axiosIns({
        url: "/add_usersubscription",
        method: "POST",
        data: {
          subscription_id: subscription.id,
          renew: "",
        },
      });
      console.log(res.data);
      if (res.data.status) {
        navigateTo("/subscriptions", { replace: true });
        setApiRes({ error: "", loading: false });
      } else {
        console.log("buySubscription else", res.data);
        setApiRes({ error: res.data.message, loading: false });
      }
    } catch (err) {
      console.log("buySubscription Error\n", err.message);
      setApiRes({ error: err.message, loading: false });
    }
  }
  if (!state.auth) return;
  return (
    <>
      <div className={s.container}>
        <h4 className={s.pageHeading}>Payment Method</h4>
        <h6 className={s.sectHeading}>Buying Subscription For</h6>
        <div className={s.layout}>
          <div className={s.subDetails}>
            <div
              className={s.subsCard}
              style={{ backgroundImage: `url(${subscription.image})` }}
            >
              <div className={s.subname}>{subscription.name}</div>
              <div className={s.priceBox}>
                <span className={s.subprice}>Sh. {subscription.price}</span>
                <span className={s.subduration}>
                  {subscription.duration} month
                </span>
              </div>
            </div>
            <h6 className={s.sectHeading}>Select a payment mode</h6>
            <div className={s.paymodes}>
              <div className={s.paymode}>
                <span className={s.modeImg}>
                  <BsPaypal />
                </span>
                <span className={s.modeName}>PayPal</span>
                <span className={s.arrRight}>
                  <BsArrowRight />
                </span>
              </div>
            </div>
          </div>
          <div className={s.cardDetails}>
            <h3>Enter Debit/Credit card Details</h3>
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardNum}
              onChange={(e) => {
                if (e.target.value.length > 16) return;
                if (isNaN(e.target.value)) return;
                setCardNum(e.target.value);
              }}
            />
            <input
              type="text"
              value={cardValidity}
              onChange={(e) => setCardValidity(e.target.value)}
              placeholder="Valid Thru"
              className={s.validInput}
            />
            <input
              type="text"
              placeholder="CVV"
              className={s.cvvInput}
              value={cvv}
              onChange={(e) => {
                if (e.target.value.length > 3) return;
                if (isNaN(e.target.value)) return;
                setCvv(e.target.value.trim());
              }}
            />
            <button className={s.buySubBtn} onClick={buySubHandler}>
              {apiRes.loading ? (
                "Buying..."
              ) : (
                <>Pay - Sh. {subscription.price}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySubscription;
