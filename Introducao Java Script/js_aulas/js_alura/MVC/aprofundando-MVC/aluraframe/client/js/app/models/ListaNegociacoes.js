class ListaNegociacoes {
    constructor(){
       this._negociacoes=[];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);

    }

    get negociacoes(){
        return [].concat(this._negociacoes);// te dou uma copia da lista original de negociacoes e você adiciona apenas uma vez nessa lista (caso queira adicionar de outra forma)
    }

    esvazia(){
        this._negociacoes=[];

    }
}