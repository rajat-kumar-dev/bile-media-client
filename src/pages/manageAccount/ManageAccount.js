import s from "./style.module.css";
const ManageAccount = () => {
  console.log("[manage_acc]");

  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>Manage Account</h2>
        <div className={s.content}></div>
      </div>
    </>
  );
};
export default ManageAccount;
