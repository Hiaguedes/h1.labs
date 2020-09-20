import React, {Component} from 'react';

class ListaNotas extends Component {
    constructor(){
        super();
        this.Array= ['Estudo', 'Trabalho', 'Lazer'];
    }

 render(){
     return(    
        <ul>
         {this.Array.map( categoria => {
        return(
            <section>
                <h3>{categoria}</h3>
                <p>Escreva a nota</p>
            </section>
        )}
        )}
         
      </ul>
      );
 }
}

export default ListaNotas;