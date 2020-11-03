import React, {useState} from 'react';

function useErros(validacoes){
    const [erros, setErros] = useState(criaEstadoInicial(validacoes))
    
    function validarCampos(e){
          const {name,value} = e.target
          const ehValido = validacoes[name](value);
          const novoEstado = {...erros}
          novoEstado[name] = ehValido;
          setErros(novoEstado);
        
    }

    return [erros, validarCampos];
}

function criaEstadoInicial(validacoes){
    const estadoInicial = {};

    for(let campo in validacoes) {
        estadoInicial[campo] = {valido:true, text: ''};
    }

    return estadoInicial;
}

export default useErros;