import { useContext, useState } from "react";
import { useEffect } from "react";
import axiosIns from "../../axios/axios";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import s from "./style.module.css";
const PrivacyPolicy = () => {
  const { state } = useContext(GlobalContext);
  const [policy, setPolicy] = useState("");
  useEffect(() => {
    if (state.auth && state.authUser) getPrivacyPolicy();
  }, [state.authUser]);
  async function getPrivacyPolicy() {
    try {
      const res = await axiosIns({
        url: "/setting_list",
        method: "GET",
      });
      console.log(res.data);
      if (res.data.status) {
        setPolicy(res.data.results[0].privacy_policy);
      } else {
        console.log("getPrivacyPolicy else", res.data);
      }
    } catch (err) {
      console.log("getPrivacyPolicy Error\n", err.message);
    }
  }
  return (
    <>
      <div className={s.container}>
        <h2 className={s.heading}>Privacy Policy</h2>
        <div
          className={s.policyContainer}
          dangerouslySetInnerHTML={{ __html: policy }}
        >
          {/* {policy} */}
          {/* {[1, 2, 3, 4, 5].map((_, i) => (
            <div className={s.policy} key={i}>
              <h2>Section 1.10.32 of "de Finibus.</h2>
              <div>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
