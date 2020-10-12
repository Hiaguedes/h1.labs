import { ArrayNegociacao } from "../models/ArrayNegociacao";

export class NegociacoesView {
    private _elemento: Element;

    constructor(seletor: string){
        this._elemento = document.querySelector(seletor)
    }

    update(negociacoes: ArrayNegociacao): void{
        this._elemento.innerHTML = this.template(negociacoes);
    }

    template(negociacoes: ArrayNegociacao): string{

        return `<table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>

        <tbody>
        </tbody>
            ${negociacoes.negociacoesArray.map(neg =>{
                return `
                <tr>
                    <td>${neg.data.getDate()}/${neg.data.getMonth()+1}/${neg.data.getFullYear()}</td>
                    <td>${neg.quantidade}</td>
                    <td>${neg.valor}</td>
                    <td>${neg.volume}</td>
                </tr>
                `
                
            }).join()}
        <tfoot>
        </tfoot>
    </table>  
        `
    }
}