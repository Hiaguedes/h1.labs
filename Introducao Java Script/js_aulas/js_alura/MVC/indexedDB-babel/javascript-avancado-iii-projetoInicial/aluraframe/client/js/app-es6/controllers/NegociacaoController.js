class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
         
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia' , 'ordena', 'inverteOrdem');
       
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');    
            
        this._ordemAtual = '';
        this._init();

    }

    _init(){
        ConnectionFactory.getConnection()
        .then(conc => new NegociacaoDao(conc))
        .then(dao =>dao.listaDados())
        .then(negs => 
                negs.forEach(neg => this._listaNegociacoes.adiciona(neg)
                ))
        .catch(erro => {
            console.log(erro);
            this._mensagem.texto = erro;
        })

setInterval(() => 
this._importaNegociacoes(),3000)
    }
    
    adiciona(event) {
        
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(conc => {
                let negociacao=this._criaNegociacao();

                new NegociacaoDao(conc)
                .adiciona(negociacao)
                .then(() => {
                    this._listaNegociacoes.adiciona(negociacao);
                    this._mensagem.texto = 'Negociação adicionada com sucesso'; 
                    this._limpaFormulario();
                })
            })
            .catch(erro => this._mensagem.texto = erro);
        };

    _importaNegociacoes() {
        

        let service = new NegociacaoService();
        service
            .obterNegociacoes()
            .then(negociacoes => negociacoes.filter( negociacao => 
                !this._listaNegociacoes.negociacoes.some(negociacaoExistente => // some (verifica se dentro do array tenho alguma coisa igual a uma query, se tiver retorna true) como queremos adicionar o que não existe por isso o !
                    JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente))
                ))
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                //this._mensagem.texto = 'Negociações do período importadas'   
            }))
            .catch(erro => this._mensagem.texto = erro);                              
    }
    
    apaga() {
        
        ConnectionFactory
            .getConnection()
            .then(conc => new NegociacaoDao(conc))
            .then(dao => dao.apagaDados())
            .then(msg => {
                this._mensagem.texto=msg;
                this._listaNegociacoes.esvazia();
            });

    };
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value));    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
    
    ordena(coluna) {
        
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem(); 
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);    
        }
        this._ordemAtual = coluna;    
    }
}