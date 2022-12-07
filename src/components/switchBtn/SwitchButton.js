import s from "./style.module.css";
const SwitchButton = ({ size, enabled, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`${s.switch} ${enabled ? s.enabled : ""}`}
        style={{ "--btnsize": `${size}px` }}
      >
        <div className={s.switcher}></div>
      </div>
    </>
  );
};
export default SwitchButton;
// 100 => 100/4
