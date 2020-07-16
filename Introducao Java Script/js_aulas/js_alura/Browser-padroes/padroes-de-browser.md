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

## O controller

O controller serve para interagirmos com o usuário

Vejamos a declaração de uma controller:

```js
// ContadorController.js

class ContadorController {

    constructor() {
        this._contador = 0;
        alert(this._contador);
    }

    get contador() {
        return this._contador;
    }

    incrementar() {
        this._contador++;
        alert(this._contador);
    }
}
```

Veja que o único dado que a controller possui é o contador, que começa a partir de 0. Quando o método incrementar for chamado, o valor do contador será incrementado e o valor atual será exibido na tela.

Qual das opções abaixo associa corretamente o botão `<button>` com o método incrementar de ContadorController?

```js
<html>
  <head></head>
  <body>
    <button onclick="contadorController.incrementar()">Incrementar</button>
    <script src="ContadorController.js"></script>
    <script>
        let contadorController = new ContadorController();
    </script>
  </body>
</html>
```

## o map e o forEach

em resumo: O método forEach() executa uma dada função em cada elemento de um array.

O método map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado. O que map() faz: percorre o array da esquerda para a direita invocando uma função de retorno em cada elemento com parâmetros. Para cada chamada de retorno, o valor devolvido se torna o elemento do novo array. Depois que todos os elementos foram percorridos, map() retorna o novo array com todos os elementos “traduzidos”.

## O que é má prática ontem pode ser boa prática hoje e vice-versa!

No mundo front-end, há uma separação clara entre HTML, CSS, JS. Tanto isso é verdade que a boa prática é que cada um fique no seu quadrado, ou seja, que cada um tenha seu arquivo dedicado. Essa separação visa facilitar a manutenção.

Contudo, quando manipulamos o DOM, vira e mexe precisamos associar eventos a elementos. Uma maneira de se fazer isso é encontrar o elemento que queremos associar o evento, e realizar essa associação via JavaScript. Vejamos um exemplo:

`<p id="p1">Olá</p>`

Temos um parágrafo com um id definido. No mundo JavaScript, se quisermos associar um evento click ao parágrafo, precisamos buscá-lo primeiro e depois associar o evento:

```js
function mostra() {
    alert('Fui clicado');
}

document.querySelector('#p1').addEventListener('click', mostra);
```

O código anterior funciona perfeitamente, inclusive deixou marcante a separação entre HTML e JS, pois em nenhum momento no HTML referenciamos nosso JS (apenas a tag `<script>` que o carrega, claro).

Contudo, essa solução nos obriga a manipular o DOM toda vez que quisermos associar um evento com o elemento. Sendo assim, quando criamos SPA (Single Page Applications), páginas que não se recarregam durante seu uso é muito comum usar a abordagem clássica, que é associar a função do evento diretamente na tag `<html>` da nossa página.

Qual das opções abaixo associa diretamente na tag `<p>` o evento click para a função mostra?

```html
<p id="p1" onclick="mostra()">Olá</p>
```

Dependendo do seu viés teórico, essa solução pode ser uma "heresia". Contudo, frameworks SPA, como Angular, adotam estrutura semelhante para associar a ação de um controller a um componente da página, dessa forma, removendo o desenvolvedor de ter que realizar essa associação manualmente.

## As múltiplas facetas do this e o comando bind

Vejamos o seguinte código!

```js
class Pessoa {

    constructor(nome) {
        this.nome = nome;
    }
}

function exibeNome() {
    alert(this.nome);
}

let pessoa = new Pessoa('Salsifufu');

exibeNome('Lampreia'); // PRIMEIRA CHAMADA <=============

exibeNome = exibeNome.bind(pessoa);

exibeNome(); // SEGUNDA CHAMADA <=============
```

O que será exibido na PRIMEIRA e SEGUNDA chamada respectivamente?

Resposta: `undefined e Salsifufu`

Na primeira chamada, o parâmetro Lampreia é ignorado pela função, pois a função não recebe parâmetros. Não acontece nenhum erro, mesmo a função não recebendo o parâmetro, uma característica do JavaScript. Sendo assim, quando `exibeNome('Lampreia')` é chamado, o `this` na verdade é `window`, o escopo global, e nele não temos o valor nome.

Contudo, quando executamos a linha:

`exibeNome = exibeNome.bind(pessoa);`

Estamos recebendo uma referência para uma nova função, que passa a ter o objeto `pessoa` como `this`. Ou seja, a função `bind`, presente em todas as funções, permite indicar qual será o valor de `this` quando ela for executada, em nosso caso `pessoa`. Como `pessoa` possui a propriedade `nome`, será exibido no alerta o valor `Salsifufu`.

É por isso que fizemos ao longo deste capítulo:

`let $  = document.querySelector.bind(document);`

O retorno da função `bind` é a função `querySelector`, que tem como contexto o `document`, ou seja, seu `this` será `document`. Se tivéssemos feito apenas:

`let $  = document.querySelector;`

A variável `$` passa a ser `querySelector`, mas seu `this` deixará de ser `document`, porque estará sendo executada fora deste contexto.

## "Prefiro evitar a fadiga!"

Temos o seguinte controller:

```js
// ContadorController.js
class ContadorController {

    constructor() {
        this._contador = 0;
        alert(this._contador);
    }

    get contador() {
        return this._contador;
    }

    incrementa() {
        this._contador++;
        document.querySelector('#p1').textContent = this._contador;
    }
}
```

E claro, uma página que importa o script do controller, instanciando-o e associando um botão à ação `contadorController.incrementa()`:

```html
<html>
    <head></head>
    <body>
        <p id="p1">0</p>
        <button onclick="contadorController.incrementa()">Incrementar</button>
        <script src="ContadorController.js"></script>
        <script>
            let contadorController = new ContadorController();
        </script>
    </body>
</html>
```

Nosso código funciona, contudo, a maneira como organizamos nosso código pode causar problemas de performance em uma aplicação com escopo maior.

Sob o ponto de vista funcional, não há problema algum em nosso código, pois ele funciona e atende o requisito, que é incrementar o total do contador e exibir o seu estado atual na view. Contudo, podemos melhorar esse código. Veja que a cada clique do usuário, solicitamos ao document que busque o elemento que desejamos. Qual o problema? Uma analogia pode nos ajudar.

Você tem 200 papéis importantes e pega na sala ao lado uma caneta para assinar o primeiro deles, para logo em seguida devolver a caneta. Imagine repetir esse processo para os 199 papéis restantes? Pois é, o DOM (document) também ficará fadigado se você buscar o mesmo elemento 200 vezes!

Para evitar a "fadiga", uma boa estratégia é realizar uma espécie de cache do elemento do DOM que você deseja manipular, ou seja, guardar sua referência, para que você o busque apenas uma vez. Em nosso modelo MVC, com o uso de classes fica fácil definir em que lugar guardaremos uma referência para o elemento que estamos buscando.

Podemos guardar a referência do elemento em uma propriedade na classe e toda vez que alguém precisar desse elemento basta acessar a propriedade que o referencia, evitando assim, percorrer o DOM, fatigando-o! Como as propriedades na classe são inicializadas através do operador new, que chama por debaixo dos panos o constructor da classe, podemos buscar o elemento assim que o nosso controller for instanciado, apenas.

Aplicando os conceitos que vimos anteriormente, nossa classe ContadorController fica assim:

```js
class ContadorController {

    constructor() {
        this._contador = 0;
        this._elemento = document.querySelector('#p1'); // busca uma única vez
        alert(this._contador);
    }

    get contador() {
        return this._contador;
    }

    incrementa() {
        this._contador++;
        this._elemento.textContent = this._contador; // não precisa buscar o elemento, já temos uma referência para ele
    }
}
```

Apesar do problema original não ser suficiente para fatigar o DOM, ter sempre em mente escrever um código otimizado e sem comprometer sua legibilidade é um bom caminho a se trilhar.

Coloque as `querySelector` dentro do construtor da classe justamente para chamar somente uma vez o dom

## Isso não encaixa em um "Date"? Se vira!

JavaScript possui um objeto especial para representar datas, o objeto Date. Sua criação é direta:

```js
let hoje = new Date();
```

Quando instanciamos Date sem passar qualquer parâmetro para o seu construtor, é criado um objeto com a data naquele momento. Contudo, podemos criar uma data seguindo o seguinte formato:

```js
let outraData = new Date('2016/05/17'); // formato ano/mês/dia
```

Internamente, o construtor de Date está preparado para lidar com uma string neste formato e criar uma instância correspondente. Podemos até obter o dia, o mês e o ano de uma data usando seus métodos correspondentes:

```js
let outraData = new Date('2016/05/17');
console.log(outraData.getDate()); // imprime 17
console.log(outraData.getMonth()); // imprime 4
console.log(outraData.getFullYear()); // imprime 2016
```

Não podemos esquecer que um Date guarda internamente os meses de 0 a 11, é por isso que outraData.getMonth() retorna 4 e não 5.

Podemos construir uma nova data também dessa maneira:

```js
let outraDataOutraManeira = new Date(2016, 4, 17);
```

Veja que o construtor recebe o ano, mês e dia, contudo esta forma precisa receber o mês menos um e foi exatamente o que fizemos. Para o mês 5, passamos o valor 4. Aliás, estamos passando valores que são Numbers, mas poderíamos ter passado esses valores como string que tudo continuaria funcionando do mesmo jeito.

Parta do princípio que você tem a seguinte variável:

```js
let dataString = '17-05-2016';
```

E que usará o construtor de Date, que está preparado para receber uma data no formato ano/mes/dia.

Escreva um código que altere dataString para que seu conteúdo fique compatível com o formato ano/mes/dia. No final, instancie uma Date, exibindo no console seu valor.

Uma solução possível é a seguinte:

```js
let dataString = '17-05-2016';

dataString = dataString.split('-').reverse().join('/');

let data = new Date(dataString);

console.log(data);
```

Ou podemos fazer de uma vez só:

```js
let dataString = '17-05-2016';

let data = new Date(dataString.split('-').reverse().join('/'));
console.log(data);
```

A ideia é transformarmos nossa string em uma array, onde teremos três elementos com o dia, mês e ano respectivamente. Daí, usamos o método reverse do Array que inverte a sua ordem fazendo com que o ano seja o primeiro elemento e o dia o último. Nosso mês continuará na sua posição original. Por fim, criamos uma string a partir do array, usando o método join, que usará uma / para separar cada elemento.

## O "mapa" da mina!

Temos a seguinte sequência de números:

let numeros = [3,2,11,20,8,7];
Sua tarefa: criar uma nova lista com a mesma quantidade de números, mas cada elemento da nova lista deve ter seu valor dobrado quando for ímpar.

ATENÇÃO: a lista numeros não pode ser alterada! Você pode resolver do jeito que desejar, o mais importante é o resultado.

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

Tenho certeza que pode ter passado em sua cabeça zilhões de formas de resolver o problema passado, inclusive fica muito difícil para mim mapeá-las todas aqui. Porém, que tal usarmos uma maneira não funcional para resolver esse problema?

```js
let numeros = [3,2,11,20,8,7];
let novosNumeros = [];

numeros.forEach(item => {

    if(item % 2  != 0) {
        novosNumeros.push(item * 2);
    } else {
        novosNumeros.push(item);
    }
});
console.log(novosNumeros);
```

Para sabermos se um número é par ou não, usamos item % 2, que retorna o resto da divisão por 2. Se for 0, é porque o número é par, se não for, é ímpar. Aliás, nem precisamos fazer item % 2 != 0, podemos simplesmente fazer item % 2. Se o resultado for 0, este número é considerado falso pelo JavaScript. Alterando nosso código:

```js
let numeros = [3,2,11,20,8,7];
let novosNumeros = [];

numeros.forEach(item => {

    if(item % 2) { // só entra no IF se o resultado for diferente de zero
        novosNumeros.push(item * 2);
    } else {
        novosNumeros.push(item);
    }
});
console.log(novosNumeros);
```

Apesar de funcionar e termos usado o forEach, nossa solução não é uma solução funcional. Alterando nosso código e exaurindo o poder da programação funcional:

```js
let numeros = [3,2,11,20,8,7];
let novosNumeros = numeros.map(item =>  item % 2 ? item * 2 : item);
console.log(novosNumeros);
```

Veja que usamos um if ternário para decidir se retornamos o item multiplicado por 2 ou o item em si. Um outro ponto importante é o seguinte: 0 é considerado falso em JavaScript e qualquer número diferente de 0 é considerado verdadeiro. Então, quando fazemos item % 2, se o resultado for 0, é porque o item é divisível por dois, ou seja, é par. Como 0 é falso, ele retornará o item sem qualquer modificação. Agora, se o resto da divisão de item % 2 for diferente de zero, é porque é impar. Como o resultado é diferente de zero, será verdadeiro e o que vem depois do interrogação será processado, no caso, item vezes dois.

Outra maneira de se conseguir o mesmo resultado, sem entretanto utilizar o operador ternário, é:

```js
let numeros = [3,2,11,20,8,7];
let novosNumeros = numeros.map((item)=> (item%2 +1 ) * item);
console.log(novosNumeros);
```

Quando fazemos o módulo de dois um número par, o que sobra é 0, somando-se 1, e depois multiplicando pelo item, obtemos o mesmo item. Quando o número é impar, o modulo obtido é um, o qual incrementado dá 2.

### Mais de spread

Para consolidar nosso conhecimento, observe este código:

```js
let lista1 = ['banana', 'laranja', 'mamão'];
let lista2 = ['caju', 'tangerina', 'abacaxi'];

lista1.push(...lista2);
```

Teste se este código funciona no console.

Funciona! O método push de todo array aceita receber os dados que você deseja incluir separados por vírgula, ou seja, a função está preparada para receber N elementos. Quando passamos a lista2 para lista1.push com o spread operator, cada item da lista será passado como um parâmetro para lista.push:

```js
let lista1 = ['banana', 'laranja', 'mamão'];
let lista2 = ['caju', 'tangerina', 'abacaxi'];

lista1.push(...lista2);

console.log(lista1);
//["banana", "laranja", "mamão", "caju", "tangerina", "abacaxi"
```

## O "mapa" da mina!

Temos a seguinte sequência de números:

let numeros = [3,2,11,20,8,7];
Sua tarefa: criar uma nova lista com a mesma quantidade de números, mas cada elemento da nova lista deve ter seu valor dobrado quando for ímpar.

ATENÇÃO: a lista numeros não pode ser alterada! Você pode resolver do jeito que desejar, o mais importante é o resultado.

O que eu fiz:

```js
let array=[...numeros].map((item)=> {
if(item%2==1){
return item*2
}else{return item}
})
```

Opinião do instrutor

Tenho certeza que pode ter passado em sua cabeça zilhões de formas de resolver o problema passado, inclusive fica muito difícil para mim mapeá-las todas aqui. Porém, que tal usarmos uma maneira não funcional para resolver esse problema?

```js
let numeros = [3,2,11,20,8,7];
let novosNumeros = [];

numeros.forEach(item => {

    if(item % 2  != 0) {
        novosNumeros.push(item * 2);
    } else {
        novosNumeros.push(item);
    }
});

console.log(novosNumeros);
```

Para sabermos se um número é par ou não, usamos item % 2, que retorna o resto da divisão por 2. Se for 0, é porque o número é par, se não for, é ímpar. Aliás, nem precisamos fazer item % 2 != 0, podemos simplesmente fazer item % 2. Se o resultado for 0, este número é considerado falso pelo JavaScript. Alterando nosso código:

```js
let numeros = [3,2,11,20,8,7];
let novosNumeros = [];

numeros.forEach(item => {

    if(item % 2) { // só entra no IF se o resultado for diferente de zero
        novosNumeros.push(item * 2);
    } else {
        novosNumeros.push(item);
    }
});
console.log(novosNumeros);
```

Apesar de funcionar e termos usado o forEach, nossa solução não é uma solução funcional. Alterando nosso código e exaurindo o poder da programação funcional:

```js
let numeros = [3,2,11,20,8,7];
let novosNumeros = numeros.map(item =>  item % 2 ? item * 2 : item);
console.log(novosNumeros);
```

Veja que usamos um if ternário para decidir se retornamos o item multiplicado por 2 ou o item em si. Um outro ponto importante é o seguinte: 0 é considerado falso em JavaScript e qualquer número diferente de 0 é considerado verdadeiro. Então, quando fazemos item % 2, se o resultado for 0, é porque o item é divisível por dois, ou seja, é par. Como 0 é falso, ele retornará o item sem qualquer modificação. Agora, se o resto da divisão de item % 2 for diferente de zero, é porque é impar. Como o resultado é diferente de zero, será verdadeiro e o que vem depois do interrogação será processado, no caso, item vezes dois.

Outra maneira de se conseguir o mesmo resultado, sem entretanto utilizar o operador ternário, é:

```js
let numeros = [3,2,11,20,8,7];
let novosNumeros = numeros.map((item)=> (item%2 +1 ) * item);
console.log(novosNumeros);
```

Quando fazemos o módulo de dois um número par, o que sobra é 0, somando-se 1, e depois multiplicando pelo item, obtemos o mesmo item. Quando o número é impar, o modulo obtido é um, o qual incrementado dá 2.

## Ops, não encaixa. Podemos dar um jeitinho?

Temos a seguinte função:

```js
function somaDoisNumeros(numero1, numero2) {
    return numero1 + numero2;                                            
}
```

É uma função simples, que retorna o somatório de dois números. Um exemplo:

```js
console.log(somaDoisNumeros(10,30)); // exibe 40!
```

Muitas vezes não recebemos os dados em uma estrutura compatível com nossas funções. Vejamos um exemplo:

```js
let numeros = [10, 30];
console.log(somaDoisNumeros(numeros[0], numeros[1]));
```

ES2015 trouxe uma novidade, o spread operator. Altere a passagem de parâmetros para somaDoisNumeros e faça uso do spread operator para receber um array, com isso, evitando a necessidade de usar numeros[0] e numeros[1].

Usamos ... antes do array passado como parâmetro. Cada item do array será passado para cada parâmetro recebido pela função. Inclusive isso vale para o constructor de uma classe.

```js
numeros = [10,30];
console.log(somaDoisNumeros(...numeros));
```

## Dica

DICA!
Quando a arrow function possui apenas um parâmetro, podemos remover os parênteses. Vejamos como fica o código anterior:

```js
let aprovados = avaliacoes
    .filter(prova => prova.nota >= 7)
    .map(prova => prova.aluno.nome);
```

Mais enxuto ainda!

## Olhar aguçado para o paradigma da orientação a objetos

Temos o seguinte código que define uma função que sabe validar um código:

```js
let codigo = 'GWZ-JJ-12';

function validaCodigo(codigo) {

    if(/\D{3}-\D{2}-\d{2}/.test(codigo)) {
          alert('Código válido!');
      } else {
          alert('Código inválido');
      }

}

validaCodigo('GWZ-JJ-12'); // válido
validaCodigo('1X1-JJ-12'); // inválido
Muita coisa acontecendo? Se você não é ninja em expressão regular, vamos desmembrar o código para facilitar sua leitura:


function validaCodigo(codigo) {

    // cria a expressão regular. Poderíamos ter usado 
    // a sintaxe new RegExp(/\D{3}-\D{2}-\d{2}/)
    // \D é qualquer coisa não dígito
    // \D{3} é qualquer coisa não dígito que forme um grupo de 3 caracteres
    // \d é qualquer dígito.
    let expressao = /\D{3}-\D{2}-\d{2}/; 

    // toda expressão regular possui o método test 
    // que recebe o alvo do teste, retornando true
    // se passou, e false se falhou
    if(expressao.test(codigo)) {
          alert('Código válido!');
      } else {
          alert('Código inválido');
      }

}

validaCodigo('GWZ-JJ-12'); // válido
validaCodigo('1X1-JJ-12'); // inválido
```

Essa solução é procedural. Veja que toda vez que criarmos um código precisaremos buscar em algum lugar do nosso sistema alguém que o valide. Temos uma separação entre dado e comportamento.

Refaça o código acima adotando o paradigma da orientação a objetos. Uma dica: tudo começa com a criação da classe Codigo. Não se preocupe, a ideia aqui é instigar algumas percepções em você sobre este paradigma.

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

Vou criar uma classe que representa um código e encapsular a regra de que o código deve ter determinado formato. Realizarei a validação no construtor da classe. Se o código for inválido, nenhum objeto será instanciado e o programador ainda receberá uma mensagem de erro o alertando do problema. Isto é, independente do lugar que eu tenha uma instância de Codigo todo código criado será validado!

```js
class Codigo {

    constructor(texto) {

        if(!this._valida(texto)) throw new Error(`O texto ${texto} não é um código válido`);
        this._texto = texto;        
    }

    _valida(texto) {

        return /\D{3}-\D{2}-\d{2}/.test(texto);
    }

    get texto() {

        return this._texto;
    }
}

let codigo1 = new Codigo('GWZ-JJ-12'); // válido
console.log(codigo1.texto);
let codigo2 = new Codigo('1X1-JJ-12'); // inválido
console.log(codigo2.texto);
```

Onde quer que tenhamos um código, dado e comportamento caminham juntos, mesmo que esse comportamento/regra esteja no construtor. Aliás, o _valida está prefixado desta forma porque esse método só deve ser chamado pela própria classe.

## O parâmetro não encaixa, e agora?

Um programador amigo do coração criou uma função genérica para imprimir todos os itens de qualquer lista no console:

```js
function exibeNoConsole(lista) {
    lista.forEach(item => console.log(item));
}
```

Excelente, mas em nossa aplicação dentro de um contexto específico temos duas listas distintas que queremos imprimir no console. Sendo assim, precisamos chamar a função duas vezes.

```js
let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
exibeNoConsole(listaDeNomes1);
let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
exibeNoConsole(listaDeNomes2);
```

Para evitar de chamarmos a função duas vezes, uma vez para cada lista, podemos juntar uma lista na outra. Implemente o código que cria uma nova lista que é a junção dos elementos de listaDeNomes1 e listaDeNomes2.

Em uma abordagem procedural faríamos:

```js
function exibeNoConsole(lista) {
    lista.forEach(item => console.log(item));
}
```

Excelente, mas em nossa aplicação dentro de um contexto específico temos duas listas distintas que queremos imprimir no console. Sendo assim, precisamos chamar a função duas vezes.

```js
let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
let lista = [];

listaDeNomes1.forEach(item => lista.push(item));
listaDeNomes2.forEach(item => lista.push(item));

exibeNoConsole(lista);
Contudo, todo array em JavaScript possui o método concat. Alterando nosso código:

let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
let lista = listaDeNomes1.concat(listaDeNomes2);

exibeNoConsole(lista);
```

O resultado de concat é um novo array com todos os elementos de quem realizou o concat e quem foi passado para a função.

Se quisermos, podemos enxugar ainda mais nosso código:

```js
let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
exibeNoConsole([].concat(listaDeNomes1, listaDeNomes2));
```

Veja que não criamos mais a variável temporária lista. Estamos passando o resultado da concatenação de um array vazio [] com outras duas listas. Aliás, a função concat aceita receber um número infinito de parâmetros, inclusive aqueles que não são um array. Vejamos um exemplo:

```js
let listaDeNomes1 = ['Flávio', 'Rogers', 'Júlia'];
let listaDeNomes2 = ['Vieira', 'Fernanda', 'Gerson'];
exibeNoConsole([].concat(listaDeNomes1, listaDeNomes2, 'Rômulo'));
```

Com isso, a lista criada terá também um item de valor Rômulo. Então para fazer uma lista dinâmica use []

## Criando o "ajudante"

Ajudantes são funções javascript que tem a função de ajudar a fazer uma operação mais complicada dentro do controller

Que tal um exemplo diferente do que foi apresentado no vídeo? Caso você queira implementá-lo, sugiro que você crie outro projeto para não interferir no código do projeto deste curso, combinado?

Temos a página upload.html, na qual o usuário insere os dados do arquivo que deseja fazer upload. É claro que é um formulário de mentirinha, até porque o processo de upload é mais complexo, mas a ideia aqui é exercitar seu conhecimento adquirido em JavaScript:

```html
<!-- upload.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Upload de arquivo</title>
</head>
<body>
    <label>Informações do arquivo</label>
    <input class="dados-arquivo" placeholder="formato: nome/tamanho/tipo">

    <button onclick="arquivoController.envia()"  >Enviar</button>

    <script src="Arquivo.js"></script>
    <script src="ArquivoController.js"></script>
    <script>
        let arquivoController = new ArquivoController();
    </script>
</body>
</html>
```

Aprendemos a organizar nosso código no padrão MVC e por isso temos uma classe que é uma abstração de um arquivo. Suas propriedade são nome, tamanho, tipo:

```js
class Arquivo {

    constructor(nome, tamanho, tipo) {
        this._nome = nome;
        this._tamanho = tamanho;
        this._tipo = tipo;
    }

    get nome() {
        return this._nome;
    }

    get tamanho() {
        return this._tamanho;    
    }

    get tipo() {
        return this._tipo;
    }
}
```

É claro, temos um controller que sabe instanciar um modelo da classe Arquivo com os dados do formulário, toda vez que o usuário clicar no botão "Enviar":

```js
class ArquivoController {

    constructor() {
        this._inputDados = document.querySelector('.dados-arquivo');
    }

    envia() {
        //cria um Arquivo com as suas propriedades;
        this._limpaFormulario();
        // exibe mensagem no console com os dados do arquivo.
    }

    _limpaFormulario() {
        this._inputDados.value = '';
        this._inputDados.focus();
    }
}

```

Veja que o método envia, de ArquivoController, não está completo porque temos um problema. O problema é que o designer achou melhor ter apenas um campo onde o usuário digita na sequência o nome, o tamanho e o tipo do arquivo. Infelizmente o construtor de Arquivo não está preparado para receber a string com todos os dados, mas cada um em separado como parâmetro do construtor. E por fim, para complicar só mais um pouquinho, a entrada do usuário deve ser toda considerada em caixa alta, ou seja, maiúsculo.

Sua tarefa é implementar o método envia de ArquivoController. Ele deverá ler a entrada do usuário e adequá-la ao construtor de Arquivo. Assim que você conseguir criar uma instância de arquivo, você deve imprimir seus dados no console.

Lembre-se que o usuário digita no campo de entrada os dados do arquivo no formato: nome / tamanho / tipo e deve estar em caixa alta!

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

Vejamos uma implementação do método envia:

```js
envia() {
    let dados = this._inputDados.value.split('/').map(item => item.toUpperCase());
    let arquivo = new Arquivo(...dados); // usando spread operator
    console.log(`Dados do arquivo: ${arquivo.nome}, ${arquivo.tamanho}, ${arquivo.tipo}`);
    this._limpaFormulario();
}
```

Primeiramente, resolvemos o problema do input! A string com todos os dados do arquivo será desmembrada através da função split, que nos devolve um array com cada informação. Depois, a função map cria um novo array, colocando cada informação em caixa alta. No entanto, não podemos passar esse array diretamente para o construtor de Arquivo, pois ele não está preparado para receber um array, mas três parâmetros. Como esses parâmetros equivalem a cada informação no array que criamos a partir da string, passamos o array como parâmetro para o construtor de Arquivo usando o spread operator. Por fim, abusamos salutarmente de template string para exibir as informações do arquivo no console.

Usamos a função map, mas nem era necessário. Que tal converter primeiro para maiúscula antes de realizar o split?

```js
envia() {
    let dados = this._inputDados.value.toUpperCase().split('/');
    let arquivo = new Arquivo(...dados); // usando spread operador
    console.log(`Dados do arquivo: ${arquivo.nome}, ${arquivo.tamanho}, ${arquivo.tipo}`);
    this._limpaFormulario();
}
```

Não é porque map é poderoso que forçaremos seu uso, certo?

Se o tratamento da entrada dos dados do arquivo é feito em outros lugares do sistema, podemos isolar essa responsabilidade em uma classe que pode nos ajudar sempre com essa tarefa, um helper:

```js
class ArquivoHelper {

    static cria(informacao) {
        return new Arquivo(...informacao.toUpperCase().split('/'));
    }
}
```

Não podemos esquecer de importar o script do nosso helper, certo?

Por fim, alterando nosso método.

```js
//ArquivoController.js

envia() {
    let arquivo = ArquivoHelper.cria(this._inputDados.value);
    console.log(`Dados do arquivo: ${arquivo.nome}, ${arquivo.tamanho}, ${arquivo.tipo}`);
    this._limpaFormulario();
}

```

A prática leva à perfeição :)

### Por que...

Temos a seguinte classe:

```js
class ConversorXML {

    static converte(objeto) {
        // converte um objeto em XML
    }
}
```

Agora, vamos criar uma instância desta classe e chamar o método converte:

```js
let conversor = new ConversorXML();
conversor.converte({nome: 'Guaraci', idade: 40});
```

Teste este código no console.

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

Este código não funciona porque o método converte é estático e não será encontrado na instância de uma classe, mas diretamente na classe. Alterando o código para ser válido:

ConversorXML.converte({nome: 'Guaraci', idade: 40});
Métodos estáticos antes do ES6
Curiosidade: como criávamos métodos estáticos antes do ES6? Vejamos um exemplo, com a classe Pessoa:

Vejamos um exemplo do ES6 para declarar uma classe com métodos de instância e métodos estáticos:

```js
class Pessoa {

    constructor(nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }

    obterNomeCompleto() {
        return `${this.nome} ${this.sobrenome}`;
    }

    static metodoStaticoQualquer() {
        console.log('Método estático chamado');
    }

}
```

E antes do ES6. Como implementávamos algo semelhante a métodos estáticos? Vejamos um exemplo:

```js
function Pessoa(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
}

// método de instância
Pessoa.prototype.obterNomeCompleto = function() {
    return this.nome + ' ' + this.sobrenome;
};

// declarando equivalente a método estático

Pessoa.metodoStaticoQualquer = function() {

    console.log('Método estático chamado');

};
```

## Expressão regular ainda melhor

Durante o treinamento utilizamos a seguinte expressão regular para validar se uma data digitada pelo usuário é válida ou não:

`/\d{4}-\d{2}-\d{2}/`

Contudo, ela não garante que a data será sempre correta, pois se o usuário digitar um ano com mais de 4 dígitos ou um dia com mais de dois dígitos ela considerará como correta.

Para ficar ainda melhor, vamos alterar a expressão para

`/^\d{4}-\d{2}-\d{2}$/`
O ˆ indica "começando com " e o $ "terminando com".

Temos um curso de expressão regular para que fiquemos ainda melhor no assunto!

Sucesso e bom estudo meus alunos.

## ó tem métodos estáticos...

Como podemos evitar que alguém instancie uma classe que só possui métodos estáticos, ou seja, uma classe que não faz sentido trabalharmos com uma instância? Reflita sobre isso. Clicando em continuar você verá a resposta do instrutor.

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

Podemos lançar um erro dentro do constructor. Lembre-se que o constructor é chamando quando criamos uma instância de uma classe com o operador new.

```js
class ClasseQualquer {

    constructor() {
        throw new Error('Você não pode criar uma instância dessa classe');
    }

       // métodos estáticos da classe
}
```
