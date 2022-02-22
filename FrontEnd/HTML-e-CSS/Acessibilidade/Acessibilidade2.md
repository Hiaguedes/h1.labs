# Acessibilidade parte 2

Essa parte vai tratar especificamente dos sem visão, que conseguem ler um site por um software que lê a tela como o NVDA (no video access), e ele vai apertando a tecla TAB e o leitor vai lendo as caracteristicas desse site para o usuário, e vai ser muito dificil para essa pessoa apontar o mouse para onde você quer então o teclado deverá ser a guia para esse usuário.

Os leitores de tela mais usados são o JAWS e o NVDA, porém o JAWS é pago e a licença dele é bem cara enquanto o NVDA é open source, o NVDA é para windows ou linux enquanto o voice over seria a opção mac. Mas a maioria desse pessoal usa o windows e o navegador mais usado seria o firefox, o grande problema do nvda é a voz que é totalmente sintetizada e incomodante, para mudar essa voz vamos usar a voz do proprio windows ao clicar em sintetizador, opcoes de voz, microsoft one core e ai você pode usar a maria ou o daniel.

Para não ficarmos loucos com tanto voz sendo falada nós podemos habilitar o exibidor de fala que nos mostra aquilo que ele falaria com o mouse e o teclado sendo usados no site que estamos desenvolvendo e isso é bem bacana

maneira boa de navegar no nvda k para ir pro proximo link e shift+k para voltar os link e h para navegar entre titulos

Apesar do NVDA não se perder e ditar o nível do heading em foco, outros leitores de tela (principalmente versões antigas) podem ler apenas o primeiro `<h1>` ou simplesmente se perderem, e por consequência prejudicar a experiência do usuário no site. Principalmente usando o atalho para ler o que seria o ponto mais importante do site (comumente H + 1).

O melhor caminho para deixar nosso projeto inclusivo não é apenas seguir regras e guidelines, mas testá-las por conta para começarmos a compreender os caminhos e dificuldades que muitas pessoas podem ter ao usar nosso produto e/ou serviço. Empatia. Tgas semânticas também são bem vindas

## Coisas básicas para se fazer em html

Os leitores de tela reconhecem oas tags `<h1>` dos titulos então não coloque muitos h1 por aí no html e estruture suas tags de forma que o cego consiga identificar no seu site as varias camadas de titulos que há em seu site, então o que for h1 reserve somente para o mais importante da página, o que for h2 coloque para subtitulos e coloque h3, h4 se for necessário. No NVDA vai apertando h e o visualizador de fala te dá os níveis de casa titulo.

Apesar do NVDA não se perder e ditar o nível do heading em foco, outros leitores de tela (principalmente versões antigas) podem ler apenas o primeiro `<h1>` ou simplesmente se perderem, e por consequência prejudicar a experiência do usuário no site. Principalmente usando o atalho para ler o que seria o ponto mais importante do site (comumente H + 1).

O idioma do html deverá estar na língua mãe do site então coloque `<html lang="pt-br">` por favor, senão os links do site estarão sendo falados em inglês, ou outra lingua, caso eu precise que algumas frase em específico seja entendido em inglês eu coloco naquela tag `<span lang="en">`

Quando tem uma imagem com tag `<img>` use o alt para dar uma descrição para aquela imagem, pois vai que a imagem não carrega, ou a pesso vendo o site não consegue ver a imagem e usa leitor de tela, o alt (alternative) coloca o texto para a gente nesses casos. CTRL+F sempre ajuda

Com o mouse ou com a tecla g o NVDA vai falando para mim justamente o que está escrito no alt, evite colocar coisas como foto de, imagem de pois o NVDA coloca que aquilo é uma gráfico já

Tente separar imagens de estilização (que seriam usadas no css) como imagens de fundo ou ícones de imagens ilustrativas (que você colocaria no html), elas que vão descrever de fato um produto ou uma idéia para qualquer usuário. Imagens estilizadas você normalmente coloca sem legenda mesmo com `alt=""` pois ela tem mais um artifício estético, e serve para pessoas com visão não acharem aquela página não atraente. Mas para um cego isso pouco importa.

Se for interessante que a imagem seja indexada por buscadores, a imagem deve ser deixada no HTML. Porém, o alt ainda precisa ser declarado, mesmo que sem valor, para que o leitor de tela ignore a imagem

Para dar uma descrição em imagens do tipo svg (pincipalmente se exportarmos de outro site), nós colocamos a tag `<tilte>` dentro da tag `<svg>` caso isso fique meio feio, coloque o title dentro de uma tag a com um filho dessa a sendo o svg

Caso você venda produtos coloque atributos do produto no alt também, isso ajuda o SEO e dá acessibilidade

Quando for descrever coloque acentuação, pois o leitor entende a acentuação e fica estranho se não tiver ela

O facebook tem uma ferramenta chamada detectron que coloca alts automáticos em fotos (mas assim... se o seu projeto for beeeeem grande até vale a aplicação mas certeza que tem que mecher com back end e coisas do tipo)

Para mais veja esse [vídeo](https://www.youtube.com/watch?v=5FJJuEVt5sA)

Você pode visitar listas com l

## O css afeta a leitura de tela?

Quando colocamos uma lista com cada item começando com uma bolinha ou uma tesourinha, ou coisa do tipo o leitor le, bolinha blabla tesourinha não sei o que, e é surpreendente como o NVDA faz esse tipo de coisa de verdade, então pensando em acessibilidade o certo seria evitar esse tipo de coisa (ou não, isso pode sinalizar que estamos em uma lista mas o melhor é evitar mesmo já que tem outras listas em nosso site que não tem esse tipo de coisa)

Tanto o `display:none` ou `visibilty:hidden` excluem o elemeto do nvda. (o primeiro é como se excluisse a materia e fizesse tudo que está embaixo ocupar a área onde esse elemento ocupasse o segundo é como a capa da invisibilidade do harry potter, ele esconde o elemento mas não exclue a matéria, então o que está la embaixo permanece lá embaixo)

## Mais coisas, no forms

Em um formulário coloque o input dentro da label, ou crio um vínculo entre elas, no leitor de tela será lido essa label, caso tenhamos uma checkbox não tem problema, coloque o for na label e id nesse input com o mesmo nome

Caso precisemos esconder elementos da tela mas que esses elementos não sumam pro leitor de tela nós devemos ler o que tem nesse [link](https://webaim.org/techniques/css/invisiblecontent/)

Atalhos pro NVDA <https://webaim.org/resources/shortcuts/nvda>

Coloque placeholder nos seus inputs pois o NVDA lê esse tipo de coisa, mas cuidado não use o placeholder como label

Caso necessite desabilitar um campo com o disabled, pelo menos de a opcao do cego ler o que está ali então coloque `readonly` invés de `disabled`, assim o leitor de tela consegue ler o que está escrito

## Mais aspectos interessantes de acessibilidade

Criar um botão escondido que pula para o conteúdo principal do site é bem interessante, mais legal ainda vá no site da [Web Aim](https://webaim.org/) e aperte TAB, pois é fazer aparecer essa tecla é legal para pessoas com PCD (que utilizam muito o mouse)

Então colocar um ancora do tipo

```html
 <a class="escondeVisualmente" href="#pularConteudo">Vá para o conteudo principal</a>
```

E para esconder visualmente fazemos

```css
.escondeVisualmente {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
```

Outra coisa interessante é darmos roles nas tags semânticas, isso facilita a vida de quem usa o jaws e outros leitores de tela, pois elas deixam tags genéricas como um div com um aspecto mais semântico

Outra forma legal de colocar descrição para links é com aria-labelledby

## Habilite o zoom

Na tag meta de viewport vemos

```html
 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

O `content="width=device-width` fala que o site pode trabalhar com paginas responsivas `initial-scale=1.0` diz que a página começa com escala original ok mas vemos um  `maximum-scale=1.0, user-scalable=no` que trava o zoom da tela no celular e isso é horrível sério isso fere a liberdade do usuário

## videos

A tag video serve para embedar videos que você tem baixado na seu diretório, coloque controls para habilitar o play do video

Você pode colocar a legenda do vídeo na descrição mas caso não dê você pode criar um arquivo vtt e inserir dentro da tag video com a tag `track` e com isso colocar uma source como em:

```html
<video src="img/formacao-java.mp4" controls class="secaoInstitucional-video" alt="Paulo Silveira o criador da empresa falando sobre a empresa">
        <track src="img/legenda-portugues-brasil.vtt" kind="subtitles" srclang="pt-br" label="Português" >
        </video>
```

Para video a maioria confia no youtube e lá posso colocar legendas e ainda ver quantas pessoas viram aquele vídeo

O conteúdo geral da aula está [aqui](https://github.com/designernatan/curso-acessibilidade-web-front-end-1/archive/005e3751a6b446cee865c12f502b5828e39c974a.zip)
