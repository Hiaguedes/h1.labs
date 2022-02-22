var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ArrayNegociacao, Negociacao } from '../models/index.js';
import { NegociacoesView, MensagemView } from "../views/index.js";
import { tempoExecucao, domInject, demora } from '../helpers/decorators/index.js';
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
let timer;
export class NegociacaoController {
    constructor() {
        this._negociacoes = new ArrayNegociacao();
        this._negociacaoView = new NegociacoesView('[data-negociacoes-view]');
        this._mensagemView = new MensagemView('[data-mensagem]');
        this._negociacaoView.update(this._negociacoes);
    }
    importarDados() {
        const isOk = (res) => {
            if (res.ok)
                return res;
            throw new Error(res.statusText);
        };
        fetch('http://localhost:5000/dados')
            .then(res => isOk(res))
            .then(res => res.json())
            .then((dados) => {
            dados
                .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._negociacaoView.update(this._negociacoes);
        })
            .catch(err => console.log(err));
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
__decorate([
    domInject('[data-data]')
], NegociacaoController.prototype, "_inputData", void 0);
__decorate([
    domInject('[data-qte]')
], NegociacaoController.prototype, "_inputQuantidade", void 0);
__decorate([
    domInject('[data-valor]')
], NegociacaoController.prototype, "_inputValor", void 0);
__decorate([
    demora(500)
], NegociacaoController.prototype, "importarDados", null);
__decorate([
    tempoExecucao()
], NegociacaoController.prototype, "adiciona", null);
