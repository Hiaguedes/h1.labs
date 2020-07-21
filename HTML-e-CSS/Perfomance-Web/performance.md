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
