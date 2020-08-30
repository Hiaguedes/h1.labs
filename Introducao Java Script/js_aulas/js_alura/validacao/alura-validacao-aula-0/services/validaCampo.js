import {validarNascimento} from './validacaoData.js';
import {validarSenha} from './validarSenha.js';
import {validarCPF} from './validarCPF.js';
import {recuperarEndereco} from './recuperarEndereco.js';

export const validadores = {
        dataNascimento: (input) => validarNascimento(input),
        senha: (input) => validarSenha(input),
        cpf: input => validarCPF(input),
        cep: input => recuperarEndereco(input)
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

const customMessage = (tipo,validade) => {
    let mensagemErro= "";
    let tiposDeErro=["valueMissing", "typeMismatch","tooShort","customError","tooShort","rangeUnderflow","patternMismatch"];
    //console.log(validade); //para pegar o nome dos erros

    const mensagemDisplay ={
        email: {
            valueMissing: "O email é necessário",
            typeMismatch: "Este não é um email válido"
        },
        dataNascimento: {
            valueMissing: "A data de nascimento é necessária",
            customError: "Você tem que ter 18 anos",
            rangeUnderflow: "Datas Anteriores a 1900 não são válidas"
        },
        senha: {
            tooShort: "A senha deve ter mais que 8 caracteres",
            valueMissing: "A senha é necessária",
            customError: "Precisa ter ao menos uma letra maiúscula, um número e um special Char (@-+!?ç)"
        },
        cpf: {
            valueMissing: "o cpf é necessário",
            customError: "Este não é um CPF válido"
        },
        cep: {
            valueMissing: "O cep é necessário",
            patternMismatch: "O formato do CEP está errado",
            customError: "O CEP informado está incorreto"
        },
        cidade: {
            valueMissing: "As cidade é necessária"
        },
        estado: {
            valueMissing: "O nome do estado é necessário"
        },        
        logradouro: {
            valueMissing: "O logradouro é necessário"
        },
        rg: {
            valueMissing: "O rg é necessário"
        },
    };
    
    tiposDeErro.forEach( erro => {
        if(validade[erro]){
            mensagemErro = mensagemDisplay[tipo][erro];
        }
    })
    return mensagemErro;
}

export const notValidFunction = (input,validade,addError=true)=>{
    const elementosModificadores = modifyElement(input);
    const tipo = input.getAttribute('data-tipo');
    if(addError){
        elementosModificadores.elementoErro.className = elementosModificadores.classElementoErro;
        input.classList.add(elementosModificadores.classInputErro);
        elementosModificadores.elementoErro.textContent = customMessage(tipo,validade);
        input.after(elementosModificadores.elementoErro);
    }
}