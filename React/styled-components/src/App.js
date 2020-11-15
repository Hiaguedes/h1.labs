import React from "react";

import Cabecalho from "./Components/Cabecalho";
import Container from "./Components/Container";
import { Global } from './Components/global';

function App() {
  return (
    <>
      <Global/>
      <Cabecalho />
      <Container />
    </>
  );
}

export default App;
