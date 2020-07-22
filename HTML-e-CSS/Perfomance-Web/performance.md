# Perfomance web

Ao menos que o backend esteja muito mal feito grande parte dos problemas de navegação em página são de falta de otimização no front-end que não ajudam o carregamento da página. A performance tem a finalidade tal como seu nome diz que é aumentar a perfomance do mesmo projeto, ou seja o visual do site tá pronto mas ele faz mais rápido com os mesmos recursos e usuários de internet mais lente (como eu) se beneficiarão disso e isso pode gerar uma boa imagem para você e para a marca do site

Coisas que influenciam: como você carrega o css, carrega o js e as imagens e mídias que você usa, o tamanho dos arquivos que você usa

Estamos prestes a entrar em uma longa jornada para otimizar a performance dos nossos sites. Porque isso é importante? Quais os motivos para otimizarmos nosso front-end?

Alternativa correta
Sites rápidos têm uma melhor experiência para o usuário.

Performance é UX! Usuários ficam mais satisfeitos em sites mais rápidos. Sites lentos frustram as pessoas, de acordo com várias pesquisas.

Alternativa correta
Existe uma relação direta entre performance e métricas de conversão.

Muitos estudos já mostraram que sites mais rápidos vendem mais, mantêm usuários engajados por mais tempo, obtêm mais leads e etc.

Alternativa correta
Para economizar recursos do servidor.

Um site bem otimizado também economiza banda e recursos do servidor

Alternativa correta
Para economizar recursos do cliente.

Um site otimizado também economiza banda do usuário e até economiza bateria com menos processamento

## Minificar arquivos

Nós colocamos comentários, espaços entre palavras e comandos e enters e tabs para que o código fique mais legível e entendível para a gente mas para o computador isso não é relevante, e como espaço, tab e comentários são informações então tirar eles para o código a ser utilizado no produto final é importantíssimo, pois queremos que os arquivos tenham a funcionalidade que queiramos que ela tenha mas ocupando o menor tamanho possível

E posso minificar tanto o css quanto o js quanto o HTML também, os arquivos minificados não são para desenvolvedores e sim para botar na rede e isso pode ser feito digitando no google `minify css` ou o que você quiser, tem mtos sites que fazem isso, mas e se tivermos muitos arquivos para minificar?

O comum é criar uma pasta nova com o conteúdo do site e essa pasta se chama `dist` (de distribuição) e nessa pasta eu coloco todos os arquivos minificados com o js nós automatizamos essa tarefa com o `GULP` (e nele minificamos o css e o html também), pois com node naturalmente temos programas que fazem a minificação de um arquivo por vez, um deles é o uglifyjs. O gulp automatiza essa ação para a gente.

Seguindo os arquivos na pasta perfomance-web dê o comando `npm install` para instalar as dependências e minifique os arquivos com `gulp build`

Uma boa é no lado do servidor habilitarmos a compressão dos arquivos para gzip, isso dá uma ação bem significativa pra diminuição do peso dos arquivosm no devTools conseguimos notar bem essa diferença

Verdadeiro ou falso?

Marque as opções VERDADEIRAS

Alternativa correta
O GZIP permite comprimir o tráfego de dados entre o cliente e o servidor de forma transparente.

VERDADEIRO! Habilitamos uma configuração no servidor para enviar arquivos comprimidos para o navegador, economizando muito no tráfego de dados

Alternativa correta
Diminuir o tamanho em bytes de uma página é apenas uma de várias otimizações possíveis.

VERDADEIRO! Muitas otimizações que veremos no curso não têm relação direta com o tamanho, mas em como os requests são feitos, por exemplo. Temos bastante chão pela frente!

### Para saber mais: Brotli

Falamos bastante do GZIP e sua importância. Mas há outras alternativas para compressão do conteúdo trafegado entre cliente e servidor. O GZIP é o clássico que funciona em todos os browsers e servidores, mas há algoritmos mais modernos.

O Brotli em especial é um que tem ganho bastante atenção ultimamente. Ele foi criado pelo Google e anunciado em Setembro de 2015. Segundo estudos, ele tem uma taxa de compressão 25% melhor que o GZIP e com uma velocidade de processamento parecida.

Ele já possui suporte no Firefox, Chrome e Opera há algum tempo. O detalhe é que funciona apenas em conexões HTTPS (pra evitar quebrar intermediários não compatíveis). Nos servidores, há módulos opcionais para vários deles, como nginx e Apache.

## Imagens

Em geral 2/3 do peso de um site é de imagens dados do [http archive](https://httparchive.org/) e podendo otimizar as imagens melhor

- Coloque o tamanho das imagens em bitmap pro tamanho que ela vá ocupar na tela, principalmente foto de gente que ocupa muito mais espaço e em site isso ocupa bem menos

- Muitas imagens tem metadados embutidos nas suas propriedades, isso é bem interessante para armazenamento pessoal mas inútil para a web, então dá para capar essas informações um site que consegue fazer isso é [kraken](https://kraken.io/web-interface) e duas formas são a lossy e a lossless, a lossless não há nenhuma perca na qualidade da imagem mas ela retira esses metadados da aplicação (o que para se ter uma idéia pode equivaler a 2/3 das fotos) outro é o tinypng

Quais os pontos NEGATIVOS de uma imagem com tamanho maior que o necessário?

Alternativa correta
A imagem precisa ser redimensionada no navegador, gastando CPU do cliente.

O browser precisa redimensionar a imagem na hora de exibi-la e isso pode ser custoso, sobretudo em cenários com dispositivos de baixo poder de processamento, como celulares.

A imagem gasta mais banda para ser transferida do servidor pro cliente.

Mais bytes == mais banda. É gasto pro cliente e também atraso no carregamento do resto da página.

Alternativa correta
Imagens maiores usam mais memória RAM da máquina do cliente.

O arquivo da imagem precisa ser lido na memória, gastando RAM. Um problema se o usuário tiver pouca RAM, como no mobile.

Cenário: ícones da página com desenhos gráficos não muito complexos que precisam funcionar em tamanhos e resoluções diferentes.

Qual o melhor formato de imagem para esse cenário?

SVG

SVG é vetorial e escala bem em todo tipo de tamanho e resolução. É ótimo pra gráficos vetoriais. Se a imagem for muito complexa, pode ser um gargalo; mas é bom medir direito.

Cenário: fotos dos instrutores que dão cursos na Alura.

Qual o melhor formato de imagem para esse cenário?

JPEG

O melhor formato para fotos hoje na Web. Foi pensado pra isso. Há outros menos usados como WEBP e JPEG2000 que seriam bons também.

Sobre o PNG

Um PNG pode conter uma foto com visual excelente, mas seu algoritmo de compressão é péssimo pra fotos, que costumam ter muitos pixels diferentes e muita variação. O arquivo final é imenso, da ordem de 10x maior que um JPEG.

- O ajuste de imagem do tipo lossy ele meio que reescreve a sua foto de modo a alterar um pouco a qualidade da imagem pois quanto maior a qualidade maior o peso daquele arquivo (lógico) mas você tem a opção de balancear a qualidade necessária para aquela foto e o tamanho dela. Isso é bastante razoável. O [tiny png](https://tinypng.com/) faz essa mudança de forma bem legal

- Por mais estranho que pareça ser podemos otimizar SVG's, pois eles tem metadados e um site que faz isso bem é [SVG OMG](https://jakearchibald.github.io/svgomg/) nele eu posso diminuir a precisão dos vetores e tirar os metadados criados pelo software que criou aquela imagem

O que significa usar uma otimização lossless nas imagens?

Remover informações do arquivo ou reencodá-lo de forma a obter o mesmo resultado visual final. Não há perda de qualidade visual, apenas de dados secundários e desnecessários.

Numa otimização lossless, o arquivo final possui a mesma qualidade visual do original. Só há remoção de metadados, outras informações não essencias e, às vezes, a aplicação de um algoritmo mais eficiente de encoding. Mas a imagem final é idêntica à original.

Qual alternativa é INCORRETA ao falarmos de otimizações lossy?

O ideal é evitar otimizações lossy. Sempre há perdas visuais significativas o que impacta negativamente o design e a percepção dos usuários. Um bom site usa apenas otimizações lossless.

Bons sites forçam otimizações lossy ao seu limite. Trocar um pouco de qualidade visual por mais performance é uma excelente prática.

Mas não pode ser feito às cegas, claro. Toda otimização lossy precisa ser checada e aprovada. Analisar o quanto se pode diminuir sem prejudicar demais o design.

Opções corretas quanto ao lossy

Passar um SVG no svgo é considerado lossy pois há perda de alguns dados que podem ser importantes para edição posterior do arquivo. Muitas vezes há também diminuição na precisão dos pontos.

Ao salvar um JPEG podemos escolher a qualidade do arquivo. Salvar com menos qualidade é considerado uma otimização lossy. Há perdas visuais com relação ao original. É nosso papel achar o balanço correto entre performance e qualidade visual.

PNGs podem ser transformados de forma a diminuir o número de cores em uso. Perde-se informações de certas cores, o que diminui o tamanho do arquivo. É considerado lossy por que o efeito final pode ficar visualmente muito pior que o original.

No Windows um bom app para otimizar imagens é o <https://riot-optimizer.com/>

O interessante é que esses programas de otimização são programas por linha de comando (CLI) então muitos desses programas podem ser feitos de forma automatizada com o GULP também e podemos baixar esses programas com o node

No gulp vemos a seguinte task

```js
function minifyImage() {
    return src('site/assets/img/*')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [
                { removeViewBox: false },
                { cleanupIDs: false }
            ]
        }))
        .pipe(dest('dist/assets/img'));
}
```

E tenta otimizar as imagens uma vez só, pois elas demoram um pouco para otimizar (não muito tempo também) e como imagens não mudam então só precisa fazer isso uma vez

Independente da forma que você fizer o redimensionamento, no final não esqueça de copiar as versões otimizadas também para a pasta dist. Usando o gulp, basta rodar gulp copy

### Formas de otimizar as imagens

Opção 1: Comprima online com Kraken.io e svgo
Abra o Kraken e selecione otimizações Lossless.

Arraste os arquivos PNG e JPG do projeto pra lá e aguarde a compressão. Compare os resultados. É possível obter até 60% de melhoria em certos arquivos.

Para os SVG, use o svgomg online. Mesma coisa: jogue seus ícones SVG lá e faça a otimização.

Baixe as versões otimizadas e substitua no projeto.

Outras ferramentas online úteis são o tinypng e o jpegmini, que fazem outros tipos de otimização e podem dar resultados melhores em certas imagens.

Opção 2: Automatize com Gulp Imagemin
Não é prático fazer otimizações online pra cada imagem que tivermos. O melhor talvez seja automatizar esse processo com alguma ferramenta.

O gulp é excelente pra isso e possui o plugin gulp-imagemin.

Vá no terminal e rode:

```bash
gulp imagemin
```

Ele otimiza JPGs, PNGs e SVGs de forma automática. E ainda te fala o quanto você economizou no total.

Opção 3: Automação manual
As ferramentas usadas no kraken e no imagemin estão disponíveis para você rodar localmente também. Pode ser útil se você quiser otimizar na linha de comando com algum script próprio, sem usar gulp ou oitra ferramenta pronta.

Procure como instalar no seu sistema operacional o jpegtran, o pngcrush e o svgo. Aí poderá rodar comandos como:

```en
jpegtran -progressive -optimize site/assets/img/aluno-adriano.jpeg > dist/assets/img/aluno-adriano.jpeg
pngcrush site/assets/img/icon-diferencial-1.png dist/assets/img/icon-diferencial-1.png
svgo site/assets/img/categoria-business.svg dist/assets/img/categoria-business.svg
```

Rode para todas as imagens para otimizar o projeto todo.

A harmonia entre design e performance é chave aqui. E uma boa equipe trabalha junto pra isso. Designer preocupados com performance e programadores preocupados com design.

Todo mundo precisa ceder um pouco. Assim é possível encontrar um meio termo pra cada imagem onde a performance e a qualidade são aceitáveis.

em linha de comando um mundo de possibilidades se abre. Algumas que acho bem promissoras:

mozjpeg - Recompressor de JPEG feito pela Mozilla que gera arquivos bem menores e com melhor qualidade, ainda mantendo compatibilidade com o JPEG (mais aqui e versão online aqui).

pngnq / pngquant - Mudam um PNG pra PNG8 com palheta fixa de 256 cores. É uma compressão lossy com excelentes resultados em desenhos menos complexos (como ícones). Tem uma GUI excelente chamada ImageAlpha (Mac).

E indo além de apenas otimizar as imagens:

ZorroSVG - Permite criar "JPEGs com transparência". Muita gente usa foto em PNG por causa da transparência mas isso é péssimo pra performance. O zorro usa filtros SVG pra separar a layer de transparência em uma mask separada. Na prática, JPEG com transparência.

Outra coisa interessante de saber é como png e jpeg e outros formatos operam.

## Os requests

No devTools do google use o Fast3G invés do online, dá pra você ter uma noção de como o seu site é visto em redes mais fracas né, as vezes ele demora até 30 s para ser baixado e exibido e certas bibliotecas como o jquery podem pesar muito nossa aplicação e se ele não estiver minificado e gzipado uau vai pesar muito

Por padrão o browser pelo HTTP 1.1 (que é o mais usado) abre seis conexões com o servidor e quando temos diversos arquivos sendo usados no projeto do site, outros arquivos ficam esperando a requisição (tempo de stalled) ele começa pelo html e depois ele vai baixando o que o html pede para baixar. E o número de arquivos que o site tem cria um gargalo na exibição do site pois esse tempo de espera é muito importante para quem quer ver o site (mesmo para arquivos minificados e otimizados)

Projeto: diminuindo dependências

Muitas vezes gastamos requests e bytes com frameworks pesados e desnecessários. Não quer dizer que frameworks são ruins, claro. Mas que às vezes um bom e velho JavaScript pode ser suficiente.

No projeto em questão, estamos usando o jQuery desnecessariamente. Ele é usado apenas no arquivo menu.js. Ele é super curto e usa jQuery para selecionar poucos elementos, adicionar eventos e mudar alguns atributos. Veja como está hoje:

```js
$(window).on('load', function() {
    var menu = $('.header-menu');

    $('.header-menu-titulo').on('click', function() {
        if (menu.is('[data-ativo]')) {
            menu.removeAttr('data-ativo');
        } else {
            menu.attr('data-ativo', '');
        }
    });

});
```

Será que não conseguimos reescrever esse código em JavaScript puro e remover o jQuery como um todo do projeto? 1 request a menos e menos bytes transferidos.

É uma boa reescrever esse código. Fica bem simples também em JavaScript puro:

```js
window.addEventListener('load', function() {
    var titulo = document.querySelector('.header-menu-titulo');
    var menu = document.querySelector('.header-menu');

    if (titulo) {
        titulo.onclick = function() {
            if (menu.hasAttribute('data-ativo')) {
                menu.removeAttribute('data-ativo');
            } else {
                menu.setAttribute('data-ativo', '');
            }
        };
    }
});
```

Não esqueça de remover também o `<script>` que importa o jQuery no HTML.

Testar a aplicação no localhost é interessante até por que podemos testar conectividade e coisas do tipo mas é um teste real como se tivesse em um sevidor físico situado em outro lugar sem ser sua casa e para simular uma aplicação real é interessante usar o serviço da google chamada google app engine, para isso basta instalar o google cloud sdk e escolher o tipo de backend que queremos (no caso escolhi node.js) e aí depois que instalar e rodar criar a aplicação, o bom dele é que é gratuito suporta http 2 e com poucos cliques você sobe a pasta

E o link do projeto fica mais ou menos assim <http://wpt-dot-curso-alura-site.appspot.com> onde o primeiro nome você escolhe

O page speed insigths <https://developers.google.com/speed/pagespeed/insights/?hl=pt-BR> do google é bem legal para ver a performance do seu site, basta botar o nome do site (que o proprio serviço na nuvem do google gera) para o site fazer a verificação do seu site

Outro site legal é o webpagetest e olhe em configurações avançadas e capture video e esse site te dá um relatório muito completo dos sites que você está desenvolvendo

## Concatenando o css

Justamente pelo navegador fazer um máximo de requests por vez o ideal é minimizarmos o máximo o número de requests que uma máquina faz para um serviço e como css é um tipo de arquivo que tendemos a separar em muitas partes então na versão de distribuição do site podemos concatenar tudo para uma coisa só.

A missão aqui é que você quer os códigos em css de forma modularizada para que o pessoal possa trabalhar mas também quer que a versão dist tenha apenas um arquivo css e que o seu html link apenas para esse arquivo, o gulp cuida disso. (o sass pode ajudar nisso também), no gulp basta você englobar os arquivos css e js com um comentário como `<!-- build:js assets/js/combined.js -->` e tudo vai ser gerado no html e no js de forma a você precisar de apenas um comando para isso (mágico né?)

Mas nem sempre é bom manter tudo em um arquivo somente, pois se a página tem mais páginas atreladas a ela o usuário não tem um cache de todos os arquivos para deixar sua navegabilidade mais rápida e e precisamos fazer uma separação no nosso arquivo css e isso pode não ser muito trivial de se fazer, mas consegue-se dividir e dois ou três arquivos invés de 1 só o que já é bem legal de se fazer

Por qual motivo concatenamos CSSs e JSs?

Diminuir o número de requests faz com que os downloads sejam mais rápidos no HTTP 1. Temos menos concorrência nas 6 conexões disponíveis, logo, recursos precisam aguardar menos para serem baixados. De bônus, o GZIP funciona muito bem em recursos texto concatenados com bastante repetição, como CSS.

Isso! Você consegue compreender o impacto analisando o waterfall antes e depois da concatenação?

Menos requests fazem os CSSs e JSs serem carregados mais rapidamente. E não só isso, as requisições seguintes também, já que há menos tempo de espera por uma conexão livre.

### Concatenação de CSS

Vamos fazer a concatenação de todos os CSS em apenas um só, economizando dezenas de requests. Para isso, como vimos em aula, vou usar o gulp com useref.

1) Edite o arquivo site/index.html e envolva todos os <link> que carregam CSS em dois comentários especiais:

```html
<!-- build:css assets/css/estilos.css -->
    <link rel="stylesheet" href="assets/css/reset.css">
    ....
<!-- endbuild -->
```

2) No terminal, rode gulp useref

3) Observe o arquivo dist/index.html e o novo arquivo estilos.css

Testou no Chrome DevTools? Note a diminuição no número de requests. Qual impacto isso terá na performance para o usuário?

### Concatenação de JS

Faça a mesma coisa com os scripts. Envolva todos os nossos `<script> ` externos do head em um bloco especial:

```html
<!-- build:js assets/js/scripts.js -->
    <script src="assets/js/menu.js"></script>
    ....
<!-- endbuild -->
```

Rode agora o gulp useref novamente no terminal.

Observe o arquivo concatenado e analise novamente o impacto na página.

Usei o plugin useref no gulp por ser bem simples. Mas você pode, claro, concatenar arquivos de outras formas. O importante é não destruir os arquivos orginais, mas fazer isso na etapa de build do projeto.

### Uso de sprites para diminuir as requests das imagens

Se você der um request no site do google você vai ver na parte de imagens um png gigante cheio de imagens comuns em todos os sites que o google cuida, pois eu faria um request apenas pegaria todas as imagens do projeto

Pensando de maneira não automatizada eu poderia usar o imageMagick e criar esses sprites para depois colocar eles na mão via css com a propriedade `background-position`

A automação é possível mas por favor sempre verifique o resultado final disse por que ele pode dar caca no final (até é por que é bem complexo gerar as sprites de todas as imagens e depois substituir isso no site) tanto que o recomendado é ter os sprites logo de cara e você como desenvolvedor colocar isso na mão via css mas aí é gosto pessoal.

Pro gulp a opção é o gulp.spritesmith e ele te dá as coordenadas que você precisa para colocar no seu css

#### Projeto: sprites CSS

Crie uma sprite CSS com os 3 ícones PNG dos diferenciais do Alura, como vimos em aula. A técnica consiste em criar um PNG único com os 3 desenhos e depois posicioná-los com CSS usando background-position.

Opção 1: técnica manual
Criar essa sprite manualmente não é algo tão trabalhoso. Podemos gerar a imagem e fazer poucas alterações no CSS.

1) Para juntar os 3 ícones em um único PNG você pode abrir seu editor de imagens favorito e apenas editar as imagens. Ou, se já tiver o ImageMagick, criar o arquivo num único comando:

convert site/assets/img/*.png -append site/assets/img/diferenciais.png
Ele cospe esse arquivo diferenciais.png com os 3 desenhos.

(se quiser, baixe minha versão pronta aqui)

2) Edite o CSS para usar esse nosso novo arquivo.

a) Na regra .home-diferenciais-icone:before adicione background-image: url("../../assets/img/diferenciais.png");

b) Remova o background-image de cada um dos 3 ícones nas regras seguintes.

c) Em cada um deles, faça um background-position escolhendo um dos ícones. O primeiro é top, o do meio é center e o de baixo, bottom

O diff completo das mudanças:

![O diff](https://www.dropbox.com/s/r2gpdh2htwri9w7/diff-sprite.png?dl=1)

Opção 2: ferramentas de geração de sprite
Existem várias. A maior questão é que o CSS gerado não se adapta exatamente ao nosso projeto. Então você vai precisar ajustar ou o CSS gerado ou se markup para se encaixar na ferramenta. Mas vale o teste.

O sprity em particular você instala com npm install -g sprity-cli.

E aí pode gerar a imagem e o CSS com:

sprity create /tmp/ assets/img/*.png -s sprite.css
Abra o sprite.css e observe as regras. Adapate o HTML para usar essa versão.

### sprite em svg

Na prática o svg é bem mais utilizado por sites (por ser mais leve e mais responsivo e se encaixar bem em qq tela) e o posicionamento dele é mais legal

Porém para fazer o sprite dos svg precisa saber um pouco da estrutura em xml do svg de forma a deixar a imagem total com a seguinte estrutura

```xml
<svg>
<defs>

<symbol id=""></symbol>
<symbol id=""></symbol>
<symbol id=""></symbol>

</defs>
</svg>
```

Com n symbols representando as n imagens e invoacando eles no html da forma

```html
<svg><use xlink:href="caminho/da/imagem#nomedoid">  </svg>
```

De modo a substituir a tag img

Existem projetos que fazem isso de forma automática como o svg-sprite mas também existe a opção em editores de imagem que suportam o svg de criar como um symbol e não precisar se preocupar com códigos que fazem esse tipo de trabalho, a única coisa que você precisa se preocupar é com a id dessa imagem

#### Projeto: sprite SVG

Como vimos na aula, as sprites SVG são bem mais práticas. Basta criar um novo arquivo e transformar os `<svg>` em `<symbol>`, dando um id para cada um.

1) Crie um novo arquivo categorias.svg com um esqueleto básico:

```xml
<svg width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg">
<defs>

</defs>
</svg>
```

2) Dentro do `<defs>` vamos colocar cada um dos ícones. Basta abrir, por exemplo, o arquivo mobile.svg, copiar seu conteúdo, substituir `<svg>` por `<symbol>` e dar um id="mobile" para ele. Algo assim:

```xml
<svg width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg">
<defs>

<symbol id="mobile" viewBox="0 0 22 33">
    <path d="M17.612 29.584H3.604c-.384 0-.662-.304-.662-.76v-5.51h15.332v5.51c0 .456-.278.76-.662.76zM3.604 2.942h14.008c.384 0 .662.29.662.654v17.396H2.942V3.596c0-.364.278-.654.662-.654zm17.613.697A3.64 3.64 0 0 0 17.577 0H3.64A3.64 3.64 0 0 0 0 3.64v25.24a3.64 3.64 0 0 0 3.64 3.64h13.937a3.64 3.64 0 0 0 3.64-3.64V3.64zM10.837 25h-.175C9.744 25 9 25.783 9 26.75s.744 1.75 1.662 1.75h.175c.92 0 1.663-.783 1.663-1.75S11.756 25 10.837 25"/>
</symbol>

</defs>
</svg>
```

(Dica: copie a versão do mobile.svg do dist que já foi minificado. Fica mais fácil de enxergar as coisas.)

3) Para usar na página, basta substituir o `<img>` por um `<svg>` com `<use>`:

```html
<svg class="categoriaCard-item-icone"><use xlink:href="assets/img/categorias.svg#mobile"/></svg>
```

4) Agora faça isso para os 6 ícones das categorias!

Se quiser, deixei o projeto pronto com essas modificações e a sprite final gerada [aqui](https://github.com/alura-cursos/performance-web/archive/1da2de093dcfc697c9ff57dcd9903a53fa9c1d24.zip).

A ténica de usar `<symbol>` é muito útil mas não funciona em todos os navegadores. Em especial, IEs mais antigos. Mas, para isso, podemos usar um polyfill.

Uma bem famosa é a svg4everybody. Basta adicionar um script simples na página e chamar svg4everybody(). Deixei isso pronto no projeto já em assets/js/svg4everybody.js.

Então acrescente no HTML:

```html
<script src="assets/js/svg4everybody.js"></script>
```

Não esqueça de regerar o HTML com gulp userefm, Sprites SVG têm a vantagem também de, por serem texto, melhorar bem a compressão do GZIP. Ou seja, diminuimos os requests e também os bytes totais.

## Inline de recursos

Certos scripts e até certos arquivos css são curtos o suficiente para poderemos ser colocados direto na página `html` com as tags `script` e `style` então se não for incomodo coloque elas no html direto, pois eles não vão atrapalhar o site como um todo e vão gerar menos recursos para serem baixados. Certas atividades essenciais podem ser agilizadas quando embutem direto na página

Para colocar o css basta usar a tag inline dentro do script e tirar do intervalo de concatenação e usar o programa do gulp chamado inlineSource esses scripts ficam no head do html do site na pasta de distribuição

Com inline podemos aplicar em imagens e assim priorizar o carregamento delas (como em um site por exemplo)

O bom é que no final a versão de distribuição do html fique com menos que 14 kB (por conta do pacote TCP atual que usam 10 segmentos) (de forma gzipada) de recursos, então se sua página é grande não exagere no inline para scripts, estilos e imagens coloque apenas o necessário

Qual o tamanho ideal da resposta do documento HTML e porque?

14KB gzipados, incluindo os headers da resposta HTTP. É o tamanho aproximado de 10 segmentos TCP desconsiderando os headers do TCP, o padrão da janela inicial de novas conexões em servidores modernos.

14KB de dados já gzipados.

Importante observar que temos 14KB livres para dados HTTP. E isso inclui não só o documento HTML como os cabeçalhos HTTP.

Vale a pena checar se seu servidor está configurado para mandar 10 segmentos em novas conexões TCP. Servidores novos com kernel recente já fazem isso.

### Projeto: inline de JS

Use o plugin gulp-inline-source para embutir pequenos arquivos na resposta HTML. O JavaScript do home.js é um forte candidato a isso.

1) Mova a tag `<script>` que importa o home.js para fora do comentário especial de concatenação.

2) Adicione o atributo especial inline à tag, que dispara o plugin:

```html
<script inline src="assets/js/home.js"></script>
```

3) Rode gulp useref novamente para rebuildar o HTML

Economizamos um request e priorizamos a entrega desse JS: ele já vai embutido direto no HTML e é executado antes de todos os outros.

### Projeto: inline de SVG

Vamos priorizar a renderização do logotipo do Alura que aparece no topo da página. Para isso, deixá-lo inline na página é interessante.

1) Acrescente o atributo inline na `<img>` que carrega o logo:

```html
<img inline src="assets/img/logo-alura.svg" alt="Alura">
```

2) Rode gulp useref novamente.

Observe o resultado, em especial simulando redes bem lentas. Economizamos mais um request mas também priorizamos a renderização do logo.

SVGs são conteúdo texto, um XML, e portanto muito fáceis de inlinear no HTML, assim como JS e CSS.

Mas também podemos fazer inline de imagens comuns como PNG e JPEG. Nesse caso, precisamos usar Data URIs. Pesquise mais sobre o assunto.

## Paralelizando requests

O número de 6 conexões é válida para cada hostname (url) que minha máquina faz com aquelesite, mas e se eu me comunicar com mais? Aí não rola essas disputas certo? Pois é, grandes empresas para deixar seu site mais performática disponibilizam seu conteúdo em hostnames diferentes para que seja possível um acesso mais rápido a seu site.

Existe um limite de quantas conexões em paralelo você pode fazer, o ideal é trabalhar com três hostnames diferentes

Marque a alternativa que não representa uma vantagem de paralelizar requests com hostnames paralelos.

Com um novo hostname, os cookies do hostname principal não são enviados. O que gera até uma economia de bytes nas requisições.

No google app engine você pode ter outro domínio facilmente pois além do nome que você tem você pode ter o `web-dot` ou `bla-dot` isso é escolhido por você no arquivo `app.yaml` que você colocou lá aí você pode requisitar um arquivo no html da seguinte forma

```html
<img src="http://assets-dot-curso-alura-site.appspot.com/assets/img/busca.svg">
```

Dessa forma você está pedindo por uma imagem naquele hostname, e não no servidor principal

Estudos já mostraram que 2 ou 3 hostnames diferentes é o número ideal. Muitos hostnames paralelos podem causar congestionamento na rede e atrasar o browser. Mas sempre vale testar caso a caso. Às vezes nem compensa ter nenhum hostname a mais. Até por que valeria a pena ter um hostname para três imagens quaisquer né?

No dev tools e no webpagetest vemos um tipo de conectividade bem diferente com essas ações

## Cache

Por padrão o browser não faz cache de nada, pois ele tem medo uma vez que inormações importantes podem não ser mostradas porque você tá vendo um site antigo e por isso é papel do servidor (do cara do backend) dizer o que vai ser cacheado ou não e para isso existe no header do response a propriedade expire e com isso o browser tem a segurança de que aquele site tem a aprovação dos devs de mostrar uma versão mais antiga do site por um tempo (normalmente alguns dias)

E essa é uma configuração boba que se faz pro servidor que você usa, o ideal é colocar apenas estilos e scripts em cache pois esses mudam com menos facilidade o html é mais comum de mudarmos (imagina um G1 da vida, que é dinamico todo dia o html muda mas as noticias sempre estão em vermelho, amarelo ou verde), então o html não é legal cachear

O cache serve para que o usuário baixe o menos possível e tenha mais o cache (seja de modo privado para acessar sua conta ou não) então beleza é só botar expire de um ano e está tudo certo né? Não, pois e se eu querer mudar o site e querer que o usuário saiba dessa novidade, bem é só mudar o nome do que eu quero mudar pois aí o usuário baixa o novo e ignora o antigo que está cacheado aí essa mudança do novo seria uma nova versão e eu faço isso na mão? Não. Usa o bom GULP com a parte de revisão que está dentro da build aqui no gulpfile que ele faz essa coisa para a gente

A ideia do revision é que ele coloca um código no final de todos os arquivos que eu quero mudar colocando um número (um hash) no final de cada arquivo e aplicando esses hashs no html também

Caches altos são bacanas para coisas secundárias como imagens e estilos

### Projeto: revisões com gulp

Um cuidado antes de habilitarmos o cache alto no servidor é de garantir que as URLs são únicas e mudarão quando fizermos alterações no site. Fazemos isso adicionando algum tipo de controle de versão no nome do arquivo (um número, ou um timestamp, ou um hash do conteúdo).

Esse processo pode ser manual mas temos o plugin do gulp que já faz isso automaticamente, colocando um hash gerado a partir do conteúdo de cada arquivo.

Nosso gulpfile já foi configurado para isso. Basta rodar: gulp revreplace que todas as tasks anteriores serão rodadas além das novas que fazem as revisões dos arquivos.

Observe o conteúdo gerado e veja como CSS, JS e imagens foram renomeadas.

Importante: renomear os arquivos é um processo destrutivo. Isso quer dizer que não dá pra rodar o revreplace duas vezes. Se precisar rodá-lo novamente, apague o dist, e rode o copy, minify, useref e aí o revreplace de novo.

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

Outra opção para deixar as URLs únicas é passar um parâmetro a cada atualização. Então ao invés de renomear o arquivo para arquivo-v2.js por exemplo, poderíamos fazer arquivo.js?v2. A vantagem é que o arquivo não precisa ser renomeado. Mas alguns proxies intermediários têm problemas em cachear recursos com parâmetros.

Por isso a boa prática acaba sendo a solução que muda o nome do arquivo. É mais trabalhosa mas com as ferramentas certas fica fácil automatizar.

Estamos rodando muitas tarefas no gulp ao longo do curso: minify-css, minify-js, imagemin, useref e agora o revreplace.

Para facilitar, deixei uma task default pronta que regera o site todo e roda todas as tasks de uma vez.

Basta executar gulp default no terminal ou até mesmo apenas gulp.

Teste agora!

O que importa não é se seu site está carregando em 1 s e sim o que o usuário vê e fica feliz com o resultado
