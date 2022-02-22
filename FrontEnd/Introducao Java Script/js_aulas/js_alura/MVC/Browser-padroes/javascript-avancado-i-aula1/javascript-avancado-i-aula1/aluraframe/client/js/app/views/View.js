class View {
    constructor(elemento){
        this._elemento=elemento;

        if(this.constructor==View){
            throw new Error("Você não pode instanciar essa classe");//assim proibimos essa classe de ser instanciada diretamente
        }
    }

    _template(model){
        throw new Error('O método template deve ser implementado nas classes filhas');//assim eu protejo as classes filhas, pois elas são únicas para cada caso
    }

    update(model){
        this._elemento.innerHTML=this._template(model);//assim eu escrevo na tela a cada atualização de dado
    }
}