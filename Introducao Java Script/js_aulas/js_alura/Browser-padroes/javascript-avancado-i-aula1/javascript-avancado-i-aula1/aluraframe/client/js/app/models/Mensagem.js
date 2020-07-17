class Mensagem {
    constructor(texto = ''){//aqui podemos passar um valor padrão caso nada seja passado para ela 
        this._texto=texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto=texto;
    }
}