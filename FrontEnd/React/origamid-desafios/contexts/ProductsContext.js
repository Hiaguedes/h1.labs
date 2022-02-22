import React, { createContext, useContext, useEffect, useState } from 'react';

export const initialState = {
    descricao: '',
    nome: '',
    preco: '',
    usuario_id: '',
    vendido: '',
    fotos: [],
};

const ctxDefaultValue = {
    produto: [initialState],
    limpaProduto: () => {}
}

const ContextProducts = createContext(ctxDefaultValue);

export const ProductsProvider = ({children}) => {
    const [produto, setProduto] = useState([]);

    useEffect(() => {
        fetch('https://ranekapi.origamid.dev/json/api/produto/')
        .then(response => response.json())
        .then(response => setProduto([...produto,...response]))
    }, []);

    const limpaProduto = () => {
        setProduto(initialState);
    }

    return(
        <ContextProducts.Provider value={{produto, limpaProduto}}>
            {children}
        </ContextProducts.Provider>
    )
};

export const useProductsContext = () => useContext(ContextProducts)
