class MensagemView {
    constructor(elemento){
        this._elemento=elemento;
    }
    _template(model){

        return `
        
        <span class="alert alert-info">
        
        ${model.texto}
        </span>
        
        `
    }

    update(model){
        this._elemento.innerHTML=  this._template(model)
       setTimeout(()=> this._elemento.innerHTML=  '',3000);
    }
}