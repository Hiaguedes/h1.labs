import {editaCliente,edita} from './api/cliente.js'

const pegaURL= new URL(window.location);
const id = pegaURL.searchParams.get('id');
//console.log(id);

const inputCPF = document.querySelector('[data-cpf]');
const inputNome = document.querySelector('[data-nome]');

editaCliente(id).then(dados => {
    inputCPF.value = dados[0].cpf;
    inputNome.value = dados[0].nome;
});

const formEdicao = document.querySelector('[data-form]');

formEdicao.addEventListener('submit', (event)=>{
    event.preventDefault();
    edita(id,inputCPF.value,inputNome.value);
})
