import React from "react";
import Home from "./src/modules/Home/screens/home.screen";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#121015" />
      <Home />
    </>
  );
};

export default App;
