import { cliente } from "../Cliente.js";
//classe abstrata
export class conta{
    static numContas=0;//para extrair informações pertinentes a classe como "quantas contas eu tenho cadastradas" eu preciso de uma variável que seja estática
    
    
    constructor(saldo,cliente,agencia){
        if(this.constructor==conta){
            throw new Error("Você não pode instanciar a classe conta diretamente");//joga um erro se querermos instanciar essa classe diretamente
        }

        this._cliente=cliente;
        this._agencia=agencia;
        this._saldo=saldo;
        conta.numContas++;//e para isso eu conto em quantas vezes o construtor foi chamado chamando a propria classe

    }

    set cliente(param){//para garantir que tooo cliente seja um cliente de fato
        if(param instanceof cliente){
            this._cliente=param;
        }
    }

    get cliente(){
        return this._cliente;
    }

    get saldo(){
        return this._saldo.toFixed(2);
    }

    sacar(valor){
        throw new Error("Use _sacar(valor,taxa) invés de sacar");
    }

    _sacar(valor,taxa){ // por ter o _ na frente não devemos chamar essa função para fora da classe
        if(this._saldo >= valor && valor>0){//o this é uma palavra propria do js que nos diz qual o elemento
            //que chamou aquela função, no caso qual a conta corrente que eu estou vendo
            this._saldo -=(valor *taxa);//a convenção é que se use o _saldo mas o _ não deixa a variável privada de fato, é só uma convenção que se tiver _ você não a altere externamente
            var valorNovoSaldo=this._saldo-valor;
            return valorNovoSaldo;
        }
    }

    depositar(valor){
        if(valor>0){//se eu depositar um valor negativo a função não deixa
            this._saldo += valor;
        }
    }

    mostraSaldo(){
        console.log("O saldo de "+ this.cliente.nome + " é de " + this.saldo + " R$");
    }

    transferir(para,valor){//da minha conta transfiro para um cliente um valor
        if(valor>0 && this._saldo>0){// se o valor transferido é maior que zero e o saldo de quem está transferindo é maior que zero
            this.sacar(valor);//saque o valor da conta de quem está transferindo 
            para.depositar(valor);// e deposite na conta para a pessoa que eu quero
        }
        console.log();//pule uma linha
        para.mostraSaldo();//me mostre no console o valor na conta do favorecido
        this.mostraSaldo();//me mostra no console o valor na conta do depositante
    }
};
