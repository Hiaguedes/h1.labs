(()=>{
    const itens = document.querySelectorAll('[data-item]');
   let itensActive =[];//index do elemento ativo anteriormente e do atual
   let itensX=[];//coordenadas iniciais x
    const lista =document.querySelector('.lista');

function _createRect(width,height,indexItemAtivoAnterior,indexItemClicado,speed){
    const marginLeftInicial = indexItemAtivoAnterior *width;
    const marginLeftFinal = indexItemClicado*width; // o movimento vai do marginLeftInicial até o marginLeftFinal

    const div = document.createElement('div');
    div.classList.add('lista__item--ativo');
    div.classList.add('caixa');
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.marginLeft= marginLeftInicial + 'px';

      function myMove(x){
        let pos = marginLeftInicial;

        function atualizePosicao(){
          pos= pos+x; 
          div.style.marginLeft = pos + 'px'; 
        }
        
        if(x>0){
          let id = setInterval(frame, 1);
          function frame(){
            pos >= marginLeftFinal ? clearInterval(id):atualizePosicao();
          }
        }else{
          let id = setInterval(frame, 1);
          function frame(){
            pos <= marginLeftFinal ? clearInterval(id):atualizePosicao();
          }
        }
      }

    marginLeftFinal > marginLeftInicial ? myMove(speed) : myMove(-speed); // se a margem a esquerda da posição final for maior que a inicial movimente para a direita senão movimente para a esquerda

    lista.appendChild(div);//adiciona na lista

}

function _delRect(selector){
    selector.remove();
}

  function _changeAttr(obj){
    
    const classAttr = obj.getAttribute('class');
    const dataAttr = obj.getAttribute('data-item');
    
    obj.classList.remove(classAttr);
    obj.setAttribute('data-item','');
    obj.setAttribute('data-item',classAttr);
    obj.classList.add(dataAttr);
   }

   itens.forEach((item,index) =>{
    if(item.getAttribute('data-item') =='lista__item'){
        itensActive.push(index);//identifica qual a tag ativa no momento que o site entra
   }

   itensX.push(item.getBoundingClientRect().x);//pucha no vetor a coordenada x inicial (por que pode mudar de tela para tela)

       item.addEventListener('click',()=>{

           if(index == itensActive[0]) return;//se elemento está ativo, não faz nada
           _changeAttr(itens[itensActive[0]]);//apago atributo do botão que estava ativo
           _createRect(item.getBoundingClientRect().width,item.getBoundingClientRect().height,itensActive[0],index,20);

           setTimeout(()=>{
               itensActive.push(index);
            _changeAttr(item);//acendo atributo de botão que vai ser acesso
            _delRect(document.querySelector('.caixa'));//depois do tempo percorrido deleto caixa animada
           itensActive.shift();//tiro index do botão que estava ativo antes
       },150);//acendo o elemento clicado depois de x ms
    });
       
   });
})();