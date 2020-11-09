
import { ArrayNegociacao, Negociacao } from '../models/index.js';
import { NegociacoesView, MensagemView } from "../views/index.js";
import { tempoExecucao, domInject } from '../helpers/decorators/index.js'

enum DiaSemana {
    Domingo,
    Segunda,
    Terça,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}

export class NegociacaoController {
    @domInject('[data-data]')
    private _inputData:HTMLInputElement;

    @domInject('[data-qte]')
    private _inputQuantidade:HTMLInputElement;

    @domInject('[data-valor]')
    private _inputValor:HTMLInputElement;

    private _negociacoes = new ArrayNegociacao();
    private _negociacaoView = new NegociacoesView('[data-negociacoes-view]');
    private _mensagemView = new MensagemView('[data-mensagem]')

    constructor() {
        this._negociacaoView.update(this._negociacoes);
    }

    @tempoExecucao()
    adiciona(e:Event){
       e.preventDefault();
       let data = new Date(this._inputData.value.replace(/-/g,','))

       const neg = new Negociacao(data,
       parseInt(this._inputQuantidade.value),
       parseFloat(this._inputValor.value));

        if(data.getDay() === DiaSemana.Domingo || data.getDay() === DiaSemana.Sabado){
            this._mensagemView.update('Por favor cadastre somente negocições em dias de semana!')
            return;
        }

       this._negociacoes.adiciona(neg)

       //this._negociacoes.negociacoesArray.length = 0; // para provar que não altero o array em outra classe
       //this._negociacoes.negociacoesArray.forEach(neg => console.log(neg));
       this._negociacaoView.update(this._negociacoes);
       this._mensagemView.update('Negociação Adicionada com Sucesso')
    }
    
}