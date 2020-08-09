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

Diferente de uma função, que possui um this dinâmico, uma arrow function possui um this estático, ou seja, que nunca muda e que é determinado no momento em que é declarado! Veja que quando declararmos nossa arrow function, ela vai considerar o this do local onde é declarada. Sendo assim, como o this dentro da tag <script> é window, ela adotará window.

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
