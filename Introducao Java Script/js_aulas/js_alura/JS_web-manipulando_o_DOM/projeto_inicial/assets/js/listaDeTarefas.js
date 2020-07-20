(()=>{ //previne de deixar tudo no escopo global chamada de IIFE
const buttonForm = document.querySelector('[data-button-form]');
const inputForm =document.querySelector('[data-input-form');
const lista=document.querySelector('[data-list-table]');
let tarefas=[];

buttonForm.addEventListener('click',(event)=>{


    let conteudo =`<p class="content"> ${inputForm.value}</p>`;
    event.preventDefault();

    let linha= document.createElement('li');
    linha.classList.add('task');
    linha.setAttribute('data-task',true);

    linha.innerHTML=conteudo;
    linha.appendChild(CreateDoneButton());
    linha.appendChild(CreateDelButton());
    tarefas.push(linha);
    
    lista.appendChild(linha);
    //document.querySelector('[data-task-button]').addEventListener('click',concluirTarefa);
    inputForm.value='';
    
});

let CreateDoneButton =() => {

  let buttonDone=document.createElement('button');
    buttonDone.classList.add('check-button');
    buttonDone.setAttribute('data-task-button',true);
    buttonDone.innerText='Marcar como Concluída';
    
    buttonDone.addEventListener('click', concluirTarefa);
  
  return buttonDone;
  }

  let CreateDelButton =() => {

    let buttonDel=document.createElement('button');
      buttonDel.classList.add('delete-button');
      buttonDel.setAttribute('data-task-button',true);
      buttonDel.innerText='Apagar Tarefa';
      
      buttonDel.addEventListener('click', deletarTarefa);
    
    return buttonDel;
    }

const concluirTarefa=(event)=>{
  const botaoConcluir=event.target;
  const tarefaCompleta= botaoConcluir.parentElement;
  tarefaCompleta.classList.toggle('done');
}

const deletarTarefa=(event)=>{
  const botaoDelete=event.target;
  const tarefaDeletada= botaoDelete.parentElement;
  tarefaDeletada.remove() ;
}


})();//previne de deixar tudo no escopo global

/*
  let CreateDoneButton =() => {

    let buttonDone=document.createElement('button');
    buttonDone.classList.add('check-button');
    buttonDone.innerText='Tarefa Concluída';
    
    return buttonDone;
    }

    <button class="check-button" data-task-button>Tarefa Concluída</button>
    */
