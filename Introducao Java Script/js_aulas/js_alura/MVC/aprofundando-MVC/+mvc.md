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

## Ajax e APIs
