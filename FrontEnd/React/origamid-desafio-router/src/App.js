import { GlobalStyle } from './global';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Contato from './pages/Contato';
import Home from './pages/Home';
import NotFound from './pages/404' ;
import Button from './components/Button'
import ProdutoDetalhe from './pages/ProdutoDetalhe'

// Utilize a API abaixo para puxar a lista de produto
// https://ranekapi.origamid.dev/json/api/produto
// Cada produto possui o id, o mesmo pode ser passado na api para retornar os dados desse produto específico
// https://ranekapi.origamid.dev/json/api/produto/notebook

function App() {

  return (
    <>
    <GlobalStyle />
      <h2>Produto</h2>
      <BrowserRouter>
      <Link to="/">
        <Button>
          Produtos
        </Button>
      </Link>
      <Link to="/contato">
      <Button>
          Contato
        </Button>
      </Link>



       <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/contato">
            <Contato />
          </Route>

          <Route path="/produto/:id">
            <ProdutoDetalhe />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
