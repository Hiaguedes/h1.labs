# Bootstrap

O bootstrap é uma ferramenta que deixa nosso trabalho de montar sites mais ágil e simples, então ele vem com dezenas de ferramentas já pré prontas bastando a nós desenvolvedores apenas colocarmos do jeito que queremos sem se preopcupar com CSS puro. Ele é bem ideal pra construção de landing pages (página de apresentação de algo)

Para instalar é simples, podemos fazer o download de todo o projeto e colocarmos ele na nossa página ou podemos fazer o link no head do html com o CDN que aponta para o bootstrap, a escolha é sua sabendo que a segunda opção necessita de alguns scripts, tudo pode ser visto [aqui](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

Uma das primeiras coisas que notamos é que ele já aplica o reset.css para a gente e muda a fonte também

## Por que usar o CDN é uma boa opção?

É rápido e prático, pois não requer download de nenhum arquivo, apenas incluir os endereços no código;

Os arquivos necessários para que o Bootstrap funcionem estão sendo enviados diretamente de um servidor próximo, sem a necessidade de baixá-los para o computador e incluí-los manualmente no código.

As CDN — sigla em inglês para Content Delivery Network ou Rede de Distribuição de Conteúdo (tradução livre) são redes de conteúdo não centralizadas. Ou seja, elas hospedam um determinado conteúdo em servidores espalhados em várias partes, permitindo dessa forma a distribuição de forma eficaz independente de onde o acesso é realizado.

Existem várias redes CDN, e qualquer empresa pode contratar o serviço de uma para seu sistema, e essa decisão normalmente é tomada levando em conta vários aspectos como ganhos de performance, segurança e custos. O uso de CDNs pode ser indicado para ambientes de desenvolvimento e páginas estáticas.

Caso queira baixar os arquivos, eles estão disponíveis na página de download do Bootstrap, porém os arquivos das bibliotecas jQuery e Popper (necessárias para algumas funcionalidade do Bootstrap) devem ser baixadas em separado, pois não estão inclusas neste pacote. Se tiver alguma dúvida sobre os outros tipos de instalação, pode mandar no fórum.

## Por que usar bootstrap agiliza seu trabalho

Existem diversos exemplos no site da bootstrap e podemos ver um simples navbar no seguinte código abaixo

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="#">Features</a>
      <a class="nav-item nav-link" href="#">Pricing</a>
      <a class="nav-item nav-link disabled" href="#">Disabled</a>
    </div>
  </div>
</nav>
```

E se simplesmente colocarmos no começo do nosso site o legal é que ela já é responsiva e isso é dito com a class `navbar-collapse` que colapsa o que está dentro dessa div para um menu burguer e agora só basta estilizarmos o menu com as técnicas que já conhecemos, o bootstrap também é uma ferramente acessível

## Estilizando o bootstrap

Entenda o bootstrap como, você não vai mecher com css puro aqui, então se quisermos dar flex nos elementos na unha não vai dar certo e para isso acessamos no site da bootstrap o que queremos, propriedades do flex, position e coisas do tipo, tudo tem lá. E tudo funciona colocando classes dentro

### Perguntas

Flex, pais e filhos

Fernando está responsável por implementar uma seção "Sobre Nós" na landing page da empresa onde trabalha. No HTML, ele adicionou cada item da seguinte forma:

```html
<div>
      <img src="ana-claudia.jpg">
      <img src="marco-aurelio.jpg">
      <img src="samanta-cunha.jpg">
</div>
```

A seção tem 3 imagens, que devem ser exibidas lado a lado e espaçadas para ocuparem a largura da tela em notebooks e desktops. Ele gostaria de usar a ferramenta Flex do Bootstrap para fazer isso, porém tem dúvidas sobre em que parte do código deve inserir as classes. Assinale a opção correta:

```html
<div class="d-flex justify-content-between">
      <img src="ana-claudia.jpg">
      <img src="marco-aurelio.jpg">
      <img src="samanta-cunha.jpg">
</div>
```

A ferramenta Flex do Bootstrap é utilizada exatamente da mesma forma que utilizamos o Flex como propriedade do CSS. Ou seja, algumas classes devem ser utilizadas no elemento-pai para que ele controle os elementos-filhos, como é o caso de justify-content-***. Nesse caso, o elemento `<div>` tem três elementos-filhos (três `<img>` com seus conteúdos); assim, como queremos que o alinhamento seja feito entre os três elementos-filhos, devemos adicionar a classe no elemento-pai (`<div>`).

Você está utilizando Bootstrap no desenvolvimento de um site. A escolha de layout do cliente pede uma imagem de plano de fundo, funcionalidade que o Bootstrap não tem, então temos que implementar utilizando o CSS. A melhor forma de trabalhar nesse caso é:

Criar nosso próprio arquivo CSS e inserir nele o código utilizando nossos próprios seletores

Certa: Criar nosso próprio arquivo .css, declarar nele as propriedades da imagem e "chamar" através de um seletor semântico - ou seja, damos ao seletor (normalmente uma classe) um nome facilmente identificável.

Por exemplo:

```css
//style.css
.img-background {
    background-image: url("src/img/plano-de-fundo.jpg");
    }
```

O bootstrap trabalha com modelos, mas é impossível trabalhar com todos os modelos do mundo, então para deixar com a nossa cara precisaremos do css :)

Mas usar o bootstrap é fácil, é basicamente ver o que queremos colocar no site, digitando no site deles como, vendo toda a documentação e brincando dentro de classes. Para certos elementos pode não ficar muito claro onde colocar, mas aí só pensar um pouco e ver qual elemento pai isso se encaixa melhor.

## Sempre use tags semânticas

Priorize o uso de tags como main, article, footer, header, ul, li, figure, ao invés de div e tags genéricas, o bootstrap coloca as coisas como div mas por que é a forma mais genérica de se mostrar o que está sendo feito mesmo, mas para garantirmos acessibilidade e indexamento do site é válido colocarmos tags semânticas para mostrarmos o que está sendo feito

## Bootstrap grid

O Bootstrap Grid, pois essa ferramenta permite um ajuste fino de leiaute para vários breakpoints de tela.

O sistema de grid nos permite indicar individualmente qual a quantidade de colunas (em um espaço de 12 colunas) cada elemento irá ocupar, dependendo do tamanho da tela. Em telas menores o espaço total de colunas pode ser ocupado por somente um elemento, enquanto em telas mais largas, podemos acomodar uma quantidade maior de elementos por linha.
