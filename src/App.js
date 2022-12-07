import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { useContext } from "react";
import GlobalContext from "./context/GlobalContext/GlobalContext";
import AppLoader from "./components/appLoader/AppLoader";
import { Routes, Route, Navigate } from "react-router-dom";
import EditProfile from "./pages/EditUserProfile/EditProfile";
import Watchlist from "./pages/watchlist/Watchlist";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/termsAndConditions/TermAndConditions";
import ContactUs from "./pages/contactUs/ContactUs";
import Faqs from "./pages/faqs/Faqs";
import Downloads from "./pages/downloads/Downloads";
import Settings from "./pages/settings/Settings";
import ManageAccount from "./pages/manageAccount/ManageAccount";

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
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/t&c" element={<TermsAndConditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/manageacc" element={<ManageAccount />} />

        <Route path="*" element={<Navigate to="/" replace="true" />} />
      </Routes>
      {state.appLoading ? <AppLoader /> : null}
    </div>
  );
}

export default App;
