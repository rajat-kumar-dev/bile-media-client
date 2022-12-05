import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { useContext } from "react";
import GlobalContext from "./context/GlobalContext/GlobalContext";
import AppLoader from "./components/appLoader/AppLoader";
import { Routes, Route, Navigate } from "react-router-dom";
import EditProfile from "./pages/EditUserProfile/EditProfile";

function App() {
  const { state } = useContext(GlobalContext);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/watch" element={<></>} />
        <Route path="/subscriptions" element={<></>} />
        <Route path="/buysubscription" element={<></>} />
        <Route path="/watchlist" element={<></>} />
        <Route path="/settings" element={<></>} />
        <Route path="/downloads" element={<></>} />
        <Route path="/faqs" element={<></>} />
        <Route path="/contact" element={<></>} />
        <Route path="/t&c" element={<></>} />
        <Route path="/privacypolicy" element={<></>} />
        <Route path="*" element={<Navigate to="/" replace="true" />} />
      </Routes>
      {state.appLoading ? <AppLoader /> : null}
    </div>
  );
}

export default App;
