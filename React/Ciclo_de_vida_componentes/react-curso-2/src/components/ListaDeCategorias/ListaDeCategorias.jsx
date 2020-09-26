import React, { Component } from 'react';
import './estilos.css'
class ListaDeCategorias extends Component {
    state = {}

    _handleInput(e){
        if(e.key === 'Enter'){
            let valorCategoria = e.target.value;
            this.props.adicionarCategoria(valorCategoria);
        }
    }
    render() {
        return (
            <section className="lista-categorias">
                <ul className="lista-categorias_lista">
                    {this.props.categorias.map( (categoria,index) =>
                    <li key={index} className="lista-categorias_item">{categoria}</li>
                    )};
                    
                </ul>
                <input className="lista-categorias_input" placeholder='Adicione uma categoria' type="text" onKeyUp={this._handleInput.bind(this)}/>
            </section>
        );
    }
}

export default ListaDeCategorias;