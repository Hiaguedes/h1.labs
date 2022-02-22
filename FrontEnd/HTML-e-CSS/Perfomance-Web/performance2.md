# Performance 2

Esse curso se tratará bastante sobre como a web e o browser opera debaixo dos panos de maneira mais avançada e como podemos adaptar nossos projetos sabendo dessas informações.

Afinal performance é UX.

## Mais sobre o web page test

Configurações importantes: colocar a localização real de teste, ir em avançado (aba test settings) e habilitar o capture video e testar com várias conexões diferentes, além de habilitar first view only (ou o repeat view caso queira ver o comportamento do cache)

E é interessante ter mais de um teste pois eles representam estados de servidor diferentes (pois o servidor pode estar mais lento ou mais rápido em questão de instantes)

### Os tempos que realmente importam

É mais pertubador uma página em branco por muito tempo ou sem letras do que uma página que não tenha conseguido carregar uma imagem ou outra. Então é mais importante o tempo de Start Render do que o Load Time, pois o start render significa que alguma coisa está sendo mostrada para o usuário

O speed index é o tempo necessário para o topo da página estar visível, o que representa uma segurança maior para o usuário de o ínicio está carregado. O Speed Index é um número que indica em milissegundos quanto tempo se passou até o topo do site estar visualmente estável. A ideia é captar a sensação de performance do usuário ao abrir a página. De quando ele poderá consumir o conteúdo do above the fold sem problemas.

## Como a página é carregada e Critical Path

Vamos por partes, você digita a URL e essa url busca na rede a página index.html nada demais e esse html tem dentro dele recursos como o css, arquivos js e imagens e dispara o download desses recursos para carregar a página em cascata.

Porém tem uma particularidade quanto ao css, pois o css redesenha nossa página de maneira a acontecer de um arquivo css conseguir anular o que outro faz, então a página não carrega enquanto os css forem todos carregados. Chamamos isso de recurso blocante, então o responsável pela página branca é por esses recursos blocantes e isso se da para os arquivos js, pois eles são capazes de adicionar e remover css além de serem capazes de alterar a view de uma página então são muito blocantes hahah

Para esses blocks nós chamados de critical rendering Path

![Critical Rendering Path](./img/critical_rendering_path.jpg)

Explicação da imagem: a rede dispara a rquisição da página e de forma quase instantanea o HTML e o css começam a serem baixados e carregados na página e com isso é montado o DOM com todos os elementos do HTML e um CSSOM (o dom do css) que carrega em objetos os elementos do css com os dois carregados que começamos a criar a árvore de renderização, então não adianta o DOM ser montado e carregado se o CSS não está pronto, aí entramos na parte de calculo das distancias entre os elementos que o css traz para ai sim começar a desenhar na tela.

E o elefante branco que é o javaScript que tem o poder de alterar os elementos do DOM e do CSSOM, e assim afetar o paint lá no final, essa é o porque colocamos os scripts no final da página muita das vezes, pois como ele pode afetar o tempo de carregamento total da página, e se tirarmos ele do head nós deixamos os arquivos css serem carregados o mais rápido possível.

E colocando os scripts no final fica um tanto inútil utilizar o `window.load` pois se eles estão no final com certeza a página foi carregada já.

Tanto o CSS e o JS bloqueiam a renderização. As imagens, não - elas são baixadas em paralelo e sem bloquear nada.

O JS, como veremos depois, tem a vantagem de poder ser carregado assincronamente de forma fácil. O CSS já é mais complicado, por isso costuma ser o principal componente blocante de todas as páginas.

## Carregamento assíncrono

Com o atributo `async` vinda do HTML5 nós conseguimos carregar scripts de forma assíncrona porém nós podemos perder a ordem desses scripts (que é bem importante) pois um scrip pode carregar primeiro que o outro (por ser mais leve) e podendo crashar. Em alguns frameworks você consegue dar prioridades no carregamento das dependências mas aí é para cursos voltados para isso, e isso está muito ligado a módulos. E dessa forma podemos voltar os scripts no head (lembrando de voltar o onload)

No HTML5, apenas scripts externos podem ser async. Isso faz com que o download seja iniciado em paralelo com o restante da execução da página. E, conforme os scripts chegam, eles são executados sem nenhuma ordem garantida.

O browser e o js por padrão são aplicações single thread, ou seja mesmo que eu tenha o threadrripper da AMD mais caro e absurdo de todos a nossa aplicação roda tudo em um unico processador. Não existe programação single thread para javaScript, isso é bom por que descomplica a aplicação e não dá crash quando damos o scroll no browser e isso dispara uma ação em outro thread, porém temos um gargalo aí pois ações de usuário e ações da página estão competindo pelo uso do mesmo processador

Então uma request assíncrona pode atrapalhar caso eu tenha um recurso mais pesado e eu posso adiar a execução desse script eu posso executar ele com `setTimeout` e isso adia o recurso de um footer e faz com que ele não brigue com outros recursos mais importantes. Além desse temos o `requestAnimationFrame` para adiar animações. Um delay de seus 200ms é bem positivo e interessante

## Lazy Load e throttle

Nessa idéia de colocar recursos para depois, com o java script mesmo eu posso pegar um elemento mais pesado esperar um tempo e depois colocar esse elemento dentro da div. Um vídeo vindo de um serviço externo pode ser apendado ao site dessa forma com um

```js
setTimeout(()=>{
iframe='<iframe> blablabla </iframe>';
document.querySelector(".nome-div").innerHTML=iframe;
},200)
```

E voilá depois de 200ms vemos o vídeo la, dessa forma colocamos um 'carregamento assíncrono' de componentes não js e mesmo que o site demore mais a carregar essa forma gera mais satisfação ao usuário

Outra abordagem é carregar as imagens somente quando o usuário estiver chegando perto delas com o `scroll` e isso pode ser feito da seguinte forma

```js
window.onscroll = function() {

    var imgs = document.querySelectorAll('img[data-src]');

    for (var i = 0; i < imgs.length; i++) {

        if (imgs[i].getBoundingClientRect().top < window.innerHeight +200px) { 
        imgs[i].src = imgs[i].getAttribute('data-src')

        }
    }
};
```

A idéia é no html trocar o `src` das imagens pelo data-source e assim quando estivermos proximos (pelo scroll Y) de chegar na imagem trocar o data-src (que não faz nada) pelo src e ai carregar a imagem quando o usuario estiver perto delas (isso poupa o carregamento todo no começo) Só que temos um problema, o scroll é disparado diversas vezes, para corrigir isso é fácil, basta limitar a frequência de execução do código principal da seguinte forma

```js
let setFreq=false;

window.onscroll = function() {

if(setFreq) return;
setFreq=true;
setTimeout(()=> setFreq=false,100);

//código a ser executado
console.log('scroll');
}

```

A essa técnica nós damos o nome de throttle, isso trunca o código de ser executado milhões de vezes

Mas esse código não está otimizado né, afinal fazemos `var imgs = document.querySelectorAll('img[data-src]');` toda vez que damos um scroll na página e mesmo com o throttle não conseguimos uma otimização de código, para isso vamos para um exercício

### Exercício

(desafio) Mais otimizações

Mesmo com o throttle, o `onscroll` ainda é executado várias vezes. Dado isso, uma boa prática é melhorar o código executado no `onscroll` para que rode mais rápido. Idealmente, devemos limitar o acesso a elementos do DOM, que é o mais custoso.

Exemplo: precisamos mesmo fazer o querySelectorAll a cada execução do `onscroll`? Talvez não, talvez dê para cachear esse resultado.

Outro exemplo: os elementos nessa página em particular não mudam de posição. Então precisamos fazer o `getBoundingClientRect()` de cada imagem a cada scroll? Também não, podemos dar um jeito de calcular a posição absoluta da imagem com relação ao topo uma única vez. (mas cuidado quando o navegador é redimensionado!)

Mais: precisamos ler o window.innerHeight a cada `onscroll`? Não também, podemos cachear.

E o `onscroll` poderia ser removido depois que todas as imagens terminarem de carregar.

Pense em como alterar nosso código a evitar esse tipo de manipulação de DOM a cada scroll.

Na resposta do exercício, dou minha solução para o desafio.

## Rede e mobile

A diferença entre largura de banda e latência (RTT) é que largura de banda é o quanto de informação sua rede pode trafegar de uma vez só a latência é o quão longe é o local que eu estou buscando a informação, quanto mais longe mais lento independente do quanto de informação consegue trafegar ali, pois as informações demoram mais tempo para passar de um local para outro. O rtt (round trip time) é o tempo que leva para passar 1kB de informação da minha casa até o servidor

E o processo para acessar um site é estruturado da seguinte forma

DNS LOOKUP -> TCP -> TLS -> HTTP

Primeiro eu pergunto para um servidor DNS (o da minha operadora provavelmente) quem é www.site.com, ai ele me responde com o IP desse site, depois eu abro conexão com o servidor, depois abre uma conexão segura e depois eu mando o GET index.html que pega o site de fato via HTTP. Essas operações consomem 1 RTT, então pelo menos temos 4 tempos RTT até começar a acessar o site, então sim a latência é vital aqui. Principalmente para mobile.

E mesmo com 4G ou wifi da casa o mobile tem um ping mais alto que o pc da casa e o 4G tem dois estados (um frio e um quente) o frio é quando ele acabou de ser ligado (o 4G no caso) é quente é com ele já ativo e navegando um tempo

E segundo o google mesmo se eu tiver 10MB ou 100MB de internet o tempo de carregamento da página em pelo menos 1.5s. Tudo por conta da latência e quanto mais próximo o cliente está do serviço melhor e isso é o que diminui de fato o tempo de carregamento da página

Quando você fala de mobile o processo de acesso de site é do tipo

RRC -> DNS LOOKUP -> TCP -> TLS -> HTTP

Onde o RRC é a negociação que seu celular faz com a antena para ai sim poder se conectar a internet e que pode levar de 200 a 2500 ms, a tendencia é melhorar (provavelmente já melhorou) mas tem todo um despertar do seu celular para ai conectar e que demora mais tempo do que normalmente melhora, essa negociação é necessária pois senão sua bateria vai pro espaço e isso é responsabilidade da operadora do serviço. Por isso é ótimo pensar nos casos médios de rede do país onde se pensa em 5G mas a realidade é 3G ou 2G (o E quando a rede tá uma bosta, pois vem de EDGE), o H (HSPA+) vem de 3.5G

Por isso não devemos levar em conta que eu tenho o 4G então se no 4G tá bom o tempo de acesso fechou ja era, não, o certo é pensar no cara que usa 3G sempre. Pois ele é a realidade e sua realidade é uma internet de 1MB e por isso a diminuição de requests é extremamente necessária (seja com inline, concatenação e coisas que vimos no curso anterior), por isso aprenda a mexer no GULP (você não vai fazer outras pessoas terem a mesma raiva que você teve um dia)

E colocar servidores do seu sistema no local que você e seus clientes vão acessar senão você vai pagar a latência sempre que acessar.

Com mais dinheiro você pode tirar o serviço dos EUA e colocar no brasil, com mais ainda o ideal são as CDNs que você dispersa servidores no mundo e torna a conexão mais especializada pros clientes de uma determinada região.

Evite redirects também, pois é gasto um RTT desnecessário so para isso

### TCP

Vamos comentar sobre o protocolo TCP e mais algumas dicas para melhorar o seu projeto. O protocolo TCP funciona da seguinte maneira:

![TCP](https://s3.amazonaws.com/caelum-online-public/performance+2/4/4_4_1+mostrando+o+browser+e+o+server.png)

O browser manda um pacote SYNC para o servidor que manda um pacote de volta dizendo que recebeu o SYN ACK. Nesse momento o browser manda um pacote ACK e logo de cara começa o request do "http". Depois disso o GET é enviado para o servidor que recebe o request, processa e manda a resposta para o browser, nesse estágio da conversa ele é capaz de enviar 4 TCPs de uma única vez, isso é aproximadamente 5,8 KB. O cliente manda uma requisição GET e começa a mandar a resposta com esses quatro segmentos onde só cabem os 5,8 KB. Se tivermos uma página maior do que o segmento não será possível mandar ela. Por fim, quando o browser recebe esses 4 TCPs, o servidor enviará o dobro e assim por diante até a rede aguentar.

Esse é um cenário bastante simples e que não contêm diversas outras considerações.

O começo é bastante demorado, até que a conexão realmente iniciar. O que podemos fazer para tentar resolver esse problema é diminuir o impacto do começo. Toda vez que vai e volta a seta é um RTT, então, até termos a resposta temos diversos RTTs. Queremos economizar nisso, a maioria dos servidores modernos trabalha com mecanismo que chamamos de keep alive, quando o servidor estabelece uma conexão com o navegador essa conexão será mantida, reaproveitada.

O próximo passo que podemos pensar é na etapa de processamento que trava o cliente. Algo que podemos fazer quando estivermos mexendo no back end é já ir mandando coisas para o cliente o mais rápido possível, principalmente se isso couber na primeira janela TCP. Isso chama-se flush.

Outro aspecto que queremos comentar é em relação a janela inicial do "TCP" que tem basicamente 4 segmentos e no qual temos que encaixar o máximo possível ou, se possível, o "html inteiro em 5,8 KB. Existe uma mobilização virtual para que a janela seja aumentada. Se reivindica que ocorra um aumento de pelo menos 10 segmentos. Existe um processo de aumento gradual, de low start, mas a primeira janela poderia ser maior. Se você possui um servidor moderno e pessoas que acompanham esse debate é bem provável que você já possua um servidor que contem 10 segmentos.

### Exercícios (respostas)

Latência é o maior limitante no acesso a páginas Web no mundo real, já que os requests costumam ser pequenos em relação à banda disponível e porque o HTTP é bastante sensível a latência.

Com a Web distribuída pelo mundo, os servidores frequentemente estão bastante distante dos clientes. E aí o RTT é alto pela simples distância geográfica. A latência acaba sendo o maior limitante no mundo real ao acessar página Web. Como os requests são pequenos, é difícil uma banda de 10 mega ou 100 mega fazer alguma diferença. Estudos mostram até que após 4 ou 5 mega, já dá na mesma no mundo real.

A banda seria importante em cenários de baixar um volume grande de dados, como um streamming de vídeo por exemplo.

Não existe usuário 4G. Existem pessoas que passam boa parte do dia conectadas a rede 4G mas que gravitam em redes 3G e até 2G ao longo do dia. Isso varia com intensidade do sinal, capacidade das antenas da região, números de usuários na mesma antena e mais.

Estudos mostram, por exemplo, que no Brasil, um usuário com celular 4G, um plano 4G, numa operadora 4G, passa apenas 45% do tempo conectado no 4G. Resto do tempo fica gravitando em outros Gs pelos mais variados motivos. Se você tem um celular 4G, provavelmente deve ver o tempo todo sua conexão mudando pra H (3G) ou E (2G).

Mesmo em países mais desenvolvidos, esse número não chega nem perto de 100%. Nos EUA, por exemplo, é 67%. No Japão, 68%.

Sempre lembre: não existe "usuário de 4G". Existe usuário que eventualmente conecta num 4G. (da mesma forma que não existe "usuário 3G" etc)

Qual(is) dessas práticas não está envolvida na diminuição do preço que pagamos pela latência em páginas Web?

Lazy load / carregamento assíncrono

Tudo aquilo que diminui o número de requests, evita que requests sejam feitos e diminui a distância geográfica diminui o impacto da latência.

O que é TCP Slow Start e como isso afeta nossa performance front-end?

O slow start diz que uma conexão TCP começa trafegando poucos pacotes (4 segmentos por padrão) e vai dobrando a cada novo round trip. Isso até a conexão e as 2 pontas aguentarem. Aí a conexão atinge seu máximo que é bem maior que os 4 segmentos iniciais. Ou seja, uma conexão TCP começa lenta e vai esquentando com o tempo.

O padrão é de enviar 4 segmentos, mas isso surgiu uma época de redes piores. Hoje a recomendação é usar uma janela inicial de 10 segmentos, o que aumenta para 14KB o volume de dados trafegados inicialmente. Garanta que seus servidores estejam configurados corretamente.

Qual dessas práticas não está relacionado a melhoria de performance de rede?

Usar um mecanismo de scroll throttle

Várias dessas práticas envolvem configurar adequadamente a infraestrutura do seu servidor. Se não for você que cuida disso, conversa com seu pessoal de Infra para resolver esses pontos. Isso afeta diretamente a performance final das suas páginas.

***O que ajuda***

Habilitar o Connection Keep Alive

Aumentar a janela TCP inicial para 10 segmentos

Fazer flush mais cedo se o processamento no servidor for demorar

### Para saber mais: 14KB ou não

Uma expansão recente muito interessante sobre o assunto neste artigo de 2019:

<https://www.tunetheweb.com/blog/critical-resources-and-the-first-14kb/>

Uma análise moderna sobre como os pacotes TCP funcionam no mundo real atualmente, principalmente pensando que quase tudo hoje já está em TLS e HTTP/2.

Talvez muitos daqueles 10 segmentos iniciais já sejam usados pelo protocolo antes mesmo da requisição começar. E que nas stacks modernas de networking, mesmo o ACK desses pacotes iniciais já são enviados.

Na prática, significa que a janela TCP provavelmente já estará maior que os teóricos 10 pacotes quando for a hora de enviar e receber a requisição. Dando até mais espaço que os clássicos 14KB.

## O melhor dos mundos (de novo sobre critical PATH)

O melhor dos mundos aqui é batermos no servidor e quando voltarmos com apenas uma requisição conseguirmos carregar a primeira view do site para pelo menos o cliente ficar satisfeito com a experiência, como fazer isso?

Colocar o css da parte inicial no começo e se tiver um js nessa parte (para algum input ou algo do tipo) eu colocar ele como inline também e imagens no inline também. Caso seu site seja muito grande cabe aqui o flush dessas informações (como o google faz com seu cabeçalho)

E esse é o segredo carregar o que importa no começo e depois os arquivos js fazem de forma assíncrona

Mas aqui entra uma questão, colocamos o css do header no inline. O nosso site tem muitas rotas, vamos baixar o mesmo header diversas vezes? Pois é, depende de projeto para projeto mas geralmente acaba valendo a pena fazer isso em nome da perfomance e experiência do usuário desde que no final o index.html gzipado fique com menos de 14kB, já que queremos pegar o site com 1RTT apenas

Uma forma legal é carregar css de forma assincrona para isso temos uma biblioteca javaScript chamada loadCSS que faz esse papel, porém ele involde js e isso é blocante o que realmente pode não ser o que queremos.

A solução que está sendo mais aceita é invés de chamarmos o css com `<link rel="stylesheet` é usar o `<link rel="preload" as="style" href="./estilos.css" onload="this.rel='stylesheet'">`, onde a ideia é baixarmos o css de forma assincrona e coloar ele em cache. E caso dê problema como javascript não habilitado colcoa-se uma tag `<noscript>` com o correto.

Mas lembrando que o preload não é aceito em todos os navegadores, para isso o loadCSS recomenda dois scripts vá no git deles e aplique no seu gulp

### Fazendo isso na prática

1 RTT render
PRÓXIMA ATIVIDADE

Implemente a técnica de renderizar o topo do site em 1 RTT como vimos na aula.

Divida o CSS em duas partes: o inicial e o restante.
Os arquivos do inicial são: reset.css, base.css, colors.css, font.css, block-header-busca.css, block-header.css, block-buttons.css, block-categoriaCard.css, block-titulo-destaque.css, home-fundo.css, home.css, home-diferenciais.css

Os demais não são necessários pro topo.

Faça o carregamento inline dos arquivos iniciais. Com nosso plugin do gulp, isso significa colocar o atributo inline na tag link de cada arquivo. Ex:
```html
<link inline rel="stylesheet" href="assets/css/reset.css">
```

O resto dos arquivos deve ser buildado pelo gulp num arquivo async.css. Faça o truque do duplo comentário como vimos na aula para evitar que a tag link gerada seja colocada no HTML.

```html
            <!--
            <!-- build:css assets/css/async.css -->
                <link rel="stylesheet" href="assets/css/block-conteudo.css">
                <link rel="stylesheet" href="assets/css/block-cursoCard.css">

        .... ETC DEMAIS ARQUIVOS AQUI...
            <!-- endbuild -->
            -->
```

Agora precisamos carregar esse async.css de forma assíncrona com o truque do preload. No head da página:

```html
<link href="assets/css/async.css" rel="preload" as="style" onload="this.rel='stylesheet'">
<noscript><link href="assets/css/async.css" rel="stylesheet"></noscript>
```

Se testar no Chrome ou no Opera já deve funcionar. Mas vamos adicionar os polyfills para navegadores antigos.

```html
<script async src="assets/js/loadcss.js"></script>
<script async src="assets/js/cssrelpreload.js"></script>
```

Ufa, agora faça o build da página rodando gulp no terminal e teste.

Implemente a solução do exercício com o noscript.

Remova o código anterior que tínhamos com o <noscript><link ....></noscript>

Faça o código com o truque novo:

```html
    <noscript>
        <!-- build:css assets/css/async.css -->
        </noscript>

        <link rel="stylesheet" href="assets/css/block-conteudo.css">
        <link rel="stylesheet" href="assets/css/block-cursoCard.css">
        <link rel="stylesheet" href="assets/css/block-depoimentos.css">
        <link rel="stylesheet" href="assets/css/block-elasticMedia.css">
        <link rel="stylesheet" href="assets/css/block-footer-listaCursos.css">
        <link rel="stylesheet" href="assets/css/block-footer.css">
        <link rel="stylesheet" href="assets/css/block-form-erro.css">
        <link rel="stylesheet" href="assets/css/block-grupoCaelum.css">

        <link rel="stylesheet" href="assets/css/block-highlighted.css">
        <link rel="stylesheet" href="assets/css/block-painelPlanos.css">

        <link rel="stylesheet" href="assets/css/block-titulos.css">

        <link rel="stylesheet" href="assets/css/home-aprenda.css">
        <link rel="stylesheet" href="assets/css/home-diferenciais.css">

        <noscript>
        <!-- endbuild -->
    </noscript>
```

Rode o build com gulp. Teste novamente e garanta que tudo funciona.

No vídeo propus um desafio adicional de evitar que a versão do rel=preload seja executada em desenvolvimento. Ou seja, quero que apareça apenas em produção, após o build com gulp.

Uma ideia é colocar a linha do rel=preload dentro de um `<noscript>` em desenvolvimento e remover esse noscript quando o build gera. Com o plugin do gulp dá pra rodar um comando remove. Desta forma:

```html
<!-- build:remove --><noscript><!-- endbuild -->
<link rel="preload" href="assets/css/async.css" as="style" onload="this.rel='stylesheet'">
<!-- build:remove --></noscript><!-- endbuild -->
```

## HTTP 2.0

Esse novo protocolo para a web trás muitas melhoras no quesito performance, sabendo que o keepalive (que aproveita a conexão TCP já aberta com o servidor) já foi feita no protocolo 1.1 do HTTP além de 6 conexões paralelas por hostname

Os headersm o status code ainda continuam iguais mas certas coisas agora são diferentes, no 1.1 eu podia mandar no server o tal do gzip, no 2.0 os headers agora são gzipados o que é bem legal pois muitos cookies são transitados via header e eles pesam bastante e o protocolo já vem com o gzip no header (no caso hpack) e no conteúdo, e no 2.0 agora temos a obrigação de TLS (o tal do https) pois se não for é capaz de quebrar a rede

Informações parecidas no header são passadas apenas uma vez. Como o cookie

Mas a grande coisa é o multiplexing, pois no 1.0 temos uma sequencia de requisição e resposta de modo muito sequencial e enfileirada, ou seja uma requisição só pode começar quando a anterior acabar e se um for muito grande trava todas as outras, no 2.0 temos uma mistura entre tempos de requisição e resposta o que torna a comunicação muito mais inteligente e o navegador arruma todos os dados. Isso tudo com TCP assíncrono.

Com esse protocolo se torna um tanto inutil juntar CSS e js e criar sprites de imagens, pois as multiplas requisições não são mais um problema, já que todo seu carregamento é feito de forma assíncrona e aumentar hostnames aqui é uma má pratica para esse protocolo, pois o unico hostname já está paralelizado, e mais paralelização pode gerar muita complexidade.

O google app engine usa o htt2 quando temos o htpps

No dev tools o https é dito como h2 na coluna protocolo dentro da aba network

Nesse protocolo eu tenho a liberdade de poder concatenar arquivos js e css em mais arquivos

### Exercícios

As páginas Web têm cada vez mais dependências. Diversas imagens, diversos JavaScripts, CSSs etc. Dezenas, talvez centenas.

Por que o HTTP/1.1 tem um sério gargalo de performance ao baixar esses recursos em paralelo?

As conexões HTTP só conseguem baixar sequenciamente. Envia-se um request, espera-se o response e o segundo request só pode ser enviado quando a resposta do primeiro terminar de chegar. Cria-se uma fila que tentamos aliviar abrindo 6 ou 8 conexões paralelas. Mas como as páginas têm dezenas de recursos, ainda temos uma fila.

O HTTP clássico não permite paralelizar requests na mesma conexão ou mesmo mandar várias requests de uma vez nem nada do tipo. É uma escolha do protocolo para facilitar (mas não tem relação com gzip ou texto).

Os requests têm que ser feitos sequencialmente, e cria-se essa fila que pode atrasar tudo. E, pior, se os primeiros requests demorarem pra serem processados, eles seguram todos os demais.

Precisamos de HTTPS no HTTP/2? Porque?

O HTTPS não é obrigatório na especificação em si, mas na prática acaba sendo. Para evitar problemas com intermediários que não entendam HTTP/2, todo mundo só suporta com TLS para envio criptografado. Assim apenas o cliente e o servidor precisam entender HTTP/2.

Talvez daqui muitos anos tenhamos uma Web que possa trafegar HTTP/2 texto puro de forma tranquila. Hoje, não. Você vai precisar de HTTPS no seu servidor ainda por muito tempo. De brinde, temos a vantagem de uma Web mais segura e com mais privacidade.

O que é o multiplexing do HTTP/2?

Requests e Responses podem ser enviados e recebidos na mesma conexão TCP de forma paralela e assíncrona. Múltiplos requests podem ser disparados, as repostas podem chegar na ordem que for mais conveniente, um request lento não trava os demais. A conexão é usada em todo seu potencial, com tráfego bidirecional da forma mais concorrente possível.

Com multiplexing agora só precisamos de 1 conexão TCP que ela vai ser bem aproveitada. Nada mais de gambiarras de conexões paralelas, múltiplos hostnames etc.

O JavaScript já é carregado no fim da página e pode ser carregado todo com `async`. Com isso, ele é um forte candidato a não ser concatenado.

## HTTP 2 avançado

Com HTTP 2 eu consigo priorizar requests a frente de outros, coisa que não podia ser feito com HTTP 1, pois não faz sentido baixar o jQuery primeiro se eu nao tenho o estilos.css, então para isso eu posso sinalizar para o servidor os pesos de download de cada arquivo, inclusive das dependências dos arquivos

E melhor, com um server push junto com http 2 eu posso fazer com que a requisição do index.html ja me mande os estilos e componentes necessarios sem o cliente precisar pedir por eles, isso é foda. E se o cliente já tem esses recursos no cache os recursos são canceláveis, então pode se cancelar o inline de recursos dentro desse recurso.

Então o http 2 é uma revolução em termos de performance na web, pois risca diversas 'gambiarras' que faziamos para deixar a web mais potente no http 1 e diversos servidores já possuem esse tipo de recurso.

E para habilitar o server push eu preciso habilitar o servidor que estou usando para fazer isso assim como foi feito com o gzip, mas para alguns servidores habilitar o http2 pode ser chatinho pois tem que ter o TLS (ai tem que pagar), e para termos o server push nós temos que habilitar no header (apache, tomcat,php, ngnix whatever) essa especificação, uma forma de fazer isso seria com apache

```apache
Link: <assets/img/whatever.svg>; rel=preload; as=image
```

No google app engine dentro do arquivo yaml temos:

```gs
handlers:
  - url: /
    static_files: index.html
    upload: index.html
    expiration: 0s
    http_headers:
      Link: <assets/img/logo-alura.svg>; rel=preload; as=image, <assets/img/background-cidade-fundo.svg>; rel=preload; as=image,<assets/css/critico.css>; rel=preload; as=style
```

Lmebra o link do css de modo assíncrono né? Pois é, mas não faça com html, isso é papel do back end. Aí a ideia seria tirar esses arquivos que ficariam no inline para estar no server push (não precisa tirar do front, só o inline no gulp) mas somente carregue ele antes via server push nas configurações do seu server

### Exercícios

Que tipo de ferramentas de priorização de requests o HTTP/2 traz?

O cliente pode mandar vários requests ao mesmo tempo indicando tanto uma ordem de dependências quanto a importância de cada request. O servidor vai tentar responder levando em conta essas dicas, priorizando respostas mais importantes.

O HTTP/2 traz esse mecanismo onde o cliente comunica dicas de priorização e dependências para o servidor. O servidor recebe isso e, aplicando seu próprio algoritmo, tenta entregar na melhor ordem possível. Mas não é necessário obedecer piamente. Talvez o servidor tenha conhecimentos adicionais que o levem a entregar de alguma outra forma ainda mais otimizada.

Outro ponto: o cliente pode modificar a prioridade das requisições mais a frente também. Tudo é dinâmico e pode ser reajustado se as condições mudarem.

O que faz o Server Push do HTTP/2?

O servidor pode empurrar certas respostas para o cliente antes mesmo delas serem requisitadas. Tem a mesma vantagem de fazer inline de recursos mas sem a desvantagem de matar cache. As respostas empurradas ainda são cacheadas independentemente e o cliente pode cancelar um push caso já tenha em cache.

O servidor pode empurrar certas respostas para o cliente antes mesmo delas serem requisitadas. Tem a mesma vantagem de fazer inline de recursos mas sem a desvantagem de matar cache. As respostas empurradas ainda são cacheadas independentemente e o cliente pode cancelar um push caso já tenha em cache.

## Resource Hints

Resource Hints são dicas, o primeiro mais conhecido é o DNS-PREFETCH que antecipava nomes de DNS antes mesmo de o cliente pedir por eles, e ele é um dos primeiros a serem implementados e tem suporte a diversos navegadores e para implementar-lo eu uso na tag link

```html
<link rel="dns-prefetch" href="">
```

Mas uma forma mais moderna que resolve qualquer tipo de coisa é o preconnect

```html
<link rel="preconnect" href="">
```

E a ideia desses dois tipos de resource é que quando eu realmente precisar baixar esse arquivo a conexão já esteja aberta e pronta para essa ação, o que economiza um tempo considerável para todas aquelas formalidades do TCP e isso antecipa qualquer tipo de trabalho sem blocar nenhum recurso do site, isso é bom para videos e analytics já irem fazendo o trabalho antes

Outro é o `prefetch` que baixa em caso do navegador estar mais livre um outro recurso esse recurso sendo secundário. Então ele é bem útil para uma outra página dentro do site. Mas não abuse desse tipo de recurso pois você estará consumindo recursos que podem não ser usados pelo usuário, então use o prefetch para coisas leves e que sejam em média bastante utilizados

E aí finalmente o `preload` que é o prefetch porém com prioridade alta, o prefetch é pensado em navegações futuras enquanto o preload é para a navegação que quero agora.

E nisso nós temos as prioridades com esses nomes mais o atributo `as=""` que seja um estilo, uma imagem ou outras. E o navegagor entende que o estilo tem uma prioridade maior que uma imagem, tem as para tudo, mas se eu não colocar o as a prioridade desse download é bem baixo. Isso é muito útil para carregamento de fontes que demoram bastante, pois é bem específica o uso dessa fonte e é demorado descobrir o momento que vai utilizar essa fonte, então o `preload` das fontes é importante. O `as` para ela é font e se o navegador não suportar aquela fonte use o `type=font/<extensao da fonte>`

Outro é o `prerender` que quando você faz uma busca no google, a chance de você clicar no primeiro link é bem alta então ele pré-renderiza a busca para você de cara, isso é legal para páginas secundárias (o que é mais uteis para workflow) ou páginas de confirmação de cadastro, e a ideia é criar esse prerender quando o usuario estiver interagindo com elementos da página

## Copia e colao no texto de resource hints da alura

04
Resource Hints
PRÓXIMA ATIVIDADE

Resource Hints: DNS- PREFETCH and PRECONNECT
Vamos tentar entender como funcionam os rel e preloads . Queremos abordar também os Resource Hints. O primeiro Resource que foi inventado foi o DNS-PREFETCH que permite pedir ao navegador para resolver o DNS de um certo recurso antecipando que precisaremos dele mais adiante. Podemos utilizar isso em nosso index.html, criando uma tag "Link" e usando:

`<link rel="dns-prefetch" href="/player.vimeo.com/">`

Com isso, a resolução do DNS é antecipada para o começo. Quando ele fizer o parcing do HTML. A resolução do DNS é feita totalmente em background o que não significa que isso não travará a renderização ou o download das demais coisas. Também podemos fazer o mesmo com outras coisas e podemos utilizar esse recurso quantas vezes fizer sentido para o site.

Mostramos ele pois é o que possui melhor suporte, funciona em todos os navegadores. Foi um dos primeiros a ser inventado desses Resource Hints. Logo, se percebeu que podia-se dar passos além, não apenas resolver o DNS.

Um segundo Resource Hint é o preconnected. Além de antecipar o DNS podemos antecipar, também, a conexão. Para usar isso podemos escrever link rel=preconnect. Ele inclui a resolução do DNS, faz a conexão TCP e se for uma conexão segura ele inclusive faz a negociação CSL para nós. Você pode se perguntar se isso realmente impacta em algo, repare nos gráficos. O primeiro diz respeito as mudanças que acabamos de fazer:

otimizado

sem otimização 

O que fizemos foi antecipar a conexão. Não podemos utilizar isso com diversas conexões, pois pode acabar atrapalhando as conexões que já temos. Podemos fazer isso com algum recurso adicional, por exemplo, um vídeo. Coisas que você gostaria de carregar mais rapidamente e que devem ser indicadas para o navegador.

PREFETCH
O prefetch serve para passarmos para ele alguma "url" ou arquivo para que faça o download e guardemos isso no seu cache. O prefetch antecipa o download imaginando que esse download será utilizado no futuro.Ele serve para navegações secundárias, ele possui menos prioridade do que qualquer outro request que tenhamos feito na página, por isso, ele é indicado para ser feito na página seguinte.

Podemos antecipar o download do "categorias.js" digitando:

`<link rel="prefetch" href="pagina-seguinte/categoria.js">`

Assim, antecipamos esse download imaginando que a chance de ele clicar em alguma categoria da Alura é alta. Assim, já deixando isso no cache.

É preciso tomar cuidado, se abusarmos do uso dessas táticas é possível que comecemo a baixar coisas que não são tão úteis, coisas a mais. Temos que utilizar esses recursos com certa esperteza. Outra sugestão é também não fazer o prefetch de um vídeo de 2G, pois pode acontecer um potencial disperdício. O prefetch deve ser utilizado quando se visualiza uma chance alta de ser necessário.

O preload possui um uso similar, mas ele possui uma semântica distinta:

`<link rel="preload" href="arquivo.css">`

A diferença é que o prefetch possui uma prioridade baixa, está direcionado a uma navegação futura. O preload está direcionado para o momento, para a navegação atual.

O preload pode ser utilizado quando temos um carrossel de imagens e vários banners passando, colocamos o primeiro banner na imagem, mas sabendo que devemos antecipar o segundo banner, podemos pedir que o segundo banner seja antecipando o seguinte, pois na hora que o carrossel rodar o segundo banner já irá aparecer. Digitaremos o seguinte nesse caso:

`<link rel="preload" href="banner2.jpg">`

Já utilizamos o preload antes com coisas que queríamos que tivessem alta prioridade. Não poderíamos, nesse caso, usar o prefetch, pois desejamos uma prioridade alta.

Imagine que temos diversos preloads possíveis, para saber qual deve ser o preload a ser utilizado devemos introduzir um atributo, o as, ele na verdade comunica a prioridade para o download do navegador:

`<link rel="preload" href="arquivo.css" as="style">`

Ele lê o seguinte interpretando que o style possui prioridade, se fosse as="image" o navegador lê isso como algo com menor prioridade, pois sabe que isso é uma característica das imagens. Se você deixar sem o as isso indica que a prioridade é baixa.

Vamos pensar onde caberia o uso do preload no site, um recurso que costuma atrasar bastante a renderização do site é o seguinte:

mostrando a fonte na página

A fonte! As fontes são alguns dos recursos que mais tardam em serem baixados na página, podemos, inclusive, reparar pela faixa em azul no gráfico "WaterFall":

mostrando a fonte

Vamos relembrar, as fontes são declaradas no CSS:

fontes no código

E a "url" dessa fonte só será baixada na hora em que ela for realmente utilizada . O navegador adia o download da fonte o máximo possível. Ele precisa primeiro baixar o CSS, "parsear" o CSS, baixar o HTML "parseá-lo" e encontrar algum nó que use a fonte e, então, inicia o download. E isso, pode ser demorado. E, assim, podemos fazer o preload disso, escrevendo:

`<link rel="preload" href="assets/font/opensans-extrabold.woff2" as="font" type="font/woff2">`

Agora, faremos esse download mais rapidamente. O type="font/woff2" serve para indicar que o download só vai ser feito se o navegador entender o woff2 e você pode usar o woff1 para os navegadores que entendem o woff1. O preload é bem útil para baixar recursos que são tardiamente descobertos, seja por ser assíncrono, secundário, por algum motivo que não é possível que ele seja descoberto logo de cara.

PRERENDER
Para fecharmos o tema de Resources Hint vamos finalizar abordando o prerender.

Isso pode parecer estranho, mas na verdade já utilizamos o prerender antes. Imagine, quando realizamos uma busca no Google ele nos mostra os resultados relacionados as palavras-chaves que usamos. Se buscarmos Alura a chance de clicarmos no primeiro site que aparece é muito grande e existe tanto essa certeza que o primeiro link já começa a ser renderizado antes mesmo de ser clicado, é isso que faz o prerender.

No Chrome se formos em "More Tools > Tool Manager" podemos verificar todas as abas que estão abertas e nessa janela podemos visualizar a aba "Prerender". Essa página ja foi renderizada. É como se tivesse uma aba escondida:

mostrando a task

No momento em que clicamos no primeiro link que aparece na lista ele abre quase que instantaneamente. Isso acontece quando fazemos uma busca e o Google acredita que a possibilidade de ter acertado é grande. A ação do usuário é antecipada.

Para fazer isso é bastante fácil. Vamos voltar ao código, na "index.html" e acrescentamos o link rel="prerender" e a página que deve ser pré-renderizada href="pagina.html":

`<link rel="prerender" href="pagina.html">`

É importante usar esse recurso se você tiver uma razoável certeza de que isso vai ser utilizado, isso é muito útil quando temos os casos de work flow. Por exemplo, no caso da leitura de um texto que possui mais de uma página, é provável que a notícia siga sendo lida, a probabilidade da pessoa continuar até as próximas páginas é grande.

No site do Alura existe um cenário interessante, no final da página existe um campo para se cadastrar e receber novidades e lançamentos:

mostrando como preencher o campo

Quando terminamos de preencher com nossas informações esse campo e damos um "ok" somos redirecionados para uma página que diz "Obrigada!":

mostrando a pagina obrigado

A implementação disso é curioso, no "index.html" temos o input com o cadastro:

mostrando o input

E na hora que clicamos nisso podemos observar que ele não dispara nenhum formulário, isso foi implementado utilizando o javascript. Isso está no "footer.js":

mostrando o footer

A regra é que quando a pessoa clicar no botão de Newsletter ele cadastra a newsletter fazendo uma validação, chamando a API e ao terminar de fazer isso somos redirecionados para a página do cadastrado. É uma redirect. Esse cenário é um forte candidato para fazermos um prerender. Escreveremos o seguinte no "index.html":

`<link rel="prerender" href="cadastrado.html">`

Fazendo um gulp e carregando a página o que veremos é um prerender do "cadastrado":

mostrando o prerender

Outra técnica que podemos utilizar, já que o usuário só vai chegar ao prerender se ele preencher o campo das Newsletter é criar o link rel="prerender" de maneira dinâmica. Imagine que o usuário está na página e começa a preencher o campo, nesse caso, a chance de ele apertar o "ok" é altíssima. Podemos pegar esse evento para disparar o download. Vamos no "footer.js" e diremos que quando a pessoa der foco, aí se criará o elemento do prerender:

```js
inputEmail.onfocus = function() {
    var prerender = document.createElement('link');
    prerender.rel =`prerender`;
    prerender.href = 'cadastrado.html';

    document.head.appendChild(prerender);

}
```

O ponto é tentar descobrir qual o melhor momento para fazer isso. E isso dependerá do cenário. Vamos testar isso! Antes ele dava prerender apenas de abrirmos a página, agora, ele disparará o prerender apenas quando dermos foco no campo do e-mail:

## Dica final

Use o page speed insights da google, ele é um ótimo parâmetro final pro seu site

A página final ficou <https://github.com/alura-cursos/performance-web-2/archive/master.zip>

Performance budget (quanto eu posso gastar de recursos): que é limitar qual o teto de performance que eu quero chegar no meu site, ai pode ser tempos variados ou tamanhos de pagina variadas e tentar manter nesse limite desde o começo ou ir chegando nesse limite para seu projeto e um site que faz isso é o performancebudget.io que me diz o que eu preciso gastar para que minha página carregue em x segundos, tanto de css, js, video, imagem e afins e com isso até poder se comparar com outros sites do seu ramo, outra forma é uma extensão chamada browser calories que te dá um budget padrão pros 100 sites mais acessados e isso pode ser mudado
