// Variáveis
var btnAbreDialog = document.querySelector('#abreDialog');
var dialog = document.querySelector('.dialogNewsletter');
var dialogBody = document.querySelector('.dialogNewsletter-body');
var dialogOverlay = document.querySelector('.dialogNewsletter-overlay');//camada (com z-index: 2) que fica atrás da dialog (z-index:3) quando a caixa é criada

// Quando abrir a dialog...
btnAbreDialog.addEventListener('click', function() {
  dialog.classList.add('dialogNewsletter--aberto');
  document.querySelector('.dialogNewsletter-campo').focus();
  document.querySelector('.foraDialog').inert=true;


});

function fechandoDialog() {
  document.activeElement.blur();
  dialog.classList.remove('dialogNewsletter--aberto');     
  document.querySelector('.foraDialog').inert=false;
  btnAbreDialog.focus();
}

// Listeners
document.querySelector('.dialogNewsletter-fechar').addEventListener('click', fechandoDialog);

document.addEventListener('keydown',(event)=>{
  if(event.keyCode==27){ fechandoDialog()};
});

dialogOverlay.addEventListener('click',()=>fechandoDialog())
