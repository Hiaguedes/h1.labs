import {validadores, isValidFunction, notValidFunction} from './validaCampo.js'

const inputs = document.querySelectorAll('.input');

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

