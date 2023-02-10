import { useState } from "react";
import "./App.css";
import { AllRoutes } from "./Components/AllRoutes";
import { HomeComp } from "./Components/Home";

function App() {
  const [count, setCount] = useState(0);
  localStorage.setItem("UserID", "63733e200d6491452608a74e");
  return (
    <>
      <HomeComp />
      {/* <AllRoutes /> */}
    </>
  );
}

export default App;
