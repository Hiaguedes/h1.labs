import React , {Component} from 'react';
import ListaNotas from './components/CardComponent/ListaNotas';
import FormCadastro from './components/FormComponent/FormCadastro';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      notas:[]
    };
  }

  criarNota(titulo,nota){
    const novaNota = {titulo,nota};
    const novoNotas = [...this.state.notas,novaNota];

    const novoEstado = {
      notas:novoNotas
    }

    this.setState(novoEstado)
  }
  
  render(){
  return (
    <section className="content">
    <FormCadastro className="form-cadastro" criarNota={this.criarNota.bind(this)}/>
    <ListaNotas className="lista-notas" notas={this.state.notas}/>
    </section>
  );
  }
}


export default App;
