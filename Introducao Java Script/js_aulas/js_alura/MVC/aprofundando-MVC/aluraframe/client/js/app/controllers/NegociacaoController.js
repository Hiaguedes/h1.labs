
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
        this._msg.texto='Tabela Excluída';
        this.isImport = Boolean(false);
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
        if(this.isImport.valueOf()==true) return;
        this.isImport = Boolean(true);

        let service = new NegociacaoService();

        Promise.all(
            [service.obterNegociacoes('negociacoes/semana'),
            service.obterNegociacoes('negociacoes/anterior'),
            service.obterNegociacoes('negociacoes/retrasada')]
            )
            .then( negociacoes =>{
                negociacoes
                .reduce((arrayReduzido, array)=> arrayReduzido.concat(array),[])
                .forEach(neg => this._listaNegociacoes.adiciona(neg));
                this._msg.texto = 'Negociações Importadas com Sucesso';
            }).catch(err=>{
                this._msg.texto = err;
                console.log(err);
            });

        }

        /*
            Solução possivel, só que a promisse realiza de forma síncrona
            service.obterNegociacoes('negociacoes/semana')
            .then( negociacoes =>{
                negociacoes.forEach(neg => this._listaNegociacoes.adiciona(neg));
                this._msg.texto = 'Negociações Importadas com Sucesso';
            }).catch(err=>{
                this._mensagem.texto = err;
            });


            service.obterNegociacoes('negociacoes/anterior')
            .then( negociacoes =>{
                negociacoes.forEach(neg => this._listaNegociacoes.adiciona(neg));
                this._msg.texto = 'Negociações Importadas com Sucesso';
            }).catch(err=>{
                this._mensagem.texto = err;
            });

            service.obterNegociacoes('negociacoes/retrasada')
            .then( negociacoes =>{
                negociacoes.forEach(neg => this._listaNegociacoes.adiciona(neg));
                this._msg.texto = 'Negociações Importadas com Sucesso';
            }).catch(err=>{
                this._mensagem.texto = err;
            });
        /*
        //console.log(NegociacaoService.abreXHR('GET','negociacoes/semana'));
    }


    /* solucao com callback
     _adicionaImportacaoNaLista = (err,negociacoes)=>{
            if(err){ // error first
                this._mensagem.texto = err;
                return;
            }

            negociacoes.forEach(neg => this._listaNegociacoes.adiciona(neg));
            this._msg.texto = 'Negociações Importadas com Sucesso';
        }
        */
    
}
let negCtrl = new NegociacaoController();
