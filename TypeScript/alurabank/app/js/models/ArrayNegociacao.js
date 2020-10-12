export class ArrayNegociacao {
    constructor() {
        this._negociacoesArray = [];
    }
    adiciona(neg) {
        this._negociacoesArray.push(neg);
    }
    get negociacoesArray() {
        return [].concat(this._negociacoesArray);
    }
}
