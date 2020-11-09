import { ArrayNegociacao, Negociacao } from '../models/index.js';
import { NegociacoesView, MensagemView } from "../views/index.js";
var DiaSemana;
(function (DiaSemana) {
    DiaSemana[DiaSemana["Domingo"] = 0] = "Domingo";
    DiaSemana[DiaSemana["Segunda"] = 1] = "Segunda";
    DiaSemana[DiaSemana["Ter\u00E7a"] = 2] = "Ter\u00E7a";
    DiaSemana[DiaSemana["Quarta"] = 3] = "Quarta";
    DiaSemana[DiaSemana["Quinta"] = 4] = "Quinta";
    DiaSemana[DiaSemana["Sexta"] = 5] = "Sexta";
    DiaSemana[DiaSemana["Sabado"] = 6] = "Sabado";
})(DiaSemana || (DiaSemana = {}));
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
        let data = new Date(this._inputData.value.replace(/-/g, ','));
        const neg = new Negociacao(data, parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        if (data.getDay() === DiaSemana.Domingo || data.getDay() === DiaSemana.Sabado) {
            this._mensagemView.update('Por favor cadastre somente negocições em dias de semana!');
            return;
        }
        this._negociacoes.adiciona(neg);
        this._negociacaoView.update(this._negociacoes);
        this._mensagemView.update('Negociação Adicionada com Sucesso');
    }
}
