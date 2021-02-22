import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

const ProdutoDetalhe = () => {
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        console.log(location)
    }, []);

    return (
        <div>
          <h2>Detalhe do Produto</h2>  
          <p>{pathname}</p>
        </div>
    );
}

export default ProdutoDetalhe;
