import s from "./style.module.css";
const Subscriptions = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.currentSub}>
          <div className={s.currentSubHead}>
            <div>Your Active Plane</div>
            <div>5 days left</div>
          </div>
          <div className={s.planDetails}>
            <div>
              <div className={s.subType}>Premium</div>
              <span className={s.price}>Sh. 350 </span>
              <span className={s.duration}>12 Month</span>
            </div>
            <div>
              <button className={s.renewBtn}>Renew</button>
            </div>
          </div>
        </div>
        <div className={s.subs}>
          {[1, 2, 3, 4].map(() => (
            <div className={s.card}>
              <div className={s.cardHead}>
                <h4>Basic</h4>
                <div>
                  <span className={s.planPrice}>Sh. 149</span>
                  <span className={s.palnDur}>3 month</span>
                </div>
              </div>
              <div className={s.cardBody}>
                <div>
                  <span>&times;</span> feature name
                </div>
                <div>
                  <span>&times;</span> feature name
                </div>
                <div>
                  <span>&times;</span> feature name
                </div>
                <button className={s.buyBtn}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
