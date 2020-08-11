
class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document);// forma que o jQuery faz para suavizar o document.querySelector
        
        this._inputData= $('#data');//aí posso substituir esse palavrão por $
        this._inputQuantidade= $('#quantidade');
        this._inputValor= $('#valor');

       this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacaoView($('#negociacoesView')),
            'adiciona', 'esvazia'
       );

       this._msg= new Bind(
           new Mensagem(this._msg),
           new MensagemView($('#mensagemView')),
           'texto'
       );

       this.isImport =new Boolean(false);

        //this._negView.update(this._listaNegociacoes);// dou um update na lista de negocios a cada vez que a classe é criada
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

    get jaImportou(){
        return _jaImportou;
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._msg.texto = 'Tabela Excluída';
    }
        
    adiciona(event){  
        event.preventDefault();  //previno as ações de submit de um botão (que é recarregar a página)
        
        let negociacao= this._criaNegociacao();                   
        let diaFormato= DateHelper.dataParaTexto(negociacao.data);
        this._listaNegociacoes.adiciona(negociacao);

        //console.log(this._listaNegociacoes.negociacoes);
        this._msg.texto='Negociação adicionada com sucesso :D';//como a classe tem um setter podemos fazer isso fora dela

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

    import(){
        let xhr = new XMLHttpRequest();
        xhr.open('GET','negociacoes/semana');

        if(this.isImport.valueOf()==true) return;
        /*
        configurações da requisição

        Estados de uma requisição

        1: requisição não iniciada
        2: requisição recebida
        3: processando requisição
        4: requisição concluída e a resposta está pronta
        */ 
        xhr.onreadystatechange= ()=>{
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    this.isImport = Boolean(true);
                    this._msg.texto='Importando dados do servidor';
                let negociacoesServer = JSON.parse(xhr.responseText);

                  negociacoesServer.map(obj => new Negociacao(new Date(obj.data),obj.quantidade,obj.valor))
                  .forEach(neg => this._listaNegociacoes.adiciona(neg));
                }else{
                    console.log('Não deu para buscar os dados lá não');
                    console.log(xhr.responseText);
                    this._msg.texto= 'Não foi possível obter informações';
                }
            }
        };
        xhr.send();
    }
}
let negCtrl = new NegociacaoController();
