

class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document);// forma que o jQuery faz para suavizar o document.querySelector
        
        this._inputData= $('#data');//aí posso substituir esse palavrão por $
        this._inputQuantidade= $('#quantidade');
        this._inputValor= $('#valor');
        
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

        const data = new Date(...this.inputData.value//o ... é o spread, ele pega um vetor e atribui o resto de um vetor para uma variável 
            //nesse caso ele pega a data que pode ser 2020-07-31 e transforma em 2 0 2 0 - 0 7 - 3 1
            .split('-') // aqui a data separada em termos será um vetor cujo separador é - ficando 2020 07 31
            .map(// o map permite fazermos operações matemáticas com o vetor, no caso queremos somar um no mes que vem errado por padrão no Date, pois 0 é janeiro e 11 é dezembro
            (item,indice) =>{ //arrow function , excluo o function de antes do parenteses e adiciono a flecha depois, deixa a função um pouco menos verbosa
            if(indice==1){
                return item-1;
            }
            return item;
            })
        );
        // a intenção é passar data como data=new Data(2020,8,37), isso nos dá a data correta
            //console.log(data);
        //dessa forma temos um formato de data legal para passarmos para a negociação

        let negociacao= new Negociacao(data,
                                        this._inputQuantidade.value,
                                        this._inputValor.value);
                                    
        console.log(negociacao);

    }
}
let negCtrl = new NegociacaoController();
