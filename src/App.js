import './App.css';
import LandingPage from './pages/landingPage/LandingPage';
import { useContext } from 'react';
import GlobalContext from './context/GlobalContext/GlobalContext';
import AppLoader from './components/appLoader/AppLoader';
import { Routes, Route, Navigate } from 'react-router-dom';
import EditProfile from './pages/EditUserProfile/EditProfile';
import Watchlist from './pages/watchlist/Watchlist';
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy';
import TermsAndConditions from './pages/termsAndConditions/TermAndConditions';
import ContactUs from './pages/contactUs/ContactUs';
import Faqs from './pages/faqs/Faqs';
import Downloads from './pages/downloads/Downloads';
import Settings from './pages/settings/Settings';
import ManageAccount from './pages/manageAccount/ManageAccount';
import RateUs from './pages/rateus/RateUs';
import Subscriptions from './pages/subscriptions/Subscriptions';
import TVshows from './pages/tvshows/TVshows';
import Watch from './pages/watch/Watch';
import BuySubscription from './pages/buySubscription/BuySubscription';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Newpass from './pages/newpass/Newpass';
import Home from './pages/home/Home';
import ChangePassPopup from './components/changePassPopup/ChangePassPopup';
import actions from './context/GlobalContext/globalActions';
import FavoriteChannels from './pages/favoriteChannels/FavoriteChannels';
import LoginComp from './components/loginComp/LoginComp';
import SignupComp from './components/signupComp/SignupComp';
function App() {
  console.log('[app]');
  const toastConfig = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'colored',
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/tvshows" element={<TVshows />} /> */}
          {/* <Route path="/favoriteChannels" element={<FavoriteChannels />} /> */}
          {/* <Route path="/subscriptions" element={<Subscriptions />} /> */}
          {/* <Route path="/buysubscription" element={<BuySubscription />} /> */}

          {/* <Route path="/editProfile" element={<EditProfile />} /> */}
          {/* <Route path="/watch/:id" element={<Watch />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* <Route path="/downloads" element={<Downloads />} /> */}
          {/* <Route path="/watchlist" element={<Watchlist />} /> */}
          {/* <Route path="/manageacc" element={<ManageAccount />} /> */}
          {/* <Route path="/faqs" element={<Faqs />} /> */}
          {/* <Route path="/rateus" element={<RateUs />} /> */}
          {/* <Route path="/contact" element={<ContactUs />} /> */}
          {/* <Route path="/t&c" element={<TermsAndConditions />} /> */}
          {/* <Route path="/privacypolicy" element={<PrivacyPolicy />} /> */}
          <Route path="/newpass" element={<Newpass />} />
          <Route path="*" element={<Navigate to="/" replace="true" />} />
        </Route>
      </Routes>
      {/* ===========Popups========== */}
      <LoginComp />
      <SignupComp />
      <ChangePassPopup />

      {/*==========Global=Components========= */}
      <AppLoader />
      <ToastContainer {...toastConfig} />
    </div>
  );
}

export default App;
// toast("msg", {
//   style: {
//     backgroundColor: "#062263",
//     boxShadow: "0 0 5px 2px #5bcbf5",
//     color: "white",
//   },
// });
