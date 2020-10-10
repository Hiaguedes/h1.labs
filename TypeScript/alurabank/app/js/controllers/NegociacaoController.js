import { Negociacao } from "../models/Negociacao.js";
export class NegociacaoController {
    constructor() {
        this._inputData = document.querySelector('[data-data]');
        this._inputQuantidade = document.querySelector('[data-qte]');
        this._inputValor = document.querySelector('[data-valor]');
    }
    adiciona(e) {
        e.preventDefault();
        const neg = new Negociacao(new Date(this._inputData.value.replace(/-/g, ',')), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        console.log(neg);
    }
}
