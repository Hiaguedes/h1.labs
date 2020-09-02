import {cadastroCliente} from './api/cliente.js';

const form = document.querySelector('[data-form]');

form.addEventListener("submit", event => {
    event.preventDefault();
    const nome =event.target.querySelector('[data-nome]').value;
    const cpf =event.target.querySelector('[data-cpf]').value;

    cadastroCliente(nome,cpf);

    nome.textContent="";
    cpf.textContent = "";
})

// TODO verificar CPF