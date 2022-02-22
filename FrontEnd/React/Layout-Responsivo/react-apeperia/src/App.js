import { Cabecalho, Logo, Navegacao, Link } from './components/cabecalho/cabecalho.styles'
import GlobalStyle from './globalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Cabecalho>
        <Logo />
        <h1>Apeperia</h1>

        <Navegacao>
          <Link>Sobre</Link>
          <Link>Planos</Link>
          <Link>Blog</Link>
          <Link>Destaques</Link>
          <Link>Institucional</Link>
          <Link>Contato</Link>
        </Navegacao>
      </Cabecalho>
    </>
  );
}

export default App;
