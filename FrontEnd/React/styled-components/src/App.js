import React, { useState } from "react";

import Cabecalho from "./Components/Cabecalho";
import Container from "./Components/Container";
import { Global } from './Components/global';

import { ThemeProvider } from 'styled-components';
import { temaClaro, temaEscuro } from './Components/UIComponents/temas';
import { BtnTema } from './Components/UIComponents';
import SwitcherTema from "./Components/SwitcherTema";

function App() {
  const [tema, setTema] = useState(true);
  const toggleTema = () => {
    setTema(tema => !tema);
  }
  return (
    <ThemeProvider theme={tema ? temaClaro : temaEscuro}>
      <Global/>
      <BtnTema onClick={toggleTema}>
        <SwitcherTema tema={tema}/>
      </BtnTema>
      <Cabecalho />
      <Container />
    </ThemeProvider>
  );
}

export default App;
