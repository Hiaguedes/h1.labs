import React from 'react';
import { useProductsContext } from '../../contexts/ProductsContext';
import Button from 'react-bootstrap/Button';

const  ProdutosContext = () => {
    const { limpaProduto, produto } = useProductsContext();
    return (
        <div>
            <Button onClick={limpaProduto}>Limpar Lista de Produtos</Button>
            <br />
            {produto.length > 0 ?
            produto.map(produtoUnitario => {
                return(
                <div>
                    <h1>{produtoUnitario.nome}</h1>
                    <p>{produtoUnitario.descricao}</p>
                    <p style={{color: 'green'}}>R$ {produtoUnitario.preco}</p>
                </div>
                );
            }) : <>Lista zerada</>
                }
        </div>
    )
}

export default ProdutosContext

