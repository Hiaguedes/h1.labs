(()=>{
    const itens = document.querySelectorAll('[data-item]');
   let itensActive =[];//index do elemento ativo anteriormente e do atual
   let itensX=[];//coordenadas iniciais x
    const lista =document.querySelector('.lista');

function _createRect(width,height,marginLeftInicial,marginLeftFinal){
    const div = document.createElement('div');
    div.classList.add('lista__item--ativo');
    div.classList.add('caixa');
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.zIndex='1';
    div.style.position = 'absolute';
    div.style.padding='0';
    div.style.marginLeft= marginLeftInicial + 'px';

    function myRightMove() {  
        var pos = marginLeftInicial;
        var id = setInterval(frame, 1);
        function frame(){
          if (pos >= marginLeftFinal) {
            clearInterval(id);
          } else {
            pos= pos+5; 
            div.style.marginLeft = pos + 'px'; 
          }
        }
      }

      function myLeftMove() {  
        var pos = marginLeftInicial;
        var id = setInterval(frame, 1);
        function frame(){
          if (pos <= marginLeftFinal) {
            clearInterval(id);
          } else {
            pos= pos-5; 
            div.style.marginLeft = pos + 'px'; 
          }
        }
      }

    const distancia= marginLeftFinal-marginLeftInicial;
    const tempo = 500;
    const speed = distancia/tempo;
    //console.log(speed);


    if(marginLeftFinal > marginLeftInicial){
        //console.log('deslocamento para a direita');
    
                /*div.style.marginLeft= marginLeftInicial + 'px';
                marginLeftInicial +=40;*/
                myRightMove();
    }else{
        //console.log('deslocamento para a esquerda');
        myLeftMove()
    }

    lista.appendChild(div);



    //setTimeout(()=>div.remove(),500);

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

           if(index == itensActive[0]) return;
           _changeAttr(itens[itensActive[0]]);//apago atributo do botão que estava ativo
           _createRect(item.getBoundingClientRect().width,item.getBoundingClientRect().height,item.getBoundingClientRect().width*itensActive[0],item.getBoundingClientRect().width*index);

           setTimeout(()=>{
               itensActive.push(index);
               
               
            _changeAttr(item);//acendo atributo de botão que vai ser acesso

            //console.log(itensX[itensActive[0]],itensX[index])
            _delRect(document.querySelector('.caixa'));
           itensActive.shift();//tiro index do botão que estava ativo antes
       },300);//acendo o elemento clicado depois de 500ms
       //_createRect(item.getBoundingClientRect().width,item.getBoundingClientRect().height);
    });
       
   });
})();