export class cliente {
    nome;
    _CPF;

    constructor(Nome,Cpf){ // e para criar um cliente passamos os valores como parâmetro
        this.nome =Nome;
        this._CPF=Cpf;
    }

    get CPF(){ // por que as pessoas tem um cpf ao longo da vida
       return this._CPF;
    }

}