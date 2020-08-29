import {validarNascimento} from './validacaoData.js';

export const validadores = {
        dataNascimento: (input) => validarNascimento(input)
}

 const modifyElement = (input) => {
    const elementoPai = input.parentNode;
    const classInputErro = 'possui-erro-validacao';
    const classElementoErro = 'erro-validacao';
    const elementoErroExiste = elementoPai.querySelector(`.${classElementoErro}`);
    const elementoErro = elementoErroExiste || document.createElement('div');

    return {elementoPai,classInputErro, classElementoErro, elementoErro};
}

export const isValidFunction = (input)=>{
    const elementosModificadores = modifyElement(input);

    elementosModificadores.elementoErro.remove();
    input.classList.remove(elementosModificadores.classInputErro);
}

export const notValidFunction = (input,addError=true)=>{
    const elementosModificadores = modifyElement(input);
    if(addError){
        elementosModificadores.elementoErro.className = elementosModificadores.classElementoErro;
        input.classList.add(elementosModificadores.classInputErro);
        elementosModificadores.elementoErro.textContent = "Há um erro aqui!";
        input.after(elementosModificadores.elementoErro);
    }
}
