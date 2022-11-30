import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { useContext } from "react";
import GlobalContext from "./context/GlobalContext/GlobalContext";
import AppLoader from "./components/appLoader/AppLoader";
function App() {
  const { state } = useContext(GlobalContext);
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      {state.appLoading ? <AppLoader /> : null}
    </div>
  );
}

export default App;
