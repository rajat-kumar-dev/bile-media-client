import { useContext, useEffect, useState } from "react";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import s from "./style.module.css";
const TermsAndConditions = () => {
  const { state } = useContext(GlobalContext);
  const [tAndC, setTandC] = useState("");
  useEffect(() => {
    if (state.auth && state.authUser) getTandC();
  }, [state.authUser]);
  async function getTandC() {
    try {
      const res = await axiosIns({
        url: "/auth_api/setting_list",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setTandC(res.data.results[0].terms_and_conditions);
      } else {
        console.log("getTandC else", res.data);
      }
    } catch (err) {
      console.log("getTandC Error\n", err.message);
    }
  }
  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>Terms & conditions</h2>
        <div
          className={s.policyContainer}
          dangerouslySetInnerHTML={{ __html: tAndC }}
        ></div>
      </div>
    </>
  );
};

export default TermsAndConditions;
