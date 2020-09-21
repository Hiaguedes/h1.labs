import React, {Component} from 'react';
import './estilos.css';

class ListaNotas extends Component {
 // não precisou chamar o super com o props pois o react faz isso por padrão!
 render(){
     return(    
        <ul className="card">
         {this.props.notas.map( (nota,index) => {
        return(
            <section className="card__individual" key={index}>
                <h3 className="card__titulo">{nota.titulo}</h3>
                <p className="card__desc">{nota.nota}</p>
            </section>
        )}
        )}
         
      </ul>
      );
 }
}

export default ListaNotas;