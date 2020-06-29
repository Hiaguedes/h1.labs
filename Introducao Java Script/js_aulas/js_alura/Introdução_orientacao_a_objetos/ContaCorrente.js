import { cliente } from "./Cliente.js";

export class contaCorrente {
    agencia;
    #cliente;
    #saldo = 0; //a cerquilha diz que a propriedade é privada, a convenção hoje seria usar _saldo 
    // pois a # ainda não foi implementada ainda e não deveria ser usada para projetos reais


    set cliente(param){//para garantir que tooo cliente seja um cliente de fato
        if(param instanceof cliente){
            this.#cliente=param;
        }
    }

    get cliente(){
        return this.#cliente;
    }

    sacar(valor){
        if(this.#saldo >= valor && valor>0){//o this é uma palavra propria do js que nos diz qual o elemento
            //que chamou aquela função, no caso qual a conta corrente que eu estou vendo
            this.#saldo -=valor;//a convenção é que se use o _saldo mas o _ não deixa a variável privada de fato, é só uma convenção que se tiver _ você não a altere externamente
        }
    }

    depositar(valor){
        if(valor>0){//se eu depositar um valor negativo a função não deixa
            this.#saldo += valor;
        }
    }

    mostraSaldo(){
        console.log("O saldo de "+ cliente().nome + " é de " + this.#saldo + " R$");
    }

    transferir(para,valor){//da minha conta transfiro para um cliente um valor
        if(valor>0 && this.#saldo>0){// se o valor transferido é maior que zero e o saldo de quem está transferindo é maior que zero
            this.sacar(valor);//saque o valor da conta de quem está transferindo 
            para.depositar(valor);// e deposite na conta para a pessoa que eu quero
        }
        console.log();//pule uma linha
        para.mostraSaldo();//me mostre no console o valor na conta do favorecido
        this.mostraSaldo();//me mostra no console o valor na conta do depositante
    }
};
