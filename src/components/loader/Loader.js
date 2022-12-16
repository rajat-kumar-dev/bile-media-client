import s from "./style.module.css";
const Loader = ({ size = 24 }) => {
  return (
    <>
      <div className={s.loader} style={{ "--size": size + "px" }}>
        <div className={s.spinner}></div>
      </div>
    </>
  );
};
export default Loader;
