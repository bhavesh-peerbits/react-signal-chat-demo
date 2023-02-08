import { useState } from "react";
import "./App.css";
import { AllRoutes } from "./Components/AllRoutes";
import { HomeComp } from "./Components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HomeComp />
      {/* <AllRoutes /> */}
    </>
  );
}

export default App;
