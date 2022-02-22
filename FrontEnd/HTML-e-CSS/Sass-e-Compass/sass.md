# Sass

O css com superpoderes!

Imagna que você tem um site todo pronto e cheio de coisas complicadas de serem feitas e que agora você está incapaz de dar manutenção nele, com o sass eu consigo ver e resolver esses problemas.

O SASS é um pré-processador de CSS, ou seja, vamos escrever em SASS que no final irá ser compilado para CSS.

Antigamente via-se muito a dupla css e compass mas o compass não é mais mantido como diz a própria [página do Github](https://github.com/Compass/compass) deles.

Existe um sass mais atual que se chama dart sass veja ele depois

## Instalar

O Ruby é o responsável por fazer todo o trabalho, isso porque o SASS foi escrito utilizando a linguagem Ruby.

Para instalar o sass faremos a instalação pelo link [aqui](http://rubyinstaller.org/downloads)

2 - Marque a opção "Add Ruby executables to your PATH" e prossiga a instalação:

Instalacao do Ruby no Windows
3 - Ao término da instalação, verifique se foi corretamente instalado indo no prompt/terminal e dando o comando:

```cmd
ruby -v
```

## Por que usar o sass?

O sass cria variáveis para que possamos setar uma cor específica para várias classes diferentes por exemplo e aí facilitar nosso trabalho no front end caso o designer resolva mudar coisas pequenas porém necessárias nos nossos sites

O sass é um pré processador css então eu preciso criar um arquivo .scss ou .sass (normalmente o .scss é melhor) e com ele eu crio as variáveis que ele eu compilo para um arquivo que esteja em .css pois o browser somente aceita arquivos em css então para compilar de um arquivo scss para outro em css nós fazemos

```cmd
sass styles.scss:styles.css
```

E para eu adotar variáveis eu terei que fazer o seguinte

Trecho de código em um arquivo css

```css
div1 {
    /*trecho de código*/
    background:#FFF;
}

div2{
    /*trecho de código*/
    background:#FFF;
}
```

Para mudar as cores de fundo para uma outra qualquer eu faço

```scss
$cor-fundo: red;
div1 {
    /*trecho de código*/
    background:$cor-fundo;
}

div2{
    /*trecho de código*/
    background:$cor-fundo;
}
```

E aí eu compilaria o código mas note que eu teria que compilar o código de novo para fazer isso funcionar, esse processo pode ser maçante demais e para isso eu faço

```cmd
sass --watch styles.scss:styles.css
```

Onde ele fica observando todas as alterações no arquivo scss para alterar automaticamente o css a cada save que você der no arquivo scss, substituindo essas variáveis no arquivo css e facilitando sua manutenção de código em 1000%.

Uma dica com scss é fazer com:

```scss
$cor-aux=#000;

div{
    background:rgba($cor-aux,0.2);
}
```

Qualquer cor válida no `$cor-aux` é válida, teste

## mixin

Imagina que queremos colocar criar um atalho para mais códigos, como são os casos dos prefixos do css, -moz e -webkit (que são formas de solucionar um código que finciona bem em um browser mas não funciona no outro e para garantir que funcione bem em todo mundo nós colocamos o mesmo prefixo para um comando específico como o border radius)

E para fazer isso nós fazemos

```scss
@mixin borda-arredondada{
    border-radius: $raio;
    -moz-border-radius: $raio;
    -webkit-border-radius: $raio;
    -o-border-radius: $raio;
    -ms-border-radius: $raio;
}
```

Alguns como -o (que representa o opera e o moz podem não ser necessários) mas devido a tantos anos de estagnação com o Internet Explorer essa é uma ação bem recorrente com o scss e o cross web virou assunto numero um no front end por um bom tempo, então o trauma foi grande (saber deles é fundamental mas meio que hoje em dia o webkit já resolve para a maioria)

E para integrar isso na parte do código nós fazemos

```scss
button{
    @include borda-arredondada;
}
```

Mas caso eu queira afetar apenas o valor do raio de um botão mas e o resto deixar um valor padrão tem como? Tem e fazemos isso com:

```scss
@mixin borda-arredondada($raio:0.3em){
    border-radius: $raio;
    -moz-border-radius: $raio;
    -webkit-border-radius: $raio;
    -o-border-radius: $raio;
    -ms-border-radius: $raio;
}
```

Dessa forma dizemos que o valor padrão do raio é de 0.3em e para dar um valor especial nos outros elementos fazemos:

```scss
button{
    @include borda-arredondada(5em);
}
```

Nos outros elementos nós deixamos como está pois está com o valor default, já o botão de destaque está com raio de 5em

## Comentários no sass

É parecido com js e é com // o /* fica no css quando ele é pré-processado o que não é legal

## Aninhamento

Imaginando que queremos organizar o css de um menu, que tem um tratamento para a ul, e depois um tratamento para a li e para algumas pseudo classes. Eu poderia resolver todo o css abaixo com funções da seguinte forma:

Css:

```css
.menu-principal {
  position: absolute;
  right: 0;
  top: -.5em;
  font-size: 1.2em;
  font-weight: lighter; }

.menu-principal ul {
  padding-left: 0; }

.menu-principal li {
  display: inline-block;
  width: 5em; }

.menu-principal a {
  color: white;
  text-decoration: none; }

.menu-principal a:hover {
  text-decoration: underline; }
```

Sass:

```scss
    .menu-principal {
        position: absolute;
        right: 0;
        top: -.5em;
        font-size: 1.2em;
        font-weight: lighter;

        ul{
             padding-left: 0;
        }

        li {
           display: inline-block;
            width: 5em; 
        }
        a{
        color: white;
        text-decoration: none;

        &:hover{
        text-decoration: underline
        }
        }
    }
```

O `&` serve para juntarmos o a com o :hover

Entenda aninhar como colocar um filho dentro do pai, ou seja uma relação estar dentro da outra. O nome em inglês para essa prática é nesting

## Importando arquivos

Eu posso separar meu arquivo scss em arquivos scss menores e importar o conteúdo dele em um arquivo scss que será processado no arquivo css de fato e eu posso fazer isso com

```scss
@import 'pasta/header'
```

Aí é somente questão de organização, a dica é organizar as variáveis em uma pasta os mixins em outras e cada divs separadamente, assim como o normalize (ou reset) em uma pasta de base e cada div como conteudo.

Para fazer uso do import precisamos colocar o ‘@’ junto com a palavra ‘import’:

@import

Depois, entre aspas, colocamos qual será o arquivo importado:

@import “estilos.scss”

Para finalizar, um ponto-e-vírgula no final:

@import “estilos.scss”;

Para deixar mais fácil ainda, nem precisamos colocar a extensão:

@import “estilos";

É aqui que você organiza o seu css e acha as coisas dentro dele, é maravilhoso

## darken e lighten

Se seu chefe quer uma cor um pouco mais clara, um pouco mais escura. Bem com darken deixamos a cor original, uma porcentagem mais escura. E com lighten nós deixamos a cor um pouco mais clara. Justamente para não perder essa cor base e ficar caçando ela depois

Podemos setar a porcentagem para zero, pois é um valor aceitável, só não posso colocar valor negativo mesmo.

```scss
$cor-padrao: darken(#B68181,10%);
```

Pode deixar a % ou não tanto faz

### Outras funções de cor

Tem a saturate (que satura a cor em uma porcentagem) e a complement(que retorna a cor diametralmente oposta) e a adjust-hue(); que sei lá o que é mas você precisa da porcentagem

## O placeholder

O mixin como vimos ele apenas copia e cola o código na classe css, isso pode criar diversas repetições de código desnecessárias no arquivo, o que pode diminuir a perfomance do código, para utilizar o placeholder nós faríamos

No css

```css
butao1{
        webkit-box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.5);
        box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.5);
}
butao2{
        webkit-box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.5);
        box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.5);
}
```

Arredonda botão

```scss
%arredonda-butao{
        webkit-box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.5);
        box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.5);
}
```

E para implementar

```scss
butao1{
    @extend %arredonda-butao;
}
```

Isso faz com que surja no css um:

```css
butao1,butao2{
        webkit-box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.5);
        box-shadow: 0 2px 6.65px 0.35px rgba(0, 0, 0, 0.5);
}
```

E a diferença que no placeholder eu não consigo passar um parâmetro como no mixin. Quando o mixin é usado em várias regras CSS, o código é repetido em todas elas.

O placeholder agrupa eles e evita o código repetido, porém o placeholder apenas é uma alternativa para o mixin quando lidamos com parâmetros fixos. Quando é preciso passar algum valor na chamada da função, o mixin é mais recomendado.

### Exercício

Vimos nessa aula sobre placeholders, mas será que conseguimos usar o @extend com classes?

Como o trecho abaixo será compilado?

```scss
.erro {
  background: #f00;
}

.alerta {
  border-radius: 3px;
  @extend .erro
  ```
  
  Resposta

  ```css
.erro, .alerta {
  background: #f00;
}

.alerta {
  border-radius: 3px;
}
  ```

## media query

Eu posso estabelecer um media query dentro de um elemento da seguinte forma

```scss
header {
    border-top: 5px solid $cor-padrao;
    background: rgba($cor-aux, 0.8);
    height: 90px;
    width: 100%;
    position: absolute;

    @media(max-width:980px) {
      height: auto;
    }
```

Isso cria um arquivo css igual a:

```css
header {
    border-top: 5px solid $cor-padrao;
    background: rgba($cor-aux, 0.8);
    height: 90px;
    width: 100%;
    position: absolute;
}

@media(max-width:980px) {
  header{
    height: auto;
  }
}
```

Mesmo com o CSS ficando com várias media queries sendo repetidas ao longo do código, apenas habilitando a compactação gzip no servidor, já elimina esse problema.

Onde dentro do elemento eu tenho uma função que trata ela quando eu tenho uma tela menor

E ainda poderia criar uma variável para armazenar o tamanho da tela desejável com

```scss
$tela:980px;
```

Ou melhor, eu poderia colocar toda a linha de query com:

```scss
$media-query-mobile:"(max-width:980px)";
```

E aí chamar essa variável com

```scss
header {
    border-top: 5px solid $cor-padrao;
    background: rgba($cor-aux, 0.8);
    height: 90px;
    width: 100%;
    position: absolute;

    @media #{$media-query-mobile}{
      height: auto;
    }
```

Comentário final: Eu até poderia fazer as aulas de compass mas como ele não está mais sendo mantido eu não tenho nenhum projeto pra ele eu preferi não fazer, o bootstrap aceita sass e tem um monte de coisas bem legais

Um framework como era o compass e como é o bootstrap ou o bourbon e varios outros são comandos já feitos pela comunidade e que ajudam em alguns comandos mais complexos, e você somente baixa a biblioteca e pronto.

Coisas legais que podem ser feitas com um framework é criar sprites (like a game) para nossas imagens, veja se o framework que você utiliza tem essa função

## Funções mataméticas no sass

O sass aceita contas matemáticas de forma que `2*16px` vale `32px`, além de poder criar variáveis globais com esses valores e poder aplicar multiplicadores nela

Como em

```sass
$tamanho-da-fonte-padrao: 16px;

.plano {
  background: white;
  width: 18 * $tamanho-da-fonte-padrao;
  display: inline-block;
  margin: 1em 0 0 1.4em;
  padding-bottom: 2em;
}
```

Que nos dá o css

```css
.plano {
  background: white;
  width: 288px;
  display: inline-block;
  margin: 1em 0 0 1.4em;
  padding-bottom: 2em;
}
```
E eu posso usar os mixins para retornar linhas em css com:

```scss
@mixin retorna-largura {
  width: 18 * $tamanho-da-fonte-padrao;
}
```

Mas as vezes eu somente estou interessado no numero retornado e posso fazer isso com

```scss
@function multiplica-pela-fonte ($multiplicador){
  @return $multiplicador * $tamanho-da-fonte-padrao;
}
```

E aplicar essa função onde eu quiser

Eu posso arredondar o valor retornado com o `round` oq nos deixa com

```scss
@function multiplica-pela-fonte ($multiplicador){
  @return round($multiplicador * $tamanho-da-fonte-padrao);
}
```

## Boas práticas e conselhos

O sass é ótimo para deixar o seu css mais prático e automatizado mas isso não significa que seu css ficará melhor com isso, a dica é sempre verificar o seu css e maneira no número de mixins pois ele sempre estará repetindo o código, caso não precise de valores diferentes prefira utilizar placeholders

O sass é muito utilizado pra organizar o código então organize de acordo com você mesmo ou com seu time

E lembre-se Boas práticas no CSS, boas práticas no Sass.

E isso vale para qualquer outro pré-processador.

### Comentário Alura

Vimos durante o curso que o Sass é uma ferramenta poderosa que agiliza muito o nosso trabalho. Como falamos em um primeiro momento, ele é um CSS com superpoderes.

Entretanto, é importante tomar cuidado. O Sass pode facilitar o desenvolvimento no dia a dia, mas não necessariamente fará do seu CSS um CSS melhor. É preciso tomar cuidado.

Uma boa prática, que usamos durante todo esse curso, é sempre conferir o arquivo .css gerado a cada alteração feita no .scss, seja ela uma nova variável, um mixin, ou um placeholder. É importante ver se nada foi esquecido, ou se há repetição desnecessária de código.

Outro ponto importante é ter um uso econômico dos mixins, sempre verificando se um placeholder não é o mais adequado por uma repetição exata de código. Se há um valor que precisa variar, a escolha do mixin é acertada.

Mais um toque final: no curso, criamos as pastas base, helpers e layout dentro da pasta css.

Mas é importante que você crie as suas próprias pastas de acordo com as necessidades do seu projeto, da sua equipe ou da sua empresa. Boa sorte e até o próximo curso!

## Indo Além

Vimos aqui no curso o Sass, mas existem atualmente outros dois grandes pré-processadores no mercado, o Less e o Stylus. A grande maioria das funcionalidades (variável, mixin, etc) que vimos no Sass, também estão presentes nesses dois.

Você pode conferir o curso de Less aqui na Alura mesmo:

https://cursos.alura.com.br/course/less-css-simples-e-produtivo

Outra dica é estudar aqui na Alura algum automatizadores de tarefa front-end, como o Gulp e o Grunt.

E alguns posts para você conhecer esses caras:

[Gulp](https://blog.caelum.com.br/bye-bye-grunt-js-hello-gulp-js/)

[Grunt](https://blog.caelum.com.br/automacao-de-build-de-front-end-com-grunt-js/)

### Dicas de mixins

[Link](https://blog.caelum.com.br/10-mixins-sass-que-voce-deveria-usar-em-seus-projetos/)
