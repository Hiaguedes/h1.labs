
import {conta} from "./Conta.js";

export class contaCorrente extends conta{
    static numContas=0;//para extrair informações pertinentes a classe como "quantas contas eu tenho cadastradas" eu preciso de uma variável que seja estática

    constructor(cliente,agencia){
        super(0,cliente,agencia);
        contaCorrente.numContas++;//e para isso eu conto em quantas vezes o construtor foi chamado chamando a propria classe
    }

    sacar(valor){
        let taxa=1.1;
        this._sacar(valor,taxa);//como contaCorrente é filha da conta entao podemos chamar a função _sacar sem problemas

        //para isso chamamos de interface, pois não duplicamos nenhum código

    }

    
};
