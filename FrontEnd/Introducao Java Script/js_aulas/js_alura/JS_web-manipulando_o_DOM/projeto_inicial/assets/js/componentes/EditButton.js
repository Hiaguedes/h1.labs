let CreateEditButton =() => {

    let buttonEdit=document.createElement('button');
      buttonEdit.classList.add('check-button');
      buttonEdit.setAttribute('data-task-button',true);
      buttonEdit.innerText='Editar Tarefa';
      
      buttonEdit.addEventListener('click', editarTarefa);
    
    return buttonEdit;
    }



const editarTarefa=(event)=>{
  const botaoEdit=event.target;
  const tarefaParaEditar= botaoEdit.parentElement;//pega conteúdo do elemento pai do botão

  const div=document.createElement('div');
  div.classList.add('container-edit');

  const button = document.createElement('button');
  button.classList.add('check-button');
  button.innerText='Clique para modificar';

  const input =document.createElement('input'); 
  input.classList.add('form-input');
  

  div.appendChild(input);
  div.appendChild(button);

  tarefaParaEditar.parentElement.append(div);

  button.addEventListener('click',()=>{

    tarefaParaEditar.firstChild.textContent=input.value;
    div.remove();
  })

  
}

export default CreateEditButton;