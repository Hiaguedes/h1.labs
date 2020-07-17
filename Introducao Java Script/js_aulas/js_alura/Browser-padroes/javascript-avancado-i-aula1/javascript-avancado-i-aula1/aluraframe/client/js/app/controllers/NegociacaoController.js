
class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document);// forma que o jQuery faz para suavizar o document.querySelector
        
        this._inputData= $('#data');//aí posso substituir esse palavrão por $
        this._inputQuantidade= $('#quantidade');
        this._inputValor= $('#valor');

        this._listaNegociacoes=new ListaNegociacoes();
        this._negView= new NegociacaoView($('#negociacoesView'));

        this._msg= new Mensagem();
        this._msgView= new MensagemView($('#mensagemView'));

        this._negView.update(this._listaNegociacoes);
        
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
        
    adiciona(event){  
        event.preventDefault();  //previno as ações de submit de um botão (que é recarregar a página)
        
        let negociacao= this._criaNegociacao();                   
        let diaFormato= DateHelper.dataParaTexto(negociacao.data);
        this._listaNegociacoes.adiciona(negociacao);

        console.log(this._listaNegociacoes.negociacoes);
        this._negView.update(this._listaNegociacoes);
        this._msg.texto='Negociação adicionada com sucesso :D';
        this._msgView.update(this._msg);

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
