# SVG

A sigla svg significa Scalable Vector Graphics (SVG) e elas são a maneira mais performática e simples de colocar imagens (do tipo ícone e logo) e junto com css e javascript podemos deixar nosso site bem bonito e animado captando a atenção do nosso cliente e até de nós devs.

O padrão svg foi criado pela w3C, que é a mesma organização que cuida do html e ele ficou meio na baixa por um tempo por conta do flash (que foi descontinuado esse ano hahaha) e o principal ganho do svg frente aos formatos em bitmap como png e jpg é que ele não perde a qualidade se esticarmos ou comprimirmos ele, além dele pesar bem menos do que esses padrões de imagem

## Criando SVG

Nós podemos criar um svg na unha com o próprio html (já que ele é um tipo de html), segue abaixo uma forma de criar um cículo amarelo com borda preta

```html

<svg width="150" height="150">
    <circle cx="100" cy="100" r="25" fill="yellow" stroke="black" stroke-width="3"/>
</svg>
```

Onde aqui criamos uma largura e altura da camada do svg (com 150 de largura e altura) e setamos todas as coordenadas do cículo na mão (o centro em x e y) e o raio, porém na vida real isso é um tanto trabalhoso de fazer.

O SVG sempre considera o centro do objeto gráfico `<circle>` ao renderizar a forma. Ao declararmos cx="0" cy="0" estamos dizendo ao SVG que crie o círculo levando em conta essas coordenadas, ou seja, o ponto mais superior/esquerdo do objeto.

Como criamos um `<svg width="200" height="200">`, para que o círculo ocupe todo o espaço declarado para o SVG (200x200) temos que posicioná-lo considerando o centro do círculo. Dessa forma, as coordenadas seriam cx="100" cy="100" para que o centro do círculo coincida com o centro do SVG.

Pratique com vários valores de raio para ver o resultado!

Então temos bastantes softwares que criam imagens vetoriais como o ilustrator e o inkscape

E quando criarmos as imagens o interessante é deixarmos as imagens em camadas (seja como uma boa prática de edição de imagem mesmo mas por que conseguimos identificar essas camadas para depois animar las via código)

## Sobre as tags

Além da tag svg normal do dia a dia cotidiano, temos a tag `<defs>` que gaurda o que o nome sugere, definições e propriedades que podem ser usadas no decorrer de todo o projeto

E como usamos camadas dentro do svg é criado uma id específica para cada camada, o que é bem legal

E dentro da tag podemos ter várias formas básicas como o circle, o rect, o polygon, a poli linha (linhas ligadas), a elipse cada uma com seus atributos e formas

### A tag path

A que rouba a atenção em muitas das imagens em svg é a tag path que contém muitas informações que você fica meio que "???" mas fique tranquilo.

A path tem um atributo d, uns numeros e uns numeros que tem uma letra antes, essas letras tem o seguinte significado

```s
M= move até
L=linha até
H=linha horizontal até
V=linha vertical até
C=curva até
S=curva suave até
Q=curva bézier quadrática
T=curva bézier quadrática suave até
A=arco elíptico
Z=fecha path
```

E a letra é seguida de dois numeros, um é a coordenada do eixo x e a outra do eixo y

Várias (embora não todas) vêm em pares, MAIÚSCULA e minúscula. A versão maiúscula se refere a coordenadas absolutas e a versão minúscula a coordenadas relativas. Por exemplo:

M 100,100 significa "Pegue uma caneta e a posicione nas coordenadas exatas 100,100" m 100,100 significa "Pegue uma caneta e a posicione 100 para baixo e 100 para a direita a partir da posição em que a sua caneta se encontra agora."

## Importar o svg na página html

Posso importar tanto por uma tag imagem quando pela tag svg criada pelo software de edição, pois conseguimos acessar suas classes e ids dentro do css e do js para animar as imagens. Só que tag img nós somos obrigados a trabalhar dentro da svg da imagem, o que pode ser ruim de ver o css em alguns editores como no caso do Visual Code

## "XML NameSpaces" ou "xmlns"

Você deve ter percebido que alguns códigos em `<svg>`, especialmente os que geramos através de conversores/exportadores como o Illustrator, apresentam informações como estas:

```html
<svg xmlns="http://www.w3.org/2000/svg">
    <!-- elementos gráficos -->
</svg>
```

Mas o que significa o atributo xmlns (XML NameSpace)?

Vamos lembrar que o SVG é uma linguagem de marcação, da família XML (Extensible Markup Language, ou Linguagem de Marcação Extensível). O XML é uma "metalinguagem" que permite ao usuário a criação de suas próprias linguagens de marcação, baseadas nesse modelo. Ou seja, é permitida a criação de outros elementos (ou tags) além das já definidas, por exemplo, no HTML.

Uma vez que é possível criar tags, é possível que existam duas tags com o mesmo nome, criadas em ocasiões diferentes e com usos diferentes? Sim, e os namespaces existem para evitar confusões. Durante o curso pode parecer estranho que isso aconteça, mas vamos lembrar que o XML também é utilizado em estruturas de dados, como neste exemplo:

```xml
<info>
 <nome>Aline A</nome>
 <empresa>Code Dev</empresa>
 <celular>11-99999-9999</celular>
 <email>marcia@email.com</email>
</info>
<info>
 <nome>Ariadne B</nome>
 <empresa>Code Dev</empresa>
 <celular>11-99999-8888</celular>
 <email>julia@email.com</email>
</info>
```

Então, diferentes tipos de conteúdo XML (ou baseados em XML) podem estar presentes em um mesmo documento, e como o usuário pode definir suas tags, como no exemplo acima, o namespace define a qual marcação pertence tal tag. O formato <http://www.w3.org/2000/svg> é um padrão da W3 para o namespace e não precisa ser "linkável", apenas é uma informação que garante que todas as tags que estão aninhadas dentro do elemento-pai (`<svg>`) são, com certeza, elementos do tipo SVG e devem ser renderizadas/interpretadas de acordo.

No nosso caso, não precisamos nos preocupar muito (já vimos que em um exemplo simples o SVG não deixará de funcionar sem o namespace), apenas podemos deixar o atributo declarado em nosso código.

Para saber mais sobre namespaces e sua importância, você pode visitar este artigo no MDN (em português).

## Animando com css

Uma forma de criar o sentido da movimentação é com `@keyframe` que nos diz para onde o elemento vai como em

```css
@keyframes caiaque-movimentacao-3-4{
    to{
        transform: translate(-6px,3px);
    }
}
```

E depois com o nome dessa keyframe aplicamos nas tags dos elementos a serem animados com a propriedade `animation`

```css
#caiaque-3,#caiaque-4{
    animation: caiaque-movimentacao-1-2 3s ease-in-out infinite alternate;
}
```

Aqui é bom colocar o tempo dessa animação, o efeito (suave na entrada e na saída), que ela alterna e de forma infinita (pode ser em qualquer número mas infinito aqui pode ser melhor)

### Usando opções de "keyframe"

Ricardo está usando a propriedade de animação keyframe para animar uma bolinha com CSS. Atualmente o código está assim:

```html
<svg width="200" height="200">
 <style>
  .bolinha {
         animation: loopBolinha 1s;
       }

   @keyframes loopBolinha {
         to {
           transform: translate(40px);
         }
       }
 </style>

 <circle class="bolinha" cx="100" cy="100" r="40" fill="red" />
 </svg>
 ```

Ao executarmos esse código no navegador, o que deverá acontecer?

A bolinha se move por um espaço de 40px da esquerda para a direita e volta para a posição original.

A propriedade translate move o elemento de um ponto a outro, baseado nos valores que passamos como parâmetro da propriedade:

```css
elemento {
  transform: translate(valor eixo X, valor eixo Y);
}
```

Se quisermos mover o elemento somente no eixo X, podemos declarar somente o primeiro valor: transform: translate(200px);. Se quisermos mover em ambos os eixos, declaramos o X e o Y: transform: translate(200px, 200px);. Para mover somente no eixo Y, precisamos declarar o eixo X como zero: transform: translate(0, 200px);

## A propriedade `animation`

A propriedade de CSS animation é uma "propriedade abreviada" (ou "shorthand property"), então podemos juntar várias propriedades em uma só, o que economiza linhas e deixa o código mais organizado. São elas:

```pt-br
Animation-name (nome para "chamarmos" a animação)
Animation-duration (duração em segundos ou milissegundos)
Animation-timing-function (controla a velocidade da animação: a mesma durante a animação toda, mais lenta no início, mais lenta no final, etc)
Animation-delay (o tempo de pausa antes de iniciar a animação, em segundos ou milissegundos)
Animation-iteration-count (quantas vezes a animação será reproduzida em sequência)
Animation-direction (a direção da animação: direção normal, de trás para frente, alternando normal e trás para frente, etc)
Animation-fill-mode (podemos aplicar estilos diferentes na animação enquanto ela executa)
Animation-play-state (especifica se a animação está sendo executada ou pausada)
```

Colocando isso num exemplo:

```css
elemento {
  animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction];
}
```

ou:

```css
.caiaque {
  animation: marola 5s linear 2s infinite alternate; 
}
```

Lembrando sempre que não é necessário inserir todos os valores a cada vez que chamamos a propriedade animation! Só precisamos inserir os que realmente precisamos declarar para que a animação funcione.

Por exemplo, se sua animação não precisa de uma pausa (delay) antes de iniciar, não é preciso declarar esse valor. Além disso, cada uma das propriedades de animação tem diversas opções de valor!

A documentação da W3Schools (em inglês) define cada uma delas separadamente, com uma lista de cada valor que podemos utilizar em cada propriedade.

Como sempre, o ideal é praticar e modificar os valores para testarmos os resultados na tela!

### Loaders em SVG

Conforme vimos, é possível animar SVGs para criar "loaders", aquelas imagens que vemos animadas enquanto o site ou sistema está em carregamento, de um jeito bem parecido com o que usamos para animar o lettering "Verão!" do projeto.

Vamos testar criando um triângulo da forma que já vimos na aula 1.

<svg width="500" height="210">
 <style>
   polygon {
     fill: none;
     stroke: blue;
     stroke-width: 5px;
   }
 </style>
 <polygon points="200,0 300,200 100,200"/>
</svg>

```html
<svg width="500" height="210">
 <style>
   polygon {
     fill: none;
     stroke: blue;
     stroke-width: 5px;
   }
 </style>
 <polygon points="200,0 300,200 100,200"/>
</svg>
```

O resultado é um triângulo com bordas azuis, sem preenchimento.

Agora vamos adicionar a propriedade que utilizamos para animar a borda do lettering do projeto (stroke-dasharray):

<svg width="500" height="210">
 <style>
   polygon {
     fill: none;
     stroke: blue;
     stroke-width: 5px;
     stroke-dasharray: 50px;
   }
 </style>
 <polygon points="200,0 300,200 100,200"/>
</svg>

Usando os valores de 100, conseguimos um efeito similar a este (mas você pode usar os valores que quiser):

```html
<svg width="500" height="210">
 <style>
   polygon {
     fill: none;
     stroke: blue;
     stroke-width: 5px;
     stroke-dasharray: 200;
   }
 </style>
 <polygon points="200,0 300,200 100,200"/>
</svg>
```

Lembrando que quando modificamos os valores da propriedade stroke-dashoffset, os traços mudam de posição, vamos animar essa propriedade para criar o loader.

Por enquanto o valor de stroke-dashoffset é 0. Se a ideia é fazer o loader "girar"continuamente, vamos inspecionar o código e modificar um pouco os valores para checar qual é o valor de stroke-dashoffset após o stroke dar um giro completo:


Aumentando o valor um pouco mais, damos um "loop" completo na animação:

Com um valor de dash-offset de 1000, conseguimos simular pelo inspetor de código uma volta completa no traçado, parando no mesmo lugar. Agora vamos inserir esses valores em uma animação @keyframes:

```css
   @keyframes loader {
     0% {
       stroke-dashoffset: 0;
     }
     100% {
       stroke-dashoffset: 1000;
     }
   }
```

Assim como utilizamos o to no projeto, também podemos usar outros valores, como porcentagens (no caso, em 0% e 100% de conclusão da animação). Agora, vamos "chamar" essa animação no código:

```css
   polygon {
     fill: none;
     stroke: blue;
     stroke-width: 5px;
     stroke-dasharray: 100;
     animation: loader 2.5s linear infinite;
   }
```

A animação animation: loader 2.5s linear infinite; leva as propriedades name: loader, duration: 2.5s, timing-function: linear e iteration-count: infinite.

Utilizamos linear ao invés de ease para que o ritmo da animação seja contínuo, sem ficar alternando entre rápido e devagar. Mas por que tivemos que calcular a posição de dash-offset? Para que a animação sempre termine no mesmo lugar que começou, dando a impressão de continuidade.

O código final ficou dessa forma:

```css
<svg width="500" height="210">
 <style>
   polygon {
     fill: none;
     stroke: blue;
     stroke-width: 5px;
     stroke-dasharray: 100;
     animation: loader 2.5s linear infinite;
   }

   @keyframes loader {
     0% {
       stroke-dashoffset: 0;
     }
     100% {
       stroke-dashoffset: 1000;
     }
   }

 </style>
 <polygon points="200,0 300,200 100,200"/>
</svg>
```

## View Box e View Port

`viewBox="[posição eixo X] [posição eixo Y] [tamanho X] [tamanho Y]"`

O viwebox é uma espécie de zoom in ou zoom out que damos ao elemento svg via código, fazendo com que ele esteja espandido em uma região específica da imagem (no geral queremos colocar o viewport no mesmo tamanho (largura e comprimento da imagem) mas vale aqui a informação, caso queiramos fazer um sistema que necessite disso)

Viewport é tudo o que será visualido na tela, é o tamanho da imagem. Se mudarmos o view box de maneira a encaixar a imagem dentro da viewport

## Coordenadas ao contrário?

Se você lembra das aulas de matemática da escola, talvez tenha achado algo estranho nas coordenadas que usamos para posicionar os elementos no viewBox. Por que os valores negativos no eixo Y estão no plano "acima" do zero, e não "abaixo", que é a forma como aprendemos?

![Coordenadas no SVG](https://caelum-online-public.s3.amazonaws.com/1400-+SVG%3A+trabalhando+com+vetores+e+animando+com+CSS+e+JavaScript/img15.jpg)

Um sistema de coordenadas pode ser estabelecido conforme a necessidade de uso. Na aula de matemática aprendemos o Plano Cartesiano, porém ele é apenas um desses sistemas, e existem vários outros.

O SVG (e também o CSS) tem seu sistema de coordenadas próprio. Nesse sistema, cada elemento `<svg>` tem como ponto inicial de seu viewPort as coordenadas (0,0) e a partir daí as dimensões largura/altura são calculadas no sentido esquerda/direita e cima/baixo. O posicionamento dos elementos nas telas dos navegadores e dispositivos móveis (os viewPorts) seguem a mesma lógica. Então fica muito mais fácil trabalhar com um sistema onde o eixo Y utilize números positivos "abaixo" do zero, e não acima.

Dessa forma, podemos trabalhar sempre com valores positivos quando criamos elementos e também quando adicionamos margens internas e externas, e os valores negativos passam a significar, em alguns casos, a situações fora do campo de visualização do viewBox e do viewPort.

![View Box](https://caelum-online-public.s3.amazonaws.com/1400-+SVG%3A+trabalhando+com+vetores+e+animando+com+CSS+e+JavaScript/img16.jpg)

Dúvidas? Manda pra gente!

## SVG Icons
PRÓXIMA ATIVIDADE

Ícones (como os que usamos para identificar redes sociais) são um recurso super útil. Existem várias bibliotecas disponíveis onde podemos importar ícones para nossas aplicações web, como a fontAwesome, mas também é possível utilizar SVG para criar ícones e disponibilizá-los em nosso código!

Uma das vantagens é a possibilidade de inserir ícones como código SVG inline, reduzindo assim a quantidade de requisições HTTP. Utilizando a propriedade viewBox, podemos declarar uma seleção de ícones direto no HTML e visualizar apenas o ícone que queremos.

Neste exemplo, vamos gerar um vetor de três ícones diferentes (ilustrados pelos círculos abaixo) e fazer com que apenas um deles seja exibido por vez.

Vamos começar desenhando nossos vetores:

<svg>
   <circle id="red" cx="50" cy="50" r="40" fill="red" stroke="black" />
   <circle id="yellow" cx="50" cy="50" r="40" fill="yellow" stroke="black" />
   <circle id="green" cx="50" cy="50" r="40" fill="green" stroke="black" />
</svg>

```html
<svg>
   <circle id="red" cx="50" cy="50" r="40" fill="red" stroke="black" />
   <circle id="yellow" cx="50" cy="50" r="40" fill="yellow" stroke="black" />
   <circle id="green" cx="50" cy="50" r="40" fill="green" stroke="black" />
</svg>
```

Cada um dos círculos foi desenhado em coordenadas que respeitam essas dimensões: lembrando que o `<circle>` sempre é vetorizado a partir de seu ponto central, que definimos como (50, 50) para cada um, com um raio de 80. Ou seja, cada `<circle>` vai ocupar um espaço de 100x100 e terá 80 de raio.

A ideia aqui é visualizar somente um círculo por vez, então vamos usar a tag `<defs>` para dizer que estamos definindo três objetos gráficos (os círculos), porém ainda não estamos renderizando nenhum deles na tela. Só estão definidos!

```html
<svg>
 <defs>
   <circle id="red" cx="50" cy="50" r="40" fill="red" stroke="black" />
   <circle id="yellow" cx="50" cy="50" r="40" fill="yellow" stroke="black" />
   <circle id="green" cx="50" cy="50" r="40" fill="green" stroke="black" />
 </defs>
</svg>
```

Se recarregarmos a tela do navegador, os círculos sumiram. Agora estão dentro da tag `<defs>` esperando para serem "chamados" em alguma parte do código. Viu que cada um dos círculos tem seu próprio id? É através dele que vamos identificar cada círculo.

Então vamos exibir na tela o círculo vermelho. Usando o id, podemos criar um novo em alguma parte do código e "chamar" o círculo, da seguinte forma:

<svg viewBox="0 0 100 100">
  <use xlink:href="#red"/>
</svg>

```html
<svg viewBox="0 0 100 100">
  <use xlink:href="#red"/>
</svg>
```

Com o atributo viewBox, definimos uma nova janela de visualização para o `<svg>` com a proporção de 100x100, e usamos a tag `<use>` para chamar o círculo usando o id. Vamos ver o resultado:

Um pouco grande? Tudo bem, podemos atribuir altura e largura ao SVG, com unidades absolutas ou dinâmicas.

<svg width="10%" height="10%" viewBox="0 0 100 100">
 <use xlink:href="#red"/>
</svg>

```html
<svg width="10%" height="10%" viewBox="0 0 100 100">
 <use xlink:href="#red"/>
</svg>
```

Podemos chamar cada um dos ícones de forma independente:

<svg width="10%" height="10%" viewBox="0 0 100 100">
 <use xlink:href="#red"/>
</svg>

<svg width="20%" height="20%" viewBox="0 0 100 100">
 <use xlink:href="#yellow"/>
</svg>

<svg width="30%" height="30%" viewBox="0 0 100 100">
 <use xlink:href="#green"/>
</svg>

```html
<svg width="10%" height="10%" viewBox="0 0 100 100">
 <use xlink:href="#red"/>
</svg>

<svg width="20%" height="20%" viewBox="0 0 100 100">
 <use xlink:href="#yellow"/>
</svg>

<svg width="30%" height="30%" viewBox="0 0 100 100">
 <use xlink:href="#green"/>
</svg>
```


Por último: O SVG base que criamos para definir os ícones está ocupando espaço no markup, mesmo sem exibir os objetos gráficos. Como podemos nos livrar dele?

![Espaço da svg](https://caelum-online-public.s3.amazonaws.com/1400-+SVG%3A+trabalhando+com+vetores+e+animando+com+CSS+e+JavaScript/img21.png)

Vamos adicionar `display:"none"` ao svg onde estão os modelos:

```html
   <svg display="none">
     <defs>
       <circle id="red" cx="50" cy="50" r="40" fill="red" stroke="black" />
       <circle id="yellow" cx="50" cy="50" r="40" fill="yellow" stroke="black" />
       <circle id="green" cx="50" cy="50" r="40" fill="green" stroke="black" />
     </defs>
   </svg>
```

Esse é um modo bastante interessante para se utilizar ícones em SVG, como opção ao uso de ícones importados de bibliotecas de fontes.

## Animação com js

Uma forma de animar com js é colocando estilos css nos elementos que queremos animar, uma forma de animar é justamente com o translate que usamos anteriormente

## Usando o "this" e o "bind"

A palavra-chave `this` (podemos traduzir livremente como "isto") está presente em várias partes do código que rodamos em JavaScript, embora muitas vezes não apareça. Por padrão, ela se refere a um objeto global, porém pode ter diferentes valores, dependendo de onde está sendo utilizada, como os casos:

Em um método, refere-se ao objeto ao qual o método está ligado (por exemplo, obj.metodo()).
Sozinha ou em uma função, refere-se ao objeto global (no caso do navegador, o objeto window).
Em uma função em strict mode, é undefined.
Em um evento, refere-se ao elemento que recebeu o evento.
Quando falamos de objetos (criados com class ou não), this refere-se ao objeto. Veja esse exemplo com o objeto pessoa:

function Pessoa(nome, sobrenome) {
  this.nome = nome;
  this.sobrenome = sobrenome;

  this.nomeCompleto = function() {
    console.log(`Meu nome é ${this.nome} ${this.sobrenome}`);
  }
}

const pessoa = new Pessoa("Leia", "Organa");
pessoa.nomeCompleto() // 'Meu nome é Leia Organa'

const outraPessoa = new Pessoa("Luke", "Skywalker");
outraPessoa.nomeCompleto() // 'Meu nome é Luke Skywalker'

const nomeOutraPessoa = pessoa.nomeCompleto.bind(outraPessoa);
// Cria uma nova função onde o valor de `this` se liga ("bind") ao objeto "outraPessoa"
nomeOutraPessoa(); // 'Meu nome é Luke Skywalker'
Como feito durante a aula, utilizamos bind (em português: unir, ligar, prender) para fazer isso mesmo, "ligar" this a um contexto específico para que o this não fique "perdido" ao ser invocado fora de seu objeto.

O this tem muitos usos e existem outros métodos além de bind que podem ser usados com ele, conforme a necessidade. O MDN tem um [artigo bem completo](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this) sobre essa palavra-chave e seus diversos métodos.

## Trocar a animação dos cards

Utilizamos o translate para mover os cards na aula, mas como seria para usar outros efeitos de animação de CSS?

Esse é o trecho de código que usamos na aula:

```js
this.cardEsq.style.transform = `translate(${-(posicao + 20)/10}%)`;
this.cardDir.style.transform = `translate(${(posicao + 20)/10}%)`;
```

O translate recebe como argumento coordenadas X e/ou Y para mover o elemento selecionado. Mas CSS tem outras propriedades que podemos usar para mover e animar elementos. Que tal seria se, ao invés de translate, usássemos a propriedade rotate para animar os cards?

```js
this.cardEsq.style.transform = `rotateY(${-(posicao + 20)/2}deg)`;
this.cardDir.style.transform = `rotateY(${(posicao + 20)/2}deg)
```

## Uma biblioteca muito poderosa para animar elementos

Essa é o gsap, instalando via npm, conseguimos com poucas linhas fazer um efeito de pulso como em:

```js
gsap.to(this.icones,0.5, {scale: 0.95, repeat:-1, yoyo:true})
```

Onde o primeiro parâmetro são os ícones, o segundo o tempo da animação e o terceiro o que seria o css da animação (usando o to do css), o repeat seria a sensação de infinito, e o yoyo o mesmo que o alternate
