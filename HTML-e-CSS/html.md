# HTML

A finalidade do HTML é marcar o texto em uma página web

## Alguns comandos báscicos

Estrutura básica de uma página HTML

```html
<!DOCTYPE html>
<html lang="pt-br">

    <head>
    <meta charset="UTF-8">
    <title>Título da Página</title>
    </head>
    <body>

    </body>

</html>
```

Tag se começa com `<tag>` e `</tag>`

A tag DOCTYPE serve para que todos os programadores saibam que aquele arquivo é um arquivo html (assim com a extensão .html), e se somente colocarmos html depois do !DOCTYPE nós estamos dizendo para o navegador que estamos usando a última versão do html. Ela é só uma tag de informação e de estrutura.

A tag `html` serve para marcarmos na página tudo que vamos renderizar na página como html (algumas páginas até funcionam sem essas tags, mas como não se sabe como os browsers vão funcionar daqui uns meses, é sempre bom garantir que essas tags existam na página). Aqui colocamos que a página tem um língua mãe em portugês brasil, e caso uma pessoa esteja em outro país ela pode acessar um serviço externo para que possa se traduzir essa página

A tag `meta` é uma tag que passa informações pro navegador e charset (characterset) define a biblioteca de letras (dicionário) que vai ser utilizado, alguns navegadores entendem acentos e coisas do tipo. mas para garantir que todos os navegadores vão entender o que estamos dizendo vale forçar isso na tag exatamente abaixo do `<html>` e a melhor e mais comum é a UTF8, então não teremos problema de acentuação, de cedilha de crase.

As tags `head` e `body` são entendidas como, o `head` não é visto pelo usuário mas entendida pelo navegador e o `body` é tudo aquilo que é visto pelo navegador, então faz sentido o meta eo `title` dentro do `head` e todo o texto a ser exibido de informação deve estar no `body`, essa separação deixa tudo mais entendível para nós desenvolvedores.

Algumas outras tags:

|Tag|Descrição|
|--|--|
|h1,h2,h3,h4,h5..|Título, subtítulo e por aí vai|
|p|parágrafo|
|hr|linha horizontal|
|b ou strong|Texto em negrito|
|i ou em|Texto em itálico|
|title|Seta o título da página na aba da página|
|img|coloca imagem|
|a (ancora)|Você pode linkar uma página qualquer com essa tag com um href=""|
|nav|divisória criada no html 5 para tagear a barra de navegação|
|main|tag semântica que nos diz o conteudo principal de uma página, é bom por questão de sematica (ou seja deixa o codigo mais legível), é igual uma div mas com nome proprio|
|br|pula a linha break|

## Adcicionando imagem

Assim como o css, nós temos que linkar uma pasta com as imagens da seguinte forma no body

No body chamaremos:

```html
<img src="pasta">
```

Posso alterar sua largura com width e altura com height

### Ajustando imagem

As vezes as imagens que pegamos da internet são muito grandes, e mesmo que coloquemos um tamanho de largura reduzido para ela ocasionalmente deixa um espaço muito grande ao lado dela, isso é por que temos um espaço de inline que pode ser preenchido ou não

## Listas

Tags para listas listas não ordenadas (ul) e listas ordenadas (ol).

Elementos da lista (list item) -> li deixando a estrutura de uma lista não ordenada da seguinte forma

```html
<ul>
    <li> Item 1</li>
    <li>Item 2</li>
        ...
    <li> Item n</li>
</ul>
```

## div

A tag de divisão serve para separar dois tópicos do meu código podendo ter letras com tamanhos diferentes, backgrounds diferentes, outra forma de se ver o código inclusive. E por padrão a div não interfere em nada no código

## ul

Podemos dizer que o `ul` que originalmente é travado, fique do tamanho que ele foi especificado e deixe outros elementos ocuparem o espaço faltante (inline-block)

Tags do tipo block irão ocupar a largura toda de sua página por padrão, independente do conteúdo que ela tiver. Além disso vc consegue manipular largura e altura desses elementos.

Já as tags inline ocuparão apenas a largura e altura de seu conteúdo interno, de modo que vc não consegue alterar esses valores.

<https://cursos.alura.com.br/forum/topico-os-comportamentos-inline-e-block-101153>

## Cabeçalho

Por ser muito comum nós temos agora no HTML5 a tag header

## Main

Com intença de dividir o código de modo a ficar mais legível temos a tag main (que deixa o conteudo principal a mostra)

## Rodapé

Ao rodapé da-se o nome de footer

## Caracteres especiais

Existem símbolos especiais que de vez em quando devemos colocar em nossos sites, um deles é o simbolo de copyright &copy; e o mais normal em nossas aplicações é vermos uma tabela de unicodes e pegar o nome da entidade no caso do simbolo de copyright o seu símbolo de unidade é `&copy;`

Um site bom para nos dar os códigos para isso é o <https://unicode-table.com/en/>
