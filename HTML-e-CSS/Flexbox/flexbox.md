# Flexbox

Esse curso vai dizer muito sobre como arrumar os elementos na nossa tela e lidar com esses elementos no mundo mobile.

Para acompanhar o que for feito nessa aula veja o arquivo css chamado `flexbox.css`, não é necessário posicionar os arquivos em outro css é somente para deixar a explicação fácil

O que devemos ficar atentos é que o flexbox é algo "novo" então fique atento se podemos utilizar essa propriedade para as versões de browser que queremos dar suporte no <https://caniuse.com/>

## Quando usar o flexbox?

O flexbox é uma caracterísitca do css que permite organizamos os elementos filhos dentre um elemento pai de modo a não precisarmos de números mágicos para que isso ocorra e de modo que tenhamos páginas responsivas de modo mais simples

Então uma forma de utilizar o flexbox é quando temos os estilos já de certa forma prontos falta arrumar eles na tela.

## display:flex

Para transformar a nossa caixa em um caixa do tipo flex dentro da caixa maior (no caso o elemento pai que engloba todos os elmentos dentro da caixa) nós fazemos

```css
header {
    display:flex
}
```

Pronto a caixa do header é agora uma flexbox

Somente pelo fato de colocarmos esse tipo de display para o header nos abre diversas possibilidades, podendo jogar fora coisas como `float`, ou mesmo `postion:relative` pro pai e `position: absolute` para o filho para que possamos fazer uma arrumação desses elementos na div, caso queiramos alinhas todos os elementos no centro nós podemos fazer `align-items: center;` e colocar todo os espaço a direita que fica entre os dois elementos com `justify-content: space-between;`

O tal do `display:flex` pode ser entendido como um elemento que coloca os filhos da classe pai um ao lado do outro, sem a necessidade de termos um `display: inline-block`

O `display:flex` deixa todos os filhos com a mesma altura também

## justify-content: space-between

O espace beetween faz com que o espaço que sobra a direita dos dois elementos filho fique entre eles dois, caso eu tenha mais elementos e queira que esse espaço seja colocado igualmente entre todos os elementos eu coloco `justify-content: space-around;`

### Formas de espaçar os elementos

Sabemos que a propriedade ``justify-content: space-between`` faz com que o espaço que sobrou no nosso elemento pai seja distribuído entre os filhos, porém é claro que esse não é o único valor da propriedade justify-content. Por exemplo, de que outras formas podemos distribuir esse espaço?

Qual o valor da propriedade ``justify-content`` para essas distribuições de espaço?

Podemos distribuir os elementos dentro do pai de diversas formas, podemos por exemplo:

Colocar todo espaço à esquerda, jogando o conteúdo para direita com `justify-content: flex-end`.

Colocar todo espaço à direita, jogando o conteúdo para esquerda com `justify-content: flex-start` (que é o padrão).

Colocar todo espaço à esquerda e à direita, jogando o conteúdo para o meio com `justify-content: center`.

Colocar todo espaço entre os elementos como vimos antes usando `justify-content: space-between`.

E uma possibilidade bem interessante também é colocar o espaço em volta dos elementos. Podemos usar o `justify-content: space-around` para isso.

## flex-direction

Caso tenhamos uma lista de várias tags a como

```html
<div class="Lista">
    <a>1</a>
    <a>2</a>
    <a>3</a>
    <a>4</a>
    <a>5</a>
    <a>6</a>
    <a>7</a>
    <a>8</a>
    <a>9</a>
    <a>10</a>
    <a>11</a>
    <a>12</a>
</div>
```

Naturalmente elas se apresentarão um ao lado do outro na tela, caso queiramos arrumar dispor elas na vertical nós fariamos

```css
.Lista {
    display:flex;
    flex-direction:column;
}
```

Por padrão o `flex-direction` é setada para o tipo `row` que em inglês é o mesmo que linha, caso eu queira colocar ela em coluna eu coloco ela para `column`

## O grid e algumas limitações do flex

O grid é o ato de alinharmos uma matriz de elementos, dessa forma se dermos um flex nos elementos ele vai ou estourar o tamanho da linha ou vai dizer que os elementos tem um tamanho menor do que eles deveriam ter (pela caracteristica row), para isso devemos falar que se acabar o espaço pule a linha com `flex-wrap:wrap;`, além de que se estourar o tamanho fixe o tamanho em porcentagem.

Agora as limitações estão em torno do espaçamento desses elementos, pois o o justify-content aqui tem que ser flex-start (que é o padrão) por que o resto mas nos atrapalha do que ajuda , então para isso basta criar uma margem para todos os lados, e dizer que os elementos do começo não tem margem a esquerda e os elementos que estão no final não tem margem a direita, podemos resolver isso com:

```css
	.conteudoPrincipal-cursos-link:nth-child(4n) {
		margin-right: 0;
	}

	.conteudoPrincipal-cursos-link:nth-child(4n+1) {
		margin-left: 0;
	}
```

Caso a witdth de cada elemento esteja um pouco abaixo de 25%, ou seja temos 4 colunas, com um espaçamento razoável entre elas, então de 4 em 4 elementos eu tenho uma margem a direita de 0 e de 1+(4 em 4) temos uma margem a esquerda de zero

Porque as vezes pode ser complicado utilizar justify-content: space-between ou space-around para o grid?

É complicado utilizá-las porque elas colocam comportamentos que não são legais para grids. Tanto space-between quanto space-around deixariam super estranha a última linha do grid caso essa tivesse menos elementos do que o total de elementos por linha.

## Mobile e conhhecendo mais o flexbox

Por padrão (com flex-direction: row) o justify-content age no main axis enquanto o align-itens age no cross axis

![Representação de eixos no flexbox](https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/3739/97750afee8f091f8b82864be884a3695/flex_terms.png)

Se dissermos que a flex-direction agora tem a propriedade column agora o justify-content age no main axis (na vertical) enquanto o align-itens age no cross axis(na horizontal)

No mobile a grande mudança que teremos é que quando estivermos elementos alinhados por linha agora será por coluna, aí algumas coisas vão mudar em relação aos eixos dessa caixa, nessa hora alteramos uns justify-content ali e outro ali , uns align-itens, alinhamos o texto pra forma como queremos e matamos o problema e usar o `flex-wrap` quando necessário e ajeitar `width` para que ocupe toda a página

Quando colocamos display: flex em um elemento, o navegador passa a considerar esse elemento como um flex container, ou seja, cria todo aquele comportamento que vimos anteriormente no curso, os filhos ficam um do lado do outro e podemos aplicar propriedades para espaçá-los.

Os filhos de um flex container por sua vez também ganham um nome, são chamados de flex items.

Quando utilizamos flexbox temos que ficar atentos em quem colocamos as propriedades de espaçamento e distribuição do flex. Por exemplo, existem algumas propriedades que devem ser aplicadas à flex container e outras que devem ser aplicadas nos flex items.

## Flex-order

Por padrão todos os itens de uma lista tem ordem 0, dentro do flex, e se eu quiser que um item fique antes de todo mundo eu coloco `order:-1` naquele elemento ou seja no filho , o que muda um pouco sobre o flex pois tudo era no pai

Um bom site para ver isso é esse [aqui](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## flex-grow e flex-shrink

Caso queiramos que o elemento filho preencha um espaço que esteja vazio, nós dizemos a ele `flex-grow:1` assim ele preenche todo o espaço que pertence ao espaço do pai.

Caso tenhamos dois elementos que preenchem um determinado espaço do container pai, para que um ocupe o dobro do outro nós fazemos `flex-grow:2` pro que deve ocupar mais e atribuir valor 1 para o outro

O `flex-shrink` faz a mesma coisa que o flex grow mas na hora que eu diminuo o tamanho da tela, ele diminui de maneira proporcional

### Exercício

Quais são as propriedades que funcionam SOMENTE nos flex container e quais são as que funcionam nos flex items?

Existem diversos sites para consultar isso, como [esse](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

```pt-br
flex container:

justify-content, align-items, flex-direction, flex-wrap

flex items:

order, flex-grow, flex-shrink


A propriedade display: flex pode ser usada nos dois. Se for usada em um flex item esse elemento será tanto um flex item quanto um flex container.
```

```pt-br
flex container:

justify-content, align-items, display: flex,

flex items:

order, flex-grow, flex-shrink
```

Seguindo a documentação temos:

```pt-br
container:

display: flex
flex-direction
justify-content
flex-wrap
flex-flow
align-items
align-content
```

```pt-br
flex item:

order
flex-grow
flex-shrink
flex-basis
flex
align-self
```

## flex em detalhes

O flex grow basicamente divide o pedaço faltante (a largura total a direita) e distribui em pesos para todos os que tiverem pedindo um flex-grow, então caso eu tenha um elemento que pede 2, outra que pede 1, outra que pede 3 e outra que pede 1, então o flex-grow separa o espaço faltante em 7 e distribui 2 fatias pro primeiro, 1 pro segundo, 3 pro terceiro e 1 pro quarto. Aumentando o tamanho de todas de acordo com essas fatias de modo a preencher todo o tamanho do flex container.

O shrink é mais interessante quando diminuimos muito a largura da tela, pois é o quanto aquele elemento diminui quando diminuimos a largura da tela. Por padrão todos os elementos diminuem igualmente (valor 1), e proporcionalmente se colocarmos valor 2 esse elemento diminuirá 2 vezes mais que normalmente diminuiria, e os pesos ocorrem da mesma forma que no grow a diferença é que dessa vez a perda de tamanho é que é proporcional. O flex shrink:0 não aceita diminuição (o que não é recomendável pois pode qubrar o layout).

O padrão do flex-grow é zero enquanto no shrink é um, ou seja os elementos não ocupam o espaço todo por padrão e diminui proporcionalmente com a diminuição do layout

O flex grow quando o flex-direction é row tende a manter todo mundo na mesma altura e quando é column deixa toda a largura no mesmo comprimento

Somente o comando flex aceita dois parâmetros o primeiro pro grow e o segundo pro shrink e o terceiro é o flex basis. Podemos usar a propriedade flex. A sintaxe fica simples assim:

```css
  flex: 1 1 300px;
```
A ordem dos valores é:

flex-grow, flex-shrink, flex-basis.

O flex basis define uma largura com número qualquer pros elementos, ele é praticamente um width, só que o flex basis tem mais prioridade que o width. A propriedade flex-basis serve para definir uma largura ou altura para o flex item. Se o flex container tiver com flex-direction: column, o flex-basis no flex item servirá para definir uma height. Caso o flex-direction: row, ele funciona como um width.

Uma boa forma de treinar é no joguinho [flex froggy](https://flexboxfroggy.com/) ou no [flexbox defense](http://www.flexboxdefense.com/)

### Contas no flex

A propriedade flex-grow vista no exercício anterior ajuda muito caso queiramos que um elemento ocupe toda a largura restante do flex container.

Por exemplo, se temos:

Elemento 1: 200 px.

Elemento 2: 200 px.

Espaço vazio que sobrou do flex container: 600 px.

Total: 1000 px.

Se colocamos flex-grow: 1 no primeiro elemento, ele passa a ter 800 px de largura, ou seja:

Espaço vazio + Elemento 1: 800 px.

E o segundo elemento continua tendo 200 px de largura.

Agora, se colocarmos flex-grow: 1 nos dois elementos, o que aconteceria? Qual tamanho ficaria o elemento 1? E o elemento 2?

O que aconteceria é o seguinte:

Considere o espaço vazio inicial: 600 px.

Como os dois elementos tem flex-grow: 1, a soma de flex-grow que temos vai dar 1 + 1 = 2.

O navegador pega esse espaço vazio e divide pelo número de flex-grow que temos: 600 px : 2 = 300 px.

Agora ele distribui esse espaço para cada um dos elementos que colocamos flex-grow.

Elemento 1: 300 px + 200 px = 500 px.

Elemento 2: 300 px + 200 px = 500 px.

### Diminuindo proporcionalmente os elementos

Considere o código HTML abaixo.

```html
<main class="flexContainer">        
  <div class="flexItem firstRow"></div>
  <div class="flexItem firstRow"></div>
  <div class="flexItem firstRow"></div>
  <div class="flexItem firstRow"></div>
</main>
```

Considere agora que estejamos em um contexto flex. E que cada flexItem tem 200 px de width.

CSS

```css
.flexContainer {
  display: flex;
}
.flexItem {
  width: 200px;
}
```

1) Quando a largura da tela chega a 800 px, os elementos mantém 200 px de largura cada um preenchendo todo o espaço da tela, porém, o que acontece com a largura dos flexItem quando diminuímos a tela para por exemplo 600 px.

2) O que acontece com a largura deles também quando aplicamos o seguinte CSS no nosso código?

```css
.flexItem:first-child {
  flex-shrink: 2;
}
```

Sugestão: Crie um arquivo HTML e CSS, escreva esse código e faça os testes, utilize também valores diferentes!

1) Quando diminuimos a tela para 600 px os flex-item diminuem seu tamanho igualmente entre si, ou seja, como a tela diminuiu 200 px e temos 4 flex items, cada um diminuiu 50 px. Sendo assim cada flex-item ficou com 150 px no fim.

2) Quando colocamos flex-shrink: 2 no primeiro, ele diminui de forma diferente do que os outros elementos. As contas que ocorrem são semelhantes as que ocorrem no flex-grow.

Primeiro de tudo o navegador pega o total de flex-shrink que nossos flex items tem, como temos por padrão flex-shrink: 1 nos flex items, a conta fica assim:

2 + 1 + 1 + 1 = 5. Isso pois o primeiro colocamos flex-shrink:2.

Como diminuímos 200 px do tamanho total, o navegador pega esse valor e divide pelo total de flex-shrink. Fica: 200 px : 5 = 40 px.

Dessa forma o navegador tira 2 partes do primeiro elemento 200px - 80px = 120px e tira 1 parte dos demais, ou seja: 200 px - 40 px = 160 px.

### Invertendo a ordem de todos os elementos


O flex permite que nós possamos alterar muitas coisas nos elementos, seja distribuição dos espaços, tamanhos, direção de renderização e alinhamento. Além de tudo isso também podemos mudar o sentido nos quais os nossos elementos são renderizados. Faça o teste. Abra nossa página principal do site index.html, lembra do grid que fizemos? O CSS que usamos deve estar assim:

```css
.conteudoPrincipal-cursos {
  display: flex;
  flex-wrap: wrap;
}
```

Mude agora o flex-wrap. Coloque flex-wrap: wrap-reverse.

```css
.conteudoPrincipal-cursos {
  display: flex;
  flex-wrap: wrap-reverse;
}
```

Tudo que estava em baixo foi para cima! Ele inverteu a ordem das linhas!

Tente agora:

```css
.conteudoPrincipal-cursos {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}
```

Repare que agora ele inverteu a ordem dos elementos nas linhas.

Podemos usar também flex-direction: column-reverse nos casos em que usamos flex-direction: column. Ele inverterá a ordem!

## align-self

Nos jogos você encontrará uma outra propriedade chamada align-self. Essa propriedade é aplicada ao flex item e faz com que ele se alinhe individualmente.

Lembra da propriedade align-items que colocávamos no flex container? O align-self faz a mesma coisa, só que alinha um único elemento e é colocada no flex item.
