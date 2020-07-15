class Negociacao {

    constructor(quantidade,valor){
        
        this._data= new Date();//pega a data de hoje
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

let n1 = new Negociacao(2,7);//nova instância da classe, ou seja um novo molde
// evite usar var prefire usar o let

n1._data.setDate(30);
console.log(n1);