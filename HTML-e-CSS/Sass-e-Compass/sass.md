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

Entenda aninhar como colocar um filho dentro do pai, ou seja uma relação estar dentro da outra.
