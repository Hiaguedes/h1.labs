import {validarNascimento} from './validacaoData.js'

const inputs = document.querySelectorAll('.input');
const validadores = {
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

const isValidFunction = (input)=>{
    const elementosModificadores = modifyElement(input);

    elementosModificadores.elementoErro.remove();
    input.classList.remove(elementosModificadores.classInputErro);
}

const notValidFunction = (input,addError=true)=>{
    const elementosModificadores = modifyElement(input);
    if(addError){
        elementosModificadores.elementoErro.className = elementosModificadores.classElementoErro;
        input.classList.add(elementosModificadores.classInputErro);
        elementosModificadores.elementoErro.textContent = "Há um erro aqui!";
        input.after(elementosModificadores.elementoErro);
    }
}


inputs.forEach(input =>{

    
    input.addEventListener('input',() =>{
        const isValid = input.validity.valid;
        !isValid ? notValidFunction(input,false) : isValidFunction(input);
        const tipo = input.getAttribute('data-tipo'); // verifico o data-attribute do campo em questão (melhor dessa forma pois todos deverão o data-tipo)
        if(validadores[tipo]){//se o tipo está dentro do objeto validadores (se existre a chave)
            validadores[tipo](input);//executa o valor dessa chave
            //essa abordagem evita ifs e elses desnecessários
        }
    });

    input.addEventListener('blur', ()=>{
        const isValid = input.validity.valid;
        !isValid ? notValidFunction(input) : isValidFunction(input);
    })
});

