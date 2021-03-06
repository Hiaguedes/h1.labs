# Webpack

Voltado para single page aplication o webpack é bastante utilizado em frameworks famosos do mercado como o Angular e o Vue e ele é um module bundler, que empacota arquivos e funcionalidades js e resolve problemas banais e nem tão banais de um single page aplication

Para utilizarmos Webpack em ambiente de desenvolvimento é necessário ter a plataforma `Node.js` instalada. O `Node.js` é um ambiente JavaScript multiplataforma disponível para Linux, Mac e Windows. Para instalá-lo, siga as instruções abaixo:

Caso você já tenha o Node instalado
Se você já tem o Node instalado em sua máquina, verifique se ele está na versão 8.6.X através do comando node -v no seu terminal, pois precisamos de uma versão atualizada do mesmo para podermos ter builds mais eficazes com Webpack. Não instale versões ímpares, essas não são tão estáveis quanto as versões pares.

## Para saber mais: webpack e sua estreita relação com SPA

Apesar de o Webpack ser altamente customizável, sua aplicação é voltada para Single Page Applications. Essas páginas que não recarregam durante seu uso tendem a carregar todos os scripts e arquivos CSS que dependem logo no primeiro carregamento e toda mudança de troca de página é feita por um sistema de rotas que manipula a única página carregada trocando seu conteúdo. Para o usuário, essa aplicação se comporta como se fosse uma aplicação nativa, pelo não carregamento durante o uso.

Por mais fabulosa que essa abordagem possa ser para o usuário, se o escopo da aplicação for grande, o primeiro carregamento será sofrível, primeiro pelo tempo de download de arquivos JS e CSS gigantes (concatenados e minificados) além do tempo para que o interpretador JavaScript realize o parser desses arquivos. Esse problema já não acontece com aplicações web tradicionais, pois cada página carrega os scripts e arquivos CSS de que precisam. Webpack soluciona esse problema das Single Page Applications.

Webpack permite dividir um bundle da aplicação em outros bundles menores que são carregados apenas quando forem utilizados pela aplicação, diminuindo assim o tempo de carregamento dessas aplicações e por conseguinte melhorando a experiência do usuário. Aprenderemos a realizar essas divisões, mas ainda há muita coisa para aprendemos antes de chegarmos a este ponto.

## Webpack e babel

O babel é o que transforma um js escrito em ES6 em outro js com por exemplo ES5 ou ES7, e podemos fazer essa mudança com o webpack ou sem o webpack, para fazer sem precisamos da dependencia bundle-cli e fariamos um comando com o node para que ele funcionasse, com o webpack precisariamos somente do bundle-core e do da dependencia de desenvolvimento webpack

O babel-core nada mais é do que o núcleo do babel desprovido de sua linha de comando e que pode ser utilizado por outras ferramentas do mercado como Webpack.

Webpack dispensa a utilização de um module loader, justamente por criar em bundles em tempo de desenvolvimento, que nada mais são do que scripts que agregam outros módulos da aplicação.

É comum utilizar um npm script para executar o webpack bastando adicioná-lo no arquivo package.json.

Exatamente, sem esse script seríamos obrigados a executar o caminho completo do webpack, algo bem improdutivo e sujeito a erros.

Para adicionar dentro de scripts temos a chave valor

`"build-dev": "webpack --config webpack.config.js"`

Lembrando que no arquivo package.json temos que ter aspas duplas na chave e no valor.

Onde webpack.config.js é o centro que tem todas as configurações do webpack

O arquivo de configuração do webpack nada mais é do que um módulo do `Node.js`.

Exatamente. Lembre-se que é a plataforma `Node.js` que executa o Webpack para nós. Aliás, o sistema de módulos da plataforma utilizado pela plataforma é o CommonJS. Diferente do ESM módulos, o CommonJS utiliza a sintaxe require e module.exports.

O código mínimo do `webpack.config.js` é:

```js
const path = require('path');// para resolver qual a pasta absoluta que esse projeto está

module.exports = {
    entry: './app-src/app.js',// entrada
    output: {
        filename: 'bundle.js',//nome do arquivo de saida
        path: path.resolve(__dirname, 'dist')// resolve a pasta atual e adiciona a pasta dist
    }
}
```

E sua explicação está no código, e cada requisição é um module diferente, só que ainda faltam as regras para usar esse módulo e para isso fazemos

```js
,
    module:{
        rules:[//regra do build
            {
                test: /\.js$/,//vejo se somente temos arquivos js
                exclude: /node_modules/,//que não estao na pasta node_modules
                use:{
                    loader: 'babel-loader'// e que usam um loader do babel
                }
            }
        ]
    }
}
```

Que são adicionados após o exports, agora rodando `npm run build-dev` conseguimos ver uma pasta nova dist e com um arquivo bundel.js com todos os arquivos concatenados (bundle) lá dentro

### calopsita-loader?

Tito aprendeu que precisa utilizar um loader para poder lidar com arquivos que não conseguem ser processados diretamente pelo webpack. Foi então que ele baixou o calopsita-loader para lidar com arquivos com a extensão .calop, inclusive aqueles dentro da pasta node_modules.

Ele escreveu seu arquivo webpack.config.js dessa maneira:

```js
// client/webpack.config.js

const path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'meu-bundle.js',
        path: path.resolve(__dirname, 'distribution')
    },
    module: {
        rules: [
            {
                test: /\.calop$/,
                use: {
                    loader: 'calopsita-loader'
                }
            }
        ]
    }
}
```

Marque a única opção verdadeira a respeito do código escrito por Tito.

É um script válido.

Exatamente. Apesar dele ter escolhido nomes diferentes para as propriedades filename e path, a estrutura do arquivo é totalmente válida. Inclusive as regras de carregamento de módulos levaram em consideração a extensão .calop e o loader calopsita-loader.

## Build de desenvolvimento vs build de produção

Um loader age em arquivos com uma determinada caracteristica já um plugin age no bundle criado, então se por exemplo eu quiser trabalhar com minificação a boa é trabalhar com arquivos já concatenados, então é necessário termos dois builds separados um para cada especificidade.

Em geral para fazer um build de produção basta fazermos a seguinte chave valor no package.json do client

Um build de desenvolvimento é mais rápido que um build de produção.

Exato! Builds de produção são mais lentos do que builds de desenvolvimento.

Alternativa correta
Ricardo alterou o script build-dev, quando na verdade deveria criar um novo script, por exemplo, build-prod.

Correto, pois processos extras são realizados apenas no build de produção, como no caso da minificação de arquivos.

`"build-prod": "webpack -p --config webpack.config.js"`

Onde esse -p de produção minifica os arquivos para a gente, mas somente se os arquivos js forem do ECS5 para baixo, coisas mais modernas tem que ser feitas de outra forma, de forma que precisamos fazer uma jogada com as variáveis de ambiente do sistema operacional (o que acaba sendo uma solução que dá certo em todos os sistemas operacionais), para resolver esse conflito usaremos o `cross-env` e para isso basta alterar a chave `build-prod` para

```json
"build-prod": "cross-env NODE_ENV=production webpack --config webpack.config.js"
```

E sua aplicação no webpack.config.js fica

```js
const path = require('path');// para resolver qual a pasta absoluta que esse projeto está
const babilPlugin= require('babili-webpack-plugin');

let plugins =[];

if(process.env.NODE_ENV){
    plugins.push(new babilPlugin())
}

module.exports = {
    entry: './app-src/app.js',// entrada
    output: {
        filename: 'bundle.js',//nome do arquivo de saida
        path: path.resolve(__dirname, 'dist')// resolve a pasta atual e adiciona a pasta dist
    },
    module:{
        rules:[//regra do build
            {
                test: /\.js$/,//vejo se somente temos arquivos js
                exclude: /node_modules/,//que não estao na pasta node_modules
                use:{
                    loader: 'babel-loader'// e que usam um loader do babel
                }
            }
        ]
    },
    plugins
}
```

Mas nossa aplicação tem um problema, estamos configurando por nós mesmos esses arquivos. Que tal usarmos um server mantido pela comunidade? Essa é a ideia do webpack-DevServer

### Uma configuração a ser analisada

Mayra, que utiliza MacOS como sistema operacional, precisou utilizar o módulo babili-webpack-plugin para que seja possível minificar seu projeto escrito em ES2016 (ES7). Inclusive ela configurou o módulo através do webpack.config.js sem grandes problemas:

```js
// client/webpack.config.js

const path = require('path');

const babiliPlugin = require('babili-webpack-plugin');

let plugins = [];

if (process.env.NODE_ENV == 'production') {

    plugins.push(new babiliPlugin());
}

// código posterior omitido
```

Para que o Webpack saiba se deve fazer um build de desenvolvimento ou produção ela consultou a variável de ambiente process.env.NODE_ENV. Se o seu valor for production, o plugin babili será adicionado na lista de plugins utilizado pelo processo de build do webpack. Excelente.

Por fim, ela atribuiu o valor da variável de ambiente NODE_ENV através do próprio npm script:

```js
// código anterior omitido 

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build-dev": "webpack --config webpack.config.js",
    "build-prod": "NODE_ENV=production webpack -p --config webpack.config.js"
  },

// código posterior omitido
```

Marque todas as afirmativas verdadeiras a respeito da estrutura e configuração realizada por Mayra.

Uglify será aplicado em modo de produção.

Sim, e isso causará problemas. Se o babili foi utilizado, não é necessário o parâmetro `-p` no build de produção. Além do uglify falhar para códigos escritos em ES2015 (ES6) em diante, dois minificadores serão aplicados, o que não faz muito sentido.

Alternativa correta
Por mais que Mayra utilize MacOS, ela já não pode ter tanta certeza se o ambiente que rodará sua aplicação é compatível com o shell do linux. É por esse motivo que ela não deveria ter utilizado o npm script build-prod para atribuir um valor para a variável NODE_ENV, pois só funcionará em ambiente compatíveis com o shell do linux.

Exato! A configuração falharia no sistema operacional Windows, sem seu prompt de comando. Pois o NODE_ENV não fica como variável do sistema

## Sobre o uso do cross-env

Marque a única opção correta que configura corretamente a chamada do cross-env para atribuir um valor à uma variável de ambiente NODE_ENV quando o script cangaco for executado.

```js
// código anterior omitido 
  "scripts": {
    "cangaco": "cross-env NODE_ENV=production webpack --config webpack.config.js"
  },
// código posterior omitido
```

Exato! usamos cross-env antes da variável de ambiente NODE_ENV.

Neste capítulo vimos:

- O efeito do parâmetro -p para o build de produção.

- A incompatibilidade do UglifyJS com código que não sejam escritos em ECMASCRIPT 5.

- babili como plugin que ajuda no processo de minificação.

- pegadinhas na atribuição de variáveis de ambiente.

- o módulo cross-env para garantir compatibilidade do nosso npm script entre diferentes sistemas operacionais.

## Webpack DevServer

Para trabalharmos em ambiente de desenvolvimento, quero usar um servidor que se integre com o Webpack, desta forma, não precisaremos criar um servidor próprio para tornar acessível nosso projeto.

No caso, usaremos o Webpack dev server, utilizado por diversos frameworks, single pages applications, pelos Command line interfaces (CLI) dos projetos. Primeiramente, adequaremos o projeto para trabalhados com Webpack dev server. Vale lembrar que a pasta server deve continuar existindo, porque nela encontraremos as APIs consumidas pela aplicação, um protótipo de uma single page applications.

E invés de criar uma pasta em disco como no webpack no meu server agora eu terei uma pasta criada em memória e que será acessível pela URL, não ocupando espaço em disco e sim em memória, o que é lindo e o arquivo js inicialmente será acessível em `localhost:8080/bundle.js` não funcionando inicialmente mas podemos configurar isso via webpack.config.js, e ele possui o live reload habilitado então podemos modificar ele com cada CTRL+S que for dado no projeto

Marque as opções verdadeiras à respeito do Webpack Dev Server.

Webpack Dev Server é um servidor capaz de ler as configurações de webpack.config.js ao ser carregado.

Exato! Ele se encarregará de tornar o projeto acessível através do navegador e aplicará todas as regras definidas em webpack.config.js.

Alternativa correta
Webpack Dev server é baixado através do npm, pois é nada mais nada menos do que um módulo do Node.js.

Correto, inclusive o Webpack e seus plugins são módulos do Node.js.

### Instalação e configuração

Cleber decidiu utilizar o Webpack Dev Server para usufruir de um ambiente de desenvolvimento mais produtivo.

Primeiro, ele instalou o módulo através do npm:

`npm install webpack-dev-server@2.5.1 --save`

Em seguida ele adicionou um npm script para chamar o servidor:

```js

 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build-dev": "webpack --config webpack.config.js",
    "build-prod": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "start": "webpack"
  },
```

Quantos erros Cleber cometeu durante todo esse processo?

2

O primeiro erro de Cleber, apesar de não gerar problemas inicialmente, foi ter instalado o webpack-dev-server como uma dependência de produção com --save quanto na verdade deveria ser --save-dev, uma dependência de desenvolvimento. O segundo foi o script "start' que chama o webpack e não o webpack-dev-server.

### Bundle não encontrado

Soraia, depois de iniciar o webpack dev server com o script npm run start não está entendendo por que o arquivo dist/bundle.js não está sendo encontrado. Ela sabe que o servidor construirá em memória o arquivo bundle.js para que as modificações no projeto se reflitam o mais rápido possível para aplicação carregada no navegador.

Vejamos um trecho do seu arquivo de configuração:

```js
// client/webpack.config.js

const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');

let plugins = []

if (process.env.NODE_ENV == 'production') {

    plugins.push(new babiliPlugin());
}

module.exports = {
    entry: './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // código posterior omitido
```

Marque a opção que possui o código de Soraia corrigido.

```js
const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');

let plugins = []

if (process.env.NODE_ENV == 'production') {

    plugins.push(new babiliPlugin());
}

module.exports = {
    entry: './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "dist"
    },
    // código posterior omitido
```

A propriedade publicPath, localizada no objeto de configuração da propriedade output, é importante para alterar o caminho gerado pelo webpack dev server. Com essa modificação, o bundle será acessível através de dist/bundle.js.

Com esse `publicPath` conseguimos dizer que o arquivo bundle.js estará na pasta dist

## Tratando arquivos css como módulos

Podemos usar o node para baixar arquivos css como o bootstrap assim como outras depêndencias de front end tais como o angular e preparar esse ambiente com o webpack pode ser interessante até mesmo para projetos que não usam nenhum tipo de framework, ou seja com js vanilla, htmlzao e o css da massa

Para baixar o bootstrap pelo npm use

```node
npm i bootstrap --save-dev
```

Marque a única alternativa correta à respeito do gerenciamento de dependências frontend e Webpack.

Alternativa correta
Podemos usar o npm da própria plataforma Node.js para gerenciar as dependências de frontend da nossa aplicação. Nesse sentido, Webpack será o responsável pelo carregamento dessas dependências adicionando-as no bundle da aplicação.

Exato. Quem gerencia as dependências é o npm, o Webpack apenas permitirá adicioná-las ao bundle da aplicação tratando-os como módulos, contanto que haja um loader configurado para lidar com o tipo de arquivo em questão.

Nos frameworks angular e react os arquivos css são carregados como módulos na distribuição da aplicação

Para tratar os arquivos css como módulos precisamos do `css-loader` e o `style-loader` e em um arquivo js que esteja setado como entrada nesse caso o `app.js` importar os arquivos css que estão dentro da pasta node_modules da seguinte forma

O css-loader vai transformar os arquivos css e transformar em um arquivo json e o style-loader vai pegar esse json em css inline, maaaaaaas dependendo do que você estiver utilizando (como o bootstrap) você precisará de outros loaders para poder carregar o bonitão lá no seu projeto.

```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
```

Quando não colocamos o ./ no path dessa importação o webpack entende que o bootstrap está dentro da pasta node_modules automaticamente

No arquivo `webpack.config.js` precisamos aplicar a seguinte regra:

```json
{
                test:/\.css/,
                loader: 'style-loader!css-loader'
            }
```

Onde primeiro será aplicado o css-loader e depois o style loader (e não o contrário)

## E para modularizar os meus css?

Basta colocar o caminho do css no app js que é a entrada pro webpack.config.js em:

```js
entry: './app-src/app.js',// entrada
```

Na hora de colocar o nome da pasta, coloque o caminho real dela, ou seja com `./` ou `../../qualquercoisadesdequecheguelá`, pois senão ele acha que está no node_modules

```js
import 'calopsita/dist/calop.css';
import '../css/alecrim.css;
```

Correto. O primeiro import importará de node_modules e o seguindo de outra pasta.

## O problema é o FOUC (Flash of Unstyled Content)

Fazendo da maneira como fizemos temos a impressão de vermos a página entrando com um conteúdo não estilizado para depois termos um arquivo estilizado, isso é o FOUC e é isso que via várias vezes com a internet lenta num site da globo por exemplo.

E para reaver esse problema temos o `extract-text-webpack-plugin`, para isso vamos colocar o link de um styles.css no index.html além de alterarmos o arquivo webpack.config.js

FOUC significa flash of unstyled content. É quando há um hiato entre o carregamento do CSS e sua aplicação na página, permitindo que o usuário veja a página sem estar estilizada durante um breve tempo.

Correto.

Por mais que o webpack adicione arquivos CSS importados no bundle da aplicação, é interessante adicioná-los em um arquivo CSS separado para podermos usufruir de todas as otimizações realizadas pelos navegadores a respeito do carregamento de folhas de estilo.

### Faltou minificar os css

Para isso temos o `cssnano` e o plugin do webpack chamado `optimize-css-assets-webpack-plugin` e como o nome do segundo diz esse é um plugin que temos que colocar apenas para quando setarmos a produção

## Nossos scripts como módulos

Marque a única alternativa correta sobre a importação de scripts e Webpack.

Podemos importar scripts diretamente da pasta node_modules através da instrução import. E para isso vamos usar um gerenciador que já vem junto com o webpack que é o ProvidePlugin e para importar o jquery (além de instalar com `npm i jquery`) nós faremos

```js
plugins.push(new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery':'jquery/dist/jquery.js'
}));
```

E com isso o jquery estará junto com seu bundle, devemos colocar tanto jQuery quanto $ como apelidos de se chamar o jquery, pois são as formas mais comuns de se atribuir a essa biblioteca, mas lembre-se que $ no dev tools não significa jquery.

## Scope Hoisting

Cada módulo do nosso bundle é envolvido por um wrapper, que resumidamente se trata de uma função. Contudo, a existência desses wrappers tornam a execução do script um pouco mais lenta no navegador .

Entretanto, a partir do Webpack 3, podemos ativar o Scope Hoisting. Ele consiste em concatenar o escopo de todos os módulos em um único wrapper, permitindo assim que nosso código seja executado mais rapidamente no navegador.

Vamos ativar esse recurso apenas no build de produção, adicionando uma instância de ModuleConcatenationPlugin em nossa lista de plugins:

```js
// client/webpack.config.js

// código anterior omitido 

if (process.env.NODE_ENV == 'production') {

    // ATIVANDO O SCOPE HOISTING

    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

    plugins.push(new babiliPlugin());

    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { 
            discardComments: {
                removeAll: true 
            }
        },
        canPrint: true
    }));
}
// código posterior omitido
```

Isso já é suficiente. Contudo, devido à dimensão reduzida da nossa aplicação, teremos dificuldade de ver na prática as mudanças no tempo de execução da nossa aplicação. É normal o build de produção ter um tempo maior de execução (pois são mais funções para executar) e em um projeto muito grande (com muitos arquivos para concatenar) essa otimização vai ser muito bem vinda

## Separar meus scripts de scripts de terceiros

Por serem arquivos as vezes muitos grandes, o jquery, o bootstrap e afins podem estar em um tipo de bundle separado e para isso o webpack tem uma solução chamada `CommonsChunkPlugin`

Lúcio decidiu separar todo o código JavaScript que programou das bibliotecas de terceiros utilizadas pela sua aplicação.

Ele alterou seu webpack.config.js adicionando apenas o CommonsChunkPlugin:

```js
const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

let plugins = []

// código anterior omitido 

plugins.push(
    new webpack.optimize.CommonsChunkPlugin(
        { 
            name: 'vendor', 
            filename: 'vendor.bundle.js'
        }
    )
);
// código posterior omitido
```

Marque a única consideração verdadeira à respeito da modificação realizada por Lúcio.

Não basta configurar o CommonsChunkPlugin, é necessário alterar o entry para que leve em consideração dois pontos de entrada da aplicação.

Correto. Um ponto de entrada é o código que escrevemos e outro é o das bibliotecas de terceiros.

Além disso devemos colocar no html o novo arquivo js que será em

```html
<script src="dist/vendor.bundle.js"></script>
```

E nossa entrada fica como

```js
    entry: {
        app:'./app-src/app.js',// entrada
        vendor:['jquery','bootstrap','reflect-metadata']
    }
```

Onde colocamos no vendor (podia ser qq nome mas desde que o nome seja o mesmo no plugin) as bibliotecas de terceiros que queremos que fiquem separados das nossas

## Não precisar colocar css e js na mão

Com o `html-webpack-plugin`

Marque as alternativas verdadeiras à respeito do code splitting e do lazy loading.

Podemos usar System.import ou import. A última forma é que se tornará vigente e que se coaduna com a spec import do ECMASCRIPT.

Correto. Podemos usar as duas formas. Webpack mantém System.import para não quebrar código legado. Todavia, se usamos Babel, precisamos instalar um plugin que ensine para Babel que a sintaxe import é uma sintaxe válida.

Alternativa correta
Basta usarmos System.import para carregarmos dinamicamente módulos em nosso aplicação no lugar da instrução import. O módulo não deve ser importado estaticamente em nenhum outro ponto da aplicação.

Correto. É importante que o módulo carregado sob demanda não esteja estaticamente importado em nenhum outro ponto da aplicação, caso contrário ele fará parte do bundle.

## Mudar nome de url para o nome do site em distribuição

é um plugin do webpack chamado `webpack.DefinePlugin` assim definimos localhost:3000 para desenvolvimento e `nome-da-api` para desenvolvimento

```js
Gisele decidiu aplicar a técnica que permite trocar o endereço da API da aplicação no build de produção. Seu código:

// client/webpack.config.js

// código anterior omitido

let SERVICE_URL = JSON.stringify('http://localhost:3000');

if (process.env.NODE_ENV == 'production') {

    SERVICE_URL = "http://enderecodasuaapi.com";

    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new babiliPlugin());
    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { 
            discardComments: {
                removeAll: true 
            }
        },
        canPrint: true
    })); 
} 

// ADICIONANDO O PLUGIN NA LISTA

plugins.push(new webpack.DefinePlugin({
    SERVICE_URL
}));

// código posterior omitido
Quantos erros há no script de Gisele?
```

1

Exato! Ela não usou JSON.stringify em uma das atribuições para a variável SERVICE_URL.

Link do projeto final do [curso](https://s3.amazonaws.com/caelum-online-public/webpack/stages/07-projeto-webpack.zip)
