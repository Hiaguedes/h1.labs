var btns = document.querySelectorAll('.listaDeArtigos-slider-item');
var noticias =document.querySelectorAll('.listaDeArtigos-item');
var new0=document.querySelector('#new0');
var new1=document.querySelector('#new1');
var new2=document.querySelector('#new2');

new0.style.display='inline-block';

var indicaSlideAtual=document.createElement('span');
indicaSlideAtual.classList.add('escondeVisualmente');
indicaSlideAtual.textContent='(Slide Atual)'

// Percorre todos os botoes controladores
btns.forEach(function(btn) {
  btn.addEventListener('click', function() {

    this.href='javascript:void(0)'; //para a tela não ficar focando no botão

    noticias.forEach(function(noticia){
      noticia.style.display='none';

      if(btn.getAttribute('data-sliderItem') == noticia.getAttribute('data-noticia')){
        noticia.style.display='inline-block';
      }
    });

    /*if(this.getAttribute('data-sliderItem')==='0'){
      new0.style.display='inline-block';
      new1.style.display='none';
      new2.style.display='none';
    } else if (this.getAttribute('data-sliderItem')==='1'){
      new0.style.display='none';
      new1.style.display='inline-block';
      new2.style.display='none';
    }else {
      new0.style.display='none';
      new1.style.display='none';
      new2.style.display='inline-block';
    }*/

    this.appendChild(indicaSlideAtual);

    // Remove classe 'ativo' dos outros botoes
    btns.forEach(function(btnRemoveClass) {
      btnRemoveClass.classList.remove('listaDeArtigos-slider-item--ativo');
    });

    this.classList.add('listaDeArtigos-slider-item--ativo');
  });
});

