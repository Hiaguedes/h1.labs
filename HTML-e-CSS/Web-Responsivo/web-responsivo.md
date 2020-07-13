# Web responsiva

Você quer sites mobile ou que sua página seja responsiva para diversos tamanhos?

A pergunta que foi feita é, existe mobile? Até existe, mas o que define o mobile? Tamanho de tela, portabilidade, redes móveis? Meio dificil dizer, por que se for tamanho, então um tablet não é mobile, se for portabilidade então laptop não é mobile e se for redes móveis se eu conectar um plug de 4G da vivo meu desktop grandão virou mobile, até mesmo o touch muitos laptops possuem touch assim como tablets. Então o lance é, não existe um marco que diz, daqui para lá é tudo mobile. Então fazer um site como tinha antes como `m.facebook.com` com esse m de mobile na frente é um baita erro pois você coloca um marco do que é ser um mobile, o mais inteligente é considerarmos medidas de tela diferentes e assim mudar dinamicamente o css.

## Medidas proporcionais

O primeiro passo é mudar todo tipo de medida fixa em px para porcentagem, pois a pixelagem de uns 500px já é o suficiente para não caber na tela de um smartphone isso é um começo de design fluído. Design fluído é o coração de um bom design responsivo. Com o uso de medidas flexíveis, como as porcentagens, a página consegue adaptar seu layout a diversas resoluções diferentes.

![Proporcionalidade em containers](img/porcentagem.png)

O tamanho proporcional também se aplica para tamanho de fontes (font-sizes), o que nos dá

![Tamanho de fontes](img/font-size.png)

Por padrão o tamanho de uma fonte é de 16px mas se formos multiplicar dentro dos elementos filhos a fonte se multiplica tendo como referencia o elemento pai, isso é meio obvio pois a porcentagem atua de acordo com o container que ela está inserida, em uma página responsiva isso é interessante pois evita retrabalho, essa mudança será feita proporcionalmente com o tamanho das fontes, essa ideia é válida para a medida `em` também, onde

```en
font-size:120% = font-size:1.2em
```

Ou seja não há diferença entre porcentagem e em.

O em é uma boa medida também para separação entre textos, em é uma unidade de medida normal do CSS, podendo ser usada em qualquer propriedade. Seu cálculo é com relação ao tamanho do texto, mas seu uso é universal.

Caso tenhamos telas muito grandes, podemos setar a máxima largura de um container com `max-width` e o tamanho mínimo de um container com `min-width`, até por que fica meio trabalhoso demais lidar com responsividade com dispositivos muito grandes e muito pequenos.

Para imagens o bom é colocarmos `max-width:100%` para não fazer com que a imagem estoure quando em telas muito grandes e nem que ela vaze do container quando for muito pequeno

O inline-block é interessante por simular uma linha de texto com seus elementos. Se não cabe mais um "caracter" na linha, a "palavra" escorrega pra linha de baixo.

## Media Queries

O design fluido não resolve o problema todo, ele resolve somente metade. Pois as vezes o problema é que para um determinado tamanho de tela as coisas fiquem muito coladas, ou a letra tenha ficado muito pequena. Para resolver essas situações eu tenho os media querys que normalmente são

```css
@media(min-width:<>px){}
@media(max-width:<>px){}
```

O primeiro nos diz o css que a tela terá que respeitar para um tamanho min de x px e o segundo é todo um comportamento para uma tamanho de tela (na horizontal, sempre) de x px.

Essa escrita diferente vem do media types que vem do css2 e que tinha o `@media screen` e o `@media print`, o segundo vem de uma época que era comum printar as páginas web (o que não se faz mais hoje) e o `@media screen` diz sobre elementos que estão sendo mostrados em tela, as vezes é comum vermos a mistura dos dois tipos com `@media screen and (min-width:<>px){}` mas no geral pode se colocar apenas a busca pelo tamnho da tela que já está aceitável, no mundo real você verá somente algo como o `@media min` ou `@media max`.

Posso ter a media query naquele exato tamanho de tela, com `width` (o que é inutil hahahas) ou pesso pegar a media query pelo `height` também. Outra coisa são os `device-width` e o `device-height` que pegam os tamanhos exatos de tela do usuário, outras são `orientation:portrait` e `orientation:landscape` que pegam o estado de um celular, se ele está em pé ou deitado. As media query de `height` são um tanto inuteis pois o heigth é usado muito para scroll e limitar comportamentos por ela não fazem muito sentido, os `device` heigth e width também não são muito uteis pois você estará interessado na janela do navegador e não a da tela do usuário, por que a janela pode estar redimensionada, no geral as medias mais interessantes são o `min-width` o `max-width` e as orientações.

No geral `480px` é um bom valor para celulares, a dica é usar o responsivo do chrome dev tools e ver o tamanho de tela que afeta sua página e ir alterando com esses parâmetros

O `min-width` está mais atrelado a ideias de mobile-first, onde primeiro você projeta o ambiente mobile por padrão e você vai modelando as variações de tela ajeitando os detalhes para telas maiores, pois lembre o `min-width` é o no minimo para esse tamanho de tela, então se o seu mobile já está ok vai fazendo o ambiente desk.

A especificação de todas as media querys pode ser vista [aqui](https://www.w3.org/TR/css3-mediaqueries/)

## O viewport

Para que consigamos aplicar as media queries em nosso projeto faltou uma linhazinha de código em nosso projeto e sem ela nenhuma media query funcionaria. Por padrão quando os iphones surgiram para que pudesse abrir sites da rede eles mentiam dizendo que tinha uma largura de 980px mesmo tendo somente 320px, isso dava ao usuário uma certa compatibilidade. Muitas empresas adotaram essa ideia e aí a w3c agiu e criou uma tag meta que todo desenvolvedor de site adota que é a tag meta que é da seguinte forma

```html
<meta name="viewport" content="width=device-width">
```

E dessa forma o site consegue trabalhar de maneira responsiva com qualquer celular, ou seja dissemos existe uma tag de estrutura de nome viewport que tem uma largura de conteudo igual a largura do dispositivo.

Quando testamos o frontend em um mobile é bom termos uma sequência de testes no nosso dispositivo e para issp usamos o browser (com o chrome dev tools por exemplo), usamos emuladores e os proprios dispositivos para emular como que a tela se adapta nos mais diversos dispositivos (pois vai que tem algum bug ou a usabilidade não ficou legal)

Os navegadores Desktop ajudam muito durante a codificação por permitir testes rápidos, fáceis e com ferramentas boas.

Mas não eliminam a necessidade de teste num dispositivo real e em emuladores móveis. Os navegadores são diferentes e a experiência do usuário é diferente.

Simuladores de mobile que vêm nos navegadores Desktop ajudam a testar o tamanho da tela e algumas outras poucas características (simular touch e user agent, por exemplo). Mas não são equivalentes a Emuladores completos nem a Dispositivos reais.

Para depurar no celular no chrome vá em `chrome://inspect`

## Menu responsivo

É importante que quando tenhamos um estreitamento da tela nós criarmos um menu responsivo que comporte todo o menu e para isso é bom criar botões nos locais que queremos que fique nesse novo menu (que feche o menu) e em algum lugar do header (que abre o menu) e vamos amarrar esses elementos com media queries parecidas com

```css
@media (max-width:650px)
@media not all and (max-width:650px)
```

O primeiro para o botão que vai abrir o menu e o segundo para abrir, depois criar o estilo dessa nova página que está bem documentada em exercicios.css

E atribuir o comportamento desses elementos em javaScript

## Imagens responsivas

O problema quando se fala de imagem em dispositivos diferentes é quando falamos de alta resolução, pois uma tela de alta resolução com o mesmo tamanho de tela que o seu terá mais pixels para reproduzir a mesma imagem de 200px, a diferença é que como esse celular tem mais pixels então a imagem nele será reduzida em uma proporção de quão mais foda esse celular é. E essa taxa é o dppr ou device pixel ratio.

E aí podemos trabalhar com media queries em css para trabalhar com imagens diferentes em qualidades de tela diferentes como em

```css
@media (resolution:2dppx)
```

E esse processo seria mais trabalhoso para imagens dentro da tag `img`, só que é muito trabalhoso (até foi dado a forma em aula) mas a forma recomendada veremos daqui a pouco

### Compressive image

É otimizar bastante uma imagem de tamanho grande, de forma a ficar com tamanho razoável para diversos dispositivos. Diminuímos a qualidade da imagem, aumentamos a compressão, usamos formatos mais leves etc.

Faça o teste real com um exemplo e imagem compressiva. O exemplo da aula está nesse link: <http://sergiolopes.org/livro-web-mobile/exemplos/retina.html>

Abra em vários dispositivos e veja se você consegue adivinhar qual é a versão com mais qualidade. Teste, se tiver, especialmente em uma dispositivo retina.

### Imagens vetoriais

As imagens vetoriais não são úteis para fotos, mas para imagens de logo e ícones elas são extremamente úteis, pois elas utilizam da matemática do computador para fazer a imagem, o que pesa bem menos e a qualidade não se perde para nenhuma largura diferente. E essas imagens são legais pois eu posso modificar elas (como mudar sua cor de fundo) pois no fundo eles são entendidos como um texto (claro não é 100% o sistema operacional e o browser podem renderizar a forma vetorial de forma a dar uma mechida na imagem mas nada muito grave no máximo vai dar um nervoso no pessoal de design)

- Texto com @font-face

- Icon fonts

- Desenhos e efeitos CSS

- Imagens SVG

Todas essas são formas de se obter parâmetros vetoriais para usarmos em nossos sites. Usando imagens e recursos vetoriais, todo tamanho de tela, toda resolução fica com qualidade perfeita. O usuário pode fazer zoom e a imagem nunca perde qualidade.

SVG é o formato mais adequado hoje e para o futuro, se pensando em uso de imagens vetoriais.

Suporta todo tipo de efeito, formas e até animações. O maior empecilho é suporte em navegadores antigos, algo que tende a desaparecer.

É bem mais difícil que um icon font para estilizar com cores diferentes. Não posso usar nem background se quero mudar a cor. Preciso embutir o no HTML e usar técnicas mais complicadas.

Uma dica interessante é fazer os ícones de menu e de fechar com o próprio css com:

```css
.menu-abrir,
.menu-fechar {
    background: none;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    font-size: 1.6em;
    text-indent: -999em;
}

.menu-abrir {
    height: 0;
    width:.75em;
    padding-top:.125em;
    border-top: .375em double #000;
    border-bottom: .125em solid #000;

    vertical-align: middle;
    margin: 0.5em;
}

.menu-fechar {
    position: relative;
    height: 1em;
    width: 1em;
}
    .menu-fechar:before {
        content: '\00D7';
        position: absolute;
        top: 0;
        left: 0;
        text-indent: 0;
    }
```

Ou pegar essas imagens em um site como o `icon moon` como eu fiz hahaha e você consegue incorporar o svg pelo html ou pelo css mas tenha cuidado ao colocar por css pois ele pode não se adequar muito bem, veja o que fiz no exercios.css

## dicas de UX para sites

Content parity
É considerada uma boa prática que o usuário, na versão mobile de uma página, consiga fazer tudo aquilo que ele faz no desktop. Ou seja, não é bom cortar ações, funcionalidades e conteúdo só porque a tela é menor. A necessidade não é que tudo tenha que ser igual, mas parecido e acessível para todas as plataformas.

No mobile, por exemplo, poderíamos quebrar um texto, que aparece em uma página no desktop, em duas páginas. Podemos formatar de maneiras diferentes um conteúdo.

Não existe "contexto mobile"!
Não é porque um usuário de mobile tem o perfil de acessar vários conteúdos com mais rapidez que devemos mostrar menos a ele. Não confundemos tipo de aparelho com contexto de uso. Não é possível inferirmos o modo com que o usuário utiliza uma plataforma pelo seu aparelho.

Ofereça todo o conteúdo e todos os cenários para que o usuário possa optar pelo aparelho que ele quiser.

Priorização de conteúdo
O mobile pode despertar a ideia de que o conteúdo deve ser priorizado. Mas a questáo é que se o site consegue oferecer tudo com poucas opções, ele deve conseguir fazê-lo em todas as plataformas. No fim, o conteúdo deve ser:

Focado
Priorizado
O mesmo
Mobile-first
Como já vimos, uma técnica de melhorar a experiência do usuário mobile é a de Mobile-first, com a qual priorizamos a criação de sites próprios para smartphones e tablets e só depois pensamos em sua versão para desktop.

Touch-first
Paralelo ao mobile-first, um conceito que vem ganhando espaço é o de Touch-first, com o qual priorizamos o código para a interatividade de touchscreen. Hoje em dia não apenas os smartphones e os tablets possuem tal recurso. O touchscreen vem ganhando espaço entre os desktops.

Como o touchscreen traz algumas dificuldades. Pensemos, desde o início da escrita do código, na possibilidade de implementá-lo com as ferramentas necessárias para o funcionamento do recurso.

Uma questão importante é a otimização da área de toque: devemos estar atentos para o tamanho e a disposição dos botões, eles devem ser grandes e espaçados o suficiente para que o dedo consiga tocar. Temos o mesmo tipo de problema com os links: um tamanho recomendado, pela Apple, é 6,8mm. Pela Mozilla, 5,9 a 9mm, e assim por diante. Perceba que é muito mais plausível apresentar esses números em milímetros, uma vez que os links têm interação com o mundo externo, não com um ponteiro de mouse.

Desses dados sobre o tamanho dos links, se destaca a documentação da Microsoft - que recomenda 9mm -, a qual é baseada em um estudo prático sobre a largura média do dedo dos usuários:

 desenvolvedores da Microsoft perceberam que o ideal de tamanho é de 9mm para mais, pois com essa medida a taxa de erro é de 0,5%:

![Gráfico da quantidade de erros por tamanho de botão](https://s3.amazonaws.com/caelum-online-public/WebResponsivo/webresp8_2.png)

Já em relação ao espaçamento entre os botões, a Microsoft indica que o mínimo seja de 2mm.

Porém, na prática, quantos pixeis equivalem aos 9mm? Fazendo a conversão e deixando de lado algum erro, os botões devem ter, em média, 50px.

Sem hover

No mobile não existe o hover, efeito este que acontece quando passamos o ponteiro do mouse, sem clicar, por cima de um elemento. Então vamos evitá-lo no código que prioriza o Touch. (mas isso quando se fala de mobile)

Devemos encarar que o futuro da computação é touch. Dispositivos híbridos são comuns já. Devemos pensar no touch desde o início, já que ele traz diversos desafios.

Tamanho dos botões devem ser confortáveis para o dedo gordo

Não usar hover para esconder/mostrar conteúdo nem efeitos importantes

Espaçamento entre botões deve ser grande para evitar o toque em múltiplos botões de uma vez

O futuro é mobile. O usuário quer fazer tudo em qualquer dispositivo em qualquer lugar. Proporcione isso.

O conteúdo do curso pode ser visto [aqui](https://github.com/alura-cursos/curso-web-design-responsivo-paginas-que-se-adaptam-do-mobile-ao-desk/archive/master.zip)
