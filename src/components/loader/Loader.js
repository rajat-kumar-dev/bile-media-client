import s from "./style.module.css";
const Loader = ({ size = 20 }) => {
  return (
    <>
      <div className={s.loaderBox} style={{ "--size": size + "px" }}>
        <div className={s.loader}></div>
      </div>
    </>
  );
};
export default Loader;
