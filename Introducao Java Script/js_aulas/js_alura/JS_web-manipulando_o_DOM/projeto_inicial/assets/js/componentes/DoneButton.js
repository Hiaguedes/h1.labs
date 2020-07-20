 let CreateDoneButton =() => {

    let buttonDone=document.createElement('button');// crio o elemento de botão
      buttonDone.classList.add('check-button');//coloca a classe de estilo pra ela
      buttonDone.setAttribute('data-task-button',true);
      buttonDone.innerText='Marcar como Concluída';//coloco a frase que fica dentro do botão
      
      buttonDone.addEventListener('click', concluirTarefa);// coloco um evento de botão atrelado a ela
    
    return buttonDone;
    }

    const concluirTarefa=(event)=>{
        const botaoConcluir=event.target;//pego apenas aquele elemento
        const tarefaCompleta= botaoConcluir.parentElement;// pego o pai do elemento de botão
        tarefaCompleta.classList.toggle('done');// faço um toggle (on-off) de classe
      }
export default CreateDoneButton;// exporto apenas o necessário

//para exportar mais funções eu faria

/*
export {
  funcao1,
  funcao2,
  ...
}
*/