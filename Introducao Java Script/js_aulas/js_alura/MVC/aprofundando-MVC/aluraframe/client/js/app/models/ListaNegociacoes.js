class ListaNegociacoes {
    constructor(callUpdate){
       this._negociacoes=[];
       this._callUpdate= callUpdate;//variavel criada para linkar direto com update da negociaciaoView (que puxa da view)
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        this._callUpdate(this);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);// te dou uma copia da lista original de negociacoes e você adiciona apenas uma vez nessa lista (caso queira adicionar de outra forma)
    }

    esvazia(){
        this._negociacoes=[];
        this._callUpdate(this);
    }
}