import CreateDoneButton from './componentes/DoneButton.js';
import CreateDelButton from './componentes/DelButton.js';

(()=>{ //previne de deixar tudo no escopo global chamada de IIFE
const buttonForm = document.querySelector('[data-button-form]');
const inputForm =document.querySelector('[data-input-form');
const lista=document.querySelector('[data-list-table]');
let tarefas=[];

buttonForm.addEventListener('click',(event)=>{


    let conteudo =`<p class="content"> ${inputForm.value}</p>`;//crio a linha de conteúdo com a tag parágrafo
    event.preventDefault();//previne toda a ação de recarregar página de um botão de form

    let linha= document.createElement('li');//crio elemento li
    linha.classList.add('task');//adiciono uma classe
    linha.setAttribute('data-task',true);//coloco um atributo (não muito util aqui é so para mostrar como se faz mesmo)

    linha.innerHTML=conteudo;//escrevo o html criado pelo parágrafo na linha
    linha.appendChild(CreateDoneButton());// apendo o botão de tarefa feita na linha
    linha.appendChild(CreateDelButton());// apendo o botão de deletar na linha
    tarefas.push(linha);//coloco o conteúdo na linha nas tarefas
    
    lista.appendChild(linha);//apendo a linha na lista
    //document.querySelector('[data-task-button]').addEventListener('click',concluirTarefa);
    inputForm.value='';
    
});

})();//previne de deixar tudo no escopo global

// os imports já estão dentro do seu escopo então não tem problema
