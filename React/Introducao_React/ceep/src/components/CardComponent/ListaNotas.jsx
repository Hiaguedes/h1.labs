import React, {Component} from 'react';
import './estilos.css';

class ListaNotas extends Component {
    constructor(){
        super();
        this.Array= ['Estudo', 'Trabalho', 'Lazer'];
    }

 render(){
     return(    
        <ul className="card">
         {this.Array.map( (categoria,index) => {
        return(
            <section className="card__individual" key={index}>
                <h3 className="card__titulo">{categoria}</h3>
                <p className="card__desc">Escreva a nota</p>
            </section>
        )}
        )}
         
      </ul>
      );
 }
}

export default ListaNotas;