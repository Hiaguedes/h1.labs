export class cliente {

    constructor(Nome,Cpf,senha){ // e para criar um cliente passamos os valores como parâmetro
        this.nome =Nome;
        this._CPF=Cpf;
        this._senha =senha;
    }

    get CPF(){ // por que as pessoas tem um cpf ao longo da vida
       return this._CPF;
    }

    autenticar(senha){
        return senha==this._senha;// inves de criar um getter nós criamos uma função que retorna verdadeiro 
        //ou falso para o valor de senha dado
    }

}