
class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document);// forma que o jQuery faz para suavizar o document.querySelector
        
        this._inputData= $('#data');//aí posso substituir esse palavrão por $
        this._inputQuantidade= $('#quantidade');
        this._inputValor= $('#valor');

        this._negView= new NegociacaoView($('#negociacoesView'));//aqui setamos a construção da visão
        this._listaNegociacoes=new ListaNegociacoes((model)=>{ // faço uma arrow function para garantir o escopo que ela foi criada que é NegociacaoController e te livrar de dar update toda vez que adicionar um negócio
            this._negView.update(this._listaNegociacoes);//dou update na lista de negociações na tabela
        });

        this._msg= new Mensagem();
        this._msgView= new MensagemView($('#mensagemView'));

       // this._negView.update(this._listaNegociacoes);// dou um update na lista de negocios a cada vez que a classe é criada
        
    }

    get inputData(){
        return this._inputData;
    }
    get inputQuantidade(){
        return this._inputQuantidade;
    }
    get inputValor(){
        return this._inputValor;
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._msg.texto='Tabela Excluída';
        this._msgView.update(this._msg);
    }
        
    adiciona(event){  
        event.preventDefault();  //previno as ações de submit de um botão (que é recarregar a página)
        
        let negociacao= this._criaNegociacao();                   
        let diaFormato= DateHelper.dataParaTexto(negociacao.data);
        this._listaNegociacoes.adiciona(negociacao);

        //console.log(this._listaNegociacoes.negociacoes);
        this._msg.texto='Negociação adicionada com sucesso :D';//como a classe tem um setter podemos fazer isso fora dela
        this._msgView.update(this._msg);//dou update de mensagem bem sucedida a cada clique no botão para cada negociação feita

        this._limpaForm();
    }

    _criaNegociacao(){
        return new Negociacao(DateHelper.textoParaData(this.inputData.value),
        this._inputQuantidade.value,
        this._inputValor.value);
    }

    _limpaForm(){
        this._inputData.value='';
        this._inputQuantidade.value=1;
        this._inputValor.value='';

        this._inputData.focus();
    }
}
let negCtrl = new NegociacaoController();
