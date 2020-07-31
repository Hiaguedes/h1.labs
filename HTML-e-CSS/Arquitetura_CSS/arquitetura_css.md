# Arquitetura CSS

Essa parte aqui é dedicada as boas práticas que tem que se ter com os arquivos CSS, boas práticas que tornam de fácil manutenção qualquer página e projeto de site e que ajudam a você e outros desenvolvedores a corrigirem bugs e problemas eventuais que ocorrem na página

## Esse curso é um curso sobre organização

Aqui vamos falar muito sobre organização dos arquivos e das pastas, tal como organização do código, como ele deve estar para que outras pessoas possam trabalhar nele

Uma primeira coisa a se notar é que todos os arquivos estáticos ficam dentro de uma pasta assets, e todas elas sendo organizadas dentro de pastas com seu nome. Ou seja arquivos de imagem ficam em uma pasta img, arquivos css dentro de uma pasta css, arquivos javaScript dentro de uma js e por aí vai, todas elas dentro do assets.

O index.html fica fora dessa pasta e esse é o arquivo principal do site, é a página que será vista pelo usuário quando digitar o nome do site

Geralmente é dado um layout (que pode ser no figma ou qualquer outro software de edição de imagem) vindo de um designer e nele trabalhamos codificando o que está sendo visto de cima para baixo

## Tornando os seletores mais legíveis e simples

A melhor dica é não deixar as tags atreladas ao html, como em `header nav ul li a`, por mais que funcione se aplicarmos o estilo dessa forma, ele fica pouco legível a uma outra pessoa que for ler esse arquivo css

Com isso em mente temos que pensar em não chamar nenhum elemento por suas tags em html e por isso criaremos classes para cada elemento que tiver na seção

É recomendável utilizar o máximo de classes possíveis para criar seletores, facilitando o entendimento e possibilitando sobrescritas

## Atomic Design

Da química os átomos juntam moléculas que formam organismos, ou seja de elementos eu formo elementos de página (como menus, formulários e afins) e desses elementos eu formo a seção inteira de uma página e de organismos eu tenho templates e de templates eu tenho as páginas e assim do menor para o maior formamos a página inteira.

## Metodologia BEM para nomear as classes

Block Element Modifier (BEM) é uma metodologia para que possamos arquitetar as classes no css e assim deixar o código ainda mais limpo

O bloco pega apenas um elemento do bloco principal

e a ideia é que teremos o seguinte nome para a classe css `bloco__elemento--modificador` e não necessariamente precisa-se ter os três juntos, então em um caso

```html
<section class="secao">
    <ul>
        <li></li>
        <li></li>
        <li></li>
    <ul>
    <img>
```

Nós arrumariamos como:

```html
<section class="secao">
    <ul class="secao_lista">
        <li class="secao__lista__item--ativo"></li>
        <li class="secao__lista__item"></li>
        <li class="secao__lista__item"></li>
    <ul>
    <img class="secao__imagem">
```

E com isso separamos os arquivos css de modo a descrever cada elemento (o nome do arquivo não precisa seguir o padrão BEM)
