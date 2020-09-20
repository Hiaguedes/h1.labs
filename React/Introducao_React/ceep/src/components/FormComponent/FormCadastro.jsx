import React, {Component} from 'react';
import './Form.css';

 class FormCadastro extends Component {
    render(){
        return(    
        <form className="form">
            <input type="text" placeholder="Título" className="form__titulo"/>
            <textarea cols="50" rows="15" placeholder="Escreva a sua nota..." className="form__text-area"></textarea>
            <button className="form__button">Criar a Nota</button>
        </form>
          );
    }
};

export default FormCadastro;