import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import actions from "../../context/GlobalContext/globalActions";
import axiosIns from "../../axios/axios";

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    if (!state.auth || !state.authUser) {
      dispatch({ type: actions.LOADING });
      getAuthUser();
    }
  }, [state.auth, state.authUser]);
  async function getAuthUser() {
    try {
      const res = await axiosIns({
        method: "GET",
        url: "/get_profile_data",
      });

      if (res.data.status) {
        console.log("getAuthUser\n", res.data);
        const user = {
          id: res.data.results.id,
          username: res.data.results.user_name,
          email: res.data.results.email,
          phone: res.data.results.number,
          countryCode: res.data.results.country_code,
          avatar: res.data.results.profile_img,
        };
        dispatch({ type: actions.LOGIN, payload: user });
        dispatch({ type: actions.LOADED });
      } else {
        console.log("getAuthUser error\n ", res.data);
        dispatch({ type: actions.LOADED });
      }
    } catch (err) {
      console.log("getAuthUser err\n", err.message);
      dispatch({ type: actions.LOADED });
    }
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
