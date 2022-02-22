# Aprofundando em MVC

## Revisando arrow function e seu escopo léxico

A ideia desse exercício é deixar ainda mais clara a diferença do this de uma arrow function do this de uma função tradicional em JavaScript. Sugiro fortemente que você crie os arquivos em um projeto separado, para poder ver o que acontece além da teoria.

Vamos começar por um exemplo clássico. Temos três elementos distintos em nossa página e queremos exibir o conteúdo de cada um deles.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

    <h1>TITULO</h1>
    <p>PARAGRAFO</p>
    <div>DADOS</div>

    <script>
        console.log(this); // é window

        let exibeConteudo = function() {
            console.log(this);
            alert(this.textContent);
        };

        $ = document.querySelector.bind(document);

        $('h1').addEventListener('click', exibeConteudo);

        $('p').addEventListener('click', exibeConteudo);

        $('div').addEventListener('click', exibeConteudo);

    </script>
</body>
</html>
```

Perfeito, quando clicamos em cada um deles, exibimos no console o valor de this, inclusive exibimos um alerta com conteúdo de cada elemento. Repare que o this é dinâmico, ou seja, seu valor é definido no momento em que a função é chamada, jamais no momento em que é declarada. Quando clicamos no h1, o this será este elemento, quando clicamos em p, o this será o elemento. Ainda bem que isso acontece, pois se o this não fosse dinâmico, não conseguiríamos escrever uma função genérica como a nossa.

Que tal declararmos nossa função como uma arrow function, que é menos verbosa? Alterando nosso código:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

    <h1>TITULO</h1>
    <p>PARAGRAFO</p>
    <div>DADOS</div>

    <script>
        console.log(this); // é window

        // arrow function agora!
        let exibeConteudo = () =>  {
            console.log(this);
            alert(this.textContent);
        };

        $ = document.querySelector.bind(document);

        $('h1').addEventListener('click', exibeConteudo);

        $('p').addEventListener('click', exibeConteudo);

        $('div').addEventListener('click', exibeConteudo);

    </script>
</body>
</html>
```

Um teste demonstra que nosso código deixa de funcionar. Primeiro, independente do elemento que eu clique, o this que é impresso no console é window e não aquele elemento do DOM. Segundo, como this é window e ele não possui a propriedade textContent, é exibido undefined para o usuário. Esse problema serve para demonstrar que uma arrow function vai além de uma sintaxe mais enxuta para declararmos funções.

Diferente de uma função, que possui um this dinâmico, uma arrow function possui um this estático, ou seja, que nunca muda e que é determinado no momento em que é declarado! Veja que quando declararmos nossa arrow function, ela vai considerar o this do local onde é declarada. Sendo assim, como o this dentro da tag `<script>` é window, ela adotará window.

Resumindo:

O this de uma função é dinâmico, isto é, seu valor é determinado no momento em que a função é chamada. Como o this é dinâmico, é possível usar artifícios da linguagem, como a API Reflect, para alterá-lo se assim desejarmos.

O this de uma arrow function é léxico, isto é, seu valor é determinado no local onde a arrow function for definida, ela não cria um novo this. O this de uma arrow function não pode ser alterado, mesmo se usarmos recursos da linguagem, como a API Reflect.

No contexto que vimos acima, a arrow function atrapalhou mais do que ajudou. Mas vejamos um exemplo em que seu escopo léxico torna-se muito interessante:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

    <script>

        class SistemaImpressao {

            constructor() {
                this._codigo = 2;
            }

            imprime(nomes) {

                nomes.forEach(function(nome) {
                    console.log(this);
                    console.log(`${this._codigo}: ${nome}`);
                });
            }
        }

        let nomes = ['Flávio', 'Nico', 'Douglas'];
        let si = new SistemaImpressao();
        si.imprime(nomes);

    </script>
</body>
</html>
```

Temos a seguinte classe SistemaImpressao, que possui o método imprime. O método recebe uma lista e para cada item da lista imprime primeiro a versão do sistema, seguido do item. O problema é que o this._codigo acessado em nosso forEach não é de uma instância da classe SistemaImpressao, aliás, ele é undefined. Contudo, se usarmos arrow function, o this usado no forEach usará o this do contexto no qual foi declarado.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

    <script>

        class SistemaImpressao {

            constructor() {
                this._codigo = 2;
            }

            imprime(nomes) {
                // usando arrow function.
                nomes.forEach(nome => {
                    console.log(this);
                    console.log(`${this._codigo}: ${nome}`);
                });
            }
        }

        let nomes = ['Flávio', 'Nico', 'Douglas'];
        let si = new SistemaImpressao();
        si.imprime(nomes);

    </script>
</body>
</html>
```

Agora nosso código funciona!

## Contexto das arrows functions

Um programador de Javascript decidiu criar uma abstração de um relógio em seu código, através da classe Relogio. A ideia é a seguinte: assim que ele instanciar essa classe, deve ser exibida no console a quantidade de segundos a partir da sua criação. Aprendemos que o constructor é chamado toda vez que instanciamos objetos de uma classe:

```js
class Relogio {

    constructor() {
        this._segundos = 0;

        setInterval(function () {
            console.log(++this._segundos);
          }, 1000);
    }
}

var relogio = new Relogio();
```

O problema é que a mensagem exibida no console é NaN (Not a Number) e não os segundos desde que o relógio foi instanciado.

Encontre o erro deste código e pense em uma solução, utilizando o que aprendemos neste capítulo, para que o relógio se comporte como o esperado.

O principal erro deste código está na função passada para setInterval, aonde fazemos o `++this._segundos`. Como setInterval é global e acessível em qualquer canto do nosso código, ele pertence ao objeto global window, logo seu this aponta para window e não para nossa classe Relogio. Como window não possui a propriedade` _segundos`, o incremento resultará em NaN, pois não podemos incrementar uma variável que é undefined.

Uma maneira de resolver esse problema é guardando o this do constructor em uma variável, por exemplo, self e acessá-la quando necessário. Vejamos:

```js
class Relogio {

    constructor() {

        let self = this; // guardando o this que é a instância da classe `Relogio`
        this._segundos = 0;

        setInterval(function () {
            console.log(++self._segundos); // acessando a variável self, que é a instância de `Relogio` 
          }, 1000);

    }
}
```

Contudo, aprendemos a usar arrow functions nesse capítulo, que além de nos fornecer uma sintaxe bastante enxuta, ainda possui escopo léxico, isto é, seu this é estático e não muda.

```js
class Relogio {

    constructor() {
        this._segundos = 0;
        setInterval(() => console.log(++this._segundos), 1000); // usando arrow function. O this é o this de `Relogio`, e não `window`. 
    }
}

var relogio = new Relogio();
```

Assim, ao alterar o valor de `this._segundos`, estamos ainda no contexto de Relogio e o valor é acrescido corretamente. E deste modo o código ficou ainda mais sucinto!

## Mais um pouco de arrow function!

Temos o seguinte objeto criado literalmente usando {}:

```html
<script>
    let carro = {
        velocidade: 100,
        acelera :function() {
            console.log(this);
            console.log(`Carro a ${this.velocidade} km por hora!`);
        }
    };
    carro.acelera();
</script>
```

Perfeito, quando chamamos carro.acelera(), é exibida a mensagem "Carro a 100 km por hora!".

Será que podemos atribuir uma arrow function para a propriedade acelera? Vamos tentar:

```html
<script>
    let carro = {
        velocidade: 100,
        acelera : () =>  {
            console.log(this);
            console.log(`Carro a ${this.velocidade} km por hora!`);
        }
    };
    carro.acelera();
</script>
```

Levando em consideração este último código, qual será o resultado exibido no console do seu Chrome?

Resposta:

```r
Window {external: Object, chrome: Object, document: document, speechSynthesis: SpeechSynthesis, caches: CacheStorage…}

Carro a undefined km por hora!
```

Como escrevemos nosso código dentro da tag script, não estamos dentro de um método ou de outra função, estamos no escopo de window, ou seja, o escopo global. Lembre-se que o this de uma arrow function é léxico, isto é, estático e pega emprestado seu valor do ambiente no qual foi declarado. Como o this naquele ponto em que a arrow function foi declarada é window, seu valor será window. É claro que o escopo global não possui a propriedade velocidade. Veja que este é um exemplo no qual a arrow function atrapalha e que o uso de uma function tradicional é o mais indicado. O this de uma function é dinâmico e muda de acordo com o contexto de evocação da função. Como nossa função está sendo chamada a partir de um objeto, por padrão, o this dessa função será o objeto.

Contudo, há ainda uma terceira solução, mas envolve a declaração de uma variável extra. Podemos guardar uma referência para a instância de NegociacaoController em uma variável. Geralmente essa variável é chamada de `self`:

```js
class NegociacaoController {

    constructor() {

        // a variável self guarda uma referência para this, instância de NegociacaoController

        let self = this;

        // aqui usei uma function tradicional, mas poderia ser uma arrow function também

        this._listaNegociacoes = new ListaNegociacoes(function(model) { 
            self._negociacoesView.update(model);
        });
    }

    // código posterior omitido
}
```

Quando nossa armadilha for executada, o self será nosso NegociacaoController.

## Revisando Reflect.apply

Esse é mais um exercício de revisão. Não é necessário respondê-lo, no entanto praticar esse código vale a pena.

Temos dois objetos criados de maneira literal por uma questão de brevidade, mas que poderiam ser instâncias de uma classe:

```js
let objeto1 = {

    nome: 'Bob'
};

let objeto2 = {

    nome: 'Leo'
}
Temos a seguinte função:

function exibeNome() {

    alert(this.nome);
}
```

O que acontecerá se chamarmos exibeNome? O resultado será undefined, porque o this da função, ou seja, seu contexto não possui a propriedade nome.

Agora, que tal chamarmos a função exibeNome, mas indicando que seu contexto de execução será objeto1? Vejamos:

Reflect.apply(exibeNome, objeto1, []); // exibe 'Bob'
O resultado será o alerta sendo exibido com o texto Bob. Podemos executar a função agora fazendo com que o seu this (contexto) seja objeto2:

Reflect.apply(exibeNome, objeto2, []); // exibe 'Leo'
Como Reflect.apply funciona? O primeiro parâmetro é o método ou função que desejamos invocar. O segundo parâmetro é o contexto que o método ou função adotará, ou seja, o valor que será assumido pelo this. Por fim, o último parâmetro é um array que contém todos os parâmetros que o método passado como primeiro parâmetro receberá. Como ele não recebe parâmetro nenhum, passamos um array vazio.

Vamos alterar nossa função para receber dois parâmetros. O primeiro será um prefixo que será adicionando no nome e o último um sufixo:

```js
function exibeNome(prefixo, sufixo) {

    alert(prefixo + this.nome + sufixo);
}
```

Agora, vamos chamar o método através de Reflect.apply:

`Reflect.apply(exibeNome, objeto1, ['(', ')']); // exibe '(Bob)'`

Veja que agora estamos passando dois parâmetros para o método.

## Reutilização de código com Composição e Mixin

Esse exercício é de apenas reflexão. Você pode executar seu código se assim desejar.

Temos as seguintes classes:

```html
<!-- troca-troca.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <p class="info">Era uma vez...</p>
    <script>

        class Aviao {

            constructor(nome) {
                this._nome = nome;
            }

            voa() {
                alert(`${this._nome} está voando`);
            }

            ligaMotor() {
                console.log('liga o motor');
            }

            fechaPortas() {
                console.log('Portas sendo fechadas');
            }
        }

        class Passarinho {

            constructor(nome) {
                this._nome = nome;
            }

            voa() {
                // hum..precisamos implementar esse método também!
            }
        }

    </script>
</body>
</html>
```

Veja que o método voa de Passarinho não esta completo. Podemos até usar herança e herdar de Aviao, mas com certeza um passarinho não ligaMotor nem fechaPortas. Não podemos usar herança porque Passarinho não é um Aviao.

Reutilização de código através de composição
Uma maneira de solucionar esse problema é usar composição no lugar de herança. Na composição, a classe que deseja usar o método de outra possui uma instância dessa classe. Por mais que a instância tenha vários métodos, só chamamos aqueles que nos interessa:

Alterando nosso código para usar composição:

```html
<!-- troca-troca.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <p class="info">Era uma vez...</p>
    <script>

        class Aviao {

            constructor(nome) {
                this._nome = nome;
            }

            voa() {
                alert(`${this._nome} está voando`);
            }

            ligaMotor() {
                console.log('liga o motor');
            }

            fechaPortas() {
                console.log('Portas sendo fechadas');
            }
        }

        class Passarinho {

            constructor(nome) {
                this._nome = nome;
                // guarda uma instância de avião
                this._aviao = new Aviao(nome);
            }

            voa() {
                // usa o método voa de Aviao
                this._aviao.voa();
            }
        }

    </script>
</body>
</html>
```

Nessa solução, quem usa a instância da classe Passarinho nem sabe que o método voa usa por debaixo dos panos uma instância de Aviao para funcionar. Veja que a composição tem a vantagem de podermos escolher quais métodos queremos reaproveitar, diferente da herança que é tudo ou nada. Contudo, veja que com composição precisamos escrever um pouco mais, pois temos que delegar as chamadas dos métodos voa de Passarinho para o voa de avião.

Ainda há outra forma de resolver este problema sem usar herança nem composição, mas usando mixin!

Reutilização de código através de mixin!
Com mixin podemos "pegar emprestado" o método de outra classe sem termos que ter uma instância dessa classe como é o caso de composição.

Vamos alterar a classe Passarinho removendo a instância de Aviao:

```html
<!-- troca-troca.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <p class="info">Era uma vez...</p>
    <script>

        class Aviao {

            constructor(nome) {
                this._nome = nome;
            }

            voa() {
                alert(`${this._nome} está voando`);
            }

            ligaMotor() {
                console.log('liga o motor');
            }

            fechaPortas() {
                console.log('Portas sendo fechadas');
            }
        }

        class Passarinho {

            constructor(nome) {
                this._nome = nome;
            }

            voa() {
                // executa o método `voa` de `Avião` usando como contexto a instância de `Passarinho`
                Reflect.apply(Aviao.prototype.voa, this, []);
            }
        }

    </script>
</body>
</html>
```

Olha ai o Reflect.apply novamente! Nesta linha de código estamos querendo executar o método voa da classe Aviao, mas usando como contexto o this da instância de Passarinho. O último parâmetro é um array que contém os parâmetros do método. Como voa não recebe parâmetro algum, passamos um array vazio.

Um detalhe: foi necessário fazer Aviao.prototype.voa porque métodos criados usando ES6 são adicionados no prototype. Qualquer método adicionado em prototype estará disponível para todas as instâncias.

### padrão de projeto Observer

No final deste capítulo implementamos uma solução para automatizar o processo de atualização da view toda vez que o modelo mudar. O que fizemos na verdade foi implementar o padrão de projeto Observer.

O padrão de projeto Observer
Usamos o padrão de projeto Observer sempre que queremos notificar partes do sistema interessadas quando um evento importante for disparado em nosso sistema.

No contexto da nossa aplicação, entendemos um evento como o ato de adicionar ou esvaziar nossa lista de negociações. É a view que está interessada em observar esse evento e tomar uma ação, no caso, se atualizar com base no estado mais atual do modelo.

## Padrão de projeto proxy

A solução de jogar uma armadilha no construtor da lista é legal, funciona mas polui o código com responsabilidades que não eram para ser a dele, pois ele é um modelo e é a parte do código que é muito requisitada no código. E o update tem uma responsabilidade da view ( então isso é um fator que pode deixar nosso código mais confuso).

Para isso eu chamo um modelo de mentirinha, que encapsula o modelo real que queremos acessar dentro do controller mesmo. A esse padrão de projeto chamamos de proxy, e aplicaremos a mesma armadilha dentro desse proxy

E para chamar ela no js eu faço

```js
new negProxy(instancia do objeto(), {armadilhas});
```

E o que fica dentro das chaves é onde ficam as armadilhas (trap), e o conjunto de armadilhas é chamada de handlers

### Vantagens do Proxy

Sobre o padrão de projeto Proxy, podemos afirmar que:

1) Ele é útil quando queremos deixar os nossos modelos mais limpos, sem várias armadilhas penduradas nos seus métodos. Por exemplo, evitando pendurar um código de infraestrutura em nossos modelos.

2) Ele modifica o objeto original, enxertando nele todo aquele código que desejamos executar.

3) Ele serve como um placeholder de um objeto real, servindo como uma interface para o objeto que queremos interagir, nos permitindo controlar o acesso às suas propriedades e métodos.

Apenas as afirmativas 1 e 3 são corretas.

O padrão de projeto Proxy nada mais é do que um objeto "falso", "mentiroso", que envolve e encapsula o objeto real que queremos interagir. É como se fosse uma interface, entre o objeto real e o resto do código. Conseguimos assim controlar o acesso aos seus atributos e métodos. Nele também podemos pendurar códigos que não cabem de estar alocados nos nossos modelos, mas que necessitam ser executados no caso de uma alteração ou atualização do mesmo.

### Target, prop ou receiver ?

Vejamos o seguinte exemplo:

```js
let pessoa = {
    nome: 'Flávio'
}

let pessoaProxy = new Proxy(pessoa, {
    get(target, prop, receiver) {
         //...
    }
});
```

Como segundo argumento de um proxy, passamos um handler, que é um objeto JavaScript que contém as armadilhas (traps) do nosso Proxy. Neste objeto, podemos criar uma propriedade get e passar para ela uma função com 3 parâmetros.

```js
get(target, prop, receiver) {
    //...
}
```

Sobre estes 3 parâmetros, qual das afirmativas abaixo é completamente verdadeira?

```r
O target é o objeto real, que é encapsulado pelo proxy.

O prop é a propriedade que está sendo lida.

O receiver é uma referência ao próprio proxy.
```

O target é o objeto real que é encapsulado pela proxy. É este objeto que não queremos "sujar" com armadilhas ou qualquer código que não diga respeito ao modelo.

O prop é a propriedade em si, que está sendo lida naquele momento.

O receiver é a referência ao próprio proxy. É na configuração do handler do Proxy que colocamos armadilhas.

Aprendemos neste capítulo a criar proxies, que nada mais são do que objetos mentirosos que encapsulam outros, mais notadamente objetos do nosso modelo. Pense em proxies como "cascas" que envolvem objetos. Dentro desse contexto, só podemos "tocar" os objetos encapsulados passando pelo proxy. É justamente essa característica que torna o uso desse padrão de projeto tão poderoso.

Temos o seguinte objeto literal (aquele criado com chaves):

let funcionario = {email: 'abc@abc.com'};
Crie um proxy para este objeto, exibindo no console a mensagem "Armadilha aqui", toda vez que a propriedade email for lida.

Uma implementação possível é:

```js
let funcionario = {email: 'abc@abc.com'};
let funcionarioProxy = new Proxy(funcionario,  {

    get(target, prop, receiver) {
        console.log('Armadilha aqui!');
        return Reflect.get(target, prop, receiver);
    }

});
console.log(funcionarioProxy.email);
```

Veja que a instrução a seguir é muito importante: return Reflect.get(target, prop, receiver). É ela que efetivamente realiza a operação no objeto real. Aliás, poderíamos ter conseguido o mesmo resultado da seguinte maneira:

```js
let funcionario = {email: 'abc@abc.com'};
let funcionarioProxy = new Proxy(funcionario,  {

    get(target, prop, receiver) {
        console.log('Armadilha aqui!');
        return target[prop];
    }

});
console.log(funcionarioProxy.email);
```

Há uma ligeira diferença entre as duas. Na primeira, get retorna uma função que é invocada para obter o valor da propriedade original, na segunda, o valor é retornado diretamente. Entenda que `Reflect.get` cria algo semelhante a uma getter. Você ainda lembra que um getter é uma espécie de função?

Segue uma implementação:

```js
let funcionario = new Proxy(new Funcionario('abc@abc.com'), {

    get(target, prop, receiver) {
        console.log('Armadilha aqui!');

        return Reflect.get(target, prop, receiver);
    }

});

console.log(funcionario.email);
```

Veja que teremos três mensagens de log no console. As duas primeiras Armadilha aqui! e logo depois o email do usuário. Mas qual a razão dele escrever a primeira mensagem duas vezes?

É que email é um getter. Nosso proxy irá executar seu código quando o getter for chamado e também para a propriedade _email, que é acessada pelo getter. Inclusive podemos deixar isso ainda mais claro, exibindo em nosso proxy o nome da propriedade:

```js
let funcionario = new Proxy(new Funcionario('abc@abc.com'), {

    get(target, prop, receiver) {
        console.log('Armadilha aqui!');
        console.log(prop);
        return Reflect.get(target, prop, receiver);
    }

});

console.log(funcionario.email);
```

## Mais um proxy, agora para lidar escrita!

Olha o funcionário no formato literal novamente aí gente:

`let funcionario = {email: 'abc@abc.com'};`

Crie um proxy que exibe no console o valor da propriedade antes dela ser alterada e o valor novo.

Opinião do instrutor

Uma implementação possível:

```js
let funcionario = {email: 'abc@abc.com'};
let funcionarioProxy = new Proxy(funcionario,  {

    set(target, prop, value, receiver) {
        console.log(`Valor antigo ${target[prop]}, valor atual: ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }

});
funcionarioProxy.email = 'aaa@aaa.com';
```

Veja que usamos set no handler passado para o proxy. Além disso, muito cuidado que quando usamos set, a função deve receber quatro parâmetros e não três, como no caso do get.

Poderíamos conseguir o mesmo resultado desta forma:

```js
let funcionario = {email: 'abc@abc.com'};
let funcionarioProxy = new Proxy(funcionario,  {

    set(target, prop, value, receiver) {
        console.log(`Valor antigo ${target[prop]}, valor atual: ${value}`);
        target[prop] = value;
    }

});
funcionarioProxy.email = 'aaa@aaa.com';
```

A diferença é que essa última solução altera diretamente o valor o objeto encapsulado. A primeira forma, com `Reflect.set` sempre deve retornar um valor, que é uma função que será chamada para realizar a operação de atribuição. Por enquanto, podemos usar uma ou outra forma que o resultado será o mesmo.

## Um esclarecimento extra é sempre bom!

Durante o vídeo, para explicar como executar uma armadilha quando uma propriedade for modificada, eu usei como exemplo uma instância da classe Negociacao. Contudo, nossa classe era imutável porque usamos Object.freeze. Sendo assim, o seguinte código não teria efeito:

```js
n1._quantidade = 10;
n1._valor = 10;
```

E realmente não tem, mas ainda sim a armadilha definida no proxy será executada! Resumindo a moral da história: armadilhas serão disparadas mesmo se tentarmos modificar uma propriedade congelada de um objeto, ainda que ele não seja modificado.

## Arguments

Aprendemos lá no jardim de infância em JavaScript a passar parâmetros para funções e métodos. Vejamos um exemplo:

```js
function exibeNomeCompleto(nome, sobrenome) {

  alert(`${nome} ${sobrenome}`);
}

exibeNomeCompleto('Flávio', 'Almeida');
```

Contudo, podemos conseguir o mesmo resultado sem passar parâmetros para a função:

```js
function exibeNomeCompleto() {

  alert(`${arguments[0]} ${arguments[1]}`);
}

exibeNomeCompleto('Flávio', 'Almeida');
```

Por mais que nossa função não receba parâmetros, podemos ter acesso aos parâmetros passados com `arguments`. É uma variável implícita que nos dá acesso a todos os parâmetros passados para a função ou método. É claro que a primeira forma, nomear os parâmetros da função, é menos verbosa e mais legível. Mas há muitos hacks em JavaScript que podem fazer uso de `arguments`.

## Proxy Intercepta métodos?

Temos a seguinte declaração de classe:

```js
class Pessoa {

    constructor(nome) {
        this._nome = nome;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

    grita(frase) {
            return `${this._nome} grita ${frase}`;
    }
}
```

Criando uma instância e chamando o método grita:

```js
let pessoa = new Pessoa('Barney');
pessoa.grita('Olá');
```

E se quisermos interceptar a chamada do método grita? A má notícia é que toda proxy criada, por padrão, não esta preparada para interceptar métodos (getters e setters são exceções a este problema). Essa limitação ocorre porque sempre que um método de um objeto (que não deixa de ser uma propriedade que armazena uma função) é chamado, primeiro é realizado uma operação de leitura (get, do nosso handler da proxy) e depois os parâmetros são passados através de Reflect.apply. O problema é que, como o método é interceptado pelo get do handler passado para a proxy, não temos acesso aos seus parâmetros. E agora?

Uma solução é implementar o seguinte código:

```js
let pessoa = new Proxy(new Pessoa('Barney'), {

        get(target, prop, receiver) {
            if(prop == 'grita' && typeof(target[prop]) == typeof(Function)) {
         // essa função retornada irá substituir o método 'grita' no proxy!!! Ou seja, estamos usando o handler do proxy para modificar o próprio proxy, que loucura!
                return function() {
                    console.log(`Método chamado: ${prop}`);    
                    // Quando usarmos Reflect.apply, Reflect.get e Reflect.set precisamos retornar o resultado da operação com return
                    // arguments é uma variável implícita que dá acesso à todos os parâmetros recebidos pelo método/função
                    return Reflect.apply(target[prop], target, arguments);       
                }
            }
            // só executa se não for função
            return Reflect.get(target, prop, receiver);
        }
    });

   pessoa.grita('Olá');
```

No código acima, verificamos se a propriedade que está sendo acessada é uma função através de `typeof(target[prop]) == typeof(Function))`. Se for, trocaremos o valor da propriedade (nosso método) por outra função, e, essa sim, executa nosso código antes de o método ser executado.

Sobre o código anterior, qual o papel de arguments?

A variável arguments é uma variável implícita que pode ser acessada em métodos ou funções. Ele se comporta como um array onde cada posição equivale ao parâmetro que foi passado para o método ou função. Existe desde o ES5!

Vejamos um exemplo:

```js
function geraNomeCompleto() {

    alert(`Nome completo: ${arguments[0]} ${arguments[1]}`);
}

geraNomeCompleto('Flávio', 'Almeida');
```

Apesar de a função não receber parâmetros e estarmos passando dois, não haverá qualquer erro. Inclusive, dentro da função usamos a variável implícita arguments para termos acesso ao primeiro e ao segundo parâmetros passado para a função.

Veja que no código do nosso proxy, como estamos substituindo o método grita por outra função e não sabemos se ela recebe ou não um parâmetro, usamos arguments na função substituta para chamarmos `Reflect.apply`, garantindo assim que a nova função, quando executada, receba corretamente seus parâmetros logo após executarmos o código que desejarmos (armadilha).

## Qual é o resultado?

Temos a já conhecida classe Pessoa que usamos em exercícios anteriores. Inclusive criamos mais uma vez uma proxy para interceptarmos a chamada ao método grita:

```js
class Pessoa {

    constructor(nome) {
        this._nome = nome;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

    grita(frase) {
        return `${this._nome} grita ${frase}`;
    }
}

let pessoa = new Proxy(new Pessoa('Barney'), {

        get(target, prop, receiver) {
            if(prop == 'grita' && typeof(target[prop]) == typeof(Function)) {

                return function() {
                    console.log(`Interceptei o método: ${prop}, por isso estou exbindo essa mensagem!`);    
                    Reflect.apply(target[prop], target, arguments);       
                }
            }
            return Reflect.get(target, prop, receiver);
        }
    });

   console.log(pessoa.grita('Olá'));
```

Qual das opções abaixo contém o resultado de `console.log(pessoa.grita('Olá'))`?

undefined

O resultado de console.log(pessoa.grita('Olá')) é undefined. Isso acontece porque estamos chamando `Reflect.apply(target[prop], target, arguments)` sem retornar seu valor. Uma solução é adicionar a cláusula return:

```js
let pessoa = new Proxy(new Pessoa('Barney'), {

        get(target, prop, receiver) {
            if(prop == 'grita' && typeof(target[prop]) == typeof(Function)) {

                return function() {
                    console.log(`Interceptei o método: ${prop}, por isso estou exbindo essa mensagem!`);   

                    // FALTAVA O RETURN AQUI!
                    return Reflect.apply(target[prop], target, arguments);  // retorna o valor resultante da chamada da função
                }
            }
            return Reflect.get(target, prop, receiver);
        }
    });
```

Agora, quando fizemos console.log(pessoa.grita('Olá')) o retorno do método grita de pessoa será passado para console.log imprimindo seu resultado no console que é "Barney grita 'Olá'". E se quiséssemos exibir o valor que será retornado no console.log do nosso handler?

```js
let pessoa = new Proxy(new Pessoa('Barney'), {

  get(target, prop, receiver) {

    if(prop == 'grita' && typeof(target[prop]) == typeof(Function)) {

      return function() {

        console.log(`Interceptei o método: ${prop}, por isso estou exbindo essa mensagem!`);    

        // aguarda o retorno em uma variável 
        let retorno = Reflect.apply(target[prop], target, arguments);

        console.log(`O valor retornado do método foi ${retorno}`);

        return retorno; // retornando o resultado do método
      }
    }

    return Reflect.get(target, prop, receiver);
  }

});
```

## setters

Uma implementação possível:

```js
let funcionario= new Proxy(new Funcionario('abc@abc.com'),  {

    set(target, prop, value, receiver) {
        console.log(prop); // imprimindo a propriedade que está sendo alterada
        console.log(`Valor antigo ${target[prop]}, valor atual: ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
});

funcionario.email = 'aaa@aaa.com';
```

Veja que usamos set no handler passado para o proxy. Além disso, muito cuidado que quando usamos set, a função deve receber quatro parâmetros e não três, como no caso do get.

Reparou que a mensagem do proxy é exibida duas vezes? É que email é um setter. Nosso proxy irá executar seu código quando o setter for chamado e também para a propriedade _email, que é modificada pelo setter.

## Será que cabe na cesta?

Vimos o parâmetro rest (i.e. resto) nesse capítulo, quando enviamos diversos métodos para serem monitorados no Proxy. Agora, considere que um aluno está tentando usar rest, mas sem sucesso:

```js
// o código abaixo tem um problema, não funciona
class Cesta{
    constructor(tipo, [items...]){
        //lógica
    }
}
```

E em algum outro lugar, alguém que cria uma instância da classe Cesta:

`let cesta = new Cesta('fruta', ['banana', 'tomate', 'maçã']);`

Vemos que tem algo errado! Como podemos consertar esse código com rest, para que possamos passar infinitas frutas, e no constructor declarar apenas uma variável para elas?

Alteramos o constructor:

```js
constructor(tipo, ...items) {
    //lógica
}
```

E chamamos:

`let cesta = new Cesta('fruta', 'banana', 'tomate', 'maçã');`

No final, as variáveis no construtor ficarão:

```js
tipo : 'fruta';
itens : ['banana', 'tomate', 'maçã'].
```

O rest lembra o spread, só que o spread fica dentro de um vetor, o rest cria o vetor

## Padrão de projeto factory

Por ser um tanto verbosa e dar um pouco de medo também, mas que tal colocar menos coisas no controller e criar algo ainda mais assustador? hahahah criando um esqueleto de proxys que podem ser usados de várias formas

O padrão de projeto Factory

Sobre o padrão de projeto Factory, julgue as afirmativas abaixo:

1) Ele é utilizado quando precisamos facilitar a criação de um objeto.

2) É ideal quando queremos criar objetos similares, com apenas seus detalhes diferentes, que podemos passar nos argumentos da Factory.

3) É bom para abstrair a criação de um objeto complexo, já que o programador que utilizar a Factory não precisa necessariamente saber como é feita esta operação.

Todas as afirmativas são verdadeiras.

O padrão de projeto Factory é um dos padrões mais utilizados no desenvolvimento. Ele é mais um da categoria dos patterns responsáveis por criar objetos, como o Builder e o Prototype.

### Mais fábrica

Vamos misturar os conceitos um pouco, afinal isso é um treinamento avançado, certo?

Usamos o padrão Factory para isolar ou encapsular a complexidade da criação do proxy, mas uma fábrica pode fazer mais! Quero dizer que existem outros motivos para usar uma fábrica.

Não sou especialista em bolsa de valores, no entanto sei que, além de ações de uma empresa, existem também opções para comprar. Uma opção dá o direito de comprar ou vender uma determinada ação/índice na bolsa de valores. Opções também são negociadas! Ou seja, além de ações podemos negociar, comprar e vender opções.

Para representar isso no nosso modelo, poderíamos criar duas filhas da classe Negociacao: NegociacaoAcao e NegociacaoOpcao.

Agora precisamos decidir no nosso código qual das duas classes devemos instanciar! Não vai ter jeito, e em algum lugar precisará ter um if:

```js
var negociacao = null;

let tipoNegociacao = "opcao"; //isso poderia vir de um formulário web

if(tipoNegociacao == "opcao") {
    negociacao = new NegociacaoOpcao(/*passando params aqui*/);
} else {
    negociacao = new NegociacaoAcao(/*passando params aqui*/);
}
```

Nesse exemplo, a decisão é relativamente simples, mas se tivesse mais parâmetros para avaliar? E se a gente precisasse desse if em mais de um lugar?

Onde vamos colocar essa decisão?

A resposta é: vamos colocar aquele if dentro de uma factory.

Podemos criar uma classe NegociacaoFactory, que possui um método de criação:

```js
class NegociacaoFactory {

    static create(tipoNegociacao, dados) {
        if(tipoNegociacao == "opcao") {
            return new NegociacaoOpcao(dados.data, dados.quantidade, dados.valor);
        }
        return new NegociacaoAcao(dados.data, dados.quantidade, dados.valor);
    }
}

let n = NegociacaoFactory.create("acao", {'data': new Date(), 'quantidade': 2, 'valor': 34.3});
```

Repare que a Factory possui mais uma outra responsabilidade, instanciar `NegociacaoAcao` ou `NegociacaoOpcao`. A fábrica decide então qual implementação usar. Para quem chama, isso pouco importa, pois basta saber que recebemos uma Negociacao.

## Fábricas na API JavaScript

As fábricas não só fazem parte do nosso código, como também da API do JavaScript. Já existem várias classes que aproveitam esse padrão.

Por exemplo, a classe String possui um método (ou factory method) para transformar vários CharCode em uma string:

`let abc = String.fromCharCode(65, 66, 67);  // "ABC"`

Outro exemplo é a classe Array, que pode receber uma string ou um iterável, como lista ou mapas, para criar um array:

```js
let d = Array.from("abc");
["a", "b", "c"]
```

Teste os dois métodos de fábrica agora no seu navegador :)

### DateHelper é um Factory?

Hora da reflexão! Não é necessário responder este exercício, apenas "meditar" sobre o que é exposto.

O que você acha de promovermos nosso DateHelper para Factory? Pode ser que isso tenha passado em sua cabeça, mas na verdade nosso DateHelper não é um Factory.

O padrão de projeto Factory ocorre quando temos uma classe que nos ajuda a criar um objeto complexo, ou seja, ela esconde de nós os detalhes de criação desse objeto. É por isso que uma classe Factory possui apenas um método. Faz sentido, porque se tivéssemos que chamar mais de um para criar um objeto a responsabilidade de sua criação cairia em nosso colo.

Já nosso DateHelper, que está mais para um DateConverter (por que não pensei nesse nome antes?!), tem como responsabilidade converter datas. Ele possui dois métodos que focam a criação de texto para data e data para texto. Apesar da classe isolar a complexidade de construção de uma data, ela atua mais como um conversor do que uma Factory.

### Consolidando seu conhecimento 1

Hora de praticar, implementando as novas funcionalidades apresentadas na seção. Como de costume, segue um resumo dos passos que devem ser executados:

1 - Isole o código que constrói um Proxy e sua complexidade na classe ProxyFactory.

2 - Esconda a construção do Proxy utilizando um objeto Bind.

3 - Altere NegociacaoController para usar as classes que você acabou de criar.

4 - Remova os atributos que representam as views do controller passando direto para o Proxy, afinal, apenas ele deverá manipular a view!

## Consolidando seu conhecimento 2 (importante)

Você deve ter estranhado esse exercício vir depois do exercício "Consolidando seu conhecimento 1". Isso não foi por acaso. Apesar de o código apresentado neste capítulo ser totalmente funcional, ele pode falhar em outros cenários que não sejam o dessa aplicação. Queremos um código genérico, não é mesmo? A alteração é ínfima, mas envolve uma revisão do que aprendemos de proxy. Preparado?

Vamos revisitar a classe ProxyFactory:

```js
class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {

                get(target, prop, receiver) {

                    if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                        return function() {

                            console.log(`interceptando ${prop}`);
                            Reflect.apply(target[prop], target, arguments);
                            acao(target);
                        }
                    }

                    return Reflect.get(target, prop, receiver);
                },

                set(target, prop, value, receiver) {

                    if(props.includes(prop)) {
                        target[prop] = value;
                        acao(target);    
                    }

                    return Reflect.set(target, prop, value, receiver);
                }
        });
    }

    static _ehFuncao(func) {

        return typeof(func) == typeof(Function);
    }
}
```

Com o projeto aberto no Chrome, abra o console e crie um objeto que possui um método que retorna um valor. Você pode cortar e colocar o código a seguir:

```js
let pessoa = { 
    nome: 'Flávio', 
    sobrenome: 'Almeida', 
    getNomeCompleto() {
        return `${this.nome} ${this.sobrenome}`;
    }
}
```

Se quisermos obter o nome completo fazermos `pessoa.getNomeCompleto()` o que exibirá no console a mensagem "Flávio Almeida". Perfeito.

Agora vamos criar um proxy desse objeto. Ainda com o Chrome aberto, cole o seguinte código no seu terminal:

```js
let pessoaProxy = ProxyFactory.create(pessoa, ['getNomeCompleto'], () => console.log('armadilha aqui'));
```

Criamos nosso proxy! Agora vamos chamar o método `pessoaProxy.getNomeCompleto()`. O que deve acontecer? Três saídas devem acontecer. A primeira, da ProxyFactory que indica o que esta sendo interceptado, a segunda é armadilha aqui que nós definimos. Por fim, o retorno de getNomeCompleto que deve ser Flávio Almeida. Faça um teste e veja algo curioso:

`pessoaProxy.getNomeCompleto()`;
No lugar de exibir Flávio Almeida, o resultado é undefined! Isso acontece, porque em nossa ProxyFactory, quando interceptamos um método, não estamos fazendo com que o valor resultante da chamado do método seja retornado! Resumindo: do jeito que está, métodos com retorno de proxies criadas a partir da ProxyFactory retornarão sempre undefined! E agora?

A correção é simples. Vamos na parte do nosso código que identificamos que a propriedade é uma função. Vou colocar apenas esse trecho de código:

```js
// ProxyFactory.js
// código anterior omitido

if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

    return function() {

        console.log(`interceptando ${prop}`);
        Reflect.apply(target[prop], target, arguments);
        acao(target);
    }
}
// código posterior omitido
```

Veja que em nenhum momento retornamos o resultado de `Reflect.apply(target[prop], target, arguments)`. Não podemos simplesmente colocar um return na frente dessa instrução porque assim acao(target) nunca será executado. Vamos guardar o retorno em uma variável, chamar acao(target) e aí sim retornar o resultado da operação:

```js
// ProxyFactory.js
// código anterior omitido

if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

    return function() {

        console.log(`interceptando ${prop}`);
        let retorno = Reflect.apply(target[prop], target, arguments);
        acao(target);
        return retorno;
    }
}
// código posterior omitido
```

Se por acaso o método não retornar nada, não faz mal, o retorno será undefined, algo totalmente esperado.

Agora, recarregue a página index.html mais uma vez cole o código abaixo para realizar um novo teste:

```js
let pessoa = { 
    nome: 'Flávio', 
    sobrenome: 'Almeida', 
    getNomeCompleto() {
        return `${this.nome} ${this.sobrenome}`;
    }
}

let pessoaProxy = ProxyFactory.create(pessoa, ['getNomeCompleto'], () => console.log('armadilha aqui'));

pessoaProxy.getNomeCompleto();
```

Agora sim! Interceptamos o método e o seu retorno agora é disponível para quem o chamou. Como nenhum dos métodos interceptados da nossa aplicação retornavam um valor, a ausência dessa mudança não impactava no resultado final. Mas como disse, queremos uma solução genérica que possa ser usada em qualquer situação, inclusive para métodos que retornam valor.

Por fim, há ainda uma pequena alteração que envolve mais performance. Quando interceptamos a escrita em uma propriedade, nosso handler set é executado. Vejamos seu código:

```js
// ProxyFactory.js
// código anterior omitido
set(target, prop, value, receiver) {

    if(props.includes(prop)) {
        target[prop] = value;
        acao(target);    
    }
    return Reflect.set(target, prop, value, receiver);
}
// código posterior omitido
```

O código funciona, mas um olhar atento percebe que se a propriedade é uma que estamos monitorando, aplicamos `target[prop]= value` para aplicar o valor recebido na propriedade. Mas veja que precisamos fazer a mesma coisa se a propriedade não é monitorada, caso contrário ela nunca receberá seu valor. É por isso que logo em seguida realizamos return `Reflect.set(target, prop, value, receiver)`. Veja que há um return porque uma atribuição em uma propriedade setter pode retornar um valor, apesar de isso não ser comum. Sendo assim, atualizamos o objeto original encapsulado duas vezes quando ele possui uma propriedade que queremos interceptar e executar uma armadilha. Otimizando nosso código:

```js
// ProxyFactory.js
// código anterior omitido

set(target, prop, value, receiver) {

    let retorno = Reflect.set(target, prop, value, receiver);
    if(props.includes(prop)) {
        acao(target);    
    }
    return retorno;
}
// código posterior omitido
Se quiser, ainda podemos remover o bloco do if:

// ProxyFactory.js
// código anterior omitido
set(target, prop, value, receiver) {

    let retorno = Reflect.set(target, prop, value, receiver);
    if(props.includes(prop)) acao(target);    // só executa acao(target) se for uma propriedade monitorada
    return retorno; 
}
// código posterior omitido
```

Agora a ProxyFactory está ainda mais redondinha!

Por último implemente a classe Bind. Ela receberia três parâmetros apenas: o modelo, as propriedades que desejamos monitorar e a view. Não se esqueça de utilizar os parâmetros REST.

## O objeto XMLHttpRequest

Vimos na aula como enviar uma requisição usando o XMLHttpRequest que segue basicamente os passos seguintes:

```js
let xhr = new XMLHttpRequest();
xhr.open('GET', 'negociacoes/semana');
xhr.onreadystatechange = function() {

}
xhr.send();
```

Criamos o objeto, abrimos uma conexão, usamos a propriedade onreadystatechange e enviamos a requisição. A propriedade `onreadystatechange` guarda uma função para:

Resposta: ... ser executada automaticamente cada vez que há uma alteração no estado da requisição.

Uma requisição passa por estados, por isso o nome da propriedade em português é pronto para mudança de estado. Podemos passar uma função que verifica os estados e executará uma ação, como fizemos no video:

```js
xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) { //status 4
        if(xhr.status == 200) {
            console.log(xhr.responseText);
        } else {
            console.log(xhr.responseText);
            this._mensagem.texto = 'Não foi possível obter as negociações';
        }
    }
}
```

Cada status é representado através de um inteiro. Os estados possíveis são:

```r
0: requisição ainda não iniciada.
1: conexão com o servidor estabelecida.
2: requisição recebida.
3: processando requisição.
4: requisição concluída e a resposta esta pronta.
```

Você encontrará mais informações sobre o objeto `XMLHttpRequest` no da Mozilla Developer Network.

### Você sabia? Conheça a história do nome XMLHttpRequest

Vimos como usar o objeto XMLHttpRequest para enviar uma requisição AJAX. O estranho foi que nem usamos XML, e sim JSON! Para que então esse XML no nome?

A extensão XML foi um legado que ficou, mas hoje em dia é menos importante e até confuso. O XMLHttpRequest foi criado pela Microsoft (dentro da equipe Outlook), e o XML realmente era o mais usado na época . O Firefox implementou um objeto com o mesmo nome, mas que trabalhava com a estrutura de dados JSON e que acabou se tornando muito popular.

Muitas vezes, para usar AJAX, precisaremos de frameworks como o próprio jQuery, prototype ou AngularJS. Esses frameworks não só abstraem detalhes sobre o XMLHttpRequest como também oferecem vários outros recursos. Mas tenho certeza que você já sabe disso...

### Error-first Callback, nome chique!

O Error-first Callback, ou errorback, é um padrão que foi adotado no mundo Node.js. Como você já aprendeu, o callback é uma função chamada quando uma tarefa for executada, como uma requisição Ajax ou o acesso ao banco de dados. No entanto, a qualquer momento pode acontecer um erro no processamento e aí vem a questão de como lidar com isso.

A convenção é que cada callback receba sempre o erro no primeiro parâmetro. Na função callback, basta então verificar esse parâmetro para saber se ocorreu um erro ou não!

Não abordamos Node.js neste treinamento, mas um exemplo não faz mal a ninguém.

Por exemplo, para ler um arquivo com Node.js, podemos escrever o seguinte código:

```js
fs = require('fs');
fs.readFile('./arquivo.txt', function(erro, dados) {
    if(erro) {
        console.log('Um erro ocorreu');
        return;
    }
    console.log(dados);
});
```

Repare que a função readFile recebe como segundo parâmetro o callback, que por sua vez tem dois parâmetros: o erro e os dados; e dentro do callback testamos o erro!

## Que tal enviar dados para o servidor?

Durante o treinamento, lidamos apenas com requisições do tipo GET, porque eu pressupunha que você já conhecia o XMLHttpRequest. Contudo, para dar um brilho ainda maior em sua experiência, vamos praticar um pouquinho mais. Desta vez, realizaremos uma requisição do tipo POST para enviar dados para o servidor. Só fique atento com a volatilidade dos dados cadastrados, isto é, se você reiniciar o servidor, perderá os dados enviados. Aliás, não há problema nenhum nisso, porque a ideia aqui é focar o código no lado do cliente, ou seja, código JavaScript e não código do back-end.

Para conseguir realizar uma requisição do tipo POST você precisa:

HTTP POST para /negociacoes;
Usar o cabeçalho Content-type sendo application/json;
No body um JSON da negociação.
Já preparamos um HTML bem básico para começar o cadastro! Para usá-lo no projeto crie uma nova página post.html, dentro do diretório aluraframe/client:

```html
<!-- aluraframe/client/post.html -->
<html>
<head>
    <meta charset="UTF-8">
    <title>Negociações</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">
</head>

<body class="container">
    <form class="form">

        <div class="form-group">
            <label for="data">Data</label>
            <input type="date" id="data" class="form-control" required autofocus/>        
        </div>    

        <div class="form-group">
            <label for="quantidade">Quantidade</label>
            <input type="number" min="1" step="1" id="quantidade" class="form-control" value="1" required/>
        </div>

        <div class="form-group">
            <label for="valor">Valor</label>
            <input id="valor" type="number" class="form-control"  min="0.01" step="0.01" value="0.0" required />
        </div>

        <button class="btn btn-primary" type="submit" onclick="sendPost(event)">Enviar dados para servidor</button>
    </form>

    <script>

        function sendPost(event) {

            event.preventDefault();
            console.log("Enviando post");

            //aqui você deve ler os dados do formulário
            //construir o json
            //enviar o XMLHttpRequest
        }
    </script>
</body>
</html>
```

Se você achou que eu daria a solução logo de cara, se enganou! Contudo, depois de quebrar a cabeça, veja a solução do problema na minha resposta :)

Obs: Não esqueça de subir o servidor com npm start. Para acessar a página post.html, basta digitar localhost:3000/post.html

Nosso código é bem simplório e não aproveita toda nossa estrutura MVC, mas vale para conhecer melhor o objeto XMLHttpRequest.

```html
<!-- aluraframe/client/post.html -->
<!-- código anterior omitido -->
    <script>
        function sendPost(event) {

            event.preventDefault();

            console.log("Enviando post");

            const $ = document.querySelector.bind(document);
            const inputData = $('#data');
            const inputQuantidade = $('#quantidade');
            const inputValor = $('#valor');

            const negociacao = {
                data: inputData.value,
                quantidade: inputQuantidade.value,
                valor: inputValor.value
            };

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/negociacoes", true);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        inputData.value = '';
                        inputQuantidade.value = 1;
                        inputValor.value = 0.0;
                        inputData.focus();
                        alert('Negociação enviada com sucesso');
                    } else {
                        alert(`Não foi possível enviar a negociação: ${xhr.responseText}`);
                    }
                }
            }
            xhr.send(JSON.stringify(negociacao));

    }
    </script>
<!-- código posterior omitido -->
```

Um detalhe: não podemos enviar o objeto negociacao diretamente, precisamos convertê-lo para string, porque no protocolo HTTP os dados são transmitidos no formato texto. Veja que fizemos o contrário de quando recebemos os dados vindos do servidor. Lá, convertemos string em objeto.

## Programação procedural não!

Olá! Esse é um exercício que você não precisa enviar resposta, mas deve implementar a alteração sugerida!

Aprendemos que o paradigma da orientação a objetos prega uma forte conexão entre dado e comportamento. Contudo, se olharmos a classe NegociacoesView vemos que ela foge um pouco dessa ideia. Vejamos parte do seu template:

```html
<!-- aluraframe/client/js/views/NegociacoesView.js -->
<td>
    ${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)}
</td>
```

Nesse ponto, iteramos sobre a lista de negociações do modelo ListaNegociacoes aplicando a função reduce para calcular o volume total. Esta é uma solução procedural onde temos o dado ListaNegociacoes de um lado e o comportamento que calcula o volume total do outro, ou seja, em NegociacoesView.

Uma solução mais orientada a objetos é criarmos um getter chamado volumeTotal em ListaNegociacoes. Com essa alteração, nosso template NegociacaoView pode acessar esse getter para obter o volume total das negociações. Dessa forma, onde quer que ListaNegociacoes seja utilizada, os dados e o comportamento que calcula o volume total caminharão juntos.

Alterando aluraframe/client/js/app/models/ListaNegociacoes.js:

```js
class ListaNegociacoes {

    constructor() {

        this._negociacoes = [];
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
    }

    get negociacoes() {

        return [].concat(this._negociacoes);
    }

    esvazia() {

        this._negociacoes = [];
    }

    // novo método
    get volumeTotal() {
       return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}
```

Agora, vamos pedir ao modelo que nos retorne o volume total:

```html
<!-- aluraframe/client/js/app/views/NegociacoesView.js -->

<td>
    ${model.volumeTotal}
</td>
```

Perfeito! Sempre que alguém precisar saber o volume total pedirá ao modelo ListaNegociacoes, por exemplo, para gerar gráficos ou outros tipos de saída.

## Simplificando o código

Temos o seguinte código:

```js
let dadosServidor = [
    [
        [new Date(), 1, 100],
        [new Date(), 2, 100]
    ],
    [
        [new Date(), 1, 150],
        [new Date(), 2, 300]
    ],
    [
        [new Date(), 3, 50],
        [new Date(), 1, 100]
    ]        
];
```

Se quisermos criar um array de uma única dimensão para depois criarmos uma lista de negociações a partir da classe Negociacao fazemos:

```js
let listaDeNegociacoes = dadosServidor.reduce((novoArray, array) => {
    // novoArray receberá os itens de array, no final terá uma dimensão apenas
    return novoArray.concat(array)
}, [])
.map(dado => {
    // para cada dado, cria uma instância de negociação. No final, teremos uma nova lista só com instâncias de Negociacao

    return new Negociacao((new Date(dado[0]), dado[1], dado[2]) )
});
```

O código acima funciona, contudo, podemos remover muitas chaves das declarações das arrow functions. Simplifique o código removendo as chaves quando isso fizer sentido.

Quando temos apenas uma instrução não é necessário termos chaves e nem o return arrumando o código teremos algo como:

```js
let listaDeNegociacoes = dadosServidor
    .reduce((novoArray, array) =>
                                novoArray.concat(array)
, [])
.map(dado =>
     new Negociacao(new Date(dado[0]), dado[1], dado[2]) );
```

A função reduce da forma como está inserida está reduzindo o vetor em uma chave [] de modo a virar de um vetor com 3 vetores com 2 vetores dentro, para um de 6, que é o que queremos, para depois mapearmos esse vetor para dentro de Negociação

## Promises

Fazer callbacks são legais, fazer callbacks são interessantes, só que quando mandamos uma requisição nós estamos mandando eles de forma assíncrona, então se queremos uma certa ordem nos dados que estamos enviando ou recebendo, com callback não temos como ter esse controle, de um acabou de ser recebido mande buscar o próximo. Para isso temos as promisses, que são requisições que podem ser completadas ou não, é uma promessa de que se mandar um dado logo eu mandarei o outro e assim por diante

### Revisão de Promise

Para ficarmos melhores do que já somos em promises, crie o arquivo dissecando-uma-promise.html e cole o código abaixo:

```html
<!-- dissecando-uma-promise.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dissecando uma promise</title>
</head>
<body>
    <script>

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve('PROMISE RESOLVIDA'), 5000);
        });

        promise.then(resultado => console.log(resultado));
    </script>
</body>
</html>
```

Agora, abra a página no Chrome e verifique no console do navegador. Depois de 5 segundos será exibida a mensagem PROMISE RESOLVIDA. Mas o que aconteceu durante todo esse processo?

Bom, veja que a variável promise recebeu uma instância de Promise. O construtor de Promise recebe uma função como parâmetro. É essa função passada como parâmetro que será chamada internamente pela Promise, quando for criada. Como é a própria Promise que chama essa função, ela passa sempre dois parâmetros para ela nesta ordem: a função na qual passamos o valor de sucesso e a função que passamos o valor de fracasso.

```js
let promise = new Promise((resolve, reject) => {
    // é aqui dentro que definimos o que será passado para `resolve` e o que será passado para `reject`. 
});
Bom, criar uma Promise não é suficiente. Se olharmos o fragmento acima, em nenhum momento estamos dizendo o que acontecerá se a promessa for cumprida. Para efeito didático, colocarei um setTimeout de 5 segundos dentro do corpo da Promise. Só depois de 5 segundos passaremos o resultado da nossa operação para o resolve:

let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('PROMISE RESOLVIDA'), 5000);
});
```

Obtendo o retorno da ação

Perfeito, temos a variável promise, que guarda uma instância de Promise, o resultado futuro de uma ação. Mas em que parte do código pegamos o resultado dessa ação quando concluída?

É por meio do método then, da instância de Promise que temos acesso ao resultado da ação. O método then recebe uma função e nela temos acesso sempre como primeiro parâmetro ao resultado da ação. Internamente em nossa Promise, é o valor passado para resolve que estará disponível para a função then. Sendo assim, em then, só depois de 5 segundos teremos acesso ao resultado a ação, que é uma string, mas poderia ser qualquer outro tipo de dado.

```js
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('PROMISE RESOLVIDA'), 5000);
});

// imprime no console "PROMISE RESOLVIDA"
promise.then(resultado => console.log(resultado));
```

É interessante saber que, como nosso código é assíncrono, não sabemos quando nossa promessa será cumprida (sabemos que são 5 segundos, mas se fosse uma conexão de rede não teríamos tanta certeza assim, certo?).

Quero que vocês façam uma pequena alteração no código:

```html
<!-- dissecando-uma-promise.html -->
<script>

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('PROMISSE RESOLVIDA'), 5000);
    });

    promise.then(resultado => console.log(resultado));
    console.log('FIM'); // novidade aqui!
</script>
```

Como a promise é assíncrona e não bloqueia a execução do nosso código, veremos impresso no console as mensagens nesta ordem:

PROMISE CONCLUÍDA

Lidando com erros
E se algo sair errado? Onde trataremos o erro? Quando há algum erro dentro do corpo da nossa Promise, cabe ao desenvolvedor capturar esse erro e passá-lo para a função reject:

```html
<script>

    let promise = new Promise((resolve, reject) => {
        console.log(resolve);
        setTimeout(() => reject('HOUVE PROBLEMAS'), 5000);
    });

    promise
        .then(resultado => console.log(resultado));
</script>
```

Depois de 5 segundos, nossa promise será rejeitada, indicando que houve algum erro. Mas onde teremos acesso à causa da rejeição? Basta, depois de then, encadearmos uma chamada à função catch:

```html
<script>

    let promise = new Promise((resolve, reject) => {
        console.log(resolve);
        setTimeout(() => reject('HOUVE PROBLEMAS'), 5000);
    });

    promise
        .then(resultado => console.log(resultado))
        .catch(erro => console.log(erro)); // exibe no console HOUVE PROBLEMAS
</script>
```

Mas é claro que queremos que nossa promise esteja preparada para resolver ou rejeitar. Para efeito didático, vamos colocar um variável booleana. Se for true, resolvemos, se for false, rejeitamos. Dessa forma, você pode brincar e simular quando a promise é resolvida ou não:

```html
<script>

    let ok = false;
    let promise = new Promise((resolve, reject) => {

        // como temos mais de uma instrução, precisamos colocar um bloco em nossa arrow function! Lembrou?
        setTimeout(() => {
            if(ok) {
                resolve('PROMISE CONCLUÍDA');
            } else {
                reject('HOUVE PROBLEMAS');
            }
        }, 5000);
    });

    promise
        .then(resultado => console.log(resultado))
        .catch(erro => console.log(erro));
</script>
```

Promises (promessas) agora fazem parte da linguagem JavaScript a partir do ES6. Elas representam o resultado futuro de uma ação, que pode ser de sucesso ou fracasso. Elas visam tornar códigos assíncronos mais legíveis e fáceis de manter, evitando o Callback Hell. Uma ou outra chamada assíncrona não é problemática, o problema é quando temos uma sucessão de chamadas assíncronas e o modo tradicional de lidar com elas, aninhando callbacks, torna o código difícil de ler e manter, principalmente o tratamento de erros.

Veja o pedaço do código JavaScript que inicializa uma Promise:

```js
let minhaPromessa = new Promise((resolve, reject) => {

    // aqui executamos algo demorado

    if (/* tudo deu certo */) {
        resolve("Funcionou!");
    }
    else {
        reject("Deu erro...");
    }
});
```

Ao inicializar a minhaPromessa, como podemos verificar o resultado da execução?

```js
minhaPromessa
    .then(mensagem => console.log(mensagem))
    .catch(erro => console.log(erro));
```

Parabéns, usamos os métodos then e catch para capturar o resolve e o reject oriundo da promisse e dentro deles é necessário passar uma function ou Arrow function com o comando desejado.

## Simplificando ainda mais nosso código com promises

Durante esta seção criamos a classe NegociacaoService. Esta classe centraliza operações que realizamos com nosso back-end, mais notadamente aquelas que buscam negociações. Ela também serve para encapsular o uso de outra classe que criamos, a HttpService. Esta última, encapsula a complexidade de se realizar requisições Ajax devolvendo uma promise para determinadas operações.

Vejamos o código de HttpService mais uma vez:

```js
class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {


            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4) {

                    if(xhr.status == 200) {   

                        resolve(JSON.parse(xhr.responseText));  
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();


        });
    }

    post(url, dado) {


            return new Promise((resolve, reject) => {

                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = () => {

                    if (xhr.readyState == 4) {

                        if (xhr.status == 200) {

                            resolve(JSON.parse(xhr.responseText));
                        } else {

                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
            });

        }
}
```

Todos os métodos get e post retornam uma promise. Até ai tudo bem, nenhuma novidade.

Agora, vejamos o código da classe NegociacaoService que usa HttpService:

```js
class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

       return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });  
       });        
    }

    obterNegociacoesDaSemanaAnterior() {

       return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });  
       }); 


    }

    obterNegociacoesDaSemanaRetrasada() {

       return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });  
       }); 
    }
}
```

Veja que seus métodos também devolvem uma promise. Mas espere um pouco! Se a classe NegociacaoService já recebe o resultado de HttpService que é uma promise, porque no lugar de criarmos uma nova promise, não fazemos com que os métodos de NegociacaoService retorne a promise de HttpService? Sim, isso é possível!

O primeiro passo, é removermos o `new Promise((resolve, reject) => {})` de todos os métodos de NegociacaoService:

```js
class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {



            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });  

    }

    obterNegociacoesDaSemanaAnterior() {



            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });  



    }

    obterNegociacoesDaSemanaRetrasada() {



            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });  

    }
}
```

O próximo passo é usarmos a instrução return na frente da chamada de this._http.get. Como o método retorna uma promise, o que estamos fazendo é retornar esta promise nos métodos de NegociacaoService:

```js
class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {



            return this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });  

    }

    obterNegociacoesDaSemanaAnterior() {



            return this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });  



    }

    obterNegociacoesDaSemanaRetrasada() {



            return this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    console.log(negociacoes);
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });  

    }
}
```

Como não estamos mais retornando `return new Promise((resolve, reject) => {})`, não temos mais as funções resolve e reject para passarmos o resultado e o erro, caso exista. E agora?

A ideia é a seguinte, se uma função then possui um retorno, este retorno é acessível para quem encadear uma nova chamada à função then. Sendo assim, onde há resolve trocaremos por um return. Mas cuidado, não esqueça de remover também os () do resolve!

```js
class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {



            return this._http
                .get('negociacoes/semana')
                .then(negociacoes => {

                    console.log(negociacoes);

                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana');
                });  

    }

    obterNegociacoesDaSemanaAnterior() {



            return this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {

                    console.log(negociacoes);

                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior');
                });  



    }

    obterNegociacoesDaSemanaRetrasada() {



            return this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {

                    console.log(negociacoes);

                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada');
                });  

    }
}
```

Do jeito que está, podemos fazer algo como:

```js
let service = new NegociacaoService();
service
    .obterNegociacoesDaSemana()
    .then(negociacoes => /* faz alguma coisa com as negociações */)
```

Veja que é exatamente a maneira que já utilizávamos antes. O que mudou foi apenas a criação de uma promise extra na definição dos métodos.

Mas ainda não acabou! E se um erro acontecer? No lugar de usarmos reject, lançamos uma exceção em seu lugar:

```js
class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {


        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {

                console.log(negociacoes);

                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana');
            });  
    }

    obterNegociacoesDaSemanaAnterior() {


        return this._http
            .get('negociacoes/anterior')
            .then(negociacoes => {

                console.log(negociacoes);

                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana anterior');
            });  
    }

    obterNegociacoesDaSemanaRetrasada() {


        return this._http
            .get('negociacoes/retrasada')
            .then(negociacoes => {

                console.log(negociacoes);

                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações da semana retrasada');
            });  

    }
}
```

Veja que, com essa alteração, poupamos algumas linhas de código e tornamos o código da classe NegociacaoService mais legível. É claro, isso só funciona porque HttpService devolve uma promise. Se não devolvesse, NegociacaoService precisaria retornar uma promise, como havíamos feito.

## Ah se eu pudesse ordenar minha tabela clicando na coluna...

Melhorando a experiência do usuário
Nossa aplicação é capaz de exibir uma lista de negociações em uma tabela, que pode ser alimentada pelo usuário ou importada de serviços na web. Para deixarmos a aplicação ainda melhor, que tal permitir que o usuário ordene a tabela, clicando em cada coluna?

Por exemplo, se o usuário clicar na coluna "QUANTIDADE", ordenaremos pela quantidade, se ele clicar na coluna "DATA", ordenaremos pela data. Além disso, se ele clicar mais de uma vez na mesma coluna, ele ordenará a tabela ascendentemente ou descendentemente. Nesse exercício, mostrarei uma "receita" para resolver este problema.

A primeira coisa que faremos é criar um método em nosso NegociacaoController, que será o responsável em ordenar a lista de negociações de ListaNegociacoes. A ordenação da lista envolve sua alteração, logo, a view NegociacoesView precisará ser atualizada. Ainda bem que implementamos um mecanismo caseiro de data binding (associação de dados) entre o model e view, no qual a alteração no modelo automaticamente renderiza a view ao qual foi associado.

```js
Altere aluraframe/client/js/app/controllers/NegociacaoController.js e adicione o método ordena:

// aluraframe/client/js/app/controllers/NegociacaoController.js
// código anterior omitido

ordena(coluna) {
    // ainda vamos implementar o método!
}
```

Veja que o método ordena recebe como parâmetro a coluna que queremos ordenar. Lembre-se que ordenaremos nosso modelo pela coluna que o usuário clicar, sendo assim, nada mais justo do que associar o método ordena ao evento click do cabeçalho de cada coluna em NegociacoesView:

Alterando aluraframe/client/js/app/views/NegociacoesView.js:

```html
<!-- aluraframe/client/js/app/views/NegociacoesView.js -->
<!-- código anterior omitido -->
<thead>
    <tr>
        <th onclick="negociacaoController.ordena('data')">DATA</th>
        <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
        <th onclick="negociacaoController.ordena('valor')">VALOR</th>
        <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
    </tr>
</thead>
<!-- código posterior omitido -->
```

Quando associamos a chamada do método ao evento, na chamada do método passamos como parâmetro a coluna que desejamos ordenar. É importante que cada parâmetro passado exista como uma propriedade em nosso modelo Negociacao.

Você deve estar pensando "Mas Flávio, queremos é ordenar a lista de negociações que ListaNegociacoes guarda". Sim, mas cada negociação da lista é uma instância da classe Negociacao.

Primeiramente, vamos implementar a solução de ordenação sem nos preocupar em alternar ascendentemente ou descendentemente, resolveremos isso depois. Além disso, antes de partir para a solução, que tal entender como é feito o processo de ordenação de uma lista a partir de algum critério da lista.

Entendendo primeiro: Array.sort
Um Array em Javascript possui o método sort. Este método recebe uma estratégia de ordenação, ou seja, essa estratégia deve ser passada pelo desenvolvedor, mas deve seguir algumas regras. Vejamos um exemplo com escopo menor:

```js
let lista = [10,1, 5, 9, 8, 12, 15];
```

Queremos ordenar essa lista em ordem crescente:

```js
let lista = [10,1, 5, 9, 8, 12, 15];
lista.sort();
console.log(lista); // exibe a lista na ordem crescente
```

E se quisermos em ordem decrescente? Ordenamos primeiro de maneira ascendente e depois invertemos a ordem do array com reverse:

```js
let lista = [10,1, 5, 9, 8, 12, 15];
lista.sort();
lista.reverse();
console.log(lista); // exibe a lista ordenada em ordem decrescente
```

Na verdade, mesmo a ordenação numérica tem problemas no JavaScript. Faça o teste, o resultado é um pouco inesperado. Contudo temos uma explicação detalhada sobre o ordenamento numérico do JavaScript em nosso blog.

Podemos até mesmo ordenar uma lista de strings, que o procedimento é o mesmo. A ordenação funcionou porque o padrão do sort é classificar os elementos em ordem crescente na ordem da tabela ASCII. Vamos para um exemplo mais complexo?

Agora temos uma lista de negociações:

```js
let negociacoes = [
    new Negociacao(new Date(), 7, 200),
    new Negociacao(new Date(), 1, 300),
    new Negociacao(new Date(), 8, 100)
]
```

Queremos que a lista seja ordenada pela propriedade quantidade. O que será que vai acontecer se chamarmos lista.sort?

```js
let negociacoes = [
    new Negociacao(new Date(), 7, 200),
    new Negociacao(new Date(), 1, 300),
    new Negociacao(new Date(), 8, 100)
]
negociacoes.sort();
negociacoes.forEach(negociacao => console.log(negociacao));
```

Pois é, o método sort não fez curso de "Mãe Diná" para saber qual critério deve usar para ordenar nossa lista. Além disso, a lista continua do jeito que está. O método sort não consegue aplicar a estratégia de ordenar de maneira crescente porque um objeto da classe Negociacao não tem representação na tabela ASCII. E agora?

Quando temos uma lista de objetos que não sejam strings, números ou boolean (com este tipo, false vem primeiro e depois true), precisamos passar o critério de ordenação para o método sort:

```js
let negociacoes = [
    new Negociacao(new Date(), 7, 200),
    new Negociacao(new Date(), 1, 300),
    new Negociacao(new Date(), 8, 100)
]
negociacoes.sort((a, b) => a.quantidade -  b.quantidade);
negociacoes.forEach(negociacao => console.log(negociacao));
```

A função passada para sort recebe dois parâmetros que representam pares de elementos, isso porque toda comparação envolve um par de elementos. A regra é a seguinte: com o critério selecionado, se o valor retornado for 0 não há alteração a ser feita, se o valor retornado for positivo, b deve vir antes de a, se o valor for negativo, a deve vir antes de b.

Que tal ordenar pela data?

```js
let negociacoes = [
    new Negociacao(new Date(), 7, 200),
    new Negociacao(new Date(), 1, 300),
    new Negociacao(new Date(), 8, 100)
]
negociacoes.sort((a, b) => a.data - b.data); //ordenação crescente utiliza a ordem normal
negociacoes.forEach(negociacao => console.log(negociacao));
```

Não fique chocado, quando subtraímos uma data pela outra é retornado um número que pode ser zero, positivo ou negativo, atendendo a regra do sort. Faça um teste no console do Chrome e veja você mesmo:

```js
new Date(2016,4,12) - new Date(2016,5,1) // negativo
new Date(2016,5,1) - new Date(2016,4,12) // positivo
new Date(2016,5,1) -  new Date(2016,5,1) // 0
E se quisermos uma ordem decrescente? Só inverter a subtração:

let negociacoes = [
    new Negociacao(new Date(), 7, 200),
    new Negociacao(new Date(), 1, 300),
    new Negociacao(new Date(), 8, 100)
]
negociacoes.sort((a, b) => b.quantidade -  a.quantidade); // agora é b menos a!
negociacoes.forEach(negociacao => console.log(negociacao));
```

Agora que você já sabe definir um critério de ordenação para Array.sort, vamos voltar para o método ordena de NegociacaoController.

Implementando nossa solução
Já sabemos como ordenar um Array segundo um critério, mas o problema é que ao acessarmos this._listaNegociacoes.negociacoes nós recebemos uma cópia da lista original e qualquer alteração na lista não afeta a instância de ListaNegociacoes (ainda lembra da programação defensiva?). Para resolvermos isso, vamos criar o método ordena em ListaNegociacoes. Este método receberá o critério de ordenação, que será passado para a lista de negociações encapsulada pela classe:

```js
// aluraframe/client/js/app/models/ListaNegociacoes.js

class ListaNegociacoes {

    // código anterior omitido

    // novo método!
    ordena(criterio) {
        this._negociacoes.sort(criterio);        
    }
}
```

Agora, vamos voltar para NegociacaoController e alterar seu método ordena e implementá-lo:

```js
class NegociacaoController {

    // código anterior omitido

    ordena(coluna) {
        this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
    }
}
```

Veja que interessante. Não podemos fazer a.quantidade ou a.data, porque a propriedade usada no critério de ordenação é escolhida pelo usuário. Sendo assim, usamos a sintaxe objeto[nomePropriedade] para acessar a propriedade do objeto. Essa forma mais verbosa é interessantíssima quando queremos acessar as propriedades de um objeto dinamicamente .

Apesar de termos feitos essas mudanças, nada acontecerá. Precisamos atualizar a view quando o método ordena do nosso modelo for chamado, para isso, precisamos adicioná-lo na lista de métodos ou propriedades que desejamos monitorar do nosso modelo. Alterando NegociacaoController:

```js
class NegociacaoController {

    constructor() {
        // propriedades omitidas

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#    negociacoesView')), 
            'adiciona', 'esvazia', 'ordena');

        // outras propriedades omitidas             
    }
}
```

Perfeito, faça um teste agora. Alterne cliques em algumas colunas e veja o resultado. Gostou? Contudo, nossa solução está incompleta. Precisamos efetuar uma ordenação ascendente ou descendente quando o usuário clicar na mesma coluna. Como implementar isso?

Há sempre uma solução
A lógica é seguinte. Se a ordenação atual é X e ele clicou em outra coluna, trocando a ordenação para Y, não fazemos nada e deixamos a lista ser ordenada por Y. No entanto, se a ordenação atual é X e ele clica na coluna que solicita novamente uma ordenação por X, invertemos a ordem atual.

Vamos criar como propriedade de NegociacaoController a propriedade this._ordemAtual.

```js
class NegociacaoController {

    constructor() {
        this._ordemAtual = ''; // quando a página for carregada, não tem critério. Só passa a ter quando ele começa a clicar nas colunas
    }
    // código posterior omitido
}
class NegociacaoController {

    // código anterior omitido

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            // inverte a ordem da lista!
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}
```

E para invertermos a lista? Precisamos criar em nosso modelo ListaNegociacoes o método inverteOrdem, que chama this._negociacoes.reverse() para nós:

```js
// aluraframe/client/js/app/models/ListaNegociacoes.js

class ListaNegociacoes {

    // código anterior omitido

    inverteOrdem() {
        this._negociacoes.reverse();
    }
}
```

Agora, podemos terminar nossa controller com esta última alteração:

```js
class NegociacaoController {

    // código anterior omitido

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }
}
```

E claro, não podemos nos esquecer de adicionar o método inverteOrdem como um dos métodos que estamos monitorando para atualizar automaticamente a View:

```js
class NegociacaoController {

    constructor() {
        // propriedades omitidas

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView'), 
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        // outras propriedades omitidas             
    }
}
```

Perfeito! Experimente agora brincar com os critérios de ordenação clicando "igual a um louco" nos cabeçalhos das colunas da nossa tabela.

## Post

Ah se meu HttpService fizesse mais coisa...
PRÓXIMA ATIVIDADE

Durante o treinamento criamos a classe HttpService para centralizar toda infraestrutura necessária para realizarmos requisições Ajax, inclusive utilizamos o padrão Promise para tornar nosso código mais fácil de manter e legível. Contudo, nosso serviço possui apenas o método get responsável em ler os dados do servidor. Que tal encapsularmos nesse serviço toda complexidade para realizarmos requisições do tipo POST?

Vamos alterar aluraframe/client/js/app/services/HttpService.js e adicionar o método POST:

```js
class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {


            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();


        });
    }

    post(url, dado) {


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");

        });

    }
}
```

Nosso novo método recebe uma URL e o dado que desejamos enviar. Criamos uma instância de XMLHttpRequest e usamos o verbo POST no já conhecido método open de XMLHttpRequest. Contudo, quando estamos enviando um dado para o servidor, precisamos dizer qual tipo de conteúdo estamos enviando. A ideia é enviarmos um dado no tipo (formato) JSON. É por isso que precisamos adicionar ao cabeçalho da requisição que será realizada a informação Content-Type com o valor application/JSON.

Os próximos passos vocês já conhecem. Precisamos saber quando a requisição foi realizada e para isso usamos o onreadystatechange:

```js
class HttpService {

    get(url) {

        // código anterior omitido

        });
    }

    post(url, dado) {


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            // falta enviar!!!!!!
        });

    }
}
```

Veja que usamos JSON.parse para converter o JSON (String) retornado pelo servidor em um objeto JavaScript. Mas perceba que ainda falta a chamada do método xhr.send que recebe com parâmetro os dados que queremos enviar. Mas atenção: como HTTP é um protocolo textual, não podemos enviar um objeto JavaScript diretamente, precisamos convertê-lo para uma string no formato JSON. Para isso, usamos JSON.stringify:

```js
class HttpService {

    get(url) {

        // código omitido
    }

    post(url, dado) {


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringify para converter objeto em uma string no formato JSON.
        });

    }
}
```

Excelente, o método POST está pronto. Agora, se você fez os exercícios do capítulo anterior, deve lembrar que já fizemos um exercício para enviar dados com o método POST para nosso servidor e criamos a página post.html. Se você não lembra, é porque pulou exercícios e deixou de aprender várias coisas extras durante o treinamento. Enfim, partindo do pressuposto que você fez o exercício do post.html, vamos alterá-lo para fazer uso do nosso serviço e seu método post.

Primeiro, vamos ver o código antes da nossa modificação:

```html
<!-- aluraframe/client/post.html -->
<!-- aluraframe/client/post.html -->
<html>
<head>
    <meta charset="UTF-8">
    <title>Negociações</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">
</head>

<body class="container">
    <form class="form">

        <div class="form-group">
            <label for="data">Data</label>
            <input type="date" id="data" class="form-control" required autofocus/>        
        </div>    

        <div class="form-group">
            <label for="quantidade">Quantidade</label>
            <input type="number" min="1" step="1" id="quantidade" class="form-control" value="1" required/>
        </div>

        <div class="form-group">
            <label for="valor">Valor</label>
            <input id="valor" type="number" class="form-control"  min="0.01" step="0.01" value="0.0" required />
        </div>

        <button class="btn btn-primary" type="submit" onclick="sendPost(event)">Enviar dados para servidor</button>
    </form>

    <script>
        function sendPost(event) {

            event.preventDefault();

            console.log("Enviando post");

            let $ = document.querySelector.bind(document);
            inputData = $('#data');
            inputQuantidade = $('#quantidade');
            inputValor = $('#valor');

            let negociacao = {
                data: inputData.value,
                quantidade: inputQuantidade.value,
                valor: inputValor.value
            };

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/negociacoes", true);
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {
                        inputData.value = '';
                        inputQuantidade.value = 1;
                        inputValor.value = 0.0;
                        inputData.focus();
                        alert('Negociação enviada com sucesso');
                    } else {
                        alert(`Não foi possível enviar a negociação: ${xhr.responseText}`);
                    }
                }
            }
            xhr.send(JSON.stringify(negociacao));

    }
    </script>
</body>
</html>
```

Agora, importando o script aluraframe/client/js/app/services/HttpService.js:

```html
<!-- aluraframe/client/post.html -->
<html>
<head>
    <meta charset="UTF-8">
    <title>Negociações</title>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-theme.css">
</head>

<body class="container">
    <form class="form">

        <div class="form-group">
            <label for="data">Data</label>
            <input type="date" id="data" class="form-control" required autofocus/>        
        </div>    

        <div class="form-group">
            <label for="quantidade">Quantidade</label>
            <input type="number" min="1" step="1" id="quantidade" class="form-control" value="1" required/>
        </div>

        <div class="form-group">
            <label for="valor">Valor</label>
            <input id="valor" type="number" class="form-control"  min="0.01" step="0.01" value="0.0" required />
        </div>

        <button class="btn btn-primary" type="submit" onclick="sendPost(event)">Enviar dados para servidor</button>
    </form>

    <script src="js/app/services/HttpService.js"></script>
    <script>
        function sendPost(event) {

            event.preventDefault();

            console.log("Enviando post");

            let $ = document.querySelector.bind(document);
            inputData = $('#data');
            inputQuantidade = $('#quantidade');
            inputValor = $('#valor');

            let negociacao = {
                data: inputData.value,
                quantidade: inputQuantidade.value,
                valor: inputValor.value
            };

            // usando nosso serviço. Veja que nem guardei em uma variável 
            new HttpService()
                .post('/negociacoes', negociacao)
                .then(() => {
                    inputData.value = '';
                    inputQuantidade.value = 1;
                    inputValor.value = 0.0;
                    inputData.focus();
                    alert('Negociação enviada com sucesso');
                })
                .catch(erro => alert(`Não foi possível enviar a negociação: ${erro}`));
        }
    </script>
</body>
</html>
```

Veja que agora não precisamos lidar com detalhes de XMLHttpRequest quando formos realizar requisições do tipo POST!

## Projeto final do curso

Esse link com certeza vai ser visto e revisto hahaha

<https://github.com/alura-cursos/javascript-avancado-ii/archive/projetoFinal.zip>
