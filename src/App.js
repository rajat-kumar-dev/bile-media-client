import "./App.css";
// import ForgetPassPopup from "./components/forgetPassPopup/ForgetPassPopup";
// import LoginComp from "./components/loginComp/LoginComp";
// import SignupComp from "./components/signupComp/SignupComp";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
// import img from "./assets/images/caro1.png";
import GlobalContextProvider from "./context/GlobalContext/GlobalContextProvider";
function App() {
  return (
    <GlobalContextProvider>
      <Navbar />
      <HomePage />
    </GlobalContextProvider>
  );
}

export default App;
