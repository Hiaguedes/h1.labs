class DateHelper{

    constructor(){
        throw new Error('Não instancie essa classe prefira usar DateHelper. diretamente em um atributo');
    }

   static textoParaData(texto){//não preciso instanciar a classe para chamar suas funções

   if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)) throw new Error('Provavelmente colocou no formato aaaa/mm/dd o que é inválido');
   //expressão regular para testar o texto, o input tem tem que ter dddd-dd-dd, e se passar nesse padrão retorna o correto

       return new Date(...texto.split('-') // aqui a data separada em termos será um vetor cujo separador é - ficando 2020 07 31
        .map(// o map permite fazermos operações matemáticas com o vetor, no caso queremos somar um no mes que vem errado por padrão no Date, pois 0 é janeiro e 11 é dezembro
        (item,indice) =>{ //arrow function , excluo o function de antes do parenteses e adiciono a flecha depois, deixa a função um pouco menos verbosa
        if(indice==1){
            return item-1;
        }
        return item;
        })
        )}

  static  dataParaTexto(data){
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`; // ao nome desse formato (evitando concatenação) é template String

    }
}