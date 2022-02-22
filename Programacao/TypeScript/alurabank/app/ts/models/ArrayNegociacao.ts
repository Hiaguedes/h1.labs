import { Negociacao } from "./Negociacao.js";

export class ArrayNegociacao {
    private _negociacoesArray:Array<Negociacao> = [];

    adiciona(neg:Negociacao):void{
        this._negociacoesArray.push(neg);
    }

    get negociacoesArray():Negociacao[]{
        return ([] as Negociacao[]).concat(this._negociacoesArray);
    }
}