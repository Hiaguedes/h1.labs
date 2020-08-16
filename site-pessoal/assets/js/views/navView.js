 class NavView{
    constructor(){
        this._lista =document.querySelector('.lista');
        
        
    }

    _createDiv(width,height){
        const div = document.createElement('div');
        div.classList.add('lista__item--ativo');
        div.classList.add('caixa');
        div.style.width = width + 'px';
        div.style.height = height + 'px';
    
        return div;
    }

    createRectX(width,height,indexItemAtivoAnterior,indexItemClicado,speed){
        const marginLeftInicial = indexItemAtivoAnterior *width;
        const marginLeftFinal = indexItemClicado*width; // o movimento vai do marginLeftInicial até o marginLeftFinal

        const div = this._createDiv(width,height);
        div.style.marginLeft= marginLeftInicial + 'px';
    
          function myMove(x){
            let pos = marginLeftInicial;
    
            function atualizePosicao(){
              pos= pos+x; 
              div.style.marginLeft = pos + 'px'; 
            }
            
            if(x>0){
              let id = setInterval(frame, 5);
              function frame(){
                pos >= marginLeftFinal ? clearInterval(id):atualizePosicao();
              }
            }else{
              let id = setInterval(frame, 5);
              function frame(){
                pos <= marginLeftFinal ? clearInterval(id):atualizePosicao();
              }
            }
          }
    
        marginLeftFinal > marginLeftInicial ? myMove(speed) : myMove(-speed); // se a margem a esquerda da posição final for maior que a inicial movimente para a direita senão movimente para a esquerda
    
        this._lista.appendChild(div);//adiciona na lista
    
    }

    createRectY(width,height,indexItemAtivoAnterior,indexItemClicado,speed){
        const marginTopInicial = indexItemAtivoAnterior *height;
        const marginTopFinal = indexItemClicado*height; // o movimento vai do marginTopInicial até o marginTopFinal

        const div =this._createDiv(width,height);
        div.style.marginTop= marginTopInicial + 'px';
    
          function myMove(y){
            let pos = marginTopInicial;
    
            function atualizePosicao(){
              pos= pos+y; 
              div.style.marginTop = pos + 'px'; 
            }
            
            if(y>0){
              let id = setInterval(frame, 10);
              function frame(){
                pos >= marginTopFinal ? clearInterval(id):atualizePosicao();
              }
            }else{
              let id = setInterval(frame, 10);
              function frame(){
                pos <= marginTopFinal ? clearInterval(id):atualizePosicao();
              }
            }
          }
    
        marginTopFinal > marginTopInicial ? myMove(speed) : myMove(-speed); // se a margem a esquerda da posição final for maior que a inicial movimente para a direita senão movimente para a esquerda
    
        this._lista.appendChild(div);//adiciona na lista
    }

    delRect(selector){
        selector.remove();
    }
}