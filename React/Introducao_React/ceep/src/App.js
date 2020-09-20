import React , {Component} from 'react';
import ListaNotas from './components/ListaNotas';
import FormCadastro from './components/FormCadastro'

class App extends Component {
  
  render(){
  return (
    <section>
    <FormCadastro/>
    <ListaNotas/>
    </section>
  );
  }
}


export default App;
