import React, {Component} from 'react';
import './Form.css';

 class FormCadastro extends Component {

    constructor(props){
        super(props);
        this.titulo="";
        this.nota="";
        
    }

    handleTitle(e){
        this.titulo = e.target.value;
        e.stopPropagation();// para a propagaçao do evento na arvore do DOM
    }

    handleTextArea(e){
        this.nota = e.target.value;
        e.stopPropagation();
    }

    criarNota(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.criarNota(this.titulo,this.nota)
    }

    render(){
        return(    
        <form className="form" onSubmit={this.criarNota.bind(this)}>
        
            <input type="text" placeholder="Título" className="form__titulo" onChange={this.handleTitle.bind(this)} required/>
            <textarea cols="50" rows="15" placeholder="Escreva a sua nota..." className="form__text-area" onChange={this.handleTextArea.bind(this)}></textarea>
            <button className="form__button">Criar a Nota</button>
        </form>
          );
    }
};

export default FormCadastro;