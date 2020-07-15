# Padrões de browser

Esse curso tratará sobre padrões de negócio e especificações de negócio na hora de montar uma validação de formulário. O começo do MVC (model view controller), pois o browser em alguns casos altera nossa view sem nós querermos mas podemos corrigir isso com a orientação a objetos do java script e o uso de classes dentro da web.

Assim como feito em outros cursos o arquivo de uma classe é feito com letra maiúscula, isso se chama PascalCase o que é diferente da variável que usamos o camelCase

Em javaScript o termos atributo é mais fortemente entendido como propriedade

## Conto sobre orientação a objetos

Barney: Flávio, eu sou programador, mas até hoje não consigo entender o que seria orientação a objetos. Pode me explicar?

Flávio: orientação a objetos prega uma forte conexão entre dado e comportamento.

Barney: ...

Flávio: hehe, não captou ainda, certo?

Barney: não mesmo!

Flávio: bom, imagine que eu tenha aqui em minhas mãos uma garrafa de cerveja, aquelas tradicionais. Pense no líquido da garrafa como um dado, uma informação. Ok?

Barney: Ok!

Flávio: eu dou essa garrafa em suas mãos e peço para que você a abra. Como você faz?

Barney: eu uso um abridor.

Flávio: boa tentativa, mas eu te passei o abridor?

Barney: não!

Flávio: viu que além de passar a garrafa eu preciso lembrar de te passar um abridor? Eu pedi para você pensar no líquido da garrafa como dado, agora peço que você pense no abridor como comportamento. Ok?

Barney: perfeito!

Flávio: então, se eu não te passei o abridor, como você conseguirá chegar até o líquido (dado) da garrafa?

Barney: hum, eu posso tentar abrir com o dente.

Flávio: é uma forma de você conseguir acessar o liquido (dado). Que mais? Tem outra forma de acessar o líquido?

Barney: sei lá, talvez batendo na quina da mesa.

Flávio: Barney, eu tenho certeza que você criará diversas maneiras de acessar líquido da garrafa, inclusive se você der essa garrafa para outra pessoa ela pode tentar abrir a garrafa de outra forma.

Flávio: agora eu te dei um saca rolha.

Barney: pra quê? Para abrir a garrafa?

Flávio: sim, você vai conseguir?

Barney: bom, até posso conseguir, mas corro o risco de me machucar, assim como abrir a garrafa com dente.

Flávio: excelente, veja que nesse caso o dado (líquido) é separado do comportamento que acessa o dado (forma de abrir). Quando isso acontece, cada um tenta bolar sua forma de acesso aos dados. Em programação, isso pode levar a repetição de código, além disso, como o dado é separado do comportamento que opera sobre ele, temos que lembrar onde em nossos zilhões de arquivos e bibliotecas está aquele comportamento que deve operar o dado.

Barney: acho que estou entendendo. O cenário que você passou para mim é o da programação procedural. Certo?

Flávio: isso mesmo Barney! Na programação procedural o dado e o comportamento estão separados.

Barney: e na orientação a objetos, como fica?

Flávio: nela, como disse, temos uma forte conexão entre dado e comportamento. Onde o dado vai, os comportamentos que operam sobre aqueles dados vão junto.

Barney: pode me dar um exemplo, ainda no contexto da garrafa de cerveja?

Flávio: claro. Imagine que agora eu dou para você uma garrafa long-neck e eu peço para que você a abra.

Barney: isso é fácil, basta eu girar a tampa da garrafa.

Flávio: veja que nesse caso o dado (líquido) caminha com o comportamento que operava sobre ele (abridor, que é a própria tampa). Onde quer que você leve a garrafa, a forma de acessar seu líquido será a mesma, seja aqui no Brasil ou no Japão. Veja que temos dado e comportamento caminhando juntos. Sequer você precisa lembrar de me pedir um abridor ou inventar outras formas de acesso ao líquido, porque o dado é fortemente conectado com o comportamento que opera sobre ele.

Barney: finalmente entendi!

## Métodos!

Vejamos a classe Pessoa:

```js
class Pessoa {

    constructor(nome, sobrenome) {

        this.nome = nome;
        this.sobrenome = sobrenome;
    }
}
```

Nossa classe possui nome e sobrenome. Em vários lugares do nosso sistema, precisamos do nome completo da pessoa, sendo assim fazemos:

```js
var pessoa = new Pessoa('Flávio', 'Almeida');
console.log('Nome completo: ' + pessoa.nome + ' ' + pessoa.sobrenome);
```

Apesar de funcional, essa solução é procedural. Veja que somos nós os responsáveis em concatenar o nome e o sobrenome do objeto em todos os lugares que essa informação for necessária. Além disso, o programador não poderá esquecer de colocar um espaço em branco separando o nome do sobrenome.

Podemos resolver esse problema criando um método na própria classe que ao ser chamado realiza a operação de concatenação para nós.

Altere a classe `Pessoa` adicionando o método obtemNomeCompleto, que retorna a concatenação de nome e sobrenome.

Uma implementação possível é:

```js
class Pessoa {

    constructor(nome, sobrenome) {

        this.nome = nome;
        this.sobrenome = sobrenome;
    }

    obtemNomeCompleto() {
         return this.nome + ' ' + this.sobrenome;
    }
}

var pessoa = new Pessoa('Flávio', 'Almeida');
console.log('Nome completo: ' + pessoa.obtemNomeCompleto());
```

Veja que agora, onde quer que a instância de Pessoa seja usada, pedimos para a própria instância o nome completo.

## Atributos privados

Hoje rola uma proposta de criar um atributo privado com # mas hoje a linguagem não oferece de maneira "canônica" algo pra tal. O _ não serve para esse propósito.

CURIOSIDADE: a linguagem TypeScript da Microsoft permite definir atributos privados com o modificador private. TypeScript nada mais é do que um superset do ES2015+ com a adição de novos recursos, inclusive aquele que define atributos privados.

## getters

Adotamos a convenção _ para indicar que determinada propriedade é privada, isto é, só pode ser acessado por métodos da classe. Quando seguimos essa convenção, precisamos criar métodos acessadores (getters).

Veja o seguinte exemplo:

```js
class Conta {

    constructor(titular, conta) {

        this._titular = titular;
        this._conta = conta;
        this._saldo = 0.0;
    }

    deposita(valor) {
        console.log('Valor depositado: ' + valor);
        this._saldo+=valor; 
    }
}
```

Como todos os atributos da nossa classe são privados, vamos adicionar métodos para que seja possível ler o titular, a conta e o saldo:

```js
class Conta {

    constructor(titular, conta) {

        this._titular = titular;
        this._conta = conta;
        this._saldo = 0.0;
    }

    deposita(valor) {
        console.log('Valor depositado: ' + valor);
        this._saldo+=valor; 
    }

    getSaldo() {
        return this._saldo;
    }

    getTitular() {
        return this._titular;
    }

    getConta() {
        return this._conta;
    }
}

var conta = new Conta('Mingau', 171);
conta.deposita(100);
console.log(conta.getTitular());
console.log(conta.getConta());
console.log(conta.getSaldo());
```

Contudo, podemos criar uma espécie de método, mas que é acessado como se fosse uma propriedade. Altere o código anterior e modifique todos os métodos get para usar essa sintaxe especial.

Uma implementação válida é:

```js
class Conta {

    constructor(titular, conta) {

        this._titular = titular;
        this._conta = conta;
        this._saldo = 0.0
    }

    deposita(valor) {
        console.log('Valor depositado: ' + valor);
        this._saldo+=valor; 
    }

    get saldo() {
        return this._saldo;
    }

    get titular() {
        return this._titular;
    }

    get conta() {
        return this._conta;
    }
}

var conta = new Conta('Mingau', 171);
conta.deposita(100);
console.log(conta.titular); //  acessando como se fosse uma propriedade!
console.log(conta.conta);
console.log(conta.saldo);
```

Temos a seguinte definição de classe:

```js
class Conta {

    constructor(titular, conta) {

        this._titular = titular;
        this._conta = conta;
        this._saldo = 0.0;
    }

    deposita(valor) {
        console.log('Valor depositado: ' + valor);
        this._saldo+=valor; 
    }

    get saldo() {
        return this._saldo;
    }

    get titular() {
        return this._titular;
    }

    get conta() {
        return this._conta;
    }
}
```

E temos a seguinte instância:

```js
var conta = new Conta('Mingau', 171);
conta.titular = 'Paco';
console.log(conta.titular);
```

O que será exibido na instrução console.log(conta.titular)?

Mingau

O titular continuará a ser Mingau, porque conta.titular é uma propriedade getter, que não aceita receber valores.

## Congelando objetos

Temos a seguinte classe:

```js
class Negociacao {

    constructor(data, quantidade, valor) {

        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }
}
```

Sabemos que uma alteração como essa não tem efeito porque é um getter:

```js
var negociacao = new Negociacao(new Date(), 1, 100);
negociacao.quantidade = 100; // não tem efeito
```

Contudo, nada impede do programador não seguir a convenção de que propriedades com _ só podem ser acessadas através de métodos da classe:

```js
var negociacao = new Negociacao(new Date(), 1, 100);
negociacao._quantidade = 100;  // é possível, apesar de ferir a convenção
```

Aprendemos que podemos congelar objetos, tornando suas propriedades imutáveis. Qual das sintaxes abaixo realiza o "congelamento do objetonegociacao"?

Object.freeze(negociacao);

Podemos solicitar à Object.freeze o congelamento de um objeto com todas as suas propriedades. Qualquer alteração de suas propriedades serão ignoradas.

No exemplo anterior, podemos aplicar Object.freeze no construtor da classe, tendo como alvo this, mas claro, só depois de termos atribuído os valores recebidos no construtor às propriedades.

### Imutável aonde meu filho!
PRÓXIMA ATIVIDADE

Vejamos novamente o exemplo da classe Negociacao:

```js
class Negociacao {

    constructor(data, quantidade, valor) {

        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;

        Object.freeze(this); // congela a instância do objeto
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }
}
```

E agora, uma instância:

`var negociacao = new Negociacao(new Date(), 1, 100);`
O que acontecerá se alterarmos a data de negociacao? Vejamos um exemplo:

`negociacao.data.setDate(negociacao.data.getDate() + 1);`
Faça um teste no console, altere a data de uma instância de Negociacao.

Por mais que estejamos usando `Object.freeze(this)`, sabemos que nossa classe não é totalmente imutável. Apesar de não podermos atribuir novamente um novo objeto à referência que já temos, como negociacao._data = new Date(), nós podemos chamar os métodos do objeto data, que operam sobre seu estado interno, que não é congelado. E agora?

Podemos lançar mão da programação defensiva. Quando chamarem a propriedade getter data, retornaremos uma nova instância de Date com a mesma data da nossa negociação. Como é outra instância, qualquer modificação não impactará em nossa classe.

O mesmo cuidado precisamos tomar com o construtor da classe. Como data é um objeto e objetos são passados como referência em JavaScript, qualquer alteração feita fora da classe pode alterá-la. A ideia é aplicarmos a programação defensiva. Sendo assim, nossa classe fica:

```js
class Negociacao {

    constructor(data, quantidade, valor) {

        this._data = new Date(data.getTime()); // criando uma nova instância a partir do tempo de uma data 
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }
}
```

## Valete .. var e let

Qual é a diferença entre variáveis declaradas com var e let?

Declarações com var possuem escopo de função ou global. Variáveis declaradas com let tem escopo de bloco e o JavaScript lançará um erro se a mesma for declarada mais de uma vez.

### Declarando duas vezes a mesma variável

Aprendemos que variáveis declaradas com let possuem escopo de bloco, ou seja, são enxergadas apenas no bloco onde foram declaradas. Vejamos um exemplo:

```js
let idade = 18;
let temCarteira = true;

if(idade >= 18 && temCarteira) {
    let msg = 'Pode dirigir';
    console.log(msg);
}
alert(msg); // undefined, porque `msg` foi declarada com `let` dentro do bloco do `if`. 
Contudo, antes da versão ES6 variáveis eram declaradas com var e estas não possuem escopo de bloco, apenas escopo de função. Reescrevendo o código anterior com var:

var idade = 18;
var temCarteira = true;

if(idade >= 18 && temCarteira) {
    var msg = 'Pode dirigir';
    console.log(msg);
}
alert(msg); // exibe 'Pode dirigir'. 
Uma maneira de evitar que o valor da variável vaze para fora do if é a seguinte:

var idade = 18;
var temCarteira = true;

(function() {
    if(idade >= 18 && temCarteira) {
        var msg = 'Pode dirigir';
        console.log(msg);
    }
})();

alert(msg); // exibe undefined
```

Agora, o que acontecerá se declararmos duas variáveis com mesmo nome usando let? Vejamos um exemplo:

```js
let nome = 'Flávio';
let nome = 'Almeida';
```

Faça um teste no console, declare uma mesma variável duas vezes.

Uncaught TypeError: Identifier 'nome' has already been declared(…)
Não podemos declarar mais de uma variável com o mesmo nome quando usamos let. Antes desse novo recurso de linguagem, podíamos fazer algo como:

```js
var nome = 'Flávio';
var nome = 'Almeida';
```

## javaScript vive mudando

Durante o treinamento eu digo que Date é uma classe, inclusive usamos operador new para criá-la. Contudo, na verdade Date é uma função construtora. O uso de funções construtoras no ES5 era uma das formas de criarmos instâncias a partir de um modelo, ou seja, era algo mais perto de uma definição de classe. Aliás, toda sintaxe nova do ES2015 voltada para criação de classes, herança e outros recursos são açucares sintáticos para muito código que escrevíamos em ES5.

Que tal criarmos uma classe em ES2015 para em seguida vermos como é seu código em ES5?

```js
class Pessoa {
    constructor(nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }
    obterNomeCompleto() {
        return `${this.nome} ${this.sobrenome}`;
    }
}
function Pessoa(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
}
Pessoa.prototype.obterNomeCompleto = function() {
    return this.nome + ' ' + this.sobrenome;
};
```

Apesar de terem uma sintaxe diferente, ambos tem o mesmo resultado. Então, para unificar a linguagem, chamarei Date de classe e outras funções construtoras também, porque no final elas são usadas para implementar o paradigma da orientação a objetos.

JavaScript é uma linguagem multiparadigma, podemos programar proceduralmente, funcionalmente e orientado a objetos.
