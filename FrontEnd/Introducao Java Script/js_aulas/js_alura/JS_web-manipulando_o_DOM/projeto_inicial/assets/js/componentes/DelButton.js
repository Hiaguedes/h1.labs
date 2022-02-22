let CreateDelButton =() => {

    let buttonDel=document.createElement('button');
      buttonDel.classList.add('delete-button');
      buttonDel.setAttribute('data-task-button',true);
      buttonDel.innerText='Apagar Tarefa';
      
      buttonDel.addEventListener('click', deletarTarefa);
    
    return buttonDel;
    }



const deletarTarefa=(event)=>{
  const botaoDelete=event.target;
  const tarefaDeletada= botaoDelete.parentElement;
  tarefaDeletada.remove() ;
}

export default CreateDelButton;