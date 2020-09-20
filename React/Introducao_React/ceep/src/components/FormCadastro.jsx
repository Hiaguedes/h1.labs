import React, {Component} from 'react';

 class FormCadastro extends Component {
    render(){
        return(    
        <form>
            <input type="text" placeholder="Título"/>
            <textarea cols="50" rows="5" placeholder="Escreva a sua nota..."></textarea>
            <button>Criar a Nota</button>
          </form>
          );
    }
};

export default FormCadastro;