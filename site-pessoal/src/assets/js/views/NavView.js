 class NavView{
    constructor(windowWidth){
        this._lista =document.querySelector('.nav__lista'); 
        this._windowWidth = windowWidth;
        this._time=20; 
    }

    _createDiv(width,height){
        const div = document.createElement('div');
        div.classList.add('nav__item--ativo');
        div.classList.add('caixa');
        div.style.width = width + 'px';
        div.style.height = height + 'px';
    
        return div;
    }

    _myMoveX(x,element,paramInitial,paramFinal){
        let pos = paramInitial;

        function atualizePosicaoX(){
          pos= pos+x; 
          element.style.marginLeft = pos + 'px'; 
        }

        function frame() {
            x > 0 ? (pos >= paramFinal ? clearInterval(id):atualizePosicaoX()):(pos <= paramFinal ? clearInterval(id):atualizePosicaoX());
        }

        switch(true){
            case this._windowWidth >1400:
                this._time = 3;
            break;
            case this._windowWidth >900 && this._windowWidth<=1400:
                this._time = 6;
            break;
            case this._windowWidth >600 && this._windowWidth<=900:
                this._time = 8;
            break;
            case this._windowWidth >=500 && this._windowWidth<=600:
                this._time = 12;
            break;

        }
        let id = setInterval(frame, this._time);

    }

    createRectX(width,height,indexItemAtivoAnterior,indexItemClicado,speed){
        const marginLeftInicial = indexItemAtivoAnterior *width;
        const marginLeftFinal = indexItemClicado*width; // o movimento vai do marginLeftInicial até o marginLeftFinal

        const div = this._createDiv(width,height);
        div.style.marginLeft= marginLeftInicial + 'px';
        marginLeftFinal > marginLeftInicial ? this._myMoveX(speed,div,marginLeftInicial, marginLeftFinal) : this._myMoveX(-speed,div,marginLeftInicial, marginLeftFinal); // se a margem a esquerda da posição final for maior que a inicial movimente para a direita senão movimente para a esquerda
    
        this._lista.appendChild(div);//adiciona na lista
    
    }

    _myMoveY(y,element,paramInitial,paramFinal){
        let pos = paramInitial;
    
        function atualizePosicaoY(){
          pos= pos+y; 
          element.style.marginTop = pos + 'px'; 
        }

        function frame(){
          (y>0) ? (pos >= paramFinal ? clearInterval(id):atualizePosicaoY()) : (pos <= paramFinal ? clearInterval(id):atualizePosicaoY());
        }

        switch(true){
            case this._windowWidth <500 && this._windowWidth >400:
                this._time = 10;
            break;
            case this._windowWidth <=400 && this._windowWidth >300:
                this._time = 15;
            break;
        }
        
        let id = setInterval(frame, this._time);
    }

    createRectY(width,height,indexItemAtivoAnterior,indexItemClicado,speed){
        const marginTopInicial = indexItemAtivoAnterior *height;
        const marginTopFinal = indexItemClicado*height; // o movimento vai do marginTopInicial até o marginTopFinal

        const div =this._createDiv(width,height);
        div.style.marginTop= marginTopInicial + 'px';    
        marginTopFinal > marginTopInicial ? this._myMoveY(speed,div,marginTopInicial, marginTopFinal) : this._myMoveY(-speed,div,marginTopInicial, marginTopFinal); // se a margem a esquerda da posição final for maior que a inicial movimente para a direita senão movimente para a esquerda
    
        this._lista.appendChild(div);//adiciona na lista
    }

    delRect(selector){
        selector.remove();
    }
}