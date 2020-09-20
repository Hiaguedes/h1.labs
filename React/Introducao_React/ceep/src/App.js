import React , {Component} from 'react';
import ListaNotas from './components/CardComponent/ListaNotas';
import FormCadastro from './components/FormComponent/FormCadastro';
import './App.css';

class App extends Component {
  
  render(){
  return (
    <section className="content">
    <FormCadastro className="form-cadastro"/>
    <ListaNotas className="lista-notas"/>
    </section>
  );
  }
}


export default App;
