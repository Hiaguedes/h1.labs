import { Negociacao } from "../models/Negociacao.js";
import { ArrayNegociacao } from '../models/ArrayNegociacao.js';
import { NegociacoesView } from "../views/NegociacoesView.js";
import { MensagemView } from "../views/MensagemView.js";
export class NegociacaoController {
    constructor() {
        this._negociacoes = new ArrayNegociacao();
        this._negociacaoView = new NegociacoesView('[data-negociacoes-view]');
        this._mensagemView = new MensagemView('[data-mensagem]');
        this._inputData = document.querySelector('[data-data]');
        this._inputQuantidade = document.querySelector('[data-qte]');
        this._inputValor = document.querySelector('[data-valor]');
        this._negociacaoView.update(this._negociacoes);
    }
    adiciona(e) {
        e.preventDefault();
        const neg = new Negociacao(new Date(this._inputData.value.replace(/-/g, ',')), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        this._negociacoes.adiciona(neg);
        //this._negociacoes.negociacoesArray.length = 0; // para provar que não altero o array em outra classe
        //this._negociacoes.negociacoesArray.forEach(neg => console.log(neg));
        this._negociacaoView.update(this._negociacoes);
        this._mensagemView.update('Negociação Adicionada com Sucesso');
    }
}
