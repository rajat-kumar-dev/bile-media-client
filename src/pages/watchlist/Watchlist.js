import s from "./style.module.css";
import img1 from "../../assets/images/trend1.png";
const watchlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const Watchlist = () => {
  return (
    <>
      <div className={s.watchlistPage}>
        <h3 className={s.heading}>Watchlist</h3>
        <div className={s.listContainer}>
          {watchlist.map((item, i) => (
            <div className={s.listItem} key={i}>
              <img src={img1} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Watchlist;
