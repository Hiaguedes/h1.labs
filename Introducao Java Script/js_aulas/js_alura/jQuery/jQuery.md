# O jQuery

O jQuery é extremamente famoso e um tanto antigo e ainda é bastante usado (apesar de ter perdido força pros frameworks) mas muitos projetos ainda o utilizam, então entender sobre ele é de bastante utilidade

## O que é o jQuery

Quando escrevemos um código javaScript para dar funcionalidade a nossa aplicação nós corremos o risco de não dar suporte aos navegadores do mercado por conta de pequenas diferenças de cada browser, o jQuery resolve esses problemas internamente não necessitando reescrever o código, dando mais compatibilidade.

Além de que o logo do jQuery é, write less do more então você pode simplificar códigos grandes de forma a ficar com bem menos linhas

O jQuery é uma biblioteca, feita em JavaScript, que tem como objetivo facilitar a vida do desenvolvedor Web. O grande propósito dela é facilitar o uso do JavaScript nos websites, abstraindo da cabeça do desenvolvedor os problemas de compatibilidade entre os navegadores. Ele também possui funções enxutas, que reduzem drasticamente a quantidade de código que o desenvolvedor tem que escrever, possuindo módulos que facilitam coisas como o AJAX , que é algo nativamente complexo de se fazer com JavaScript puro.

O jQuery segue a máxima de seu lema, que é Write less, do more, focando em otimizar a experiência de desenvolver JavaScript para a Web. Este framework se tornou uma das mais famosas bibliotecas do desenvolvimento Web, com mais de 50% dos desenvolvedores utilizando-a em seu dia a dia.

Dominá-la é essencial para se tornar um profissional front-end completo e este é o foco do nosso curso!

## O jQuery morreu? (Minha opinião como jr ainda)

Olha, com tantos frameworks sendo utilizados como o React, Angular e outros. pode se afirmar que sim o jQuery deu uma boa diminuida, uma pesquisada no google analytics nos mostra que o jQuery está em puro declínio, até por que o React por exemplo soluciona problemas muito mais estruturais e de repetição de arquitetura do que o jQuery, só que um dos motivos de fazer esse curso é que muitas dúvidas que eu tenho em js tem solução (em um stackOverflow da vida) em um código em jQuery. E como sempre tem que respeitar a histórias das tecnologias saber sobre o jQuery acaba entrando na mesma laia que saber um pouco sobre o gulp.

Além de que muitos projetos existentes ainda o utilizam, então estranhar essa tecnologia não é uma boa coisa

Fora que algumas APIs acabam recomendando o uso do jQuery, uma vez que ele abstrai bem o ajax (mesmo que o fetch solucione muito os problemas, com o problema de navegadores mais antigos nem saberem o que é isso)

## Usando o jQuery nos projetos

Você pode pegar versões do jQuery pelo grande butão de download no site, mas prefira usar o CDN que está [aqui](https://code.jquery.com/)

Lá temos versões comprimidas (que ficam no servidor), não comprimida (que é melhor para a parte de desenvolvimento do código), slim (que não tem animações e nem o ajax) e no slim temos a versão minificada e não minificada. Entenda o slim como a versão mais pura

A grande diferença da versão slim do jQuery é que esta não possuí nem as funções de animação nem as de AJAX do jQuery tradicional, deixando a framework mais leve.

Por ela não possuir estes dois módulos do jQuery, ela chega a ser 20% menor do que a versão normal, onerando menos a banda do usuário quando ele acessa um site que utiliza a versão slim.

Ela é útil para desenvolvedores que querem utilizar o jQuery apenas para a manipulação do DOM, escutar eventos, adicionar ou remover classes ou criar elementos, permitindo estes desenvolvedores terem acesso a uma versão mais simples do framework, pois muitas vezes queremos fazer animações utilizando algum recurso do CSS3 ou utilizar alguma outra biblioteca específica para requisições AJAX.

E aí com o cdn teremos uma tag script mais ou menos assim

```html
<script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script>
```

Mas nada te impede de você baixar o jQuery e importar no seu projeto, sem problemas

## Fazendo a seleção de elementos (o que substitui o document.querySelector)

Para selecionarmos um elemento HTML com jQuery, utilizamos sua função seletora que tem o mesmo nome da framework, a função jQuery! Ela pode ser invocada de dois modos, o primeiro que é utilizando seu nome completo:

`jQuery();`

ou a mais comum que é utilizando o atalho conhecido para a função jQuery, o $:

`$();`

Como este segundo modo é muito mais fácil de digitar e muito mais utilizado no mercado de desenvolvimento Web, é ele que utilizaremos ao longo deste treinamento.

O jQuery não retorna exatamente o elemento como no javaScript, ele retorna um objeto que contém algumas funções a mais.

Para pegar um texto (o textContent) apenas colocamos `$('.classe').text()` e para atribuir `$('.classe').text('blabla')`

A programadora Ana está montando um site que tem como objetivo ser o template para a sua primeira página. O HTML do template está com essa cara:

```html
<body>
    <h1> Meu primeiro website! </h1>
    <p>Olá, eu sou a <span id="nome">Ana</span> e estou aprendendo  o básico sobre desenvolvimento Web.</p>

    <script src="jquery.js"></script>
    <script src="main.js"></script>
</body>
```

E acompanha, além do jQuery, o seguinte Javascript:

```js
//main.js

var nome = $("#nome");
console.log("Seu nome é:" + nome );
```

Ana gostaria que no console fosse exibido o nome que está no HTML, ficando assim: Seu nome é Ana

Porém o resultado é :Seu nome é:`[object Object]`

Qual alternativa abaixo corrige o erro de Ana ?

Se queremos ter acesso ao contéudo textual de um elemento selecionado pelo jQuery, devemos utilizar a função .text(), que nos retorna exatamente isto.

Neste exemplo, Ana até selecionou corretamente o elemento, porém pecou tentando imprimir o elemento em si, e não seu texto.

O método `text` muda o que está escrito lá dentro também

## Mas e se precisarmos dar suporte ao IE 8 e versões antigas?

Se você está desenvolvendo algum tipo de sistema que deve atender o máximo de usuários possíveis, talvez seja bom você utilizar uma versão especial do jQuery: a versão 1.12.

Esta versão específica do jQuery ficou muito famosa, e recebe updates até hoje. Ela é focada para dar suporte aos navegadores antigos, como Internet Explorer 6-8, Opera 12.1x ou Safari 5.1+.

## Escutador de eventos no jQuery

Invés de usar addEventListener você usa algo como

```js
$('.campo-digitacao').on('input',(e) => {

})
```

Simples assim, o on tem a mesma semântica que o addEventListener, no primeiro argumento você coloca o tipo do evento e no segundo parâmetro a função anônima ou a função nomeada

## .text() e .val()

É valor ou texto ?

Sobre as funções .val() e .text() , quais ou qual das afirmativas abaixo está certa?

A função .text() pode ser usada para pegar de elementos como `<h1>, <span> e <p>.`

A função .val() pode ser usada para pegar de elementos como` <input>, <textarea> e <select>.`

As funções .val() e .text() servem tanto para alterar como para pegar o valor do texto de elementos.

Ambas as funções .val() e .text() podem manipular os valores de texto dos elementos, mas a .val() funciona em elementos de `<input>` que são campos aonde o usuário do site insere dados , como os campos de `<input>`(todos os tipos), `<textarea> e <select>`.

Já a função .text() pega o conteúdo de texto de tags HTML que tem texto dentro, como as `<h1>, <span> e <p>`

Ambas as funções podem atribuir novos valores a determinados elementos, ou apenas pegar os valores deles.

## one para escutar o evento apenas uma vez

Podemos limitar o escutador de eventos para escutar apenas uma vez, não toda vez que aquele evento ocorrer, para isso invés de chamar o `on` chamamos o `one` como em

```js
ampoDigitação.one('focus', e => {})
```

Um equivalente para o js vanilla é:

```js
document.getElementById('btn').addEventListener('click', () => {
  console.log('Hello and goodbye');
}, {
  once: true,
});
```

Um dia testarei isso

Sobre as funções .one() e .on() do jQuery, marque as afirmativas verdadeiras:

Ambas as funções servem para escutar eventos com jQuery.

A função .one() possuí a mesma sintaxe da função .on().

A função .one() só escuta o evento por uma vez, e a função .on() continua escutando os eventos indefinidamente.

## Setar um atributo com o attr

Invés de usarmos dataset ou setAttribute podemos colocar um atributo como em

```js
campoDigitação.attr('disabled',true);
```

Onde o disabled do text area não recebe um valor (que é o segundo parâmetro) então apenas colocamos ele como verdadeiro, muito parecido com o dataset

## Simplificando mais ainda os eventos

Eventos comuns como click, focus, blur podem ser chamados com

```js
elemento.click(() => {

})
```

## Uma alternativa pro window.load

Para inicializar funções no momento que a página foi carregada temos o `$(document).ready(() => {})` ou a forma mais famosa que é

```js
$(() => {

})
```

Sem a necessidade do `document.ready` e é um atalho bem interessante

## Estilos do css

Podemos alterar o estilo do css com a função advinha? `.css` mas não é bom alterar o style no js e sim adicionar uma classe a ela e para isso temos o equivalente ao `classList.add` com `addClass`

Devemos usar a função `css()` do jQuery que recebe o nome da propriedade:

`var cor = $("div").css("background-color");`

Também é possivel recuperar mais de um valor passando um array de propriedades, por exemplo:

```js
var valores = $("div").css(["background-color","width"]);
```

O resultado é um objeto que possui todos os valores. Por exemplo para acessar o width podemos escrever:

```js
valores.width
```

## append para colocar um código html

Invés do innerHTML usamos o append e podemos usar ele da seguinte forma

```js
const inserePlacar = (nome,pontuacao) => {
    let corpoTabela = $('[data-placar]').find('tbody');
    console.log(corpoTabela)
    corpoTabela.append(`
    <tr>
        <td>${nome}</td>
        <td>${pontuacao}</td>
    </tr>
    `)

}
```

Além do append temos a prepend, a append adiciona no final enquanto a prepend adiciona antes de todo o conteúdo que está lá

O find é uma busca de um elemento que está dentro do que você acabou de selecionar

## Criar um objeto jQuery

Caso eu queira utilizar um this esse this não é do jQuery e sim do js e para fazer com que ele receba as funções do jQuery eu faço

```js
$(this). blablabla
```

## Outras coisas interessantes

Podemos pegar o elemento pai do elemento com o `parent()` e remover com o `remove()`, alem de que podemos adicionar eventos no momento que criamos uma linha em uma tabela (valido para js puro também) e para isso devemos criar um objeto jQuery como se quiséssemos criar um elemento no documento, com algo como

```js
$('<tr>')
```

## Algumas questõeszitas

Dado o seguinte HTML:

`<p id="descricao">jQuery - write less, do more</p>`

e este código Javascript(com jQuery importado previamente):

```js
$('#descricao').click(function() {
    //AQUI
});
```

Como podemos selecionar o texto do parágrafo no lugar de //AQUI com jQuery?

` var texto = $(this).text();`

Temos que lembrar que dentro de um evento do Javascript e do jQuery, a palavra reservada this sempre se refere ao elemento que sofreu o evento, neste caso ao elemento clicado. Como o elemento clicado é um elemento do HTML, ele se torna um objeto tradicional do Javascript dentro de nosso código. E como já sabemos, a função .text() é exclusiva de objetos jQuery, logo temos de convertê-lo antes.

Para converter um objeto tradicional do Javascript em um objeto jQuery, devemos fazer uso da função jQuery, passando o this para ela, deste modo:

` var texto = $(this).text();`

O link do projeto do módulo 1 do curso de jQuery pode ser visto [aqui](https://s3.amazonaws.com/caelum-online-public/jquery-alura-typer/stages/jquery-modulo-1-final.zip)
