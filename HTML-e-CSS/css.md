# CSS (folha de estilo em cascata)

O css serve para estilizarmos as tags dentro de uma página (para que não fique tudo preto e branco), e para isso nós criamos identificadores para mudar o estilo de uma tag específica.

O comum é criarmos um página exlusiva de css dentro do diretório da página e dentro do head colocarmos a seguinte tag, mas podemos fazer o css inline (linha por linha) usando a propriedade `style` dentro do html ou até criar um style dentro do head, só que dessa forma poluímos um pouco o código.

```html
<link rel="stylesheet" type="text/css" href="styles.css" />
```

rel siginfica relação, e o css usa uma folha de estilo

Onde em href fixamos o caminho da pasta que leva ao arquivo sabendo que o HTML se baseia nele para identificar as demais. Linkando um arquivo externo nós conseguimos utilizar o mesmo estilo para diversas páginas diferentes.

Tudo que eu coloco nessa folha pai reflete nos filhos (arquivo html)

## Alguns estilos comuns

|Estilo|Descrição|
|--|--|
|font-size|Por padrão o tamanho de uma letra está em 16px|
|text-align|alinha o texto|
|background|Mudar a cor em hexadecimal, rgb ou até mesmo o nome da cor (o visual Code tem um editor de cor bem legal)|
|div|cria uma divisão em containers dentro do conteúdo no body, podendo editar trechos separadamente|
|text-transform: uppercase;|transforma texto em maiúsculo|

É de suma importância utilizarmos um editor de código como o Visual Code pois ele nos dá dicas de códigos corretos

Por questão de projeto é comum que os estilhos de body e html venham primeiro das de parágrafo e coisas estilização de letras

Cores em hexa são representadas por 

```css
#_ _ _ _ _ _
Dois primeiros- pro vermelho
Dois próximos - verde
Dois últimos - azul

0-> minimo
F-> máximo
```

Cor em rgb

```css
rgb(_, _,_)
vermelho, verde, azul indo de 0 até 255. 
```

## Formas de relacionar o css

|No html|No css|
|--|--|
|id="a"|#a|
|id="a" e uma tag|#a tag|

Uma dica é, toda id tem uma hashtag #, onde o identificador é único

## Espaçamentos

![Espaçamanetos](img/espaçamentos.png)

Padding, cria um espaço além da imagem, border cria uma borda e margin separa a borda das partes físicas da página. Uma boa é ir olhando no browser em develper tools e ir adequando para algo que te agrade

`padding: _ _ _ _` : primeiro para cima, depois para a direita, para baixo e para a esquerda.

`padding: _ _` : (o primeiro é para cima e para baixo e a segunda é para esquerda e para a direita)

## Classes

As classes são identificadores que podem se repetir e para adicionar el no html eu faço

```html
<li class="nomes"> Item 1</li>
```

E para referenciar ela no css é com

```css
.nomes {}
```

## reset.css

O navegador impoe diversas caracterísiticas ao nosso site que não pedimos (como margem nas laterais, link com fundo azul e espaçamentos nas tags h1,h2 e afins) o rest.css (na aula 2) zera essas coisas e deixa a página do jeito que queremos.

## Posição

Quando renderizamos uma tag na página por padrão o navegador entende que o posicionamento dessa palavra é estática, para movermos isso de lugar em relação ao ponto onde essa tag se situa nós colocamos que ela está em posição relativa (pois é relativa a onde ela deveria estar), agora para estar em qualquer posição da página (útil quando temos que mover ela para cima e para a direita por exemplo) nós dizemos que a posição dela é absoluta e página inteira passa a ser a referência.

Por exemplo a posição do navegador

```css
nav {
    position: absolute;
    top: 100px;
    right: 300px
}
```

Passa a ser 100px distante do topo da página e 300px a direita do limite direito da página.

Com o position: absolute, eu consigo posicionar meu elemento em qualquer lugar da página

Para fazer com que o menu fica dentro de um div de caixa e se movimento a partir dessa caixa eu tenho que fazer com que essa caixa tenha posição relativa.

E a melhor forma de centralizar uma div é delegando para o navegador fazer a conta de calcular a largura que resta, dividir por dois, e adicionar metade em cada um dos lados.

E fazemos isso com:

```css
    margin: 0 auto;
```

Pois colocamos quanto vale a largura desse div, quanto que ele tem que preencher, a margem que vai ocupar no meu computador, só meu computador sabe, por isso auto para a direita e a esquerda.

## Cantos arredondados

Para deixar uma div ou uma caixa qualquer com cantos arredondados nós temos os comandos:

```css
    border: solid 3px black;
    border-radius: 20px;
```

Onde na primeira linha eu posso declarar direto, o tipo da linha (linha solida, tracejada,pontilhada, whatever), a espessura da linha e a cor da linha de borda.

## Mapeamento do usuário

Quando tenho o mouse do usuário em cima de algo clicável ou mesmo clicando eu tenho uma mudança de comportamento daquele trecho de código, isso é o mapeamento das açoes do usuário.

Normalmente é declarado no css da seguinte maneira:

```css
nav li:hover{}
```

Onde hover é passar com o mouse em cima do elemento (que pode ser qualquer um), active é quando se clica.

E na ação eu apenas mudo uma das açoes que foi específicada quando criamos aquele elemento.

E para mudar uma fonte h2 dentro dessa lista eu faço

```css
nav li:hover h2{}
```

Esses comportamentos são chamados de pseudo-classes.

## Adicionando imagem de fundo com css

Primeiro tenha a imagem na pasta do projeto e adicione com

```css
background: url("Caminho da imagem")
```

## Formulários

A guia de input já tem a borda delimitada, para aumentar seu tamanho mude o espaçamento interno (para ter mais espaço de digitação)

## Hierarquia no css

A força de uma tag no css vale 1, a de uma classe vale 10 e a de um identificador vale 100.

Então se termos um `p {color: red}` e uma `main p {color:blue}` a força de `main p` é de 2, contra um de `p` portanto a cor pintada no parágrafo será de azul pois essa tem uma força maior. Uma boa forma é trabalhar sempre com classe. E o inline `<p style="color:purple>"` tem uma força de mil e esse é imutável. 

## Transições

Vamos supor que queremos alterar a cor de um elemento quando ele está em cima de um botão, e queremos uma transição que não seja instantanea, para isso usamos o `transition` e como argumento usamos o tempo, 1s, 2s tanto faz. E depois a mudança que queremos ver no caso a cor de fundo deixando nosso elemento como:

```css
transition: 1s background;
```

## Transformações

Uma forma de aumentar o tamanho do botão é com a trasnformação de escala e isso é feito assim que eu passo o mouse em cima dela e eu faço isso com:

```css
 .enviar:hover {
    background: rgb(88, 63, 15);
    transform: scale(1.2);
 }
```

E para acontecer uma transição mais suave eu mudo o estilo do botão enviar com:

```css
transition: 1s all;
```

Para adicionar mais transformações eu posso fazer

```css
 .enviar:hover {
    background: rgb(88, 63, 15);
    transform: scale(1.2) rotate(30deg);
 }
```

## Dicas para melhorar o CSS

Quando uma div tem um titulo, imagens e conteudo apenas normalmente dizemos que aquela parte é uma `section`, isso deixa nosso html mais semântico.

Dica: quando se olha para o css use a classe, quando se olha para o comportamento (com js) use identificador.

Não coloque nomes como titulo-centralizado, caixa-a-esquerda, tente colocar nomes mais genericos como titulo-principal, titulo-secundario, pois a posso associar melhor os usos dessas classes em outros momentos do código. (imagine que aquela página vai ser aumentada e incrementada no futuro). Tente ser específico mas não tanto. Um balanço é a melhor alternativa. Nem tão específica, para poder repetir as classes, e nem tão genérica, para poder não precisar combinar classes.

O tamanho base de um texto em px são de 15px o que equivale a 1em, o em é uma proporcionalidade da medida em pixels.

## O float

Tanto o float:left quanto o float: right servem para que o elemento se destaque na tela, deixe de ocupar o espaço em que estava, para que os outros elementos possam se posicionar ao redor dele.

Só que ele quebra um pouco as regras de todos os outros elementos da página, para não quebrar os elementos que estão ao redor dele, nós temos a propriedade `clear:left`, `clear:right`

## Mais sobre pseudo-classes e pseudo-elementos

Com `.itens:nth-child(4)` podemos selecionar qualquer elemento dentro de uma lista criada com html (no caso estamos no quarto elemento), com `first-child` teríamos o primeiro e `last-child` o último item. Com (2n) no argumento pegaríamos os elementos pares

Com :first-letter selecionamos apenas a primeira letra dos elementos que queremos modificar, assim como a primeira letra temos a primeira linha também.

### before e after

Não confunda, before é antes e after é depois hahahaha

A idéia aqui é colocar um elemento visual (e não selecionável) antes do css atuar no elemento e depois do css ter terminado de atuar sobre ele.

## Gradientes

Podemos aplicar um degradê entre duas cores no background com

```css
background: linear-gradient(black,grey);
```

Isso faz um gradiente horizontal entre essas duas cores, posso colocar uma inclinação entre essas duas cores com:

```css
background: linear-gradient(45deg,black,grey);
```

E posso adicionar mais cores com:

```css
background: linear-gradient(45deg,black,grey,white);
```

Além de colocar pesos específicos de ocupação dessas cores com:

```css
background: linear-gradient(45deg,black 30%,grey 40%,white);
```

Para criar um gradiente circular temos:

```css
background: radial-gradient(45deg,black 30%,grey 40%,white);
```

## Seletores Avançados

Seletor >, para acessar os filhos de determinado elemento. Por exemplo, para acessar todos os p dentro de main:

```css
main > p {}
```

Seletor +, para acessar o primeiro irmão de determinado elemento. Por exemplo, para acessar o primeiro p após um img:

```css
img + p{}
```

Seletor ~, para acessar todos os irmãos de determinado elemento. Por exemplo, para acessar todos os p após um img:

```css
img ~ p{}
```

Os seletores tem a mesma força.

Seletor not, para acessar os elementos, exceto algum. Por exemplo, para acessar todos os p dentro da classe principals, exceto o p que tem id missao:

```css
.principal p:not(#missao){}
```

Onde img seria o irmão onde p está dentro dele.

## Problemas com tamanho de imagem

As vezes precisamos colocar a imagem em um tamanho que não sabemos muito bem qual é, mas que atenda tanto o mundo desk quanto o mundo mobile, sabemos que o width deixa a imagem bem proporcional para nós e com a função calc podemos fazer operações matemáticas com números proporcionais e específicos ao mesmo tempo como em:

```css
width: calc(40%-(27px *4));
```

Com calc teremos o tamanho calculado perfeitamente (é uma ferramenta bem específica mas que pode vir a calhar com a necessidade do projeto)

## Opacidade

A opacidade nos diz se queremos visualizar tudo do elemento ou não, se queremos ver 30% selecionamos 0.3, se queremos ver 90% 0.9 e por aí vai como:

```css
opacity: 0.3;
```

Com rgb usamos a opacidade com a função rgba como:

```css
rgba(0.0.0.0.3)
```

E é esse quarto elemento que é a camada alpha.

Ou seja todos os elementos e todas as cores podem ter a opacidade setada.

## Sombra

Com `box-shadow` eu consigo aplicar uma luz na caixa e ter uma sensação de sombra.

```css
box-shadow: <deslocamento no eixo x> <deslocamento no eixo y> <blur(opcional)> <intensidade da sombra(opcional)> <cor>
```

Podemos colocar mais sombras se necessário, basta colocar uma vírugula.

Uma outra coisa legal é o sombreamento interno e para isso colocamos o inset.

```css
box-shadow: inset 0 0 <medida em pixels do espaçamento interno> <cor>
```

Essa solução pode ser interessante para uma div inteira.

Tem a `text-shadow` para uma palavra ou texto.
