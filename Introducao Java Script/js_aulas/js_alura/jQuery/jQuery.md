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
