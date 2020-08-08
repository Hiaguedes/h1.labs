class Negociacao {

    constructor(data,quantidade,valor){
        
        this._data= new Date(data.getTime());//pega a data de hoje
        this._quantidade=quantidade;
        this._valor=valor;
        Object.freeze(this);//congela os atributos dessa classe para não serem alterados nunca
        // o problema é que o object.freeze é raso, ele congela quantidade e valor
        //mas ele não consegue congelar o data pois ele não desce até o Date, ou seja as propriedades do Date não congelam
    }

    get volume() {
        return this._quantidade*this._valor;
    }

    get quantidade(){// com o get não posso alterar o valor de fato
        return this._quantidade;// o _ é somente uma convenção para dizer que não posso mexer nesse atributo
    }//o getter é um acesso de valor e eu não consigo alterar esse valor

    get data(){
        return new Date(this._data.getTime());
    }

    get valor(){
        return this._valor;
    }
}
