
import {conta} from "./Conta.js";

export class contaPoupanca extends conta{
    static numContas=0;
    constructor(saldoInicial,cliente,agencia){
        super(saldoInicial,cliente,agencia);
        contaPoupanca.numContas++;
    }

    sacar(valor){
        let taxa=1.02;
        this._sacar(valor,taxa);
    }
}