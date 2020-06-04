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

## Classes

As classes são identificadores que podem se repetir e para adicionar el no html eu faço

```html
<li class="nomes"> Item 1</li>
```

E para referenciar ela no css é com

```css
.nomes {}
```
